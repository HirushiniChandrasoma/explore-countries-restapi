import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the Home component', () => {
  // Only test the core components (without using BrowserRouter)
  render(<App />);
  const homeElement = screen.getByText(/Home/i); // Assume Home component has 'Home' text
  expect(homeElement).toBeInTheDocument();
});
import { render, screen } from '@testing-library/react';
import App from '../App';

// Modify the test so it doesn't rely on routing
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);  // Example test, update as needed
  expect(linkElement).toBeInTheDocument();
});
