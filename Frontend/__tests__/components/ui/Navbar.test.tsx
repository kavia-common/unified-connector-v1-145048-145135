import { render, screen } from '@/src/test-utils';
import Navbar from '@/components/ui/Navbar';
import * as nextNavigation from 'next/navigation';

describe('Navbar', () => {
  it('renders links and highlights active route', () => {
    jest.spyOn(nextNavigation, 'usePathname').mockReturnValue('/connectors');

    render(<Navbar />);

    const dashboard = screen.getByRole('link', { name: /dashboard/i });
    const connectors = screen.getByRole('link', { name: /connectors/i });
    const monitoring = screen.getByRole('link', { name: /monitoring/i });

    expect(dashboard).toBeInTheDocument();
    expect(connectors).toBeInTheDocument();
    expect(monitoring).toBeInTheDocument();

    // active link should have bg-black text-white classes
    expect(connectors).toHaveClass('bg-black');
    expect(connectors).toHaveClass('text-white');
  });
});
