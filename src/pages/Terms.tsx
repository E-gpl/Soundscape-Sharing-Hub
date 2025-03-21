
import React from 'react';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl mt-16">
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
              Our service allows you to post, upload, and share content, including music and images. You retain ownership of all content you submit, but grant us a worldwide, non-exclusive license to use, reproduce, modify, and display the content in connection with operating and providing our services.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You are responsible for the content you upload, and it must not violate any copyright, trademark, or other intellectual property rights. We reserve the right to remove any content that violates these terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When using our service, you agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-gray-700 dark:text-gray-300">
              <li>Use the service for any illegal purpose or in violation of any laws</li>
              <li>Post or transmit content that infringes on copyright or other intellectual property rights</li>
              <li>Engage in any activity that could damage, disable, or impair the service</li>
              <li>Attempt to gain unauthorized access to any part of the service</li>
              <li>Use the service to distribute unsolicited promotional content</li>
              <li>Upload content that is offensive, harmful, or violates the rights of others</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In no event shall Harmonic, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We reserve the right to modify these terms at any time. We will provide notice of significant changes by posting an announcement on our website. Your continued use of the platform after such modifications constitutes your acceptance of the revised terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms, please contact us at support@harmonic.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
