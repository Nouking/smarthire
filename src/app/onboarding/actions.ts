'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getServerUser } from '@/lib/auth/server';
import { updateUserOnboardingProgress } from '@/lib/database/users';

export async function continueOnboardingSetup(): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await getServerUser();

    if (!user) {
      redirect('/auth/signin');
    }

    // Update user's onboarding progress
    const updated = await updateUserOnboardingProgress(user.id, {
      currentStep: 1,
      completedSteps: [],
    });

    if (!updated) {
      return { success: false, error: 'Failed to update onboarding progress' };
    }

    // Revalidate the onboarding page
    revalidatePath('/onboarding');

    return { success: true };
  } catch (error) {
    console.error('Continue onboarding error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function skipOnboarding(): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await getServerUser();

    if (!user) {
      redirect('/auth/signin');
    }

    // Mark onboarding as skipped
    const updated = await updateUserOnboardingProgress(user.id, {
      skipped: true,
      currentStep: 4, // Mark as "completed" but skipped
      completedSteps: [],
    });

    if (!updated) {
      return { success: false, error: 'Failed to skip onboarding' };
    }

    // Revalidate paths
    revalidatePath('/onboarding');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.error('Skip onboarding error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function completeOnboardingStep(
  stepId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await getServerUser();

    if (!user) {
      redirect('/auth/signin');
    }

    // In a real implementation, you would:
    // 1. Validate the step completion
    // 2. Update the user's progress
    // 3. Determine the next step

    console.warn(`Completing onboarding step: ${stepId} for user: ${user.id}`);

    // For now, just log the completion
    const updated = await updateUserOnboardingProgress(user.id, {
      completedSteps: [stepId],
    });

    if (!updated) {
      return { success: false, error: 'Failed to complete step' };
    }

    revalidatePath('/onboarding');

    return { success: true };
  } catch (error) {
    console.error('Complete onboarding step error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
