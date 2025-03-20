
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MusicPlayer from '@/components/MusicPlayer';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Music, Headphones, Users, Sparkles, Mic2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { checkSupabaseCredentials } from '@/lib/supabase';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Check if Supabase credentials are valid on initial load
    checkSupabaseCredentials();
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Animated background elements */}
          <div className="absolute top-1/4 -left-56 w-96 h-96 bg-accent1 opacity-30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 -right-56 w-96 h-96 bg-accent2 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500 opacity-15 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 container px-4 md:px-6 text-center max-w-4xl animate-fade-in">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-harmonic-200/50 dark:bg-harmonic-800/30 text-harmonic-700 dark:text-harmonic-300 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="inline-block w-4 h-4 mr-2 text-accent1" />
            发现独立音乐的世界
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-balance">
            音乐创作者的 <br />
            <span className="heading-gradient">数字舞台</span>
          </h1>
          
          <p className="text-lg md:text-xl text-harmonic-600 dark:text-harmonic-300 mb-10 max-w-3xl mx-auto text-balance">
            Harmonic 帮助独立音乐人向全世界分享他们的作品。
            上传您的音乐，建立您的听众群，与欣赏您独特声音的听众建立联系。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button 
                size="lg" 
                className="button-gradient group shadow-lg shadow-accent1/20"
                onClick={() => navigate('/upload')}
              >
                <Mic2 className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                上传音乐
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="button-gradient group shadow-lg shadow-accent1/20"
                onClick={() => navigate('/browse')}
              >
                <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                开始聆听
              </Button>
            )}
            
            {isAuthenticated ? (
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/80 dark:bg-harmonic-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-harmonic-800 transition-all duration-300"
                onClick={() => navigate('/profile')}
              >
                查看我的个人资料
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/80 dark:bg-harmonic-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-harmonic-800 transition-all duration-300"
                onClick={() => navigate('/sign-up')}
              >
                创建账号
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>
        
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="flex flex-col items-center animate-bounce">
            <div className="text-sm text-harmonic-500 mb-2">向下滚动探索更多</div>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-harmonic-400"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>
      
      {/* Content Sections */}
      <div className="bg-gradient-to-b from-harmonic-100 to-white dark:from-harmonic-900 dark:to-harmonic-800">
        {/* Features Section */}
        <section className="py-16 relative">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">为什么选择 Harmonic？</h2>
              <p className="text-harmonic-600 dark:text-harmonic-300 max-w-2xl mx-auto">
                我们提供创新工具，帮助音乐创作者在数字时代茁壮成长
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 text-center hover-scale">
                <div className="bg-accent1/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic2 className="h-8 w-8 text-accent1" />
                </div>
                <h3 className="text-xl font-semibold mb-3">简易上传</h3>
                <p className="text-harmonic-500">
                  只需几步，即可将您的音乐作品上传到我们的平台，轻松分享您的艺术创作
                </p>
              </div>
              
              <div className="glass-card p-6 text-center hover-scale">
                <div className="bg-accent2/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent2" />
                </div>
                <h3 className="text-xl font-semibold mb-3">建立听众</h3>
                <p className="text-harmonic-500">
                  连接热爱您音乐的听众，创建忠实粉丝群体，扩大您的音乐影响力
                </p>
              </div>
              
              <div className="glass-card p-6 text-center hover-scale">
                <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">深入分析</h3>
                <p className="text-harmonic-500">
                  获取详细的听众数据和播放统计，了解您的音乐在全球的影响力
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-50">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-accent1/5 to-transparent"></div>
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="glass-card p-6 text-center">
                <Music className="h-10 w-10 mx-auto mb-4 text-accent1" />
                <h3 className="text-4xl font-bold">10K+</h3>
                <p className="text-harmonic-500">音乐人</p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <Headphones className="h-10 w-10 mx-auto mb-4 text-accent2" />
                <h3 className="text-4xl font-bold">50K+</h3>
                <p className="text-harmonic-500">音乐作品</p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <Users className="h-10 w-10 mx-auto mb-4 text-blue-500" />
                <h3 className="text-4xl font-bold">1M+</h3>
                <p className="text-harmonic-500">听众</p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <Play className="h-10 w-10 mx-auto mb-4 text-purple-500" />
                <h3 className="text-4xl font-bold">6M+</h3>
                <p className="text-harmonic-500">播放次数</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-accent1/5"></div>
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent1 opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent2 opacity-10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
          </div>
          
          <div className="relative z-10 container px-4 md:px-6 text-center">
            <div className="glass-card p-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">准备好分享您的音乐了吗？</h2>
              <p className="text-lg text-harmonic-600 dark:text-harmonic-300 mb-8 max-w-2xl mx-auto">
                加入成千上万在 Harmonic 上找到听众的独立音乐人。
                今天开始上传您的音乐，与全球听众建立连接。
              </p>
              
              <Button 
                size="lg" 
                className="button-gradient shadow-lg shadow-accent1/20"
                onClick={() => navigate('/sign-up')}
              >
                创建账号
              </Button>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-10 border-t border-harmonic-200 dark:border-harmonic-700">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold heading-gradient mb-2">Harmonic</h2>
                <p className="text-sm text-harmonic-500">© 2023 Harmonic. 保留所有权利。</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6">
                <a href="#" className="text-harmonic-500 hover:text-harmonic-900 dark:hover:text-white transition-colors">
                  条款
                </a>
                <a href="#" className="text-harmonic-500 hover:text-harmonic-900 dark:hover:text-white transition-colors">
                  隐私
                </a>
                <a href="#" className="text-harmonic-500 hover:text-harmonic-900 dark:hover:text-white transition-colors">
                  帮助
                </a>
                <a href="#" className="text-harmonic-500 hover:text-harmonic-900 dark:hover:text-white transition-colors">
                  联系
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
