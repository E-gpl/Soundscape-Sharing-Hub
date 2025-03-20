
import React from 'react';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <Separator className="mb-8" />
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to Harmonic. By accessing or using our service, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Accounts</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Content</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our service allows you to post, link, store, share and otherwise make available certain information, audio recordings, text, graphics, or other material. You are responsible for the content you upload.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By uploading content to Harmonic, you warrant that you have all necessary rights to distribute this content and that it doesn't violate any third-party rights or applicable laws.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Harmonic and its licensors. Our service is protected by copyright, trademark, and other laws.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Changes</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your responsibility to check our Terms periodically for changes.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms, please contact us at lhy3453069@gmail.com.
            </p>
          </section>
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500">
          Last updated: May 2025
        </div>
      </div>
    </div>
  );
};

export default Terms;
