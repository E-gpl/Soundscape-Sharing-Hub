
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Upload as UploadIcon, Music, Image, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const GENRES = [
  "Electronic", "Pop", "Hip Hop", "R&B", "Rock", 
  "Jazz", "Classical", "Ambient", "Indie", "Folk"
];

const Upload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const audioInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  
  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check file type (audio)
      if (!file.type.startsWith('audio/')) {
        toast.error('Please select an audio file');
        return;
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be under 10MB');
        return;
      }
      
      setAudioFile(file);
    }
  };
  
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check file type (image)
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size must be under 2MB');
        return;
      }
      
      setCoverFile(file);
      
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setCoverPreview(objectUrl);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to upload music');
      navigate('/sign-in');
      return;
    }
    
    if (!title || !genre || !audioFile) {
      toast.error('Please fill in all required fields and upload an audio file');
      return;
    }
    
    setLoading(true);
    setUploadProgress(0);
    
    try {
      // 1. Upload audio file
      const audioFileName = `${user.id}-${Date.now()}-${audioFile.name}`;
      
      const { data: audioData, error: audioError } = await supabase.storage
        .from('music')
        .upload(audioFileName, audioFile, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = Math.round((progress.loaded / progress.total) * 50);
            setUploadProgress(percent); // First 50% of progress
          }
        });
      
      if (audioError) throw audioError;
      
      const { data: audioUrl } = supabase.storage
        .from('music')
        .getPublicUrl(audioFileName);
      
      // 2. Upload cover image if provided
      let coverUrl = null;
      if (coverFile) {
        const coverFileName = `${user.id}-${Date.now()}-${coverFile.name}`;
        
        const { data: coverData, error: coverError } = await supabase.storage
          .from('covers')
          .upload(coverFileName, coverFile, {
            cacheControl: '3600',
            upsert: false,
            onUploadProgress: (progress) => {
              const percent = 50 + Math.round((progress.loaded / progress.total) * 40);
              setUploadProgress(percent); // Next 40% of progress
            }
          });
        
        if (coverError) throw coverError;
        
        const { data: coverUrlData } = supabase.storage
          .from('covers')
          .getPublicUrl(coverFileName);
          
        coverUrl = coverUrlData.publicUrl;
      }
      
      // 3. Create track entry in database
      setUploadProgress(90); // Next 10% of progress
      
      const { data: track, error: trackError } = await supabase
        .from('tracks')
        .insert([
          {
            title,
            description,
            genre,
            audio_url: audioUrl.publicUrl,
            cover_url: coverUrl,
            user_id: user.id,
            created_at: new Date().toISOString(),
          }
        ])
        .select();
      
      if (trackError) throw trackError;
      
      setUploadProgress(100);
      
      toast.success('Track uploaded successfully!');
      
      // Reset form
      setTitle('');
      setDescription('');
      setGenre('');
      setAudioFile(null);
      setCoverFile(null);
      setCoverPreview(null);
      
      if (audioInputRef.current) audioInputRef.current.value = '';
      if (coverInputRef.current) coverInputRef.current.value = '';
      
      // Redirect to profile page
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
      
    } catch (error) {
      console.error('Error uploading track:', error);
      toast.error('Failed to upload track. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6 animate-fade-in max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Upload Your Music</h1>
            <p className="text-harmonic-500">Share your sound with listeners around the world</p>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Track Information</CardTitle>
                <CardDescription>
                  Fill in the details about your track to help listeners discover your music
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Audio Upload */}
                <div className="space-y-2">
                  <Label htmlFor="audio">Audio File <span className="text-destructive">*</span></Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => audioInputRef.current?.click()}>
                    <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <div className="text-lg font-medium">
                      {audioFile ? audioFile.name : 'Drag & drop or click to upload'}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      MP3, WAV or OGG. Max 10MB.
                    </p>
                    <Input 
                      id="audio" 
                      ref={audioInputRef}
                      type="file" 
                      accept="audio/*" 
                      className="hidden" 
                      onChange={handleAudioChange} 
                    />
                  </div>
                </div>
                
                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="cover">Cover Image</Label>
                  <div 
                    className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center h-48" 
                    onClick={() => coverInputRef.current?.click()}
                    style={{
                      backgroundImage: coverPreview ? `url(${coverPreview})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!coverPreview && (
                      <>
                        <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <div className="text-lg font-medium">
                          Upload cover image
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          JPG, PNG or GIF. Max 2MB.
                        </p>
                      </>
                    )}
                    <Input 
                      id="cover" 
                      ref={coverInputRef}
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleCoverChange} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                {/* Track Details */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
                    <Input 
                      id="title" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Name your track"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell listeners about your music (optional)"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre <span className="text-destructive">*</span></Label>
                    <Select value={genre} onValueChange={setGenre} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {GENRES.map((g) => (
                          <SelectItem key={g} value={g}>{g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Info Notice */}
                <div className="bg-muted p-4 rounded-lg flex gap-3">
                  <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-1">Important Information</p>
                    <p>
                      By uploading, you confirm that your sounds comply with our Terms of Use and you don't infringe anyone else's rights.
                    </p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={loading || !title || !genre || !audioFile}
                  className="min-w-32"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {uploadProgress < 100 ? `${uploadProgress}%` : 'Processing...'}
                    </>
                  ) : (
                    <>
                      <UploadIcon className="h-4 w-4 mr-2" />
                      Upload Track
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Upload;
