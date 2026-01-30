# Product Requirements Document
## 2026 Oscars Party Application

**Version:** 1.0  
**Date:** January 30, 2026  
**Event Date:** March 15, 2026  
**Author:** Jimmy Liu

---

## 1. Executive Summary

A modern, mobile-first web application for hosting an engaging Oscars party experience. The application features password-protected party invitations, complete 2026 Oscar nominations with rich media, and an interactive voting system. The design emphasizes warmth, glamour, and ease of use with a cozy aesthetic that balances Oscar sophistication with contemporary web design.

---

## 2. Product Overview

### 2.1 Purpose
Create an all-in-one digital experience for Oscar party attendees to:
- Receive and RSVP to party invitations
- Browse complete 2026 Oscar nominations with trailers
- Submit their Oscar predictions
- Engage with dynamic, visually appealing content

### 2.2 Target Audience
- **Primary:** Invited party guests (friends/family)
- **Secondary:** General Oscar enthusiasts (with limited access)

### 2.3 Key Differentiators
- Dual password system (guest vs. public access)
- Dynamic carousel tied to nomination highlights
- Streamlined "above the line" voting experience
- Warm, textured design that avoids minimalism

---

## 3. Feature Requirements

### 3.1 Authentication System

#### 3.1.1 Password Gate
**Priority:** P0 (Critical)

**Functional Requirements:**
- Single-page password entry on initial load
- Floating modal/card design that's visually prominent
- Two password options:
  - **Guest Password:** Unlocks full party details + all features
  - **Public Password:** Unlocks nominations + voting only (no party details)
- Password validation happens client-side (stored in config)
- Session persistence using sessionStorage (not localStorage)
- Clear, friendly error messaging for incorrect passwords
- Mobile-optimized input field with appropriate keyboard type

**Technical Specifications:**
```javascript
// Password configuration (can be stored in environment variables)
const GUEST_PASSWORD = "oscars2026";
const PUBLIC_PASSWORD = "movies2026";

// Access levels
enum AccessLevel {
  GUEST = "guest",     // Full access including party details
  PUBLIC = "public",   // Nominations and voting only
  NONE = "none"        // No access
}
```

**Design Specifications:**
- Centered modal (max-width: 400px on desktop, 90% on mobile)
- Rounded corners (border-radius: 16px)
- Soft shadow (box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15))
- Golden accent color for submit button
- Background blur effect behind modal (backdrop-filter: blur(10px))

---

### 3.2 Party Invitation & RSVP

#### 3.2.1 Party Details Page
**Priority:** P0 (Critical)  
**Access:** Guest password only

**Content Requirements:**
- Event title: "2026 Oscars Watch Party"
- Date & time: Sunday, March 15, 2026 at 6:00 PM
- Location: 3506 Hart Cmn, Fremont California 94538
- Dress code: Smart Casual or inspired by the nominees
- What to bring: Yourself, your friends, and your appetite for Oscar-nominated films
- Special instructions: Please RSVP if you can!

**Functional Requirements:**
- Visible only to users who entered guest password
- RSVP form integrated with Web3Forms
- Form fields:
  - Name (required)
  - Email (required)
  - Attending? (Yes/No radio buttons)
  - Dietary restrictions/notes (optional textarea)
  - Number of guests (optional number input)
- Form submission confirmation message
- Mobile-responsive layout

**Web3Forms Integration:**
```javascript
// Form submission endpoint
const FORM_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = "[YOUR_WEB3FORMS_KEY]";

// Required fields
{
  access_key: ACCESS_KEY,
  name: string,
  email: string,
  attending: "yes" | "no",
  dietary_restrictions?: string,
  guest_count?: number
}
```

**Design Specifications:**
- Two-column layout on desktop (details left, RSVP right)
- Single column on mobile (details above, RSVP below)
- Warm color palette with golden accents
- Illustrated icons for event details (calendar, location, etc.)
- Animated submission confirmation

---

### 3.3 Oscar Nominations Browser

#### 3.3.1 Nominations Page
**Priority:** P0 (Critical)  
**Access:** Both guest and public

**Content Requirements:**
Complete 2026 Oscar nominations across all 24 categories:

**Above the Line Categories:**
1. Best Picture (10 nominees)
   - Bugonia
   - F1
   - Frankenstein
   - Hamnet
   - Marty Supreme
   - One Battle after Another
   - The Secret Agent
   - Sentimental Value
   - Sinners
   - Train Dreams

2. Directing (5 nominees)
   - Chloé Zhao - Hamnet
   - Josh Safdie - Marty Supreme
   - Paul Thomas Anderson - One Battle after Another
   - Joachim Trier - Sentimental Value
   - Ryan Coogler - Sinners

3. Actor in a Leading Role (5 nominees)
   - Timothée Chalamet - Marty Supreme
   - Leonardo DiCaprio - One Battle after Another
   - Ethan Hawke - Blue Moon
   - Michael B. Jordan - Sinners
   - Wagner Moura - The Secret Agent

4. Actress in a Leading Role (5 nominees)
   - Jessie Buckley - Hamnet
   - Rose Byrne - If I Had Legs I'd Kick You
   - Kate Hudson - Song Sung Blue
   - Renate Reinsve - Sentimental Value
   - Emma Stone - Bugonia

5. Actor in a Supporting Role (5 nominees)
   - Benicio Del Toro - One Battle after Another
   - Jacob Elordi - Frankenstein
   - Delroy Lindo - Sinners
   - Sean Penn - One Battle after Another
   - Stellan Skarsgård - Sentimental Value

6. Actress in a Supporting Role (5 nominees)
   - Elle Fanning - Sentimental Value
   - Inga Ibsdotter Lilleaas - Sentimental Value
   - Amy Madigan - Weapons
   - Wunmi Mosaku - Sinners
   - Teyana Taylor - One Battle after Another

7. Writing (Original Screenplay) (5 nominees)
   - Blue Moon - Robert Kaplow
   - It Was Just an Accident - Jafar Panahi
   - Marty Supreme - Ronald Bronstein & Josh Safdie
   - Sentimental Value - Eskil Vogt, Joachim Trier
   - Sinners - Ryan Coogler

8. Writing (Adapted Screenplay) (5 nominees)
   - Bugonia - Will Tracy
   - Frankenstein - Guillermo del Toro
   - Hamnet - Chloé Zhao & Maggie O'Farrell
   - One Battle after Another - Paul Thomas Anderson
   - Train Dreams - Clint Bentley & Greg Kwedar

**Below the Line Categories:**
9. Cinematography (5 nominees)
10. Costume Design (5 nominees)
11. Film Editing (5 nominees)
12. Makeup and Hairstyling (5 nominees)
13. Music (Original Score) (5 nominees)
14. Music (Original Song) (5 nominees)
15. Production Design (5 nominees)
16. Sound (5 nominees)
17. Visual Effects (5 nominees)
18. Animated Feature Film (5 nominees)
19. Animated Short Film (5 nominees)
20. Casting (5 nominees)
21. Documentary Feature Film (5 nominees)
22. Documentary Short Film (5 nominees)
23. International Feature Film (5 nominees)
24. Live Action Short Film (5 nominees)

**Functional Requirements:**
- Category navigation (tabbed or accordion interface)
- Each nominee displays:
  - Film title
  - Nominee name(s)
  - Film poster (when available)
  - YouTube trailer embed (when available)
- Search/filter functionality
- Responsive grid layout

#### 3.3.2 Dynamic Carousel
**Priority:** P1 (High)

**Functional Requirements:**
- Sidebar/side panel carousel displaying film posters
- Default state: Randomly cycles through all nominated films
- Interactive state: When user hovers/clicks on a nomination, carousel displays that film's poster
- Smooth transitions between images (fade or slide)
- Auto-resume random cycling after 5 seconds of no interaction
- Mobile adaptation: Carousel appears below nominations on smaller screens

**Technical Specifications:**
```javascript
// Carousel behavior
interface CarouselState {
  currentFilm: string | null;
  isUserInteracting: boolean;
  autoPlayTimer: NodeJS.Timeout | null;
}

// On nomination hover/focus
onNominationHighlight(filmTitle: string) {
  // Pause auto-play
  // Display film poster
  // Start 5-second timer to resume auto-play
}

// On nomination blur
onNominationBlur() {
  // Resume auto-play after delay
}
```

**Design Specifications:**
- Fixed position on desktop (right sidebar, 30% width)
- Image aspect ratio: 2:3 (standard movie poster)
- Rounded corners (border-radius: 12px)
- Subtle shadow and border
- Smooth CSS transitions (300ms ease-in-out)

**Poster Assets:**
- Posters to be sourced from:
  - The Movie Database (TMDB) API
  - IMDb
  - Official studio press kits
- Fallback: Colored gradient with film title if poster unavailable

---

### 3.4 Oscar Voting System

#### 3.4.1 Above the Line Voting (Full-Screen Slides)
**Priority:** P0 (Critical)  
**Access:** Both guest and public

**Functional Requirements:**
- Full-screen slide experience for 8 major categories
- One category per slide, users advance after making selection
- Categories in order:
  1. Best Picture
  2. Directing
  3. Actor in a Leading Role
  4. Actress in a Leading Role
  5. Actor in a Supporting Role
  6. Actress in a Supporting Role
  7. Writing (Original Screenplay)
  8. Writing (Adapted Screenplay)

**Interaction Flow:**
- User sees category title and all nominees
- User selects one nominee (radio button or card selection)
- "Next" button becomes active after selection
- Progress indicator shows current category (e.g., "3 of 8")
- User can navigate back to previous categories
- Visual confirmation of selection

**Design Specifications:**
- Full viewport height (100vh)
- Large, readable typography
- Nominees displayed as cards with:
  - Film poster thumbnail
  - Nominee name
  - Film title
- Hover/active states with golden highlight
- Mobile: Scrollable list of nominees
- Smooth slide transitions

#### 3.4.2 Below the Line Voting (Form Interface)
**Priority:** P1 (High)  
**Access:** Both guest and public

**Functional Requirements:**
- Traditional form layout after "above the line" slides
- Optional completion (users can skip)
- All 16 remaining categories:
  - Cinematography
  - Costume Design
  - Film Editing
  - Makeup and Hairstyling
  - Music (Original Score)
  - Music (Original Song)
  - Production Design
  - Sound
  - Visual Effects
  - Animated Feature Film
  - Animated Short Film
  - Casting
  - Documentary Feature Film
  - Documentary Short Film
  - International Feature Film
  - Live Action Short Film

**Form Layout:**
- Category grouped by type (e.g., all craft categories together)
- Dropdown selects for each category
- "Skip this section" option
- Progress indicator

#### 3.4.3 Form Submission
**Priority:** P0 (Critical)

**Functional Requirements:**
- Integrated with Web3Forms
- Collects:
  - User name (required)
  - User email (required)
  - All category predictions (8 required, 16 optional)
  - Timestamp
- Success confirmation page
- Option to view submitted predictions
- Email confirmation to user

**Web3Forms Integration:**
```javascript
// Submission payload
{
  access_key: ACCESS_KEY,
  name: string,
  email: string,
  predictions: {
    best_picture: string,
    directing: string,
    actor_leading: string,
    actress_leading: string,
    actor_supporting: string,
    actress_supporting: string,
    original_screenplay: string,
    adapted_screenplay: string,
    // ... optional categories
  },
  submitted_at: timestamp
}
```

---

## 4. Design System

### 4.1 Visual Design Principles

**Core Principles:**
1. **Warm & Cozy:** Inviting atmosphere that makes users want to engage
2. **Glamorous:** Oscar-worthy aesthetics with golden accents
3. **Textured:** Depth through shadows, gradients, and layering
4. **Modern:** Contemporary design patterns and smooth animations

### 4.2 Color Palette

**The 5 Core Colors:**

1. **Text:** `#1A1D29` (Deep Navy)
   - Use for: Body text, headings, primary content
   - On light backgrounds for maximum contrast

2. **Background:** `#F5F1E8` (Warm Cream)
   - Use for: Main backgrounds, card backgrounds, page background
   - Creates warm, inviting base layer

3. **Primary:** `#D4AF37` (Oscar Gold)
   - Use for: Primary buttons, links, selected states, highlights
   - The star of the show - use for key interactive elements

4. **Secondary:** `#8B2635` (Rich Burgundy)
   - Use for: Secondary buttons, hover states, important callouts
   - Adds depth and drama to complement gold

5. **Accent:** `#2C2F3E` (Charcoal)
   - Use for: Borders, dividers, subtle backgrounds, disabled states
   - Provides contrast and definition

**Color Usage Guidelines:**
```css
/* Text */
--color-text: #1A1D29;
--color-text-light: rgba(26, 29, 41, 0.7);  /* 70% opacity for secondary text */
--color-text-muted: rgba(26, 29, 41, 0.5);  /* 50% opacity for disabled text */

/* Background */
--color-bg: #F5F1E8;
--color-bg-elevated: #FFFFFF;  /* For cards that need to "pop" */
--color-bg-overlay: rgba(245, 241, 232, 0.95);  /* For modals */

/* Primary */
--color-primary: #D4AF37;
--color-primary-light: rgba(212, 175, 55, 0.15);  /* For hover backgrounds */
--color-primary-dark: #B8941F;  /* For pressed states */

/* Secondary */
--color-secondary: #8B2635;
--color-secondary-light: rgba(139, 38, 53, 0.15);  /* For hover backgrounds */
--color-secondary-dark: #6A1D28;  /* For pressed states */

/* Accent */
--color-accent: #2C2F3E;
--color-accent-light: rgba(44, 47, 62, 0.15);  /* For subtle backgrounds */
--color-accent-dark: #1A1D29;  /* For borders */
```

**Quick Reference - Where to Use Each Color:**

| Color | Primary Use Cases | Examples |
|-------|------------------|----------|
| **Text** (#1A1D29) | All readable text | Headings, body copy, labels |
| **Background** (#F5F1E8) | Main surfaces | Page background, large sections |
| **Primary** (#D4AF37) | Main actions & highlights | Submit buttons, links, active states, selected items |
| **Secondary** (#8B2635) | Supporting actions | Secondary buttons, important badges, urgent notifications |
| **Accent** (#2C2F3E) | Structure & definition | Borders, dividers, inactive states, subtle backgrounds |

**Simplified Gradients:**
- **Golden Glow:** `linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)`
- **Card Depth:** `linear-gradient(180deg, #FFFFFF 0%, #F5F1E8 100%)`

### 4.3 Typography

**Font Families:**
- **Headings:** Playfair Display (serif, elegant)
- **Body:** Lato (sans-serif, readable)
- **Accents:** Cormorant Garamond (serif, sophisticated)

**Type Scale:**
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
```

### 4.4 Spacing & Layout

**Spacing Scale:**
```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
```

**Border Radius:**
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;
```

**Shadows:**
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.2);
--shadow-golden: 0 4px 12px rgba(212, 175, 55, 0.3);
```

### 4.5 Component Styles

#### 4.5.1 Buttons
```css
/* Primary Button */
.btn-primary {
  background: var(--color-primary);
  color: var(--color-text);
  padding: 12px 32px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(212, 175, 55, 0.4);
}

/* Secondary Button */
.btn-secondary {
  background: var(--color-secondary);
  color: var(--color-bg);
  padding: 12px 32px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--color-secondary-dark);
}

/* Outline Button */
.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: 12px 32px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: var(--color-primary-light);
}
```

#### 4.5.2 Cards
```css
.card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-accent-light);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border-color: var(--color-primary-light);
}

.card-selected {
  border: 2px solid var(--color-primary);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  background: var(--color-primary-light);
}
```

#### 4.5.3 Input Fields
```css
.input {
  background: var(--color-bg-elevated);
  border: 2px solid var(--color-accent-light);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 16px;
  color: var(--color-text);
  transition: all 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-primary-light);
}

.input::placeholder {
  color: var(--color-text-muted);
}

.input:disabled {
  background: var(--color-accent-light);
  color: var(--color-text-muted);
  cursor: not-allowed;
}
```

### 4.6 Animations

**Key Animations:**
```css
/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide In */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Shimmer (for loading states) */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/* Golden Glow */
@keyframes goldenGlow {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  }
  50% {
    box-shadow: 0 4px 20px rgba(212, 175, 55, 0.6);
  }
}
```

**Animation Timing:**
- Fast: 150ms (micro-interactions)
- Medium: 300ms (standard transitions)
- Slow: 500ms (page transitions)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (smooth)

---

## 5. Technical Architecture

### 5.1 Tech Stack

**Frontend Framework:**
- **React** (with Vite for build tooling)
- **Reason:** Fast development, component reusability, excellent mobile performance

**Styling:**
- **Tailwind CSS** (with custom configuration)
- **Reason:** Rapid prototyping, consistent design system, mobile-first approach

**State Management:**
- **React Context API + Hooks**
- **Reason:** Sufficient for app scope, no need for Redux overhead

**Form Handling:**
- **React Hook Form**
- **Reason:** Performance, validation, Web3Forms integration

**Routing:**
- **React Router v6**
- **Reason:** Client-side navigation, route protection

**Animations:**
- **Framer Motion**
- **Reason:** Declarative animations, great mobile performance

**Media/Assets:**
- **The Movie Database (TMDB) API** (for posters/trailers)
- **Cloudinary** (for image optimization)

### 5.2 Hosting & Deployment

**Hosting Platform:**
- **Cloudflare Pages**
- **Benefits:**
  - Global CDN
  - Automatic HTTPS
  - Fast build times
  - Unlimited bandwidth
  - Free tier suitable for this use case

**Deployment Process:**
1. Connect GitHub repository to Cloudflare Pages
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: 18.x
3. Automatic deployments on git push
4. Preview deployments for pull requests

**Environment Variables:**
```bash
VITE_WEB3FORMS_ACCESS_KEY=your_key_here
VITE_GUEST_PASSWORD=oscars2026
VITE_PUBLIC_PASSWORD=movies2026
VITE_TMDB_API_KEY=your_tmdb_key_here
```

### 5.3 Project Structure

```
oscars-party/
├── public/
│   ├── favicon.ico
│   └── og-image.jpg
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── PasswordGate.jsx
│   │   ├── party/
│   │   │   ├── InviteDetails.jsx
│   │   │   └── RSVPForm.jsx
│   │   ├── nominations/
│   │   │   ├── CategoryList.jsx
│   │   │   ├── NomineeCard.jsx
│   │   │   └── PosterCarousel.jsx
│   │   ├── voting/
│   │   │   ├── VotingSlide.jsx
│   │   │   ├── CategorySlider.jsx
│   │   │   ├── BelowTheLineForm.jsx
│   │   │   └── SubmissionConfirmation.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Modal.jsx
│   │   └── layout/
│   │       ├── Header.jsx
│   │       ├── Navigation.jsx
│   │       └── Footer.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── VotingContext.jsx
│   ├── data/
│   │   ├── nominations.js
│   │   └── categories.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useVoting.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── NominationsPage.jsx
│   │   ├── VotingPage.jsx
│   │   └── ConfirmationPage.jsx
│   ├── services/
│   │   ├── web3forms.js
│   │   └── tmdb.js
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

### 5.4 Data Structure

**Nominations Data:**
```javascript
// src/data/nominations.js
export const nominations = {
  bestPicture: [
    {
      id: 1,
      title: "Sinners",
      studio: "Warner Bros.",
      producers: ["Zinzi Coogler", "Sev Ohanian", "Ryan Coogler"],
      posterUrl: "/posters/sinners.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=...",
      totalNominations: 16
    },
    // ... other nominees
  ],
  directing: [
    {
      id: 1,
      director: "Ryan Coogler",
      film: "Sinners",
      posterUrl: "/posters/sinners.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=..."
    },
    // ... other nominees
  ],
  // ... other categories
};
```

**User Voting Data:**
```javascript
// Stored in React state and submitted to Web3Forms
{
  name: "John Doe",
  email: "john@example.com",
  votes: {
    bestPicture: "Sinners",
    directing: "Ryan Coogler - Sinners",
    actorLeading: "Michael B. Jordan - Sinners",
    actressLeading: "Emma Stone - Bugonia",
    actorSupporting: "Delroy Lindo - Sinners",
    actressSupporting: "Teyana Taylor - One Battle after Another",
    originalScreenplay: "Sinners - Ryan Coogler",
    adaptedScreenplay: "Frankenstein - Guillermo del Toro",
    // ... optional below the line categories
  },
  submittedAt: "2026-03-10T19:30:00Z"
}
```

### 5.5 API Integration

#### 5.5.1 Web3Forms
```javascript
// src/services/web3forms.js
export const submitForm = async (formData) => {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
      ...formData,
    }),
  });
  
  return response.json();
};
```

#### 5.5.2 TMDB API (Optional Enhancement)
```javascript
// src/services/tmdb.js
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const searchMovie = async (title, year = 2025) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${title}&year=${year}`
  );
  return response.json();
};

export const getMoviePosters = async (movieId) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/images?api_key=${TMDB_API_KEY}`
  );
  return response.json();
};
```

---

## 6. User Flows

### 6.1 Guest Access Flow
```
1. User arrives at site
   ↓
2. Password gate modal appears
   ↓
3. User enters GUEST password
   ↓
4. Validation succeeds
   ↓
5. User sees full navigation: Home | Nominations | Vote
   ↓
6. Home page shows:
   - Party invitation details
   - RSVP form
   - Quick links to nominations/voting
   ↓
7. User can navigate to Nominations or Voting
```

### 6.2 Public Access Flow
```
1. User arrives at site
   ↓
2. Password gate modal appears
   ↓
3. User enters PUBLIC password
   ↓
4. Validation succeeds
   ↓
5. User sees limited navigation: Nominations | Vote
   ↓
6. Home page shows:
   - General Oscar info
   - Countdown to ceremony
   - No party details
   ↓
7. User can navigate to Nominations or Voting
```

### 6.3 Voting Flow
```
1. User navigates to Voting page
   ↓
2. Sees intro screen explaining voting process
   ↓
3. Clicks "Start Voting"
   ↓
4. Full-screen slide #1: Best Picture
   - Views 10 nominees
   - Selects one
   - Clicks "Next"
   ↓
5. Full-screen slide #2: Directing
   - Views 5 nominees
   - Selects one
   - Clicks "Next"
   ↓
6. [Repeats for all 8 "above the line" categories]
   ↓
7. Transition to below-the-line form
   - Optional: Can skip or fill out
   ↓
8. Final submission form
   - Enter name/email
   - Review selections
   - Submit
   ↓
9. Confirmation page
   - Success message
   - Option to view predictions
   - Email confirmation sent
```

### 6.4 Nominations Browsing Flow
```
1. User navigates to Nominations page
   ↓
2. Sees category list (accordion or tabs)
   ↓
3. Clicks on category (e.g., "Best Picture")
   ↓
4. Category expands showing all nominees
   ↓
5. User hovers over "Sinners"
   ↓
6. Carousel (sidebar) displays Sinners poster
   ↓
7. User clicks on nominee card
   ↓
8. Modal opens with:
   - Full poster
   - Trailer embed
   - Synopsis
   - Cast/crew details
   ↓
9. User closes modal, returns to browsing
```

---

## 7. Responsive Design

### 7.1 Breakpoints
```css
/* Mobile First Approach */
--mobile: 0px;           /* Default, no media query needed */
--tablet: 768px;         /* @media (min-width: 768px) */
--desktop: 1024px;       /* @media (min-width: 1024px) */
--wide: 1440px;          /* @media (min-width: 1440px) */
```

### 7.2 Layout Adaptations

**Mobile (< 768px):**
- Single column layouts
- Stacked navigation
- Full-width cards
- Bottom sheet modals
- Carousel below content
- Touch-optimized buttons (min 44px)
- Reduced spacing

**Tablet (768px - 1023px):**
- Two-column layouts where appropriate
- Sidebar navigation
- Grid layouts (2 columns)
- Carousel in sidebar (toggleable)
- Standard button sizes

**Desktop (1024px+):**
- Multi-column layouts
- Persistent sidebar navigation
- Grid layouts (3-4 columns)
- Fixed carousel sidebar
- Hover states active
- Larger spacing

### 7.3 Mobile-First Considerations

**Touch Targets:**
- Minimum 44x44px for all interactive elements
- Generous spacing between clickable items
- Large, easy-to-tap form inputs

**Performance:**
- Lazy load images
- Progressive image loading
- Minimize initial bundle size
- Code splitting by route

**Gestures:**
- Swipe between voting slides
- Pull-to-refresh on nominations
- Pinch-to-zoom on posters (optional)

**Mobile Navigation:**
- Bottom tab bar (fixed position)
- Hamburger menu for secondary items
- Breadcrumbs for deep navigation

---

## 8. Accessibility

### 8.1 WCAG 2.1 AA Compliance

**Color Contrast:**
- All text meets 4.5:1 contrast ratio
- Large text meets 3:1 contrast ratio
- Interactive elements have clear visual states

**Keyboard Navigation:**
- All functionality accessible via keyboard
- Visible focus indicators
- Logical tab order
- Skip to main content link

**Screen Readers:**
- Semantic HTML5 elements
- ARIA labels where appropriate
- Alt text for all images
- Form labels and error messages

**Motion & Animation:**
- Respect `prefers-reduced-motion`
- Pause/stop functionality for auto-playing content
- No flashing content

### 8.2 Accessibility Features

```jsx
// Example: Reduced motion support
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const animationVariants = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  visible: { opacity: 1, y: 0 }
};
```

**Focus Management:**
- Focus trap in modals
- Focus restoration when closing modals
- Skip links for keyboard users

**Form Accessibility:**
- Clear labels for all inputs
- Error messages announced to screen readers
- Validation feedback visible and announced
- Required field indicators

---

## 9. Performance Targets

### 9.1 Core Web Vitals

**Largest Contentful Paint (LCP):**
- Target: < 2.5 seconds
- Strategy: Optimize images, lazy loading, CDN

**First Input Delay (FID):**
- Target: < 100 milliseconds
- Strategy: Code splitting, minimize JavaScript

**Cumulative Layout Shift (CLS):**
- Target: < 0.1
- Strategy: Image dimensions, font loading

### 9.2 Optimization Strategies

**Images:**
- WebP format with JPEG fallback
- Responsive images (srcset)
- Lazy loading for below-fold content
- Cloudinary transformations

**Code:**
- Route-based code splitting
- Tree shaking
- Minification and compression
- Critical CSS inlining

**Caching:**
- Service worker for offline support (optional)
- Cache-first strategy for static assets
- Cloudflare CDN caching

---

## 10. Testing Requirements

### 10.1 Browser Support

**Desktop:**
- Chrome 90+ (primary)
- Firefox 88+
- Safari 14+
- Edge 90+

**Mobile:**
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

### 10.2 Device Testing

**Required Devices:**
- iPhone 12+ (iOS)
- Samsung Galaxy S21+ (Android)
- iPad Pro (tablet)
- Various desktop resolutions

### 10.3 Testing Checklist

**Functional Testing:**
- [ ] Password validation (both passwords)
- [ ] Session persistence
- [ ] RSVP form submission
- [ ] Voting form submission
- [ ] Navigation between pages
- [ ] Carousel interaction
- [ ] Modal interactions
- [ ] Form validation
- [ ] Error handling

**Visual Testing:**
- [ ] Responsive layouts at all breakpoints
- [ ] Dark mode compatibility (optional)
- [ ] Animation smoothness
- [ ] Image loading states
- [ ] Typography scaling
- [ ] Color contrast

**Accessibility Testing:**
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Focus management
- [ ] ARIA labels
- [ ] Form accessibility

**Performance Testing:**
- [ ] Lighthouse scores (90+)
- [ ] Page load times
- [ ] Image optimization
- [ ] Bundle size analysis

---

## 11. Content Management

### 11.1 Trailer Links

**Priority Films (need trailers):**
1. Sinners - https://www.youtube.com/watch?v=bKGxHflevuk
2. One Battle after Another - https://www.youtube.com/watch?v=feOQFKv2Lw4
3. Frankenstein - https://www.youtube.com/watch?v=8aulMPhE12g
4. Hamnet - https://www.youtube.com/watch?v=xYcgQMxQwmk
5. Marty Supreme - https://www.youtube.com/watch?v=s9gSuKaKcqM
6. Bugonia - https://www.youtube.com/watch?v=bd_5HcTujfc
7. F1 - https://www.youtube.com/watch?v=8yh9BPUBbbQ
8. Sentimental Value - https://www.youtube.com/watch?v=lKbcKQN5Yrw
9. The Secret Agent - https://www.youtube.com/watch?v=9UfrzDKrhEc
10. Train Dreams - https://www.youtube.com/watch?v=_Nk8TrBHOrA

**Fallback:**
- If trailer unavailable, link to official film page
- Display "Trailer Coming Soon" message

---

## 12. Timeline & Milestones

### 12.1 Pre-Launch Checklist

- [ ] All trailer links working
- [ ] All poster images optimized and loading
- [ ] Web3Forms integration tested
- [ ] Password protection functional
- [ ] Mobile responsive on all devices
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met
- [ ] Analytics tracking set up (optional)
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Party details updated with correct info

---

## 13. Post-Launch

### 13.1 Post-Event

**Data Collection:**
- Export all RSVP responses
- Export all voting predictions
- Compare predictions to actual winners
- Create winner's scoreboard

**Content Archive:**
- Save all user submissions
- Create highlights/memories
- Share results with guests

---

## 14. Future Enhancements

N/A

---

## 15. Risk Assessment
N/A

---

## 16. Success Metrics
N/A

---

## 17. Appendices

### 17.1 Glossary

- **Above the Line:** Major Oscar categories (Picture, Director, Acting, Writing)
- **Below the Line:** Technical/craft categories
- **RSVP:** Répondez s'il vous plaît (please respond)
- **Web3Forms:** Third-party form handling service
- **Cloudflare Pages:** Static site hosting platform
- **TMDB:** The Movie Database
- **PWA:** Progressive Web App
- **CDN:** Content Delivery Network

### 17.2 References

- Oscar.org: https://www.oscars.org/oscars/ceremonies/2026
- Web3Forms Docs: https://docs.web3forms.com/
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
- TMDB API Docs: https://developers.themoviedb.org/3
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- React Documentation: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/docs

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1 | Jan 30, 2026 | Jimmy Liu | Initial PRD creation |

---

**END OF DOCUMENT**
