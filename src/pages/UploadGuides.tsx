
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Upload, Music, FileText, Image, Clock, Tag, Play, BookOpen, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const UploadGuides = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Upload Guides</h1>
              <p className="text-lg text-harmonic-600 dark:text-harmonic-300 max-w-2xl mx-auto">
                Learn how to prepare and upload your music to get the best results on Harmonic.
              </p>
            </div>
            
            <Separator className="mb-12" />
            
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold mb-6">Step-by-Step Upload Process</h2>
                <div className="glass-card p-6 rounded-xl">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent1/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-accent1">1</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Prepare Your Files</h3>
                        <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                          Ensure your audio files meet our quality standards and your artwork is properly formatted before uploading.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-harmonic-100 dark:bg-harmonic-800 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Music className="h-5 w-5 text-accent1 mr-2" />
                              <span className="font-medium">Audio Requirements</span>
                            </div>
                            <ul className="space-y-1 text-sm text-harmonic-600 dark:text-harmonic-300">
                              <li>• Formats: MP3, WAV, FLAC, AAC</li>
                              <li>• Bitrate: Minimum 192kbps, recommended 320kbps</li>
                              <li>• File size: Maximum 50MB per track (free tier)</li>
                              <li>• Sample rate: 44.1kHz or higher</li>
                            </ul>
                          </div>
                          <div className="bg-harmonic-100 dark:bg-harmonic-800 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Image className="h-5 w-5 text-accent2 mr-2" />
                              <span className="font-medium">Artwork Requirements</span>
                            </div>
                            <ul className="space-y-1 text-sm text-harmonic-600 dark:text-harmonic-300">
                              <li>• Format: JPG/PNG</li>
                              <li>• Size: Minimum 1400x1400 pixels</li>
                              <li>• Aspect ratio: 1:1 (square)</li>
                              <li>• File size: Maximum 2MB</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent2/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-accent2">2</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Add Metadata</h3>
                        <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                          Complete all relevant metadata fields to help listeners discover your music and understand your work.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                          <div className="bg-harmonic-100 dark:bg-harmonic-800 p-3 rounded-lg">
                            <div className="flex items-center mb-1">
                              <FileText className="h-4 w-4 text-blue-500 mr-2" />
                              <span className="font-medium">Basic Info</span>
                            </div>
                            <p className="text-xs text-harmonic-600 dark:text-harmonic-300">
                              Title, artist, composer, lyrics
                            </p>
                          </div>
                          <div className="bg-harmonic-100 dark:bg-harmonic-800 p-3 rounded-lg">
                            <div className="flex items-center mb-1">
                              <Tag className="h-4 w-4 text-purple-500 mr-2" />
                              <span className="font-medium">Classification</span>
                            </div>
                            <p className="text-xs text-harmonic-600 dark:text-harmonic-300">
                              Genre, mood, instruments
                            </p>
                          </div>
                          <div className="bg-harmonic-100 dark:bg-harmonic-800 p-3 rounded-lg">
                            <div className="flex items-center mb-1">
                              <Clock className="h-4 w-4 text-green-500 mr-2" />
                              <span className="font-medium">Release Info</span>
                            </div>
                            <p className="text-xs text-harmonic-600 dark:text-harmonic-300">
                              Release date, year, album
                            </p>
                          </div>
                          <div className="bg-harmonic-100 dark:bg-harmonic-800 p-3 rounded-lg">
                            <div className="flex items-center mb-1">
                              <Play className="h-4 w-4 text-orange-500 mr-2" />
                              <span className="font-medium">Playback</span>
                            </div>
                            <p className="text-xs text-harmonic-600 dark:text-harmonic-300">
                              BPM, key, explicit flag
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-500/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-blue-500">3</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Upload and Submit</h3>
                        <p className="text-harmonic-600 dark:text-harmonic-300 mb-4">
                          Upload your files to our platform and review all information before final submission.
                        </p>
                        <Button className="button-gradient mt-2" onClick={() => window.location.href = "/upload"}>
                          <Upload className="mr-2 h-4 w-4" />
                          Go to Upload Page
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-6">Best Practices</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="glass-card mb-4 rounded-xl overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center">
                        <div className="bg-accent1/10 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                          <BookOpen className="h-4 w-4 text-accent1" />
                        </div>
                        <span className="font-semibold">Quality Optimization Tips</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="pl-11">
                        <ul className="space-y-2 text-harmonic-600 dark:text-harmonic-300">
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-accent1 mt-1 mr-2 flex-shrink-0" />
                            <span>Master your audio at -14 LUFS for optimal streaming playback</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-accent1 mt-1 mr-2 flex-shrink-0" />
                            <span>Ensure your file doesn't have clipping or distortion</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-accent1 mt-1 mr-2 flex-shrink-0" />
                            <span>Use high-quality original artwork that represents your music style</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-accent1 mt-1 mr-2 flex-shrink-0" />
                            <span>Leave at least 2 seconds of silence at the end of your track</span>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="glass-card mb-4 rounded-xl overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center">
                        <div className="bg-accent2/10 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                          <Tag className="h-4 w-4 text-accent2" />
                        </div>
                        <span className="font-semibold">Metadata Best Practices</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="pl-11">
                        <ul className="space-y-2 text-harmonic-600 dark:text-harmonic-300">
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-accent2 mt-1 mr-2 flex-shrink-0" />
                            <span>Be consistent with artist name spelling across all your releases</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-accent2 mt-1 mr-2 flex-shrink-0" />
                            <span>Use specific genres rather than broad categories</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-accent2 mt-1 mr-2 flex-shrink-0" />
                            <span>Include mood tags to help with playlist placement</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-accent2 mt-1 mr-2 flex-shrink-0" />
                            <span>If your track features other artists, include them in the appropriate field</span>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="glass-card mb-4 rounded-xl overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center">
                        <div className="bg-blue-500/10 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                          <Upload className="h-4 w-4 text-blue-500" />
                        </div>
                        <span className="font-semibold">Promotional Strategy</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="pl-11">
                        <ul className="space-y-2 text-harmonic-600 dark:text-harmonic-300">
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                            <span>Time your release with social media announcements</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                            <span>Share your Harmonic links across all your platforms</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                            <span>Engage with the Harmonic community by liking and commenting on other artists' work</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                            <span>Consider releasing singles before a full album to build anticipation</span>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            </div>
            
            <div className="mt-12 glass-card p-8 rounded-xl text-center bg-gradient-to-r from-accent1/5 to-accent2/5">
              <h2 className="text-2xl font-semibold mb-4">Ready to Upload Your Music?</h2>
              <p className="text-harmonic-600 dark:text-harmonic-300 max-w-2xl mx-auto mb-6">
                Now that you know the best practices, it's time to share your music with the world.
              </p>
              <Button onClick={() => window.location.href = "/upload"} className="button-gradient">
                <Upload className="mr-2 h-4 w-4" />
                Go to Upload Page
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadGuides;
