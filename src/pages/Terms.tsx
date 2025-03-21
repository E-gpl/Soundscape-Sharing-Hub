
import React from 'react';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
            
            <Separator className="mb-8" />
            
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="pr-4 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    By accessing or using Harmonic's platform, you agree to be bound by these Terms of Service. If you do not 
                    agree to all the terms and conditions, you may not access or use our services.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    Harmonic provides a platform for independent musicians to share their music with listeners worldwide. Our 
                    services allow musicians to upload, store, and distribute their original content, and allow listeners to 
                    discover and enjoy music.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    To access certain features of our platform, you must register for an account. You are responsible for 
                    maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                  </p>
                  <p className="text-harmonic-600 dark:text-harmonic-300">
                    You agree to:
                  </p>
                  <ul className="list-disc list-inside text-harmonic-600 dark:text-harmonic-300 ml-4 my-4 space-y-2">
                    <li>Provide accurate, current, and complete information during registration</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Keep your password secure and confidential</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>Be responsible for all activities that occur under your account</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    Our platform allows you to upload, share, and store content, including music, images, and text. By uploading 
                    content to our platform, you:
                  </p>
                  <ul className="list-disc list-inside text-harmonic-600 dark:text-harmonic-300 ml-4 mb-4 space-y-2">
                    <li>Retain all ownership rights to your content</li>
                    <li>Grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, adapt, distribute, and display your content for the purpose of providing our services</li>
                    <li>Represent and warrant that you own or have the necessary rights, licenses, and permissions to share your content</li>
                    <li>Understand that you are solely responsible for your content and the consequences of sharing it</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">5. Prohibited Conduct</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    You agree not to engage in any of the following activities:
                  </p>
                  <ul className="list-disc list-inside text-harmonic-600 dark:text-harmonic-300 ml-4 mb-4 space-y-2">
                    <li>Uploading content that infringes on intellectual property rights</li>
                    <li>Uploading harmful, obscene, or illegal content</li>
                    <li>Impersonating another person or entity</li>
                    <li>Using our platform for any illegal activity</li>
                    <li>Attempting to gain unauthorized access to our systems</li>
                    <li>Interfering with or disrupting our services</li>
                    <li>Collecting user information without their consent</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    The Harmonic platform, including all designs, text, graphics, logos, icons, images, audio clips, and software, 
                    is owned by us or our licensors and is protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    You are granted a limited, non-exclusive, non-transferable license to access and use our platform for personal, 
                    non-commercial purposes. This license does not allow you to:
                  </p>
                  <ul className="list-disc list-inside text-harmonic-600 dark:text-harmonic-300 ml-4 mb-4 space-y-2">
                    <li>Modify, copy, or create derivative works based on our platform</li>
                    <li>Use any data mining, robots, or similar data gathering methods</li>
                    <li>Download any portion of our platform except as expressly permitted</li>
                    <li>Remove any copyright or other proprietary notices</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    We may terminate or suspend your account and access to our platform at our sole discretion, without notice, 
                    for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, 
                    or for any other reason.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    To the maximum extent permitted by law, Harmonic and its affiliates, officers, employees, agents, partners, 
                    and licensors shall not be liable for any direct, indirect, incidental, special, consequential, or punitive 
                    damages, including loss of profits, data, or other intangible losses, resulting from:
                  </p>
                  <ul className="list-disc list-inside text-harmonic-600 dark:text-harmonic-300 ml-4 mb-4 space-y-2">
                    <li>Your access to or use of, or inability to access or use, our platform</li>
                    <li>Any conduct or content of any third party on our platform</li>
                    <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                    We reserve the right to modify these Terms of Service at any time. We will provide notice of significant 
                    changes by posting the updated terms on our platform. Your continued use of our platform after such changes 
                    constitutes your acceptance of the new terms.
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

export default Terms;
