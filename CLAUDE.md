# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.3.3 e-commerce landing page for "Le Sac Cœurs" handbag, built with TypeScript and Tailwind CSS v4.

## Essential Commands

```bash
# Development
npm run dev      # Start dev server with Turbopack (http://localhost:3000)

# Production
npm run build    # Build for production
npm run start    # Start production server

# Code Quality
npm run lint     # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.3.3 with App Router
- **UI**: React 19.0.0 with Server Components
- **Styling**: Tailwind CSS v4 (beta) with custom theme
- **Carousel**: Embla Carousel for image galleries
- **Analytics**: Vercel Analytics

### Key Files
- `src/app/page.tsx`: Main product page - async server component handling all sections
- `src/data/content.json`: All text content, product details, and configuration
- `src/components/ImageSlider.tsx`: Client-side image carousel with modal preview

### Content Management
All text content is externalized in `src/data/content.json` including:
- Product descriptions and pricing
- Navigation labels
- Banner text
- Shipping options
- Payment links (Stripe URLs)

### State Management
- `isSoldOut` flag in content.json controls product availability
- Query parameters preserved across navigation for tracking

### Image Organization
```
public/images/
├── banners/    # Hero and promotional banners
├── gallery/    # Product detail and shipping images
└── products/   # 35 product photos named sequentially
```

### Styling Patterns
- Mobile-first responsive design
- Custom fonts: Inter (UI) and Playfair Display (headings)
- CSS variables for font families
- Gradient backgrounds and modern aesthetics
- Custom scrollbar styling in globals.css

### Payment Integration
Stripe payment links are hardcoded in content.json under `paymentLinks` object with different shipping options (Chronopost, Mondial Relay).