import '@testing-library/jest-dom/vitest';

// Test environment global setup only. Do not add React components here.
// Polyfills / mocks
if (!window.matchMedia) {
	window.matchMedia = () => ({
		matches: false,
		addEventListener: () => {},
		removeEventListener: () => {},
		addListener: () => {},
		removeListener: () => {},
		dispatchEvent: () => false,
		media: ''
	});
}

// (Optional) suppress noisy act() warnings
const originalError = console.error;
console.error = (...args) => {
	if (typeof args[0] === 'string' && /not wrapped in act/.test(args[0])) return;
	originalError(...args);
};
import '@testing-library/jest-dom/vitest';
// Global test setup only. Add shared mocks here as needed.
