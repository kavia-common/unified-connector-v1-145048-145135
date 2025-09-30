import { render, screen } from '@/src/test-utils';
import StatusPill from '@/components/ui/StatusPill';

describe('StatusPill', () => {
  it('renders status text', () => {
    render(<StatusPill status="healthy" />);
    expect(screen.getByText(/healthy/i)).toBeInTheDocument();
  });

  it('renders unknown gracefully', () => {
    render(<StatusPill status="unknown_status" />);
    expect(screen.getByText(/unknown_status/i)).toBeInTheDocument();
  });
});
