import { render, screen } from '@/src/test-utils';
import { Loader, ErrorBox } from '@/components/ui/Feedback';

describe('Feedback components', () => {
  it('Loader shows label', () => {
    render(<Loader label="Loading..." />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('ErrorBox shows message', () => {
    render(<ErrorBox message="Oops" />);
    expect(screen.getByText(/oops/i)).toBeInTheDocument();
  });
});
