
import React, { useState } from 'react';
import Header from '@/components/Header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Search, Music, Upload, UserCircle, HelpCircle, FileText, Play, PlusCircle } from 'lucide-react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would go here
    console.log(`Searching for: ${searchQuery}`);
  };
  
  const generalFaqs = [
    {
      question: "What is Harmonic?",
      answer: "Harmonic is a digital platform designed for independent musicians to share their music with the world. We provide tools for uploading, distributing, and promoting your original music while helping listeners discover new artists and tracks."
    },
    {
      question: "Is Harmonic free to use?",
      answer: "Yes, Harmonic offers a free tier that allows users to upload music, create profiles, and connect with listeners. We also offer premium options with additional features for artists who want to expand their reach."
    },
    {
      question: "How do I create an account?",
      answer: "Creating an account is simple. Click the 'Sign Up' button in the top right corner of the page, enter your details, verify your email address, and you're ready to start using Harmonic."
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account at any time. Go to your profile settings, scroll to the bottom, and click on 'Delete Account'. Please note that this action will permanently remove all your content and cannot be undone."
    },
    {
      question: "How can I contact support?",
      answer: "For support inquiries, please visit our Contact page or email us directly at support@harmonic.example.com. Our support team is available Monday through Friday, 9AM to 6PM ET."
    }
  ];
  
  const artistFaqs = [
    {
      question: "How do I upload my music?",
      answer: "To upload your music, sign in to your account, navigate to the Upload page, and follow the prompts. You can upload audio files in .mp3, .wav, or .flac formats, add cover art, and include details about your track."
    },
    {
      question: "What audio file formats are supported?",
      answer: "Harmonic supports the following audio formats: MP3, WAV, FLAC, AAC, AIFF, and OGG. Files must be less than 50MB for the free tier, while premium users can upload files up to 250MB."
    },
    {
      question: "Can I edit or remove my uploaded tracks?",
      answer: "Yes, you can edit or remove your tracks at any time. Go to your profile, find the track you want to modify, and use the edit or delete options. Note that if your track has been shared or added to playlists, removing it will also remove it from those locations."
    },
    {
      question: "How can I promote my music on Harmonic?",
      answer: "You can promote your music by completing your profile, adding high-quality cover art, using appropriate tags, sharing your tracks on social media directly from Harmonic, and engaging with the community by following other artists and leaving comments."
    },
    {
      question: "Do I retain rights to my music?",
      answer: "Yes, you retain all rights to your original music. By uploading to Harmonic, you grant us a license to host and distribute your content on our platform, but you remain the copyright holder."
    }
  ];
  
  const listenerFaqs = [
    {
      question: "How do I find new music?",
      answer: "Discover new music through our Browse page, which features curated playlists, trending tracks, and new releases. You can also use the Search function to find specific artists or genres, or let our recommendation engine suggest music based on your listening history."
    },
    {
      question: "Can I create playlists?",
      answer: "Yes, you can create, edit, and share playlists. Click on the '+' button next to any track to add it to a new or existing playlist. Your playlists can be private or public, allowing you to share them with friends or the Harmonic community."
    },
    {
      question: "How does the recommendation system work?",
      answer: "Our recommendation system analyzes your listening habits, liked tracks, and playlists to suggest music you might enjoy. The more you interact with the platform, the more personalized your recommendations become."
    },
    {
      question: "Can I download music from Harmonic?",
      answer: "Downloading capabilities depend on the artist's preferences. Some artists allow their tracks to be downloaded, while others only permit streaming. Look for the download icon on tracks that are available for download."
    },
    {
      question: "How can I support my favorite artists?",
      answer: "Support your favorite artists by following them, adding their tracks to your playlists, sharing their music on social media, and engaging with their content through comments and likes. This increases their visibility on the platform."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
              <p className="text-lg text-harmonic-600 dark:text-harmonic-300 max-w-2xl mx-auto">
                Find answers to common questions and learn how to get the most out of Harmonic.
              </p>
              
              <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-harmonic-500" />
                  <Input
                    type="search"
                    placeholder="Search for answers..."
                    className="pl-10 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="button-gradient h-12">Search</Button>
              </form>
            </div>
            
            <Separator className="mb-12" />
            
            <Tabs defaultValue="general" className="mb-12">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
                <TabsTrigger value="general" className="data-[state=active]:bg-accent1/10 data-[state=active]:text-accent1 dark:data-[state=active]:bg-accent1/20">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger value="artists" className="data-[state=active]:bg-accent2/10 data-[state=active]:text-accent2 dark:data-[state=active]:bg-accent2/20">
                  <Music className="h-4 w-4 mr-2" />
                  For Artists
                </TabsTrigger>
                <TabsTrigger value="listeners" className="data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500 dark:data-[state=active]:bg-blue-500/20">
                  <Play className="h-4 w-4 mr-2" />
                  For Listeners
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="mt-0">
                <div className="glass-card p-6 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-6">General Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {generalFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-harmonic-600 dark:text-harmonic-300">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="artists" className="mt-0">
                <div className="glass-card p-6 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-6">For Artists</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {artistFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-harmonic-600 dark:text-harmonic-300">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="listeners" className="mt-0">
                <div className="glass-card p-6 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-6">For Listeners</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {listenerFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-harmonic-600 dark:text-harmonic-300">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="glass-card p-6 rounded-xl text-center hover-scale">
                <div className="bg-accent1/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-accent1" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Documentation</h3>
                <p className="text-harmonic-500 mb-4">
                  Explore our comprehensive guides and tutorials for both artists and listeners.
                </p>
                <Button variant="outline" className="w-full">View Documents</Button>
              </div>
              
              <div className="glass-card p-6 rounded-xl text-center hover-scale">
                <div className="bg-accent2/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-accent2" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Upload Guides</h3>
                <p className="text-harmonic-500 mb-4">
                  Learn how to upload and manage your music with our step-by-step tutorials.
                </p>
                <Button variant="outline" className="w-full">View Guides</Button>
              </div>
              
              <div className="glass-card p-6 rounded-xl text-center hover-scale">
                <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCircle className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Account Help</h3>
                <p className="text-harmonic-500 mb-4">
                  Get assistance with account settings, privacy, and security features.
                </p>
                <Button variant="outline" className="w-full">Get Help</Button>
              </div>
            </div>
            
            <div className="glass-card p-8 rounded-xl text-center bg-gradient-to-r from-accent1/5 to-accent2/5">
              <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
              <p className="text-harmonic-600 dark:text-harmonic-300 max-w-2xl mx-auto mb-6">
                If you couldn't find the answer you were looking for, our support team is here to help.
                Reach out and we'll get back to you as soon as possible.
              </p>
              <Button className="button-gradient">Contact Support</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Help;
