import { render, screen } from '@/src/test-utils';
import Home from '@/app/page';
import * as status from '@/components/status/SystemStatus';
import * as table from '@/components/connectors/ConnectorsTable';
import * as login from '@/components/auth/LoginForm';

describe('Home page', () => {
  it('renders key sections', () => {
    // Mock child components to isolate page
    jest.spyOn(status, 'default').mockReturnValue(<div>SystemStatusMock</div> as any);
    jest.spyOn(table, 'default').mockReturnValue(<div>ConnectorsTableMock</div> as any);
    jest.spyOn(login, 'default').mockReturnValue(<div>LoginFormMock</div> as any);

    render(<Home />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/SystemStatusMock/)).toBeInTheDocument();
    expect(screen.getByText(/ConnectorsTableMock/)).toBeInTheDocument();
    expect(screen.getByText(/LoginFormMock/)).toBeInTheDocument();
  });
});
