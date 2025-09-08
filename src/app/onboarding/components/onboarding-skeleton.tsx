import { Card } from '@/components/ui/card';

export function OnboardingSkeleton() {
  return (
    <div className='mx-auto max-w-4xl animate-pulse space-y-8'>
      {/* Header Skeleton */}
      <header className='text-center'>
        <div className='mb-4 flex items-center justify-center'>
          <div className='h-12 w-12 rounded-xl bg-gray-300'></div>
          <div className='ml-3 h-8 w-40 rounded bg-gray-300'></div>
        </div>
      </header>

      {/* Welcome Card Skeleton */}
      <Card className='p-8 text-center'>
        <div className='mx-auto mb-4 h-12 w-12 rounded-full bg-gray-300'></div>
        <div className='mx-auto mb-2 h-8 w-64 rounded bg-gray-300'></div>
        <div className='mx-auto h-6 w-96 rounded bg-gray-300'></div>
      </Card>

      {/* Progress Card Skeleton */}
      <Card className='p-6 text-center'>
        <div className='mx-auto mb-4 h-6 w-48 rounded bg-gray-300'></div>
        <div className='mb-4 h-3 w-full rounded-full bg-gray-300'></div>
        <div className='mx-auto mb-6 h-4 w-24 rounded bg-gray-300'></div>
        <div className='flex justify-center space-x-2'>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className='h-8 w-8 rounded-full bg-gray-300'></div>
          ))}
        </div>
      </Card>

      {/* Steps Grid Skeleton */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i} className='p-6 text-center'>
            <div className='mx-auto mb-4 h-8 w-8 rounded-full bg-gray-300'></div>
            <div className='mx-auto mb-4 h-10 w-10 rounded bg-gray-300'></div>
            <div className='mx-auto mb-3 h-6 w-32 rounded bg-gray-300'></div>
            <div className='space-y-2'>
              <div className='h-4 rounded bg-gray-300'></div>
              <div className='mx-auto h-4 w-3/4 rounded bg-gray-300'></div>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA Card Skeleton */}
      <Card className='p-8 text-center'>
        <div className='mx-auto mb-6 h-6 w-64 rounded bg-gray-300'></div>
        <div className='space-y-4'>
          <div className='mx-auto h-12 w-48 rounded bg-gray-300'></div>
          <div className='mx-auto h-10 w-56 rounded bg-gray-300'></div>
        </div>
      </Card>

      {/* Footer Skeleton */}
      <footer className='border-t border-gray-200 pt-8 text-center'>
        <div className='mx-auto h-4 w-72 rounded bg-gray-300'></div>
      </footer>
    </div>
  );
}
