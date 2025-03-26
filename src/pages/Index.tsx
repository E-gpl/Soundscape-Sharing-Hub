
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Music, Headphones, Users, Sparkles, Mic2, Info, Heart, Globe, Zap, FileMusic, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent } from '@/components/ui/card';
import Image from '@/components/ui/image';
import { getRandomMusicImage } from '@/lib/image-helper';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Get a few random music images
  const heroImage = getRandomMusicImage();
  const sectionImage = getRandomMusicImage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-56 w-96 h-96 bg-accent1 opacity-30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 -right-56 w-96 h-96 bg-accent2 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500 opacity-15 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 container px-4 md:px-6 text-center max-w-4xl animate-fade-in">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-harmonic-200/50 dark:bg-harmonic-800/30 text-harmonic-700 dark:text-harmonic-300 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="inline-block w-4 h-4 mr-2 text-accent1" />
            Discover the World of Independent Music
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-balance">
            A Digital Stage for <br />
            <span className="heading-gradient">Music Creators</span>
          </h1>
          
          <p className="text-lg md:text-xl text-harmonic-600 dark:text-harmonic-300 mb-10 max-w-3xl mx-auto text-balance">
            Harmonic helps independent musicians share their work with the world.
            Upload your music, build your audience, and connect with listeners who appreciate your unique sound.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button 
                size="lg" 
                className="button-gradient group shadow-lg shadow-accent1/20"
                onClick={() => navigate('/upload')}
              >
                <Upload className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Upload Music
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="button-gradient group shadow-lg shadow-accent1/20"
                onClick={() => navigate('/search')}
              >
                <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Start Listening
              </Button>
            )}
            
            {isAuthenticated ? (
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/80 dark:bg-harmonic-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-harmonic-800 transition-all duration-300"
                onClick={() => navigate('/profile')}
              >
                View My Profile
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/80 dark:bg-harmonic-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-harmonic-800 transition-all duration-300"
                onClick={() => navigate('/sign-up')}
              >
                Create Account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>
        
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="flex flex-col items-center animate-bounce">
            <div className="text-sm text-harmonic-500 mb-2">Scroll down to explore</div>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-harmonic-400"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>
      
      {/* Content Sections */}
      <div className="bg-gradient-to-b from-harmonic-100 to-white dark:from-harmonic-900 dark:to-harmonic-800">
        {/* Features Section */}
        <section className="py-16 relative">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Harmonic?</h2>
              <p className="text-harmonic-600 dark:text-harmonic-300 max-w-2xl mx-auto">
                We provide innovative tools to help music creators thrive in the digital age
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 text-center hover-scale">
                <div className="bg-accent1/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic2 className="h-8 w-8 text-accent1" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy Uploads</h3>
                <p className="text-harmonic-500">
                  Upload your music to our platform in just a few steps, making it simple to share your artistic creations
                </p>
              </div>
              
              <div className="glass-card p-6 text-center hover-scale">
                <div className="bg-accent2/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent2" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Build an Audience</h3>
                <p className="text-harmonic-500">
                  Connect with listeners who love your music, create a loyal fanbase, and expand your musical influence
                </p>
              </div>
              
              <div className="glass-card p-6 text-center hover-scale">
                <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Detailed Analytics</h3>
                <p className="text-harmonic-500">
                  Get detailed listener data and play statistics to understand your music's impact around the world
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Music Matters Section */}
        <section className="py-16 relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Music Connects Us All</h2>
                <p className="text-lg text-harmonic-600 dark:text-harmonic-300 mb-6">
                  Music is a universal language that transcends borders, cultures, and backgrounds. Independent artists create authentic sounds that push boundaries and inspire listeners worldwide.
                </p>
                <p className="text-lg text-harmonic-600 dark:text-harmonic-300 mb-6">
                  At Harmonic, we believe in the power of independent music to create meaningful connections and emotional experiences. Our platform is designed to amplify these voices.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="flex items-center">
                    <div className="bg-accent1/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <Heart className="h-5 w-5 text-accent1" />
                    </div>
                    <p className="font-medium">Support artists directly</p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-accent2/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <Globe className="h-5 w-5 text-accent2" />
                    </div>
                    <p className="font-medium">Global reach</p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-500/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <Zap className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="font-medium">Discover new sounds</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-64 h-64 bg-accent1/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
                  <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-accent2/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
                  <Image 
                    src={sectionImage}
                    alt="Person enjoying music" 
                    className="rounded-2xl shadow-2xl relative z-10 w-full max-w-md mx-auto"
                    fallbackSrc="/placeholder.svg"
                    aspectRatio="16:9"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-accent1/5"></div>
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent1 opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent2 opacity-10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
          </div>
          
          <div className="relative z-10 container px-4 md:px-6 text-center">
            <div className="glass-card p-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Ready to Share Your Music?</h2>
              <p className="text-lg text-harmonic-600 dark:text-harmonic-300 mb-8 max-w-2xl mx-auto">
                Join thousands of independent musicians who have found their audience on Harmonic.
                Start uploading your music and connect with listeners around the world today.
              </p>
              
              {isAuthenticated ? (
                <Button 
                  size="lg" 
                  className="button-gradient shadow-lg shadow-accent1/20"
                  onClick={() => navigate('/upload')}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Music
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="button-gradient shadow-lg shadow-accent1/20"
                  onClick={() => navigate('/sign-up')}
                >
                  Create Account
                </Button>
              )}
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-10 border-t border-harmonic-200 dark:border-harmonic-700">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold heading-gradient mb-2">Harmonic</h2>
                <p className="text-sm text-harmonic-500">© 2025 Harmonic. All rights reserved.</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6">
                <a href="/terms" className="text-harmonic-500 hover:text-harmonic-900 dark:hover:text-white transition-colors">
                  Terms
                </a>
                <a href="/privacy" className="text-harmonic-500 hover:text-harmonic-900 dark:hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="/help" className="text-harmonic-500 hover:text-harmonic-900 dark:hover:text-white transition-colors">
                  Help
                </a>
                <a href="/contact" className="text-harmonic-500 hover:text-harmonic-900 dark:hover:text-white transition-colors">
                  Contact
                </a>
                <a href="/feedback" className="text-harmonic-500 hover:text-harmonic-900 dark:hover:text-white transition-colors">
                  Feedback
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
