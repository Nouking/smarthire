/**
 * SignInForm Basic Tests
 *
 * Basic smoke tests for the SignInForm component without complex integrations.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';

import { SignInForm } from '../signin-form';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock auth functions with simpler mocks
jest.mock('@/lib/auth/client-exports', () => ({
  signIn: jest.fn(),
  validateEmail: jest.fn((email: string) => email.includes('@')),
}));

describe('SignInForm Basic', () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();
  const mockGet = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet,
    });

    mockGet.mockReturnValue(null);
  });

  it('should render without crashing', () => {
    render(<SignInForm />);
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should have proper form elements', () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should handle form input', async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should have navigation links', () => {
    render(<SignInForm />);

    const forgotPasswordLink = screen.getByRole('link', { name: /forgot your password/i });
    const signUpLink = screen.getByRole('link', { name: /sign up/i });

    expect(forgotPasswordLink).toHaveAttribute('href', '/auth/reset-password');
    expect(signUpLink).toHaveAttribute('href', '/auth/signup');
  });

  it('should show welcome message', () => {
    render(<SignInForm />);
    expect(screen.getByText('Welcome back to SmartHire AI')).toBeInTheDocument();
  });
});
