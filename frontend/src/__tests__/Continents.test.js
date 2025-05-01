import { render, screen } from '@testing-library/react';
import Continents from '../Continents';

test('renders Continents component', () => {
  render(<Continents />);
  expect(screen.getByText(/Continents/i)).toBeInTheDocument();
});