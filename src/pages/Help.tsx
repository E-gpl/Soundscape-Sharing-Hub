
import React from 'react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Info, Database, User, Music, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hasValidSupabaseCredentials } from '@/lib/supabase';

const Help = () => {
  const supabaseConfigured = hasValidSupabaseCredentials();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-harmonic-600 dark:text-harmonic-300 max-w-2xl mx-auto">
              Get answers to your questions about using Harmonic
            </p>
          </div>
          
          {!supabaseConfigured && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Supabase Configuration Required</AlertTitle>
              <AlertDescription>
                Your Supabase credentials are missing. Please see the "Setting Up Supabase" section below.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 hover-scale">
              <div className="flex items-center mb-4">
                <div className="bg-accent1/10 p-2 rounded-full mr-3">
                  <Database className="h-5 w-5 text-accent1" />
                </div>
                <h3 className="text-xl font-semibold">Database Setup</h3>
              </div>
              <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                Learn how to set up your database and configure Supabase credentials.
              </p>
              <Button variant="link" className="p-0 text-accent1" onClick={() => document.getElementById('supabase-setup')?.scrollIntoView({ behavior: 'smooth' })}>
                View Instructions
              </Button>
            </Card>
            
            <Card className="p-6 hover-scale">
              <div className="flex items-center mb-4">
                <div className="bg-accent2/10 p-2 rounded-full mr-3">
                  <User className="h-5 w-5 text-accent2" />
                </div>
                <h3 className="text-xl font-semibold">Account Management</h3>
              </div>
              <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                How to create and manage your Harmonic account, update your profile, and reset your password.
              </p>
              <Button variant="link" className="p-0 text-accent2" onClick={() => document.getElementById('account-management')?.scrollIntoView({ behavior: 'smooth' })}>
                View Instructions
              </Button>
            </Card>
            
            <Card className="p-6 hover-scale">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500/10 p-2 rounded-full mr-3">
                  <Music className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Uploading Music</h3>
              </div>
              <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                Learn how to upload your music, manage your tracks, and share them with the world.
              </p>
              <Button variant="link" className="p-0 text-blue-500" onClick={() => document.getElementById('uploading-music')?.scrollIntoView({ behavior: 'smooth' })}>
                View Instructions
              </Button>
            </Card>
            
            <Card className="p-6 hover-scale">
              <div className="flex items-center mb-4">
                <div className="bg-purple-500/10 p-2 rounded-full mr-3">
                  <HeartHandshake className="h-5 w-5 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold">Community Guidelines</h3>
              </div>
              <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                Our community guidelines ensure Harmonic remains a positive space for music creators and listeners.
              </p>
              <Button variant="link" className="p-0 text-purple-500" onClick={() => document.getElementById('community-guidelines')?.scrollIntoView({ behavior: 'smooth' })}>
                View Guidelines
              </Button>
            </Card>
          </div>
          
          <section id="supabase-setup" className="mb-12 scroll-m-24">
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <Database className="h-6 w-6 text-accent1 mr-3" />
                <h2 className="text-2xl font-bold">Setting Up Supabase</h2>
              </div>
              
              <div className="space-y-6">
                <p>
                  Harmonic uses Supabase for the backend infrastructure. To use all features of the application, you need to configure your Supabase credentials.
                </p>
                
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Environment Variables Required</AlertTitle>
                  <AlertDescription>
                    You'll need to set the following environment variables:
                  </AlertDescription>
                </Alert>
                
                <div className="bg-harmonic-100 dark:bg-harmonic-800 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm">
                    <code>
                      VITE_SUPABASE_URL=your_supabase_project_url<br />
                      VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
                    </code>
                  </pre>
                </div>
                
                <h3 className="text-xl font-semibold mt-6">Step-by-step Instructions</h3>
                
                <ol className="list-decimal list-inside space-y-4 pl-4">
                  <li>Create a Supabase account at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-accent1 hover:underline">supabase.com</a></li>
                  <li>Create a new project and note down the URL and anon/public key</li>
                  <li>Create a <code className="bg-harmonic-100 dark:bg-harmonic-800 px-1 py-0.5 rounded text-sm">.env</code> file in the root of your project</li>
                  <li>Add the environment variables with your Supabase credentials</li>
                  <li>Restart your development server</li>
                </ol>
                
                <p className="mt-4">
                  If you're deploying to production, make sure to set these environment variables in your hosting platform.
                </p>
              </div>
            </Card>
          </section>
          
          <section id="account-management" className="mb-12 scroll-m-24">
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-accent2 mr-3" />
                <h2 className="text-2xl font-bold">Account Management</h2>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="create-account">
                  <AccordionTrigger>How do I create an account?</AccordionTrigger>
                  <AccordionContent>
                    <p>To create an account:</p>
                    <ol className="list-decimal list-inside space-y-2 mt-2 pl-4">
                      <li>Click on "Sign Up" in the navigation bar</li>
                      <li>Fill in your name, email address, and password</li>
                      <li>Click "Create Account"</li>
                      <li>Check your email for a verification link</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="update-profile">
                  <AccordionTrigger>How do I update my profile?</AccordionTrigger>
                  <AccordionContent>
                    <p>To update your profile:</p>
                    <ol className="list-decimal list-inside space-y-2 mt-2 pl-4">
                      <li>Sign in to your account</li>
                      <li>Navigate to your Profile page by clicking on your avatar or "Profile" in the menu</li>
                      <li>Click "Edit Profile"</li>
                      <li>Update your information and click "Save Changes"</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="reset-password">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    <p>To reset your password:</p>
                    <ol className="list-decimal list-inside space-y-2 mt-2 pl-4">
                      <li>Go to the Sign In page</li>
                      <li>Click "Forgot Password"</li>
                      <li>Enter your email address</li>
                      <li>Check your email for a password reset link</li>
                      <li>Click the link and create a new password</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </section>
          
          <section id="uploading-music" className="mb-12 scroll-m-24">
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <Music className="h-6 w-6 text-blue-500 mr-3" />
                <h2 className="text-2xl font-bold">Uploading Music</h2>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="upload-track">
                  <AccordionTrigger>How do I upload a track?</AccordionTrigger>
                  <AccordionContent>
                    <p>To upload a track:</p>
                    <ol className="list-decimal list-inside space-y-2 mt-2 pl-4">
                      <li>Sign in to your account</li>
                      <li>Click "Upload" in the navigation bar</li>
                      <li>Fill in the track details (title, description, etc.)</li>
                      <li>Upload your audio file and cover art</li>
                      <li>Click "Upload Track"</li>
                    </ol>
                    <p className="mt-2">
                      Note: You must have an artist profile before uploading tracks. If you don't have one yet, you'll be prompted to create it.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="manage-tracks">
                  <AccordionTrigger>How do I manage my tracks?</AccordionTrigger>
                  <AccordionContent>
                    <p>To manage your tracks:</p>
                    <ol className="list-decimal list-inside space-y-2 mt-2 pl-4">
                      <li>Go to your Profile page</li>
                      <li>Navigate to the "My Tracks" section</li>
                      <li>Here you can view, edit, or delete your tracks</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="share-music">
                  <AccordionTrigger>How do I share my music?</AccordionTrigger>
                  <AccordionContent>
                    <p>To share your music:</p>
                    <ol className="list-decimal list-inside space-y-2 mt-2 pl-4">
                      <li>Navigate to the track you want to share</li>
                      <li>Click the "Share" button</li>
                      <li>Copy the link or share directly to social media</li>
                    </ol>
                    <p className="mt-2">
                      You can also share your artist profile page to let listeners discover all your music.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </section>
          
          <section id="community-guidelines" className="scroll-m-24">
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <HeartHandshake className="h-6 w-6 text-purple-500 mr-3" />
                <h2 className="text-2xl font-bold">Community Guidelines</h2>
              </div>
              
              <div className="space-y-4">
                <p>
                  At Harmonic, we believe in creating a positive and supportive community for music creators and listeners. 
                  Please follow these guidelines to ensure everyone has a great experience:
                </p>
                
                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-semibold text-lg">Respect Copyright</h3>
                    <p className="text-harmonic-600 dark:text-harmonic-300">
                      Only upload content you have created or have permission to use. Respect other artists' work and intellectual property.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">Be Kind and Supportive</h3>
                    <p className="text-harmonic-600 dark:text-harmonic-300">
                      Provide constructive feedback. Avoid hateful or offensive comments. Treat others with respect.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">No Harmful Content</h3>
                    <p className="text-harmonic-600 dark:text-harmonic-300">
                      Don't upload or share content that promotes hatred, violence, or discrimination. Keep Harmonic a safe space for everyone.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">Accurate Information</h3>
                    <p className="text-harmonic-600 dark:text-harmonic-300">
                      Provide accurate information about yourself and your music. Don't impersonate others or provide misleading details.
                    </p>
                  </div>
                </div>
                
                <p className="mt-4">
                  Violations of these guidelines may result in content removal or account suspension. If you see content that violates these guidelines, please report it.
                </p>
              </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Help;
