import { Star } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'HR Director, TechCorp',
      initials: 'SJ',
      gradient: 'from-blue-500 to-blue-600',
      quote:
        'SmartHire AI reduced our hiring time by 70% while improving candidate quality. The AI matching is incredibly accurate and saves us countless hours of manual screening.',
    },
    {
      name: 'Mike Chen',
      role: 'Talent Manager, StartupXYZ',
      initials: 'MC',
      gradient: 'from-green-500 to-green-600',
      quote:
        "As a startup, we needed powerful recruitment tools without the enterprise cost. SmartHire AI gave us everything we needed for free. It's a game-changer.",
    },
    {
      name: 'Emily Rodriguez',
      role: 'Recruitment Lead, InnovateCo',
      initials: 'ER',
      gradient: 'from-purple-500 to-purple-600',
      quote:
        'The batch processing feature is phenomenal. We processed 500 applications for a senior role in under 2 minutes. The quality of matches exceeded our expectations.',
    },
  ];

  const renderStars = () => {
    return (
      <div className='mb-4 flex text-yellow-400'>
        {[...Array(5)].map((_, i) => (
          <Star key={i} className='h-5 w-5 fill-current' />
        ))}
      </div>
    );
  };

  return (
    <section id='testimonials' className='bg-gray-50 py-20 lg:py-32'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='scroll-reveal mb-16 text-center'>
          <h2 className='mb-6 text-3xl font-bold text-gray-900 lg:text-5xl'>
            Trusted by Leading Companies
          </h2>
          <p className='mx-auto max-w-3xl text-xl text-gray-600'>
            See how SmartHire AI is transforming recruitment processes across industries and company
            sizes.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className={`scroll-reveal bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animation-delay-${(index + 1) * 200}`}
            >
              <CardContent className='p-6'>
                <div className='mb-4 flex items-center'>
                  <div
                    className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} font-bold text-white`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className='font-bold text-gray-900'>{testimonial.name}</div>
                    <div className='text-sm text-gray-600'>{testimonial.role}</div>
                  </div>
                </div>
                {renderStars()}
                <p className='text-gray-600 italic'>&ldquo;{testimonial.quote}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
