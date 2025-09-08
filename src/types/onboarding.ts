export interface OnboardingProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
  userProfile: {
    fullName: string;
    email: string;
    companyName?: string;
  };
}

export interface OnboardingStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface OnboardingState {
  progress: OnboardingProgress;
  steps: OnboardingStep[];
  isLoading: boolean;
  error?: string;
}

export type OnboardingAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | undefined }
  | { type: 'NEXT_STEP' }
  | { type: 'COMPLETE_STEP'; payload: string }
  | { type: 'SET_PROGRESS'; payload: OnboardingProgress };

export const ONBOARDING_STEPS: Omit<OnboardingStep, 'isCompleted' | 'isActive'>[] = [
  {
    id: 'company-profile',
    stepNumber: 1,
    title: 'Company Profile',
    description:
      'Set up your company information, preferences, and hiring goals to personalize your SmartHire AI experience.',
    icon: 'building',
  },
  {
    id: 'first-job-description',
    stepNumber: 2,
    title: 'First Job Description',
    description:
      'Create your first job description to help our AI understand your hiring criteria and requirements.',
    icon: 'file-text',
  },
  {
    id: 'upload-cv-demo',
    stepNumber: 3,
    title: 'Upload CV Demo',
    description:
      'Upload a sample CV to see our AI-powered matching and analysis capabilities in action.',
    icon: 'upload',
  },
  {
    id: 'first-ai-match',
    stepNumber: 4,
    title: 'First AI Match',
    description:
      'Experience your first AI-powered candidate match and see detailed compatibility insights.',
    icon: 'zap',
  },
];

export interface OnboardingPageProps {
  user: {
    id: string;
    email: string;
    user_metadata: {
      name?: string;
      full_name?: string;
    };
  };
  userProfile?: {
    full_name: string | null;
    company: string | null;
  };
}
