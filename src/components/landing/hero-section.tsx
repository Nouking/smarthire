'use client';

import { Zap, Play } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-32'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-10 left-10 h-72 w-72 animate-pulse rounded-full bg-blue-300 mix-blend-multiply blur-xl filter' />
        <div className='animation-delay-2000 absolute top-32 right-10 h-72 w-72 animate-pulse rounded-full bg-purple-300 mix-blend-multiply blur-xl filter' />
        <div className='animation-delay-4000 absolute -bottom-32 left-20 h-72 w-72 animate-pulse rounded-full bg-pink-300 mix-blend-multiply blur-xl filter' />
      </div>

      <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          {/* Hero Content */}
          <div className='fade-in text-center lg:text-left'>
            {/* Badge */}
            <Badge className='mb-6 inline-flex items-center space-x-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800'>
              <span className='h-2 w-2 animate-pulse rounded-full bg-blue-600' />
              <span>Free Forever • No Hidden Costs</span>
            </Badge>

            {/* Main Headline */}
            <h1 className='slide-up mb-6 text-4xl leading-tight font-bold text-gray-900 lg:text-6xl'>
              Professional recruitment platform that makes hiring decisions{' '}
              <span className='bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'>
                smarter, faster, and completely free
              </span>
            </h1>

            {/* Subheading */}
            <p className='slide-up animation-delay-200 mx-auto mb-8 max-w-2xl text-xl text-gray-600 lg:mx-0'>
              Transform your recruitment process with AI-powered CV matching that finds the perfect
              candidates in just 30 seconds. No subscriptions, no limits, no compromises.
            </p>

            {/* CTA Buttons */}
            <div className='slide-up animation-delay-400 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start'>
              <Button size='lg' className='btn-primary px-8 py-4 text-lg'>
                <Zap className='h-5 w-5' />
                Get Started Free
              </Button>
              <Button variant='outline' size='lg' className='btn-secondary px-8 py-4 text-lg'>
                <Play className='h-5 w-5' />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className='slide-up animation-delay-600 mt-12'>
              <p className='mb-4 text-sm text-gray-500'>Trusted by 10,000+ companies worldwide</p>
              <div className='flex items-center justify-center space-x-8 opacity-60 lg:justify-start'>
                <div className='text-2xl font-bold text-gray-400'>TechCorp</div>
                <div className='text-2xl font-bold text-gray-400'>StartupXYZ</div>
                <div className='text-2xl font-bold text-gray-400'>InnovateCo</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className='scale-in animation-delay-800 relative'>
            <div className='relative rotate-2 transform rounded-2xl bg-white p-8 shadow-2xl'>
              <div className='absolute inset-0 scale-105 -rotate-3 transform rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600' />
              <div className='relative rounded-xl bg-white p-6'>
                {/* Mock Dashboard */}
                <div className='mb-4 flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <div className='h-3 w-3 rounded-full bg-red-400' />
                    <div className='h-3 w-3 rounded-full bg-yellow-400' />
                    <div className='h-3 w-3 rounded-full bg-green-400' />
                  </div>
                  <div className='text-xs text-gray-500'>SmartHire AI Dashboard</div>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-100'>
                      <svg
                        className='h-4 w-4 text-green-600'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div>
                      <div className='text-sm font-medium'>CV Analysis Complete</div>
                      <div className='text-xs text-gray-500'>95% match found</div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100'>
                      <svg
                        className='h-4 w-4 text-blue-600'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div>
                      <div className='text-sm font-medium'>Processing 247 CVs</div>
                      <div className='text-xs text-gray-500'>ETA: 28 seconds</div>
                    </div>
                  </div>

                  <div className='mt-4 rounded-lg bg-gray-50 p-3'>
                    <div className='mb-1 text-xs text-gray-500'>Top Match</div>
                    <div className='text-sm font-medium'>Senior Frontend Developer</div>
                    <div className='mt-2 h-2 w-full rounded-full bg-gray-200'>
                      <div className='h-2 w-4/5 rounded-full bg-green-500' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
