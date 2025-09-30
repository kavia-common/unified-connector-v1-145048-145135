import { render, screen, waitFor, fireEvent } from '@/src/test-utils';
import SystemStatus from '@/components/status/SystemStatus';
import { api } from '@/lib/api/client';

jest.useFakeTimers();

describe('SystemStatus', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(global, 'setInterval');
    jest.spyOn(global, 'clearInterval');
  });

  it('shows loader then renders data on success', async () => {
    jest.spyOn(api, 'status').mockResolvedValue({
      ok: true,
      status: 200,
      data: { status: 'ok', uptime: 123, version: '1.0.0' },
    } as any);

    render(<SystemStatus />);
    expect(screen.getByText(/checking system health/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/ok/i)).toBeInTheDocument();
      expect(screen.getByText(/1.0.0/)).toBeInTheDocument();
    });
  });

  it('shows error when api fails', async () => {
    jest.spyOn(api, 'status').mockResolvedValueOnce({
      ok: false,
      status: 500,
      error: { status: 500, message: 'boom' },
    } as any);

    render(<SystemStatus />);
    await waitFor(() => {
      expect(screen.getByText(/boom/i)).toBeInTheDocument();
    });
  });

  it('refresh button triggers reload', async () => {
    const statusSpy = jest.spyOn(api, 'status')
      .mockResolvedValueOnce({ ok: true, status: 200, data: { status: 'ok' } } as any)
      .mockResolvedValueOnce({ ok: true, status: 200, data: { status: 'ok' } } as any);

    render(<SystemStatus />);
    await waitFor(() => expect(statusSpy).toHaveBeenCalledTimes(1));

    const btn = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(btn);
    await waitFor(() => expect(statusSpy).toHaveBeenCalledTimes(2));
  });
});
