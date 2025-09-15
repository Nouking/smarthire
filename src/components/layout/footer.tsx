import { Brain, Twitter, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className='bg-gray-900 py-16 text-gray-300'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {/* Company Info */}
          <div>
            <div className='mb-6 flex items-center space-x-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700'>
                <Brain className='h-5 w-5 text-white' />
              </div>
              <span className='text-xl font-bold text-white'>SmartHire AI</span>
            </div>
            <p className='mb-6 text-gray-400'>
              Professional recruitment platform that makes hiring decisions smarter, faster, and
              completely free.
            </p>
            <div className='flex space-x-4'>
              <a
                href='https://twitter.com'
                className='text-gray-400 transition-colors hover:text-white'
                aria-label='Twitter'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Twitter className='h-5 w-5' />
              </a>
              <a
                href='https://linkedin.com'
                className='text-gray-400 transition-colors hover:text-white'
                aria-label='LinkedIn'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Linkedin className='h-5 w-5' />
              </a>
              <a
                href='https://github.com'
                className='text-gray-400 transition-colors hover:text-white'
                aria-label='GitHub'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Github className='h-5 w-5' />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className='mb-6 font-bold text-white'>Product</h4>
            <ul className='space-y-3'>
              <li>
                <a href='#features' className='text-gray-400 transition-colors hover:text-white'>
                  Features
                </a>
              </li>
              <li>
                <a href='/pricing' className='text-gray-400 transition-colors hover:text-white'>
                  Pricing
                </a>
              </li>
              <li>
                <a href='/api' className='text-gray-400 transition-colors hover:text-white'>
                  API
                </a>
              </li>
              <li>
                <a href='/integration' className='text-gray-400 transition-colors hover:text-white'>
                  Integration
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className='mb-6 font-bold text-white'>Company</h4>
            <ul className='space-y-3'>
              <li>
                <a href='/about' className='text-gray-400 transition-colors hover:text-white'>
                  About
                </a>
              </li>
              <li>
                <a href='/blog' className='text-gray-400 transition-colors hover:text-white'>
                  Blog
                </a>
              </li>
              <li>
                <a href='/careers' className='text-gray-400 transition-colors hover:text-white'>
                  Careers
                </a>
              </li>
              <li>
                <a href='#contact' className='text-gray-400 transition-colors hover:text-white'>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className='mb-6 font-bold text-white'>Support</h4>
            <ul className='space-y-3'>
              <li>
                <a href='/help' className='text-gray-400 transition-colors hover:text-white'>
                  Help Center
                </a>
              </li>
              <li>
                <a href='/docs' className='text-gray-400 transition-colors hover:text-white'>
                  Documentation
                </a>
              </li>
              <li>
                <a href='/privacy' className='text-gray-400 transition-colors hover:text-white'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='/terms' className='text-gray-400 transition-colors hover:text-white'>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row'>
          <p className='text-sm text-gray-400'>© 2024 SmartHire AI. All rights reserved.</p>
          <p className='mt-4 text-sm text-gray-400 md:mt-0'>
            Built with ❤️ for better hiring decisions
          </p>
        </div>
      </div>
    </footer>
  );
}
