'use client';

import { Brain, Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export function MainNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <nav className='flex h-16 items-center justify-between lg:h-20'>
          {/* Logo */}
          <div className='flex items-center space-x-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700'>
              <Brain className='h-5 w-5 text-white' />
            </div>
            <span className='text-xl font-bold text-gray-900'>SmartHire AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href='#features'
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'font-medium text-gray-600 transition-colors hover:text-gray-900'
                    )}
                  >
                    Features
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href='#testimonials'
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'font-medium text-gray-600 transition-colors hover:text-gray-900'
                    )}
                  >
                    Testimonials
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href='#pricing'
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'font-medium text-gray-600 transition-colors hover:text-gray-900'
                    )}
                  >
                    Pricing
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href='#contact'
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'font-medium text-gray-600 transition-colors hover:text-gray-900'
                    )}
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Buttons */}
          <div className='flex items-center space-x-4'>
            <Button
              variant='ghost'
              className='hidden font-medium text-gray-600 transition-colors hover:text-gray-900 sm:flex'
            >
              Sign In
            </Button>
            <Button className='flex items-center gap-2'>
              Get Started
              <ArrowRight className='h-4 w-4' />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className='p-2 md:hidden' onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X className='h-6 w-6 text-gray-600' />
            ) : (
              <Menu className='h-6 w-6 text-gray-600' />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='border-t border-gray-200 bg-white md:hidden'>
          <div className='container mx-auto space-y-4 px-4 py-4 sm:px-6'>
            <a
              href='#features'
              className='block font-medium text-gray-600 hover:text-gray-900'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href='#testimonials'
              className='block font-medium text-gray-600 hover:text-gray-900'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href='#pricing'
              className='block font-medium text-gray-600 hover:text-gray-900'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href='#contact'
              className='block font-medium text-gray-600 hover:text-gray-900'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <button className='w-full text-left font-medium text-gray-600 hover:text-gray-900'>
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
