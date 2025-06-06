# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Cinnamonbred, an artist portfolio website for Kate showcasing character art, cute doodles, and merchandise. The project has a dual architecture:

1. **Legacy Static Site** (root level) - Complete, functional cozy cottage-themed portfolio
2. **Modern Next.js Application** (cinnamonbred-website/) - Advanced portfolio platform in development

## Architecture

### Legacy Site (Root Level) - PRODUCTION READY
- **Tech Stack**: HTML5, CSS3, Vanilla JavaScript, Python backend
- **Features**: Interactive gallery, ambient sounds, guest book, mobile responsive
- **Theme**: Studio Ghibli-inspired cozy cottage aesthetic with magical interactions
- **Entry Point**: `index.html`
- **Backend**: `server.py` handles guest book functionality

### Next.js Application (cinnamonbred-website/) - IN DEVELOPMENT  
- **Tech Stack**: Next.js 15.3.3, React 19, TypeScript 5, Tailwind CSS 4
- **Enhanced Features**: Framer Motion, GSAP animations, React Query
- **Integrations**: Cloudinary (images), Shopify (e-commerce) 
- **Entry Point**: `src/app/page.tsx`

## Development Commands

### Next.js Application (cinnamonbred-website/)
```bash
cd cinnamonbred-website
pnpm dev          # Start development server
pnpm build        # Build for production  
pnpm lint         # Run ESLint
pnpm start        # Start production server
```

### Legacy Site
```bash
python3 server.py              # Full server with guest book
python3 -m http.server 8080    # Basic static server
```

## Key Directories

### Next.js Structure (cinnamonbred-website/)
- `src/app/` - App Router pages (character-art/, cute-doodles/, merch/, contact/, portfolio/)
- `src/components/` - Reusable components organized by type (animations/, layout/, sections/, ui/)
- `src/lib/` - Utilities (cloudinary.ts, shopify.ts, utils.ts)
- `public/images/` - Static assets organized by category

### Legacy Structure
- `images/` - Kate's artwork and decorative assets
- `script.js` - Interactive features and animations
- `style.css` - Cozy cottage theme styling

## Design System

### Colors (Tailwind Custom Theme)
- **Forest**: Deep forest green (#1a3d2e)
- **Sage**: Soft sage green (#7a9b8e) 
- **Cream**: Warm cream (#f5f2e8)
- **Warm**: Warm beige (#e8dcc0)

### Typography
- **Primary**: "Playfair Display" (elegant serif)
- **Secondary**: "Inter" (clean sans-serif)

## Development Patterns

### Component Organization
- Components grouped by function: animations/, layout/, sections/, ui/
- Each component follows TypeScript + Tailwind patterns
- Framer Motion for page transitions, GSAP for complex animations

### External Integrations
- **Cloudinary**: Image optimization and delivery (lib/cloudinary.ts)
- **Shopify**: E-commerce functionality (lib/shopify.ts)

### Responsive Design
- Mobile-first approach with Tailwind responsive utilities
- Smooth animations that respect user motion preferences
- Progressive enhancement for interactive features

## Important Notes

- The legacy site is fully functional and can serve as reference for the cozy aesthetic
- Next.js app is early development - most components are placeholder templates
- Maintain the magical, cozy cottage theme across both implementations
- Guest book functionality requires Python server for persistence
- Image assets are organized in Kate Art!/ directory with descriptive names