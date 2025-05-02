import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchCountry from '../SearchCountry';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => [
      { name: { common: 'India' }, cca2: 'IN', flags: { svg: '' }, region: 'Asia' },
      { name: { common: 'Indonesia' }, cca2: 'ID', flags: { svg: '' }, region: 'Asia' }
    ],
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('filters countries dynamically', async () => {
  render(<SearchCountry />);

  const input = screen.getByPlaceholderText(/search country/i);
  fireEvent.change(input, { target: { value: 'Ind' } });

  const searchButton = screen.getByRole('button', { name: /search/i });
  fireEvent.click(searchButton);

  // Wait for results to show up
  await waitFor(() => {
    expect(screen.getByText(/India/i)).toBeInTheDocument();
    expect(screen.getByText(/Indonesia/i)).toBeInTheDocument();
  });
});
