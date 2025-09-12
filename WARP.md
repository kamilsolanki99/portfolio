# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

This is a modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. It features a dark/black theme with neon accents, smooth animations, interactive elements, and advanced visual effects like parallax scrolling, animated particles, and custom cursor effects.

## Architecture

### Core Structure
- **Single Page Application (SPA)**: All content lives in `index.html` with smooth scrolling navigation between sections
- **Component-based CSS**: Modular CSS architecture with section-specific styling and reusable utilities
- **Event-driven JavaScript**: Extensive use of intersection observers, event listeners, and animation APIs

### Key Files
- `index.html` - Main portfolio page with all sections (Hero, About, Skills, Projects, Experience, Contact)
- `styles.css` - Complete styling with CSS custom properties, animations, and responsive design
- `script.js` - Interactive features, animations, and visual effects
- `thanks.html` - Thank you page for form submissions
- Image assets: `profile-photo.jpg`, `project1.jpg`, `project2.jpg`, `project3.jpg`

### CSS Architecture
- **CSS Custom Properties**: Extensive use of CSS variables for theming (colors, gradients, shadows)
- **Neon Theme System**: Predefined color palette with `--primary-color`, `--secondary-color`, `--accent-color`, etc.
- **Animation Framework**: Custom keyframes for floating particles, glitch effects, skill bars, and entrance animations
- **Responsive Design**: Mobile-first approach with clamp() functions and flexible layouts

### JavaScript Architecture
- **Module Pattern**: Organized into functional sections (Navigation, Parallax, Animations, etc.)
- **Performance Optimized**: Uses `requestAnimationFrame`, `IntersectionObserver`, and debounced scroll events
- **Interactive Systems**: 
  - Custom cursor with magnetic effects
  - 3D card transformations on project cards
  - Animated skill progress bars
  - Counter animations for statistics
  - Form handling with loading states

## Development Commands

### Local Development
```powershell
# Serve the website locally (PowerShell)
python -m http.server 8000

# Alternative using Node.js (if available)
npx serve .
```

### Opening in Browser
```powershell
# Open directly in default browser
start index.html

# For development with live reload (if using VS Code)
# Right-click index.html > "Open with Live Server"
```

### Image Optimization
```powershell
# Compress images for web performance
# Recommended tools: TinyPNG, Squoosh, or ImageOptim
# Keep images under 500KB each
```

## Customization Guidelines

### Content Updates
1. **Personal Information**: Update lines 101-107 in `index.html` (name, title, tagline)
2. **About Section**: Modify text content in lines 130-137
3. **Skills**: Update skill percentages via `data-percent` attributes (lines 172, 182, 192, 202, 212, 222)
4. **Projects**: Replace project information in lines 252-309 (titles, descriptions, tech stacks, links)
5. **Experience Timeline**: Update experience entries in lines 324-353
6. **Contact Details**: Modify contact information in lines 372-381

### Styling Customization
- **Color Scheme**: Edit CSS custom properties in `styles.css` lines 2-16
- **Animations**: Modify keyframe animations and transition timings
- **Layout**: Adjust section padding and responsive breakpoints

### Interactive Features
- **Particles**: Customize particle count and colors in `createNeonParticles()` function
- **Glitch Effects**: Modify glitch animation parameters
- **Cursor Effects**: Adjust magnetic button sensitivity
- **Form Integration**: Update form action URL for actual email handling

## Form Integration

The contact form currently uses FormSubmit.co. To integrate with other services:

### Option 1: EmailJS
```javascript
// Replace form submission in script.js with EmailJS integration
emailjs.send('service_id', 'template_id', formData)
```

### Option 2: Custom Backend
```javascript
// POST to custom endpoint
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
```

### Option 3: Netlify Forms
```html
<!-- Add to form tag -->
<form netlify data-netlify="true">
```

## Performance Notes

- **Image Loading**: Lazy loading implemented for all images using IntersectionObserver
- **Scroll Optimization**: Throttled scroll events to prevent performance issues
- **Animation Performance**: Uses `transform` and `opacity` for 60fps animations
- **Memory Management**: Automatic cleanup of created DOM elements and event listeners

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **JavaScript Features**: Uses ES6+ features (arrow functions, template literals, destructuring)
- **CSS Features**: CSS Grid, Flexbox, CSS Custom Properties, backdrop-filter

## Easter Eggs & Special Features

- **Konami Code**: ↑ ↑ ↓ ↓ ← → ← → B A activates rainbow effect
- **Keyboard Shortcut**: Press 'T' to toggle neon trail effects
- **Right-click Protection**: Prevents image downloading with custom notification
- **Page Visibility API**: Changes title when tab becomes inactive
- **Custom Cursor**: Magnetic hover effects on interactive elements

## Common Development Tasks

### Adding New Sections
1. Add HTML structure to `index.html`
2. Create corresponding CSS section in `styles.css`
3. Add navigation link to navbar
4. Include section in scroll spy functionality (`script.js` lines 410-429)

### Modifying Animations
1. **Skill Bars**: Update `animateSkillBars()` function and CSS transitions
2. **Entrance Effects**: Modify IntersectionObserver thresholds and CSS transforms
3. **Particle Effects**: Adjust `createNeonParticles()` parameters and CSS animations

### Updating Color Scheme
1. Modify CSS custom properties in `:root` selector
2. Update neon glow effects variables
3. Test contrast ratios for accessibility

## Deployment

This is a static website that can be deployed to:
- **Netlify**: Drag and drop or connect Git repository
- **Vercel**: Import project from Git
- **GitHub Pages**: Enable in repository settings
- **Firebase Hosting**: `firebase deploy`

No build process required - deploy the files as-is.

## Asset Requirements

- **Profile Photo**: `profile-photo.jpg` (recommended: 1920x1080px)
- **Project Screenshots**: `project1.jpg`, `project2.jpg`, `project3.jpg` (recommended: 800x600px)
- **File Size**: Keep all images under 500KB for optimal performance
- **Format**: JPEG for photos, PNG for graphics with transparency
