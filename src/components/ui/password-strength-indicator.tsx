'use client';

import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { calculatePasswordStrength, getPasswordStrengthColors } from '@/lib/validation/password';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export function PasswordStrengthIndicator({ password, className }: PasswordStrengthIndicatorProps) {
  const strengthInfo = useMemo(() => calculatePasswordStrength(password), [password]);

  const colors = getPasswordStrengthColors(strengthInfo.level);

  if (!password) {
    return null;
  }

  return (
    <div className={cn('mt-2 space-y-2', className)}>
      {/* Strength bar */}
      <div className='flex space-x-1'>
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={cn(
              'h-2 flex-1 rounded-full transition-colors duration-200',
              index < strengthInfo.score ? colors.bg.replace('100', '500') : 'bg-gray-200'
            )}
          />
        ))}
      </div>

      {/* Strength label */}
      <div className='flex items-center justify-between text-xs'>
        <span className={cn('font-medium capitalize', colors.text)}>
          {strengthInfo.level} password
        </span>
        <div className='flex space-x-1 text-gray-500'>
          <PasswordCriteriaCheck met={strengthInfo.hasMinLength} label='8+ chars' />
          <PasswordCriteriaCheck met={strengthInfo.hasUppercase} label='A-Z' />
          <PasswordCriteriaCheck met={strengthInfo.hasLowercase} label='a-z' />
          <PasswordCriteriaCheck met={strengthInfo.hasNumbers} label='0-9' />
          <PasswordCriteriaCheck met={strengthInfo.hasSpecialChars} label='!@#' />
        </div>
      </div>

      {/* Feedback */}
      {strengthInfo.feedback.length > 0 && (
        <div className='space-y-1'>
          {strengthInfo.feedback.map((feedback, index) => (
            <p
              key={index}
              className={cn(
                'text-xs',
                strengthInfo.level === 'strong' || strengthInfo.level === 'good'
                  ? colors.text
                  : 'text-gray-600'
              )}
            >
              {feedback}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

interface PasswordCriteriaCheckProps {
  met: boolean;
  label: string;
}

function PasswordCriteriaCheck({ met, label }: PasswordCriteriaCheckProps) {
  return (
    <span
      className={cn(
        'rounded px-1 py-0.5 text-[10px] font-medium',
        met ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
      )}
    >
      {label}
    </span>
  );
}
