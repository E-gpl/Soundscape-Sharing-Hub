
import React from 'react';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>
        <Separator className="mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-harmonic-100 dark:bg-harmonic-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Common Topics</h3>
                <ul className="space-y-2">
                  <li className="text-accent1 hover:underline cursor-pointer">Account Management</li>
                  <li className="text-accent1 hover:underline cursor-pointer">Uploading Music</li>
                  <li className="text-accent1 hover:underline cursor-pointer">Playback Issues</li>
                  <li className="text-accent1 hover:underline cursor-pointer">Privacy & Security</li>
                  <li className="text-accent1 hover:underline cursor-pointer">Billing</li>
                </ul>
              </div>
              
              <div className="bg-harmonic-100 dark:bg-harmonic-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Need More Help?</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Can't find the answer you're looking for? Reach out to our support team for more help.
                </p>
                <a href="/contact" className="text-accent2 hover:underline">Contact Support</a>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">How do I create an account?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    To create an account, click on the "Create Account" button on the homepage. You'll need to provide a valid email address and create a password. After you've filled out the registration form, click "Submit" and follow the verification instructions sent to your email.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">How do I upload my music?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    After logging in to your account, navigate to the "Upload" page from the main menu. You can drag and drop audio files directly into the upload area or click to browse your files. Supported formats include MP3, WAV, and FLAC with a maximum file size of 50MB per track.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">How can I edit my profile information?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    To edit your profile, click on your profile picture in the top right corner and select "Profile" from the dropdown menu. On your profile page, you'll find an "Edit Profile" button that allows you to update your bio, profile picture, and other information.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">Why can't I play certain tracks?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    There could be several reasons why you're experiencing playback issues:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>The track might be temporarily unavailable due to server issues</li>
                    <li>Your internet connection might be unstable</li>
                    <li>Your browser might need to be updated</li>
                    <li>You might need to clear your browser cache</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
                    If you continue to experience issues, please contact our support team.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">How do I set up Supabase for database functionality?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    To enable database functionality using Supabase, follow these steps:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      Create a Supabase account at <a href="https://supabase.com" className="text-accent1 hover:underline" target="_blank" rel="noopener noreferrer">https://supabase.com</a>
                    </li>
                    <li>Create a new project and note down your project URL and anon/public key</li>
                    <li>Create a file named <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">.env.local</code> in your project root</li>
                    <li>
                      Add the following lines to the file:
                      <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded mt-2 text-sm overflow-x-auto">
                        VITE_SUPABASE_URL=your_supabase_project_url<br />
                        VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
                      </pre>
                    </li>
                    <li>Restart your development server</li>
                  </ol>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                    For more detailed information, check out the <a href="https://supabase.com/docs" className="text-accent1 hover:underline" target="_blank" rel="noopener noreferrer">Supabase documentation</a>.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-6">Setting Up Environment Variables</h2>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4">How to Set Up Supabase Credentials</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  To enable database functionality, you need to set up Supabase credentials as environment variables:
                </p>
                
                <h4 className="font-medium mt-6 mb-2">For Development:</h4>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Create a <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">.env.local</code> file in the root of your project</li>
                  <li>
                    Add these lines to the file:
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded mt-2 text-sm overflow-x-auto">
                      VITE_SUPABASE_URL=your_supabase_project_url<br />
                      VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
                    </pre>
                  </li>
                  <li>Restart your development server with <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">npm run dev</code></li>
                </ol>
                
                <h4 className="font-medium mt-6 mb-2">For Production Deployment:</h4>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Add environment variables in your hosting platform (Netlify, Vercel, etc.)</li>
                  <li>Set the same variables: <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">VITE_SUPABASE_URL</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">VITE_SUPABASE_ANON_KEY</code></li>
                  <li>Redeploy your application</li>
                </ol>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Note:</strong> Never commit your <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">.env.local</code> file to version control. Make sure it's included in your <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">.gitignore</code> file.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
