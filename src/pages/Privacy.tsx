
import React from 'react';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
            
            <Separator className="mb-8" />
            
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="pr-4 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    At Harmonic, we value your privacy and are committed to protecting your personal information. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                    you use our platform.
                  </p>
                  <h3 className="text-xl font-medium mb-2">Personal Information</h3>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    We may collect personal information that you voluntarily provide to us when you register on our 
                    platform, express interest in obtaining information about us or our products and services, participate 
                    in activities on the platform, or otherwise contact us.
                  </p>
                  <p className="text-harmonic-600 dark:text-harmonic-300">
                    This personal information may include:
                  </p>
                  <ul className="list-disc list-inside text-harmonic-600 dark:text-harmonic-300 ml-4 my-4 space-y-2">
                    <li>Name, email address, and contact information</li>
                    <li>Username and password</li>
                    <li>Profile information (biography, profile picture)</li>
                    <li>Music preferences and listening history</li>
                    <li>Content you upload (music, images, descriptions)</li>
                    <li>Payment information (when applicable)</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    We may use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc list-inside text-harmonic-600 dark:text-harmonic-300 ml-4 mb-4 space-y-2">
                    <li>Providing, maintaining, and improving our platform</li>
                    <li>Creating and maintaining your account</li>
                    <li>Processing transactions and managing uploads</li>
                    <li>Sending administrative information and updates</li>
                    <li>Responding to inquiries and providing customer support</li>
                    <li>Personalizing your experience on our platform</li>
                    <li>Analyzing usage patterns to improve our service</li>
                    <li>Protecting our platform and preventing fraud</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    We implement appropriate technical and organizational security measures designed to protect the security 
                    of any personal information we process. However, no electronic transmission over the internet or information 
                    storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, 
                    cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly 
                    collect, access, steal, or modify your information.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    Our platform may contain links to third-party websites and services that are not owned or controlled by Harmonic. 
                    We have no control over and assume no responsibility for the content, privacy policies, or practices of any 
                    third-party sites or services.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">5. Children's Privacy</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    Our platform is not intended for children under the age of 13. We do not knowingly collect personally identifiable 
                    information from children under 13. If you are a parent or guardian and you are aware that your child has provided 
                    us with personal information, please contact us so that we can take necessary actions.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    Depending on your location, you may have certain rights regarding your personal information, such as:
                  </p>
                  <ul className="list-disc list-inside text-harmonic-600 dark:text-harmonic-300 ml-4 mb-4 space-y-2">
                    <li>The right to access and receive a copy of your personal information</li>
                    <li>The right to rectify or update your personal information</li>
                    <li>The right to erase your personal information</li>
                    <li>The right to restrict processing of your personal information</li>
                    <li>The right to object to processing of your personal information</li>
                    <li>The right to data portability</li>
                    <li>The right to withdraw consent</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    We may update this privacy policy from time to time. The updated version will be indicated by an updated 
                    "Revised" date and the updated version will be effective as soon as it is accessible. We encourage you to 
                    review this privacy policy frequently to be informed of how we are protecting your information.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    If you have questions or comments about this policy, you may email us at privacy@harmonic.example.com or 
                    contact us via our contact form.
                  </p>
                </section>
                
                <div className="text-sm text-harmonic-500 pt-4 border-t border-harmonic-200 dark:border-harmonic-700">
                  <p>Last updated: March 21, 2025</p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
