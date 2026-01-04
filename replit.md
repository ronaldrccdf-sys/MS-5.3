# Marques & Serra Sociedade de Advogados Website

## Overview
A law firm website built with React, TypeScript, and Vite. Features a multilingual interface (Portuguese, English, Spanish, Chinese), an intro animation, and responsive design with Tailwind CSS.

## Project Structure
- `App.tsx` - Main application component with navigation and page layout
- `index.tsx` - React entry point
- `index.html` - HTML template with Tailwind config
- `components/` - React components
  - `Hero.tsx` - Hero section
  - `Sections.tsx` - About, Practice Areas, Differentials, Team, Contact, etc.
  - `Footer.tsx` - Footer component
  - `Intranet.tsx` - Intranet login section
  - `LanguageContext.tsx` - Multilingual context provider
  - `Logo.tsx` - Logo component
  - `Services.ts` - Services data
- `types.ts` - TypeScript type definitions
- `vite.config.ts` - Vite configuration

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Technologies
- React 19
- TypeScript 5.8
- Vite 6
- Tailwind CSS (via CDN)
- Lucide React (icons)
- Google Generative AI (for potential AI features)

## Environment Variables
- `GEMINI_API_KEY` - Optional Google Generative AI API key

## Deployment
- Static deployment with `npm run build`
- Output directory: `dist`
