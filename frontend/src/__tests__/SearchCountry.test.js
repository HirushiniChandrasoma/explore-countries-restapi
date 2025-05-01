import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchCountry from '../SearchCountry';

test('filters countries dynamically', async () => {
  render(<SearchCountry />);  // Render the component without needing BrowserRouter

  const input = screen.getByPlaceholderText(/Search/i);
  fireEvent.change(input, { target: { value: 'Ind' } });

  const searchButton = screen.getByText(/Search/i);
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(screen.getByText(/India/i)).toBeInTheDocument();
    expect(screen.getByText(/Indonesia/i)).toBeInTheDocument();
  });
});
