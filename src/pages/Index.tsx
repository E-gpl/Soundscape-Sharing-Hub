
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FeaturedArtists from '@/components/FeaturedArtists';
import NewReleases from '@/components/NewReleases';
import MusicPlayer from '@/components/MusicPlayer';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight } from 'lucide-react';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-56 w-96 h-96 bg-accent1 opacity-30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 -right-56 w-96 h-96 bg-accent2 opacity-20 rounded-full blur-3xl animate-blob"></div>
        </div>
        
        <div className="relative z-10 container px-4 md:px-6 text-center max-w-4xl animate-fade-in">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-harmonic-200/50 dark:bg-harmonic-800/30 text-harmonic-700 dark:text-harmonic-300 text-sm font-medium">
            Discover new independent artists
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-balance">
            Where Music Creators <br />
            Share Their Passion
          </h1>
          
          <p className="text-lg md:text-xl text-harmonic-600 dark:text-harmonic-300 mb-10 max-w-3xl mx-auto text-balance">
            Harmonic helps independent musicians share their creations with the world.
            Upload your tracks, build your audience, and connect with listeners who
            appreciate your unique sound.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="button-gradient">
              <Play className="mr-2 h-4 w-4" />
              Start Listening
            </Button>
            
            <Button size="lg" variant="outline">
              Upload Your Music
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="flex flex-col items-center animate-bounce">
            <div className="text-sm text-harmonic-500 mb-2">Scroll to explore</div>
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
      <div className="bg-harmonic-100 dark:bg-harmonic-900">
        <FeaturedArtists />
        <NewReleases />
        
        {/* Stats Section */}
        <section className="py-16 bg-white dark:bg-harmonic-800">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">10K+</h3>
                <p className="text-harmonic-500">Artists</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">50K+</h3>
                <p className="text-harmonic-500">Tracks</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">1M+</h3>
                <p className="text-harmonic-500">Listeners</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">6M+</h3>
                <p className="text-harmonic-500">Plays</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent1 opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent2 opacity-10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Ready to share your music?</h2>
            <p className="text-lg text-harmonic-600 dark:text-harmonic-300 mb-8 max-w-2xl mx-auto">
              Join thousands of independent artists who have found their audience on Harmonic.
              Start uploading your tracks today and connect with listeners worldwide.
            </p>
            
            <Button size="lg" className="button-gradient">
              Create Account
            </Button>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 border-t border-harmonic-200 dark:border-harmonic-700">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold">Harmonic</h2>
                <p className="text-sm text-harmonic-500">© 2023 Harmonic. All rights reserved.</p>
              </div>
              
              <div className="flex space-x-6">
                <a href="#" className="text-harmonic-500 hover:text-harmonic-900 transition-colors">
                  Terms
                </a>
                <a href="#" className="text-harmonic-500 hover:text-harmonic-900 transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-harmonic-500 hover:text-harmonic-900 transition-colors">
                  Help
                </a>
                <a href="#" className="text-harmonic-500 hover:text-harmonic-900 transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
};

export default Index;
