
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

// Import pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Artist from './pages/Artist';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Documentation from './pages/Documentation';
import UploadGuides from './pages/UploadGuides';
import AccountHelp from './pages/AccountHelp';
import SupportTicket from './pages/SupportTicket';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/browse" element={<Navigate to="/search" replace />} />
                <Route path="/search" element={<Search />} />
                <Route path="/artist/:id" element={<Artist />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/help" element={<Help />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/upload-guides" element={<UploadGuides />} />
                <Route path="/account-help" element={<AccountHelp />} />
                <Route path="/support-ticket" element={<SupportTicket />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
