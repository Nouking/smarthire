/**
 * Utility Functions Tests
 *
 * Tests for core utility functions used throughout the application.
 */

import { cn } from '../utils';

describe('Utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-red-500', 'bg-blue-500');
      expect(result).toContain('text-red-500');
      expect(result).toContain('bg-blue-500');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class', !isActive && 'inactive-class');

      expect(result).toContain('base-class');
      expect(result).toContain('active-class');
      expect(result).not.toContain('inactive-class');
    });

    it('should handle empty inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle undefined and null values', () => {
      const result = cn('valid-class', undefined, null, 'another-class');
      expect(result).toContain('valid-class');
      expect(result).toContain('another-class');
    });

    it('should merge conflicting Tailwind classes correctly', () => {
      // twMerge should resolve conflicts
      const result = cn('px-2', 'px-4');
      expect(result).toBe('px-4'); // Should keep the last one
    });
  });
});
