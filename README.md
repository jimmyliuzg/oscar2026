# 2026 Oscars Watch Party

A modern, mobile-first web application for hosting an engaging Oscars party experience. Features password-protected party invitations, complete 2026 Oscar nominations with rich media, and an interactive voting system.

## Features

- 🔐 **Dual Password System** - Guest access for party details, public access for nominations/voting
- 🎬 **Full Nominations Browser** - All 24 Oscar categories with trailers and posters
- 🗳️ **Interactive Voting** - Full-screen voting experience for predictions
- 📱 **Mobile-First Design** - Responsive and touch-friendly
- 🎨 **Beautiful Design** - Warm, glamorous aesthetic with golden accents

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Hook Form** for forms
- **Web3Forms** for form submissions
- **OMDb API** for movie posters

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

### Environment Variables

Create a `.env` file with:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_key_here
VITE_OMDB_API_KEY=your_omdb_key_here
VITE_GUEST_PASSWORD_HASH=sha256_hash_of_guest_password
VITE_PUBLIC_PASSWORD_HASH=sha256_hash_of_public_password
```

#### Generating Password Hashes

To generate SHA-256 hashes for your passwords:

```javascript
// Run in browser console or Node.js
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Example:
hashPassword('oscars2026').then(console.log);
// => 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
```

## Passwords

The default passwords are:
- **Guest Password**: `oscars2026` (full access including party details)
- **Public Password**: `movies2026` (nominations and voting only)

⚠️ **Security Note**: Change these passwords before deploying!

## Deployment

### Cloudflare Pages

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variables in the dashboard

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
├── pages/             # Main page components
└── services/          # API integrations
```

## License

Private project - All rights reserved.
