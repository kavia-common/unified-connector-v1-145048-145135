import { render, screen } from '@/test-utils';
import Page from '@/app/connectors/page';

describe('Connectors page', () => {
  it('renders without crashing', () => {
    render(<Page />);
    expect(screen.getByText(/connectors/i)).toBeInTheDocument();
  });
});
