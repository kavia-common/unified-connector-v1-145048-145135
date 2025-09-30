import { render, screen, waitFor, fireEvent } from '@/src/test-utils';
import ConnectorsTable from '@/components/connectors/ConnectorsTable';
import { api } from '@/lib/api/client';

describe('ConnectorsTable', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('shows loader then empty message', async () => {
    jest.spyOn(api, 'listConnectors').mockResolvedValue({
      ok: true,
      status: 200,
      data: [],
    } as any);

    render(<ConnectorsTable />);
    expect(screen.getByText(/loading connectors/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/no connectors/i)).toBeInTheDocument();
    });
  });

  it('renders rows and allows trigger sync', async () => {
    jest.spyOn(api, 'listConnectors').mockResolvedValue({
      ok: true,
      status: 200,
      data: [
        { id: '1', name: 'Alpha', status: 'healthy', lastSync: '2024-01-01T00:00:00Z' },
      ],
    } as any);
    const triggerSpy = jest.spyOn(api, 'triggerSync').mockResolvedValue({
      ok: true,
      status: 200,
      data: { id: '1', triggered: true },
    } as any);

    render(<ConnectorsTable />);

    await waitFor(() => {
      expect(screen.getByText('Alpha')).toBeInTheDocument();
    });

    const btn = screen.getByRole('button', { name: /trigger sync/i });
    fireEvent.click(btn);

    expect(triggerSpy).toHaveBeenCalledWith('1');
  });

  it('shows error when list fails', async () => {
    jest.spyOn(api, 'listConnectors').mockResolvedValue({
      ok: false,
      status: 500,
      error: { status: 500, message: 'fail' },
    } as any);

    render(<ConnectorsTable />);

    await waitFor(() => {
      expect(screen.getByText(/fail/i)).toBeInTheDocument();
    });
  });
});
