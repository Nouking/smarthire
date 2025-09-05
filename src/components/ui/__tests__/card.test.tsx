/**
 * Card Component Tests
 *
 * Tests for the Card UI component family including Card, CardHeader, CardTitle, etc.
 */

import { render, screen } from '@testing-library/react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';

describe('Card Components', () => {
  describe('Card', () => {
    it('should render with default styles', () => {
      render(<Card data-testid='card'>Card content</Card>);

      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass(
        'bg-card',
        'text-card-foreground',
        'rounded-lg',
        'border',
        'shadow-sm'
      );
    });

    it('should accept custom className', () => {
      render(
        <Card className='custom-card' data-testid='card'>
          Content
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-card');
    });

    it('should forward ref correctly', () => {
      const ref = jest.fn();
      render(<Card ref={ref}>Card with ref</Card>);

      expect(ref).toHaveBeenCalled();
    });
  });

  describe('CardHeader', () => {
    it('should render with correct styles', () => {
      render(<CardHeader data-testid='card-header'>Header content</CardHeader>);

      const header = screen.getByTestId('card-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
    });

    it('should accept custom className', () => {
      render(
        <CardHeader className='custom-header' data-testid='card-header'>
          Header
        </CardHeader>
      );

      const header = screen.getByTestId('card-header');
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('CardTitle', () => {
    it('should render with title styles', () => {
      render(<CardTitle data-testid='card-title'>Card Title</CardTitle>);

      const title = screen.getByTestId('card-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('text-2xl', 'leading-none', 'font-semibold', 'tracking-tight');
      expect(title).toHaveTextContent('Card Title');
    });
  });

  describe('CardDescription', () => {
    it('should render with description styles', () => {
      render(<CardDescription data-testid='card-description'>Card description</CardDescription>);

      const description = screen.getByTestId('card-description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('text-muted-foreground', 'text-sm');
      expect(description).toHaveTextContent('Card description');
    });
  });

  describe('CardContent', () => {
    it('should render with content styles', () => {
      render(<CardContent data-testid='card-content'>Card content</CardContent>);

      const content = screen.getByTestId('card-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('p-6', 'pt-0');
      expect(content).toHaveTextContent('Card content');
    });
  });

  describe('CardFooter', () => {
    it('should render with footer styles', () => {
      render(<CardFooter data-testid='card-footer'>Footer content</CardFooter>);

      const footer = screen.getByTestId('card-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
      expect(footer).toHaveTextContent('Footer content');
    });
  });

  describe('Complete Card Structure', () => {
    it('should render a complete card with all components', () => {
      render(
        <Card data-testid='complete-card'>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
            <CardDescription>This is a test card description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content</p>
          </CardContent>
          <CardFooter>
            <button>Action Button</button>
          </CardFooter>
        </Card>
      );

      const card = screen.getByTestId('complete-card');
      const title = screen.getByText('Test Card');
      const description = screen.getByText('This is a test card description');
      const content = screen.getByText('This is the card content');
      const button = screen.getByRole('button', { name: /action button/i });

      expect(card).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });
});
