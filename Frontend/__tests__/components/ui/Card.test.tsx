import { render, screen } from '@/src/test-utils';
import Card from '@/components/ui/Card';

describe('Card', () => {
  it('renders title, actions and children', () => {
    render(
      <Card title="My Card" actions={<button>Act</button>}>
        <div>Body</div>
      </Card>
    );
    expect(screen.getByText('My Card')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Act' })).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });
});
