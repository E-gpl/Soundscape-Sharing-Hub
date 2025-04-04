
# MusicArtistry Platform

## Introduction

MusicArtistry is a sophisticated web application designed specifically for musicians and artists to upload, manage, and showcase their musical creations. The platform provides a streamlined interface for artists to share their work with audiences worldwide, while offering robust playback functionality for listeners to enjoy music directly through their browsers.

## Live Website 🔗

Experience the platform now: https://soundscape-sharing-hub.lovable.app/

## Key Features

- **Artist Profiles**: Create personalized artist profiles with biographies and portfolio information
- **Music Uploads**: Seamless uploading of music files in various formats (MP3, WAV, FLAC)
- **Online Music Player**: High-quality audio playback with essential controls
- **Playlist Creation**: Ability to organize tracks into customized playlists
- **Responsive Design**: Optimized experience across desktop and mobile devices
- **Analytics Dashboard**: Insights into play counts and listener demographics

## Technology Stack

This application leverages modern web technologies to ensure optimal performance and developer experience:

- **Vite**: Next-generation frontend tooling for fast development and optimized builds
- **TypeScript**: Statically typed JavaScript for enhanced code reliability and maintainability
- **React**: Industry-standard library for building interactive user interfaces
- **shadcn-ui**: Premium UI components providing elegant, consistent design elements
- **Tailwind CSS**: Utility-first CSS framework enabling rapid styling and customization
- **Supabase**: Backend-as-a-service for authentication, database, and storage needs

## Development Setup

### Prerequisites
- Node.js & npm - [Installation guide with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Supabase Configuration
This application uses Supabase for backend functionality. To set it up:

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project and note down your project URL and anon/public key
3. Create an `.env.local` file in the project root with:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Restart your development server if it's already running

### Installation Process

```sh
# Clone the repository
git clone <YOUR_REPOSITORY_URL>

# Navigate to project directory
cd musicartistry

# Install dependencies
npm install

# Create .env.local file with Supabase credentials
# VITE_SUPABASE_URL=your_supabase_project_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start development server
npm run dev
```

## Development Workflow

Upon starting the development server, you can access the application at `http://localhost:5173` (or the designated port shown in your terminal).

The development environment includes:
- Hot module replacement for immediate visual feedback
- Comprehensive error reporting
- React Fast Refresh for component updates without losing state

## Production Deployment

```sh
# Generate production build
npm run build

# Test production build locally
npm run preview
```

## Deployment Options

### Netlify Deployment
For a streamlined deployment process via Netlify:

1. Push your codebase to GitHub
2. Connect your GitHub repository to Netlify
3. Configure deployment settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) in the Netlify dashboard

### Vercel Deployment
For deployment through Vercel:

1. Push your codebase to GitHub
2. Import your repository in Vercel dashboard
3. Deploy with default settings (Vercel automatically detects and configures Vite projects)
4. Add environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) in the Vercel dashboard

## Project Structure

```
/
├── public/           # Static assets and resources
├── src/
│   ├── components/   # React components (UI elements, player controls)
│   ├── contexts/     # React context providers (auth, theme)
│   ├── lib/          # Utility functions, hooks, and API services
│   ├── pages/        # Route components for different pages
│   ├── styles/       # Global and component-specific styles
│   ├── types/        # TypeScript type definitions
│   ├── App.tsx       # Application entry point
│   └── main.tsx      # React mounting and initialization
├── index.html        # HTML entry point
├── tsconfig.json     # TypeScript configuration
├── vite.config.ts    # Vite configuration
└── package.json      # Project dependencies and scripts
```

## Contributing

Contributions to enhance the platform are welcomed. Please review the contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for detailed terms and conditions.

## Contact

For questions, feedback, or support, please contact the author: lhy3453069@gmail.com

## Author
George Lu © 2025
