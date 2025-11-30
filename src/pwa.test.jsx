import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import OfflineBanner from '../src/offline-banner';

describe('OfflineBanner Component', () => {
  let originalNavigator;

  beforeAll(() => {
    // Save original navigator
    originalNavigator = global.navigator;
  });

  afterAll(() => {
    // Restore original navigator
    global.navigator = originalNavigator;
  });

  afterEach(() => {
    cleanup();
  });

  test('does not render banner when online', () => {
    Object.defineProperty(global.navigator, 'onLine', { value: true, configurable: true });
    render(<OfflineBanner />);
    expect(screen.queryByText(/You are currently offline/i)).toBeNull();
  });

  test('renders banner when offline', () => {
    Object.defineProperty(global.navigator, 'onLine', { value: false, configurable: true });
    render(<OfflineBanner />);
    expect(screen.getByText(/You are currently offline/i)).toBeInTheDocument();
  });

  test('hides banner when returning online', async () => {
    Object.defineProperty(global.navigator, 'onLine', { value: false, configurable: true });
    render(<OfflineBanner />);
    expect(screen.getByText(/You are currently offline/i)).toBeInTheDocument();

    // Simulate going online
    Object.defineProperty(global.navigator, 'onLine', { value: true, configurable: true });
    fireEvent(window, new Event('online'));

    await waitFor(() => {
      expect(screen.queryByText(/You are currently offline/i)).toBeNull();
    });
  });

  test('shows banner when going offline', async () => {
    Object.defineProperty(global.navigator, 'onLine', { value: true, configurable: true });
    render(<OfflineBanner />);
    expect(screen.queryByText(/You are currently offline/i)).toBeNull();

    // Simulate going offline
    Object.defineProperty(global.navigator, 'onLine', { value: false, configurable: true });
    fireEvent(window, new Event('offline'));

    await waitFor(() => {
      expect(screen.getByText(/You are currently offline/i)).toBeInTheDocument();
    });
  });
});
