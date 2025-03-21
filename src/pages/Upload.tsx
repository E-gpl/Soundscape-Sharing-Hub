
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import MusicPlayer from '@/components/MusicPlayer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Upload as UploadIcon, 
  Image as ImageIcon, 
  Music,
  Check,
  AlertCircle,
  X,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const Upload = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [trackTitle, setTrackTitle] = useState('');
  const [trackDescription, setTrackDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  
  const [trackFile, setTrackFile] = useState<File | null>(null);
  const [trackPreview, setTrackPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  
  const trackInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);
  
  const handleTrackUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('audio/')) {
        toast.error('Please select an audio file');
        return;
      }
      
      setTrackFile(file);
      
      // Create URL for audio preview
      const url = URL.createObjectURL(file);
      setTrackPreview(url);
      
      // Auto-fill title from filename
      if (!trackTitle) {
        const fileName = file.name.replace(/\.[^/.]+$/, "");
        setTrackTitle(fileName);
      }
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      setCoverImage(file);
      
      // Create URL for image preview
      const url = URL.createObjectURL(file);
      setCoverPreview(url);
    }
  };
  
  const removeTrack = () => {
    setTrackFile(null);
    setTrackPreview(null);
    if (trackInputRef.current) {
      trackInputRef.current.value = '';
    }
  };
  
  const removeCover = () => {
    setCoverImage(null);
    setCoverPreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackFile) {
      toast.error('Please upload an audio file');
      return;
    }
    
    if (!trackTitle) {
      toast.error('Please enter a title for your track');
      return;
    }
    
    if (!user) {
      toast.error('You must be logged in to upload tracks');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      let coverUrl = '';
      let fileUrl = '';
      
      // Upload cover image if provided
      if (coverImage) {
        const coverFileName = `${Date.now()}_${coverImage.name}`;
        const { data: coverData, error: coverError } = await supabase.storage
          .from('covers')
          .upload(coverFileName, coverImage);
        
        if (coverError) {
          throw new Error(`Error uploading cover: ${coverError.message}`);
        }
        
        setUploadProgress(30);
        
        const { data: coverUrlData } = supabase.storage
          .from('covers')
          .getPublicUrl(coverFileName);
        
        coverUrl = coverUrlData.publicUrl;
      }
      
      setUploadProgress(50);
      
      // Upload audio file
      const audioFileName = `${Date.now()}_${trackFile.name}`;
      const { data: audioData, error: audioError } = await supabase.storage
        .from('audio')
        .upload(audioFileName, trackFile);
      
      if (audioError) {
        throw new Error(`Error uploading audio: ${audioError.message}`);
      }
      
      setUploadProgress(80);
      
      const { data: audioUrlData } = supabase.storage
        .from('audio')
        .getPublicUrl(audioFileName);
      
      fileUrl = audioUrlData.publicUrl;
      
      // Insert track record into database
      const { data, error } = await supabase
        .from('tracks')
        .insert({
          user_id: user.id,
          title: trackTitle,
          description: trackDescription,
          genre,
          file_url: fileUrl,
          cover_url: coverUrl,
          is_public: isPublic
        });
      
      if (error) {
        throw new Error(`Error creating track record: ${error.message}`);
      }
      
      setUploadProgress(100);
      toast.success('Track uploaded successfully!');
      
      // Navigate to profile after a short delay
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed: ' + (error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-32">
        <div className="container px-4 md:px-6 max-w-4xl animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Upload Your Music</h1>
            <p className="text-harmonic-500">Share your creations with the world</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Audio Upload */}
            <div className="space-y-3">
              <Label htmlFor="track-upload">Audio File</Label>
              
              {!trackFile ? (
                <div 
                  className="border-2 border-dashed border-harmonic-200 dark:border-harmonic-700 rounded-lg p-8 text-center hover:bg-harmonic-100 dark:hover:bg-harmonic-800/50 transition-colors cursor-pointer"
                  onClick={() => trackInputRef.current?.click()}
                >
                  <input
                    id="track-upload"
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    ref={trackInputRef}
                    onChange={handleTrackUpload}
                  />
                  
                  <div className="flex flex-col items-center gap-2">
                    <Music className="h-10 w-10 text-harmonic-400" />
                    <h3 className="font-medium">Drag and drop your audio file</h3>
                    <p className="text-sm text-harmonic-500">or click to browse</p>
                    <p className="text-xs text-harmonic-400 mt-2">Supported formats: MP3, WAV, FLAC, M4A</p>
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-harmonic-100 dark:bg-harmonic-800 p-2 rounded-md">
                          <Music className="h-6 w-6 text-harmonic-500" />
                        </div>
                        
                        <div>
                          <p className="font-medium">{trackFile.name}</p>
                          <p className="text-xs text-harmonic-500">
                            {(trackFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {trackPreview && (
                          <audio
                            controls
                            src={trackPreview}
                            className="h-8 w-40 md:w-60"
                          />
                        )}
                        
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={removeTrack}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Cover Image */}
            <div className="space-y-3">
              <Label htmlFor="cover-upload">Cover Image</Label>
              
              {!coverImage ? (
                <div 
                  className="border-2 border-dashed border-harmonic-200 dark:border-harmonic-700 rounded-lg p-6 text-center hover:bg-harmonic-100 dark:hover:bg-harmonic-800/50 transition-colors cursor-pointer"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <input
                    id="cover-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                  />
                  
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="h-8 w-8 text-harmonic-400" />
                    <h3 className="font-medium">Add a cover image</h3>
                    <p className="text-sm text-harmonic-500">Recommended size: 1400x1400px</p>
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {coverPreview && (
                          <img 
                            src={coverPreview} 
                            alt="Cover preview" 
                            className="h-16 w-16 object-cover rounded-md"
                          />
                        )}
                        
                        <div>
                          <p className="font-medium">{coverImage.name}</p>
                          <p className="text-xs text-harmonic-500">
                            {(coverImage.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={removeCover}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Track Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter track title"
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your track..."
                  rows={4}
                  value={trackDescription}
                  onChange={(e) => setTrackDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <select
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="electronic">Electronic</option>
                  <option value="pop">Pop</option>
                  <option value="hip-hop">Hip Hop</option>
                  <option value="rock">Rock</option>
                  <option value="jazz">Jazz</option>
                  <option value="classical">Classical</option>
                  <option value="ambient">Ambient</option>
                  <option value="indie">Indie</option>
                  <option value="folk">Folk</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  id="public"
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded border-harmonic-300 text-accent2 focus:ring-accent2"
                />
                <Label htmlFor="public" className="cursor-pointer">Make track public</Label>
              </div>
            </div>
            
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-harmonic-200 dark:bg-harmonic-700 rounded-full h-2">
                  <div 
                    className="bg-accent1 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              
              <Button type="submit" disabled={isUploading} className="button-gradient">
                {isUploading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Upload Track
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Upload;
