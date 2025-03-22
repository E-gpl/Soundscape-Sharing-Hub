
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, Book, BookOpen, FileCode, Code, Download } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Documentation</h1>
              <p className="text-lg text-harmonic-600 dark:text-harmonic-300 max-w-2xl mx-auto">
                Comprehensive guides and resources to help you get the most out of Harmonic.
              </p>
            </div>
            
            <Separator className="mb-12" />
            
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card p-6 rounded-xl hover-scale">
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent1/10 w-12 h-12 rounded-full flex items-center justify-center">
                        <Book className="h-6 w-6 text-accent1" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Platform Overview</h3>
                        <p className="text-harmonic-500 mb-4">
                          Learn about Harmonic's features and how to navigate through the platform.
                        </p>
                        <Button variant="outline" className="w-full mt-2">Read Guide</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl hover-scale">
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent2/10 w-12 h-12 rounded-full flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-accent2" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">First Steps</h3>
                        <p className="text-harmonic-500 mb-4">
                          Create your account, complete your profile, and start interacting with the community.
                        </p>
                        <Button variant="outline" className="w-full mt-2">Read Guide</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">For Artists</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card p-6 rounded-xl hover-scale">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-500/10 w-12 h-12 rounded-full flex items-center justify-center">
                        <FileCode className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Music Upload</h3>
                        <p className="text-harmonic-500 mb-4">
                          Learn how to prepare and upload your music files for the best quality and reach.
                        </p>
                        <Button variant="outline" className="w-full mt-2" onClick={() => window.location.href = "/upload-guides"}>View Guidelines</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl hover-scale">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-500/10 w-12 h-12 rounded-full flex items-center justify-center">
                        <Code className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Artist Dashboard</h3>
                        <p className="text-harmonic-500 mb-4">
                          Master the tools and analytics available to track your music's performance.
                        </p>
                        <Button variant="outline" className="w-full mt-2">Read Documentation</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Technical Resources</h2>
                <div className="glass-card p-6 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">File Specifications</h3>
                      <ul className="space-y-2 text-harmonic-600 dark:text-harmonic-300">
                        <li className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-accent1" />
                          <span>Audio formats: MP3, WAV, FLAC, AAC</span>
                        </li>
                        <li className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-accent1" />
                          <span>Maximum file size: 50MB (free tier)</span>
                        </li>
                        <li className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-accent1" />
                          <span>Recommended bitrate: 320kbps</span>
                        </li>
                        <li className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-accent1" />
                          <span>Cover art: JPG/PNG, min 1400x1400px</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Downloads</h3>
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="mr-2 h-4 w-4" />
                          <span>Submission Guidelines (PDF)</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="mr-2 h-4 w-4" />
                          <span>Metadata Template (Excel)</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="mr-2 h-4 w-4" />
                          <span>Cover Art Templates (PSD)</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="mt-12 glass-card p-8 rounded-xl text-center bg-gradient-to-r from-accent1/5 to-accent2/5">
              <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
              <p className="text-harmonic-600 dark:text-harmonic-300 max-w-2xl mx-auto mb-6">
                If you need further assistance, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.location.href = "/account-help"} variant="outline">
                  Account Help
                </Button>
                <Button onClick={() => window.location.href = "/support-ticket"} className="button-gradient">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
