
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Send, LifeBuoy, CheckCircle } from 'lucide-react';

const SupportTicket = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.category || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Your support ticket has been submitted!', {
        description: 'We will get back to you as soon as possible.',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Support</h1>
              <p className="text-lg text-harmonic-600 dark:text-harmonic-300 max-w-2xl mx-auto">
                Submit a support ticket and our team will assist you as soon as possible.
              </p>
            </div>
            
            <Separator className="mb-12" />
            
            {submitted ? (
              <div className="glass-card p-8 rounded-xl text-center">
                <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Ticket Submitted Successfully!</h2>
                <p className="text-harmonic-600 dark:text-harmonic-300 mb-6">
                  Thank you for contacting us. We've received your support request and will respond to you soon at <span className="font-semibold">{formData.email}</span>.
                </p>
                <div className="bg-harmonic-100 dark:bg-harmonic-800 p-4 rounded-lg mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Ticket Reference:</span>
                    <span>#{Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Category:</span>
                    <span>{formData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Submitted On:</span>
                    <span>{new Date().toLocaleString()}</span>
                  </div>
                </div>
                <Button onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    category: '',
                    message: '',
                  });
                }} variant="outline">
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <div className="glass-card p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <LifeBuoy className="h-6 w-6 text-accent1 mr-3" />
                  <h2 className="text-2xl font-semibold">Support Ticket</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-11"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Briefly describe your issue"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={handleSelectChange}
                      required
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account">Account Issues</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="technical">Technical Problems</SelectItem>
                        <SelectItem value="upload">Upload Issues</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please provide as much detail as possible about your issue"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                    />
                  </div>
                  
                  <div className="bg-blue-500/10 p-4 rounded-lg text-sm text-harmonic-600 dark:text-harmonic-300">
                    <p>
                      <span className="font-medium text-blue-600 dark:text-blue-400">Note:</span> Our support team typically responds within 24-48 hours during business days.
                      For urgent matters, please include "URGENT" in your subject line.
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="button-gradient w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Ticket
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportTicket;
