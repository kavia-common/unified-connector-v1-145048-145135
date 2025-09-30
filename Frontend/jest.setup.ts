import '@testing-library/jest-dom';

// Ensure the public API base URL is defined for tests
process.env.NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost';

// Ensure global.fetch is a jest mock function for tests
if (typeof global.fetch === 'undefined') {
  // @ts-ignore
  global.fetch = jest.fn();
} else if (typeof global.fetch !== 'function' || // @ts-ignore
           (global.fetch as any)._isMockFunction !== true) {
  // @ts-ignore
  global.fetch = jest.fn();
}

// JSDOM already has fetch in newer environments; if not, provide a simple polyfill
if (!(globalThis as any).fetch) {
  const maybeJest = (globalThis as any).jest;
  if (maybeJest && typeof maybeJest.fn === 'function') {
    (globalThis as any).fetch = maybeJest.fn();
  } else {
    // minimal fetch stub for tests if jest.fn is not available
    (globalThis as any).fetch = async () => {
      throw new Error('fetch is not available in this environment');
    };
  }
}

// Silence Next.js useLayoutEffect SSR warnings in tests if any libs rely on it
// Not strictly necessary for React 19 but kept for compatibility
