import '@testing-library/jest-dom';

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
