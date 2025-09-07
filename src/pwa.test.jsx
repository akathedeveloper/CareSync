import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import OfflineBanner from '../src/offline-banner';

describe('OfflineBanner', () => {
  const originalNavigator = global.navigator;

  beforeAll(() => {
    // Mock the navigator object
    global.navigator = { onLine: true };
  });

  afterAll(() => {
    // Restore the original navigator object
    global.navigator = originalNavigator;
  });

  test('does not render banner when online', () => {
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    render(<OfflineBanner />);
    expect(screen.queryByText(/You are currently offline/)).toBeNull();
  });

  test('renders banner when offline', () => {
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    render(<OfflineBanner />);
    expect(screen.getByText(/You are currently offline/)).toBeInTheDocument();
  });

  test('hides banner when returning online', async () => {
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    render(<OfflineBanner />);
    expect(screen.getByText(/You are currently offline/)).toBeInTheDocument();

    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    fireEvent(window, new Event('online'));

    await waitFor(() => {
      expect(screen.queryByText(/You are currently offline/)).toBeNull();
    });
  });

  test('shows banner when going offline', async () => {
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    render(<OfflineBanner />);
    expect(screen.queryByText(/You are currently offline/)).toBeNull();

    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    fireEvent(window, new Event('offline'));

    await waitFor(() => {
      expect(screen.getByText(/You are currently offline/)).toBeInTheDocument();
    });
  });
});
