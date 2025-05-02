import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../Home', () => () => <div>Mocked Home</div>);
jest.mock('../Login', () => () => <div>Mocked Login</div>);
jest.mock('../Signup', () => () => <div>Mocked Signup</div>);
jest.mock('../SearchCountry', () => () => <div>Mocked SearchCountry</div>);
jest.mock('../SearchResult', () => () => <div>Mocked SearchResult</div>);
jest.mock('../Regions', () => () => <div>Mocked Regions</div>);
jest.mock('../Languages', () => () => <div>Mocked Languages</div>);
jest.mock('../Continents', () => () => <div>Mocked Continents</div>);
jest.mock('../IntroAnimation', () => () => <div>Mocked Intro</div>);
jest.mock('../Header', () => () => <div>Mocked Header</div>);
test('renders the Home component', () => {
  render(<App />);
  jest.mock('../Home', () => () => <div>Explore the world!</div>);
  expect(homeElement).toBeInTheDocument();
});
