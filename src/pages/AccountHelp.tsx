
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Shield, Lock, KeyRound, AlertCircle, Settings, UserCircle, CreditCard, LifeBuoy } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const AccountHelp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Account Help</h1>
              <p className="text-lg text-harmonic-600 dark:text-harmonic-300 max-w-2xl mx-auto">
                Get assistance with your account settings, security, and profile management.
              </p>
            </div>
            
            <Separator className="mb-12" />
            
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold mb-6">Account Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card p-6 rounded-xl hover-scale">
                    <div className="bg-accent1/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserCircle className="h-8 w-8 text-accent1" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-3">Profile Settings</h3>
                    <p className="text-harmonic-500 text-center mb-4">
                      Update your personal information, profile picture, and bio.
                    </p>
                    <Button variant="outline" className="w-full" onClick={() => window.location.href = "/profile"}>
                      Manage Profile
                    </Button>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl hover-scale">
                    <div className="bg-accent2/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="h-8 w-8 text-accent2" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-3">Security</h3>
                    <p className="text-harmonic-500 text-center mb-4">
                      Manage password, two-factor authentication, and account recovery.
                    </p>
                    <Button variant="outline" className="w-full">
                      Security Settings
                    </Button>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl hover-scale">
                    <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-3">Billing</h3>
                    <p className="text-harmonic-500 text-center mb-4">
                      Manage subscriptions, payment methods, and billing history.
                    </p>
                    <Button variant="outline" className="w-full">
                      Billing Settings
                    </Button>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-6">Common Questions</h2>
                <div className="glass-card p-6 rounded-xl">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left font-medium">
                        How do I change my email address?
                      </AccordionTrigger>
                      <AccordionContent className="text-harmonic-600 dark:text-harmonic-300">
                        <p>To change your email address:</p>
                        <ol className="list-decimal pl-5 mt-2 space-y-1">
                          <li>Go to your Profile Settings</li>
                          <li>Click on "Account" tab</li>
                          <li>Under "Email Address", click "Edit"</li>
                          <li>Enter your new email address</li>
                          <li>Verify the new email using the link we'll send you</li>
                          <li>Once verified, your email will be updated</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left font-medium">
                        I forgot my password. How do I reset it?
                      </AccordionTrigger>
                      <AccordionContent className="text-harmonic-600 dark:text-harmonic-300">
                        <p>If you've forgotten your password:</p>
                        <ol className="list-decimal pl-5 mt-2 space-y-1">
                          <li>Go to the Sign In page</li>
                          <li>Click on "Forgot password?"</li>
                          <li>Enter the email address associated with your account</li>
                          <li>Check your email for a password reset link</li>
                          <li>Follow the link to create a new password</li>
                        </ol>
                        <p className="mt-2">Password reset links expire after 24 hours for security reasons.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left font-medium">
                        How do I delete my account?
                      </AccordionTrigger>
                      <AccordionContent className="text-harmonic-600 dark:text-harmonic-300">
                        <p>To delete your account:</p>
                        <ol className="list-decimal pl-5 mt-2 space-y-1">
                          <li>Go to your Profile Settings</li>
                          <li>Click on "Account" tab</li>
                          <li>Scroll to the bottom to find "Delete Account"</li>
                          <li>Click "Delete Account" and confirm your decision</li>
                        </ol>
                        <div className="bg-red-500/10 p-3 rounded-md mt-3">
                          <p className="text-red-600 dark:text-red-400 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>Warning: Account deletion is permanent and cannot be undone. All your uploaded content, playlists, and account data will be permanently removed.</span>
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left font-medium">
                        How can I change my username?
                      </AccordionTrigger>
                      <AccordionContent className="text-harmonic-600 dark:text-harmonic-300">
                        <p>To change your username:</p>
                        <ol className="list-decimal pl-5 mt-2 space-y-1">
                          <li>Go to your Profile Settings</li>
                          <li>Click on "Profile" tab</li>
                          <li>Find "Username" and click "Edit"</li>
                          <li>Enter your new desired username</li>
                          <li>Save your changes</li>
                        </ol>
                        <p className="mt-2">Note: Usernames must be unique across the platform. If your desired username is already taken, you'll need to choose a different one.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left font-medium">
                        How do I enable two-factor authentication?
                      </AccordionTrigger>
                      <AccordionContent className="text-harmonic-600 dark:text-harmonic-300">
                        <p>To enable two-factor authentication:</p>
                        <ol className="list-decimal pl-5 mt-2 space-y-1">
                          <li>Go to your Profile Settings</li>
                          <li>Click on "Security" tab</li>
                          <li>Find "Two-Factor Authentication" and click "Enable"</li>
                          <li>Choose your preferred method (authenticator app or SMS)</li>
                          <li>Follow the on-screen instructions to complete setup</li>
                        </ol>
                        <p className="mt-2">We strongly recommend using an authenticator app like Google Authenticator or Authy for enhanced security.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-6">Security & Privacy</h2>
                <div className="glass-card p-6 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <Shield className="h-6 w-6 text-accent1 mr-3" />
                        <h3 className="text-xl font-semibold">Account Security</h3>
                      </div>
                      <ul className="space-y-2 text-harmonic-600 dark:text-harmonic-300">
                        <li className="flex items-start">
                          <KeyRound className="h-4 w-4 text-accent1 mt-1 mr-2 flex-shrink-0" />
                          <span>Use a strong, unique password that you don't use elsewhere</span>
                        </li>
                        <li className="flex items-start">
                          <KeyRound className="h-4 w-4 text-accent1 mt-1 mr-2 flex-shrink-0" />
                          <span>Enable two-factor authentication for additional security</span>
                        </li>
                        <li className="flex items-start">
                          <KeyRound className="h-4 w-4 text-accent1 mt-1 mr-2 flex-shrink-0" />
                          <span>Regularly check your account for any unauthorized activity</span>
                        </li>
                        <li className="flex items-start">
                          <KeyRound className="h-4 w-4 text-accent1 mt-1 mr-2 flex-shrink-0" />
                          <span>Never share your login credentials with anyone</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="mt-4">
                        Security Settings
                      </Button>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-4">
                        <Settings className="h-6 w-6 text-accent2 mr-3" />
                        <h3 className="text-xl font-semibold">Privacy Controls</h3>
                      </div>
                      <ul className="space-y-2 text-harmonic-600 dark:text-harmonic-300">
                        <li className="flex items-start">
                          <KeyRound className="h-4 w-4 text-accent2 mt-1 mr-2 flex-shrink-0" />
                          <span>Control who can see your profile and activity</span>
                        </li>
                        <li className="flex items-start">
                          <KeyRound className="h-4 w-4 text-accent2 mt-1 mr-2 flex-shrink-0" />
                          <span>Manage email notification preferences</span>
                        </li>
                        <li className="flex items-start">
                          <KeyRound className="h-4 w-4 text-accent2 mt-1 mr-2 flex-shrink-0" />
                          <span>Control data sharing and analytics participation</span>
                        </li>
                        <li className="flex items-start">
                          <KeyRound className="h-4 w-4 text-accent2 mt-1 mr-2 flex-shrink-0" />
                          <span>Review and manage connected applications</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="mt-4">
                        Privacy Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="mt-12 glass-card p-8 rounded-xl text-center bg-gradient-to-r from-accent1/5 to-accent2/5">
              <h2 className="text-2xl font-semibold mb-4">Need Additional Help?</h2>
              <p className="text-harmonic-600 dark:text-harmonic-300 max-w-2xl mx-auto mb-6">
                If you couldn't find the answer to your question, our support team is ready to assist you.
              </p>
              <Button onClick={() => window.location.href = "/support-ticket"} className="button-gradient">
                <LifeBuoy className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountHelp;
