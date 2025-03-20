
import React from 'react';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <Separator className="mb-8" />
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We collect information you provide directly to us when you create an account, upload content, or communicate with us. This may include your name, email address, profile information, and any audio or visual content you upload.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We also automatically collect certain information about your device and how you interact with our services, including IP address, browser type, referring/exit pages, operating system, and usage statistics.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Develop new products and services</li>
              <li>Monitor and analyze trends, usage, and activities</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Sharing of Information</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may share information about you as follows:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
              <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
              <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of us or others</li>
              <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
              <li>With your consent or at your direction</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Choices</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can access and update certain information about you from within your account settings. If you have any questions about accessing or updating your information, please contact us at lhy3453069@gmail.com.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the bottom of the policy and, in some cases, we may provide you with additional notice.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about this privacy policy, please contact us at lhy3453069@gmail.com.
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

export default Privacy;
