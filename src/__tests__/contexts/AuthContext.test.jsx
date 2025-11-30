import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';

// Mock Firebase
vi.mock('../../firebase', () => ({
  auth: {},
  signInWithGoogle: vi.fn(),
  signOutUser: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    // Mock Firebase auth state change
    callback(null); // No user initially
    return vi.fn(); // Return unsubscribe function
  }),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock fetch for backend API calls
global.fetch = vi.fn();

// Test component to access auth context
const TestComponent = () => {
  const { user, loading, login, logout, register } = useAuth();
  
  return (
    <div>
      <div data-testid="user-state">
        {loading ? 'Loading...' : user ? `User: ${user.email}` : 'No user'}
      </div>
      <button onClick={() => login('test@example.com', 'password', 'patient')}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
      <button onClick={() => register('test@example.com', 'password', 'Test User', 'patient')}>
        Register
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('AuthProvider', () => {
    it('renders children without crashing', () => {
      render(
        <AuthProvider>
          <div data-testid="child">Test Child</div>
        </AuthProvider>
      );
      
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('provides auth context to children', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      expect(screen.getByTestId('user-state')).toBeInTheDocument();
    });

    it('initializes with no user initially', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      // Should eventually show no user after loading
      await waitFor(() => {
        expect(screen.getByText('No user')).toBeInTheDocument();
      });
    });
  });

  describe('useAuth hook', () => {
    it('throws error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<TestComponent />);
      }).toThrow('useAuth must be used within an AuthProvider');
      
      consoleSpy.mockRestore();
    });

    it('provides auth methods', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
      expect(screen.getByText('Register')).toBeInTheDocument();
    });
  });

  describe('Authentication flows', () => {
    beforeEach(() => {
      // Mock successful fetch response
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          user: { email: 'test@example.com', role: 'patient' },
          token: 'mock-token'
        }),
      });
    });

    it('handles login flow', async () => {
      const user = userEvent.setup();
      
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = screen.getByText('Login');
      await user.click(loginButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'http://localhost:5000/api/auth/login',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          })
        );
      });
    });

    it('handles register flow', async () => {
      const user = userEvent.setup();
      
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const registerButton = screen.getByText('Register');
      await user.click(registerButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'http://localhost:5000/api/auth/register',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          })
        );
      });
    });

    it('handles logout flow', async () => {
      const user = userEvent.setup();
      
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const logoutButton = screen.getByText('Logout');
      await user.click(logoutButton);

      await waitFor(() => {
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('caresync_user');
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
      });
    });
  });

  describe('Error handling', () => {
    it('handles authentication state properly', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Should start with no user
      expect(screen.getByText('No user')).toBeInTheDocument();
    });
  });

  describe('Local storage integration', () => {
    it('restores user from localStorage on initialization', async () => {
      const mockUser = { email: 'stored@example.com', role: 'patient' };
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'caresync_user') return JSON.stringify(mockUser);
        if (key === 'token') return 'stored-token';
        return null;
      });

      // Mock successful token verification
      global.fetch.mockResolvedValueOnce({ ok: true });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('User: stored@example.com')).toBeInTheDocument();
      });
    });

    it('clears storage on invalid token', async () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'caresync_user') return JSON.stringify({ email: 'test@example.com' });
        if (key === 'token') return 'invalid-token';
        return null;
      });

      // Mock failed token verification
      global.fetch.mockResolvedValueOnce({ ok: false });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('caresync_user');
      });
    });
  });
});
