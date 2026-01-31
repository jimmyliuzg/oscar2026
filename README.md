# 2026 Oscars Nominations and Predictions

A modern, mobile-first web application for hosting an engaging Oscars party experience. Features password-protected party invitations, complete 2026 Oscar nominations with rich media, and an interactive voting system.

## Features

- 🔐 **Dual Password System** - Guest access for party details, public access for nominations/voting (server-side validation)
- 🎬 **Full Nominations Browser** - All 24 Oscar categories with trailers and posters
- 🗳️ **Interactive Voting** - Full-screen voting experience for predictions
- 📱 **Mobile-First Design** - Responsive and touch-friendly
- 🎨 **Beautiful Design** - Warm, glamorous aesthetic with golden accents
- 🔒 **Secure** - Password hashes never exposed to client-side code

## Tech Stack

- **Astro 5** with server-side rendering
- **React 18** with TypeScript for interactive components
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hook Form** for forms
- **Web3Forms** for form submissions
- **OMDb API** for movie posters
- **Cloudflare Pages** for deployment

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server will start at `http://localhost:4321/`

### Environment Variables

Create a `.env.local` file with:

```env
# Server-side only (never exposed to client)
GUEST_PASSWORD_HASH=your_sha256_hash_here
PUBLIC_PASSWORD_HASH=your_sha256_hash_here

# Public variables (accessible on client-side)
PUBLIC_WEB3FORMS_ACCESS_KEY=your_key_here
PUBLIC_OMDB_API_KEY=your_omdb_key_here
```

> **Important**: In Astro, environment variables without the `PUBLIC_` prefix are server-side only and never exposed to the client bundle. This keeps your password hashes secure.

#### Generating Password Hashes

To generate SHA-256 hashes for your passwords, use the terminal:

```bash
# macOS/Linux
echo -n "your_password" | shasum -a 256

# Example output:
# d610dd4971f71ed75688f7014046f69b7f3bdcec898ca3eb7d4d821dff9b789f
```

Or use this JavaScript snippet in a browser console:

```javascript
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Example:
hashPassword('oscar2026').then(console.log);
```

## Deployment to Cloudflare Pages

### Setup Steps

1. **Push to GitHub** - Commit and push your changes to GitHub

2. **Connect Repository**
   - Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/)
   - Click "Create a project" → "Connect to Git"
   - Select your repository

3. **Configure Build Settings**
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `22` (or latest LTS)

4. **Add Environment Variables**
   - In Cloudflare Pages project settings → Environment variables
   - Add the following variables for **Production** and **Preview** environments:

   ```
   GUEST_PASSWORD_HASH=<your_sha256_hash>
   PUBLIC_PASSWORD_HASH=<your_sha256_hash>
   PUBLIC_WEB3FORMS_ACCESS_KEY=<your_web3forms_key>
   PUBLIC_OMDB_API_KEY=<your_omdb_key>
   ```

5. **Deploy** - Cloudflare will automatically build and deploy your site

### Security Notes

✅ **What's Secure:**
- Password hashes are only stored on the server (no `PUBLIC_` prefix)
- Client-side code never sees password hashes
- Authentication happens via server-side API endpoint (`/api/auth/login`)
- `.env.local` is gitignored and never committed

⚠️ **Before Going Public:**
- Use strong, unique passwords
- Generate new password hashes
- Never commit `.env` or `.env.local` files to Git
- Keep your Web3Forms and OMDb API keys private

## Project Structure

```
src/
├── components/
│   ├── auth/          # Password gate
│   ├── layout/        # Header, Footer
│   ├── nominations/   # Category list, cards, carousel
│   ├── party/         # Invite details, RSVP form
│   └── voting/        # Voting slides and forms
├── context/           # Auth and voting state
├── data/              # Nominations data
├── layouts/           # Astro layouts
├── pages/             # Astro pages and API routes
│   └── api/
│       └── auth/      # Server-side authentication
├── services/          # API integrations
└── env.d.ts           # TypeScript environment types
```

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI
npm run astro
```

## Password Access Levels

The application has two access levels:

1. **Guest** - Full access including party details and RSVP
2. **Public** - Access to nominations and voting only

Configure which password grants which level by setting the appropriate hash in your environment variables.

## License

Private project - All rights reserved.
