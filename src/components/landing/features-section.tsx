import { Brain, Zap, Gift, ArrowRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FeaturesSection() {
  return (
    <section id='features' className='bg-white py-20 lg:py-32'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='scroll-reveal mb-16 text-center'>
          <h2 className='mb-6 text-3xl font-bold text-gray-900 lg:text-5xl'>
            Why Choose SmartHire AI?
          </h2>
          <p className='mx-auto max-w-3xl text-xl text-gray-600'>
            Experience the future of recruitment with our AI-powered platform that streamlines your
            hiring process from start to finish.
          </p>
        </div>

        {/* Feature Cards */}
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {/* AI CV Matching */}
          <Card className='group scroll-reveal animation-delay-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
            <CardHeader>
              <div className='mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 transition-transform group-hover:scale-110'>
                <Brain className='h-6 w-6 text-blue-600' />
              </div>
              <CardTitle className='text-xl font-bold text-gray-900'>AI CV Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='mb-6 text-gray-600'>
                Advanced machine learning algorithms analyze CVs against job requirements,
                delivering precise candidate matches with 95% accuracy in seconds.
              </p>
              <div className='flex items-center font-medium text-blue-600'>
                <span>Learn more</span>
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </div>
            </CardContent>
          </Card>

          {/* Batch Processing */}
          <Card className='group scroll-reveal animation-delay-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
            <CardHeader>
              <div className='mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 transition-transform group-hover:scale-110'>
                <Zap className='h-6 w-6 text-green-600' />
              </div>
              <CardTitle className='text-xl font-bold text-gray-900'>Batch Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='mb-6 text-gray-600'>
                Process hundreds of CVs simultaneously with our powerful batch processing engine.
                Upload, analyze, and rank candidates in minutes, not hours.
              </p>
              <div className='flex items-center font-medium text-green-600'>
                <span>Learn more</span>
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </div>
            </CardContent>
          </Card>

          {/* Zero Cost Operation */}
          <Card className='group scroll-reveal animation-delay-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
            <CardHeader>
              <div className='mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 transition-transform group-hover:scale-110'>
                <Gift className='h-6 w-6 text-purple-600' />
              </div>
              <CardTitle className='text-xl font-bold text-gray-900'>Zero Cost Operation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='mb-6 text-gray-600'>
                Completely free forever. No hidden costs, no subscription fees, no per-user charges.
                Professional recruitment tools accessible to every business.
              </p>
              <div className='flex items-center font-medium text-purple-600'>
                <span>Learn more</span>
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Stats */}
        <div className='mt-20 grid gap-8 text-center md:grid-cols-4'>
          <div className='scroll-reveal animation-delay-200'>
            <div className='mb-2 text-3xl font-bold text-blue-600 lg:text-4xl'>10K+</div>
            <div className='text-gray-600'>Companies</div>
          </div>
          <div className='scroll-reveal animation-delay-400'>
            <div className='mb-2 text-3xl font-bold text-green-600 lg:text-4xl'>95%</div>
            <div className='text-gray-600'>Match Accuracy</div>
          </div>
          <div className='scroll-reveal animation-delay-600'>
            <div className='mb-2 text-3xl font-bold text-purple-600 lg:text-4xl'>30s</div>
            <div className='text-gray-600'>Processing Time</div>
          </div>
          <div className='scroll-reveal animation-delay-800'>
            <div className='mb-2 text-3xl font-bold text-orange-600 lg:text-4xl'>100%</div>
            <div className='text-gray-600'>Free Forever</div>
          </div>
        </div>
      </div>
    </section>
  );
}
