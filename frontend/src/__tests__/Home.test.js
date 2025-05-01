import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../Home';

test('renders Home component and checks initial text', () => {
  render(<Home />);
  expect(screen.getByText(/Explore the World/i)).toBeInTheDocument();
});
