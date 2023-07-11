import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/pages/old_index';

describe('Home', () => {
  it('renders the index page', () => {
    render(<Home />);

    const landingText = screen.getByTestId('landingText');

    expect(landingText).toBeInTheDocument();
  });
});
