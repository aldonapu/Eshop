import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders login form fields', () => {
  render(<Login />);

  expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});
