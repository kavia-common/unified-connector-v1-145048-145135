import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  // Add context providers here if/when needed
  return <>{children}</>;
};

function customRender(ui: ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
