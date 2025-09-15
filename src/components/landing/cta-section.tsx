import { Rocket, Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className='bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white lg:py-32'>
      <div className='container mx-auto px-4 text-center sm:px-6 lg:px-8'>
        <div className='scroll-reveal mx-auto max-w-4xl'>
          <h2 className='mb-6 text-3xl font-bold lg:text-5xl'>Ready to Transform Your Hiring?</h2>
          <p className='mx-auto mb-12 max-w-2xl text-xl text-blue-100'>
            Join thousands of companies using SmartHire AI to make smarter hiring decisions. Get
            started in minutes, no credit card required.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
            <Button
              size='lg'
              className='flex transform items-center space-x-2 rounded-lg bg-white px-8 py-4 text-lg font-bold text-blue-600 transition-all hover:scale-105 hover:bg-gray-50'
            >
              <Rocket className='h-5 w-5' />
              <span>Get Started Today</span>
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='flex items-center space-x-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white hover:text-blue-600'
            >
              <Calendar className='h-5 w-5' />
              <span>Schedule Demo</span>
            </Button>
          </div>

          {/* Additional Info */}
          <div className='mt-12 text-sm text-blue-100'>
            <p>✓ Free forever &nbsp;&nbsp; ✓ No setup fees &nbsp;&nbsp; ✓ Ready in 5 minutes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
