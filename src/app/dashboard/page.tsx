import { redirect } from 'next/navigation';

import { MobileContainer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getServerUser } from '@/lib/auth/server';

export default async function DashboardPage() {
  const user = await getServerUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <MobileContainer className='py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Welcome, {user.user_metadata?.name || 'User'}!
          </h1>
          <p className='mt-2 text-gray-600'>Dashboard for SmartHire AI</p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {/* User Info Card */}
          <Card className='p-6'>
            <h3 className='mb-4 text-lg font-semibold text-gray-900'>Account Information</h3>
            <div className='space-y-3'>
              <div>
                <label className='text-sm font-medium text-gray-500'>Email</label>
                <p className='text-gray-900'>{user.email}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>Role</label>
                <p className='text-gray-900 capitalize'>{user.user_metadata?.role || 'User'}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>Status</label>
                <p className='text-green-600'>
                  {user.email_confirmed_at ? 'Verified' : 'Pending Verification'}
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className='p-6'>
            <h3 className='mb-4 text-lg font-semibold text-gray-900'>Quick Actions</h3>
            <div className='space-y-3'>
              <Button className='w-full justify-start' variant='outline'>
                <svg className='mr-2 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                  />
                </svg>
                Upload CV
              </Button>
              <Button className='w-full justify-start' variant='outline'>
                <svg className='mr-2 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6'
                  />
                </svg>
                Browse Jobs
              </Button>
              <Button className='w-full justify-start' variant='outline'>
                <svg className='mr-2 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
                View Profile
              </Button>
            </div>
          </Card>

          {/* System Status Card */}
          <Card className='p-6'>
            <h3 className='font-semibent mb-4 text-lg text-gray-900'>System Status</h3>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Authentication</span>
                <span className='flex items-center text-green-600'>
                  <div className='mr-2 h-2 w-2 rounded-full bg-green-600'></div>
                  Active
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>File Storage</span>
                <span className='flex items-center text-green-600'>
                  <div className='mr-2 h-2 w-2 rounded-full bg-green-600'></div>
                  Ready
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>AI Processing</span>
                <span className='flex items-center text-yellow-600'>
                  <div className='mr-2 h-2 w-2 rounded-full bg-yellow-600'></div>
                  Coming Soon
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Sign Out */}
        <div className='mt-8'>
          <form action='/auth/signout' method='post'>
            <Button type='submit' variant='outline' className='text-red-600 hover:text-red-700'>
              Sign Out
            </Button>
          </form>
        </div>
      </MobileContainer>
    </div>
  );
}

export const metadata = {
  title: 'Dashboard - SmartHire AI',
  description: 'Your SmartHire AI dashboard',
};
