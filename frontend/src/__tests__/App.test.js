import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../Login', () => () => <div>Mocked Login</div>);
jest.mock('../Signup', () => () => <div>Mocked Signup</div>);

test('renders the Home component', () => {
  render(<App />);
  const homeElement = screen.getByText(/Explore/i); 
  expect(homeElement).toBeInTheDocument();
});
