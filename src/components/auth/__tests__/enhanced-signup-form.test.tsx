import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EnhancedSignUpForm } from '../enhanced-signup-form';

// Mock the password validation utility
jest.mock('@/lib/validation/password', () => ({
  calculatePasswordStrength: jest.fn((password: string) => ({
    score: password.length >= 8 ? 3 : 1,
    level: password.length >= 8 ? 'good' : 'weak',
    feedback: password.length >= 8 ? ['Good password strength'] : ['Password too short'],
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSpecialChars: /[^a-zA-Z0-9]/.test(password),
  })),
  validateEmailFormat: jest.fn((email: string) => ({
    isValid: email.includes('@') && email.includes('.'),
    error: email.includes('@') && email.includes('.') ? undefined : 'Invalid email format',
    suggestions: email === 'test@gmial.com' ? ['test@gmail.com'] : undefined,
  })),
  getPasswordStrengthColors: jest.fn(() => ({
    text: 'text-green-600',
    bg: 'bg-green-100',
    border: 'border-green-300',
  })),
}));

describe('EnhancedSignUpForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnSubmit.mockResolvedValue({ success: true });
  });

  const renderForm = (props = {}) => {
    return render(<EnhancedSignUpForm onSubmit={mockOnSubmit} isLoading={false} {...props} />);
  };

  describe('Form Rendering', () => {
    test('renders all required form fields', () => {
      renderForm();

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/work email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company size/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    });

    test('displays social proof elements', () => {
      renderForm();

      expect(
        screen.getByText(/join 1,000\+ companies using ai for recruitment/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/create your account/i)).toBeInTheDocument();
      expect(
        screen.getByText(/start hiring smarter with ai-powered candidate matching/i)
      ).toBeInTheDocument();
    });

    test('shows trust indicators', () => {
      renderForm();

      expect(screen.getByText(/256-bit ssl encryption/i)).toBeInTheDocument();
      expect(screen.getByText(/gdpr compliant/i)).toBeInTheDocument();
      expect(screen.getByText(/soc 2 certified/i)).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    test('validates required fields on submission', async () => {
      const user = userEvent.setup();
      renderForm();

      const submitButton = screen.getByRole('button', { name: /create account/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/full name must be at least 2 characters/i)).toBeInTheDocument();
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
        expect(screen.getByText(/company name must be at least 2 characters/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test('validates email format in real-time', async () => {
      const user = userEvent.setup();
      renderForm();

      const emailInput = screen.getByLabelText(/work email address/i);
      await user.type(emailInput, 'invalid-email');
      await user.tab(); // Trigger blur event

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    test('shows email suggestions for typos', async () => {
      const user = userEvent.setup();
      renderForm();

      const emailInput = screen.getByLabelText(/work email address/i);
      await user.type(emailInput, 'test@gmial.com');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/did you mean/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /test@gmail.com/i })).toBeInTheDocument();
      });
    });

    test('validates password confirmation', async () => {
      const user = userEvent.setup();
      renderForm();

      const passwordInput = screen.getByLabelText(/^password/i);
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

      await user.type(passwordInput, 'Password123!');
      await user.type(confirmPasswordInput, 'DifferentPassword123!');

      const submitButton = screen.getByRole('button', { name: /create account/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
      });
    });

    test('requires terms acceptance', async () => {
      const user = userEvent.setup();
      renderForm();

      // Fill out valid form but don't check terms
      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/work email address/i), 'john@company.com');
      await user.type(screen.getByLabelText(/company name/i), 'Acme Corp');
      await user.type(screen.getByLabelText(/^password/i), 'Password123!');
      await user.type(screen.getByLabelText(/confirm password/i), 'Password123!');

      const submitButton = screen.getByRole('button', { name: /create account/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/you must accept the terms of service/i)).toBeInTheDocument();
      });
    });
  });

  describe('Password Strength Indicator', () => {
    test('shows password strength feedback', async () => {
      const user = userEvent.setup();
      renderForm();

      const passwordInput = screen.getByLabelText(/^password/i);
      await user.type(passwordInput, 'weak');

      await waitFor(() => {
        expect(screen.getByText(/password too short/i)).toBeInTheDocument();
      });

      await user.clear(passwordInput);
      await user.type(passwordInput, 'StrongPassword123!');

      await waitFor(() => {
        expect(screen.getByText(/good password strength/i)).toBeInTheDocument();
      });
    });
  });

  describe('Password Visibility Toggle', () => {
    test('toggles password visibility', async () => {
      const user = userEvent.setup();
      renderForm();

      const passwordInput = screen.getByLabelText(/^password/i);
      const toggleButton = screen.getAllByRole('button', { name: /show password/i })[0];

      expect(passwordInput).toHaveAttribute('type', 'password');

      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');

      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Company Size Selection', () => {
    test('allows company size selection', async () => {
      const user = userEvent.setup();
      renderForm();

      const companySizeSelect = screen.getByRole('combobox');
      await user.click(companySizeSelect);

      const option = screen.getByText(/11-50 employees/i);
      await user.click(option);

      expect(companySizeSelect).toHaveValue('11-50');
    });
  });

  describe('Form Submission', () => {
    test('submits form with valid data', async () => {
      const user = userEvent.setup();
      renderForm();

      // Fill out the form with valid data
      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/work email address/i), 'john@company.com');
      await user.type(screen.getByLabelText(/company name/i), 'Acme Corp');
      await user.type(screen.getByLabelText(/^password/i), 'Password123!');
      await user.type(screen.getByLabelText(/confirm password/i), 'Password123!');
      await user.click(screen.getByRole('checkbox'));

      const submitButton = screen.getByRole('button', { name: /create account/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          fullName: 'John Doe',
          email: 'john@company.com',
          companyName: 'Acme Corp',
          password: 'Password123!',
          confirmPassword: 'Password123!',
          acceptTerms: true,
          companySize: undefined,
        });
      });
    });

    test('shows loading state during submission', async () => {
      const user = userEvent.setup();
      renderForm({ isLoading: true });

      const submitButton = screen.getByRole('button', { name: /creating account/i });
      expect(submitButton).toBeDisabled();
      expect(screen.getByText(/creating account/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA labels and descriptions', () => {
      renderForm();

      const termsCheckbox = screen.getByRole('checkbox');
      expect(termsCheckbox).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining('terms-description')
      );

      const passwordInput = screen.getByLabelText(/^password/i);
      expect(passwordInput).toHaveAttribute('autoComplete', 'new-password');

      const emailInput = screen.getByLabelText(/work email address/i);
      expect(emailInput).toHaveAttribute('autoComplete', 'email');
    });

    test('password visibility buttons have proper ARIA labels', () => {
      renderForm();

      const passwordToggle = screen.getAllByLabelText(/show password/i)[0];
      expect(passwordToggle).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('displays server errors correctly', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockResolvedValueOnce({
        success: false,
        error: { message: 'Email already exists', field: 'email' },
      });

      renderForm();

      // Fill out valid form
      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/work email address/i), 'existing@company.com');
      await user.type(screen.getByLabelText(/company name/i), 'Acme Corp');
      await user.type(screen.getByLabelText(/^password/i), 'Password123!');
      await user.type(screen.getByLabelText(/confirm password/i), 'Password123!');
      await user.click(screen.getByRole('checkbox'));

      const submitButton = screen.getByRole('button', { name: /create account/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
      });
    });
  });
});
