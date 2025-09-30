import { render, screen } from '@/src/test-utils';
import Page from '@/app/monitoring/page';

describe('Monitoring page', () => {
  it('renders without crashing', () => {
    render(<Page />);
    expect(screen.getByText(/monitoring/i)).toBeInTheDocument();
  });
});
