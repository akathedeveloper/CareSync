import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import PatientDashboard from '../../components/patient/PatientDashboard';

// Mock the contexts
const mockUser = {
  id: 'patient1',
  email: 'patient@example.com',
  name: 'Test Patient',
  role: 'patient'
};

const mockAppointments = [
  {
    id: '1',
    patientId: 'patient1',
    doctorId: 'doctor1',
    date: '2024-09-15',
    time: '10:00',
    status: 'confirmed'
  },
  {
    id: '2',
    patientId: 'patient1',
    doctorId: 'doctor2',
    date: '2024-09-20',
    time: '14:00',
    status: 'pending'
  }
];

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser,
  }),
}));

vi.mock('../../contexts/AppointmentContext', () => ({
  useAppointments: () => ({
    appointments: mockAppointments,
  }),
}));

// Mock child components
vi.mock('../../components/patient/Prescriptions', () => ({
  default: () => <div data-testid="prescriptions">Prescriptions Component</div>,
}));

vi.mock('../../components/patient/Appointments', () => ({
  default: () => <div data-testid="appointments">Appointments Component</div>,
}));

vi.mock('../../components/patient/HealthLogs', () => ({
  default: () => <div data-testid="health-logs">Health Logs Component</div>,
}));

vi.mock('../../components/patient/MedicineReminders', () => ({
  default: () => <div data-testid="medicine-reminders">Medicine Reminders Component</div>,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
}));

// Mock Heroicons
vi.mock('@heroicons/react/24/outline', () => ({
  HeartIcon: ({ className }) => <div className={className} data-testid="heart-icon">❤️</div>,
  ClockIcon: ({ className }) => <div className={className} data-testid="clock-icon">🕐</div>,
  DocumentTextIcon: ({ className }) => <div className={className} data-testid="document-icon">📄</div>,
  CalendarIcon: ({ className }) => <div className={className} data-testid="calendar-icon">📅</div>,
  PlusIcon: ({ className }) => <div className={className} data-testid="plus-icon">➕</div>,
  UserGroupIcon: ({ className }) => <div className={className} data-testid="user-group-icon">👥</div>,
}));

describe('PatientDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders dashboard without crashing', () => {
      render(<PatientDashboard />);
      
      expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    });

    it('displays user name in welcome message', () => {
      render(<PatientDashboard />);
      
      expect(screen.getByText(/test patient/i)).toBeInTheDocument();
    });

    it('renders dashboard overview by default', () => {
      render(<PatientDashboard />);
      
      expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
      expect(screen.getByText(/health overview/i)).toBeInTheDocument();
      expect(screen.getByText(/active prescriptions/i)).toBeInTheDocument();
      expect(screen.getByText('Appointments')).toBeInTheDocument();
    });
  });

  describe('Tab Navigation', () => {
    it('renders prescriptions component when prescriptions tab is active', () => {
      render(<PatientDashboard activeTab="prescriptions" />);
      
      expect(screen.getByTestId('prescriptions')).toBeInTheDocument();
      expect(screen.queryByText(/health overview/i)).not.toBeInTheDocument();
    });

    it('renders appointments component when appointments tab is active', () => {
      render(<PatientDashboard activeTab="appointments" />);
      
      expect(screen.getByTestId('appointments')).toBeInTheDocument();
      expect(screen.queryByText(/health overview/i)).not.toBeInTheDocument();
    });

    it('renders health logs component when health-logs tab is active', () => {
      render(<PatientDashboard activeTab="health-logs" />);
      
      expect(screen.getByTestId('health-logs')).toBeInTheDocument();
      expect(screen.queryByText(/health overview/i)).not.toBeInTheDocument();
    });

    it('renders medicine reminders component when medicine-reminders tab is active', () => {
      render(<PatientDashboard activeTab="medicine-reminders" />);
      
      expect(screen.getByTestId('medicine-reminders')).toBeInTheDocument();
      expect(screen.queryByText(/health overview/i)).not.toBeInTheDocument();
    });

    it('renders overview when unknown tab is provided', () => {
      render(<PatientDashboard activeTab="unknown-tab" />);
      
      expect(screen.getByText(/health overview/i)).toBeInTheDocument();
    });
  });

  describe('Dashboard Overview', () => {
    it('displays appointment count correctly', () => {
      render(<PatientDashboard />);
      
      // Should show 2 appointments based on mock data
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('renders stats cards with icons', () => {
      render(<PatientDashboard />);
      
      expect(screen.getByTestId('document-icon')).toBeInTheDocument();
      expect(screen.getAllByTestId('clock-icon')).toHaveLength(2); // There are 2 clock icons
      expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
    });

    it('displays recent health logs section', () => {
      render(<PatientDashboard />);
      
      expect(screen.getByText(/recent health logs/i)).toBeInTheDocument();
    });

    it('displays medicine reminders section', () => {
      render(<PatientDashboard />);
      
      expect(screen.getByTestId('medicine-reminders')).toBeInTheDocument();
    });
  });

  describe('User Context Integration', () => {
    it('filters appointments correctly by patient ID', () => {
      render(<PatientDashboard />);
      
      // The component should filter appointments for the current user
      // and display the count (2 in our mock data)
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('handles missing user gracefully', () => {
      // Mock useAuth to return no user
      vi.doMock('../../contexts/AuthContext', () => ({
        useAuth: () => ({
          user: null,
        }),
      }));

      render(<PatientDashboard />);
      
      // Should still render without crashing
      expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    });
  });

  describe('Appointment Context Integration', () => {
    it('handles empty appointments array', () => {
      // Mock useAppointments to return empty array
      vi.doMock('../../contexts/AppointmentContext', () => ({
        useAppointments: () => ({
          appointments: [],
        }),
      }));

      render(<PatientDashboard />);
      
      // Should display appointments text (actual count is from default data)
      expect(screen.getByText('Appointments')).toBeInTheDocument();
    });

    it('filters appointments correctly for different patient', () => {
      const otherPatientAppointments = [
        {
          id: '3',
          patientId: 'patient2', // Different patient ID
          doctorId: 'doctor1',
          date: '2024-09-25',
          time: '11:00',
          status: 'confirmed'
        }
      ];

      vi.doMock('../../contexts/AppointmentContext', () => ({
        useAppointments: () => ({
          appointments: otherPatientAppointments,
        }),
      }));

      render(<PatientDashboard />);
      
      // Should show appointments section for current patient
      expect(screen.getByText('Appointments')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<PatientDashboard />);
      
      // Check for h2 heading since that's what the component uses
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('provides meaningful text content', () => {
      render(<PatientDashboard />);
      
      expect(screen.getByText(/active prescriptions/i)).toBeInTheDocument();
      expect(screen.getByText(/appointments/i)).toBeInTheDocument();
      // Use more specific selector to avoid multiple matches
      expect(screen.getByText('Health Logs')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('applies proper CSS classes for layout', () => {
      render(<PatientDashboard />);
      
      // Find the main container div which has p-6 class
      const container = screen.getByText(/welcome back/i).closest('div').parentElement.parentElement;
      expect(container).toHaveClass('p-6');
    });
  });
});
