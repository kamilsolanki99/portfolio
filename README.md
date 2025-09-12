# 🚀 Kamil Solanki - Portfolio Website

A modern, fully responsive portfolio website with a sleek black theme, neon accents, and stunning animations.

## ✨ Features

- **Dark/Black Theme** with glowing neon accents (blue/cyan/purple)
- **Smooth Animations** including parallax effects, hover animations, and micro-interactions
- **Fully Responsive** design that works perfectly on all devices
- **Interactive Elements** including 3D card effects, magnetic buttons, and custom cursor
- **Modern Sections**:
  - Hero section with animated gradient orbs
  - About section with animated stats counter
  - Skills section with animated progress bars
  - Projects showcase with hover effects
  - Timeline for experience/education
  - Contact form with validation
- **Special Features**:
  - Custom animated cursor
  - Smooth scrolling navigation
  - Back to top button
  - Mobile hamburger menu
  - Easter egg (Konami Code)
  - Page visibility API integration

## 📸 Adding Your Images

To complete your portfolio, you'll need to add the following images:

### 1. Profile Photo (Hero Section)
- **File name**: `profile-photo.jpg`
- **Recommended size**: 1920x1080px or larger
- **Location**: Place in the root directory (same folder as index.html)
- **Note**: The image will be automatically styled with blur and opacity effects

### 2. Project Screenshots
Add your project images with these names:
- **Project 1**: `project1.jpg`
- **Project 2**: `project2.jpg`
- **Project 3**: `project3.jpg`
- **Recommended size**: 800x600px
- **Location**: Place in the root directory

### Quick Setup for Placeholder Images:
If you want to test the website immediately, you can use placeholder images:

1. Create blank images or download from [Unsplash](https://unsplash.com)
2. Rename them according to the list above
3. Place them in the root directory

## 🎨 Customization Guide

### Colors
Edit the CSS variables in `styles.css` (lines 2-16):
```css
:root {
    --primary-color: #00d4ff;    /* Main accent color */
    --secondary-color: #7b2ff7;   /* Secondary accent */
    --accent-color: #ff00ff;      /* Additional accent */
}
```

### Personal Information
Edit these sections in `index.html`:

1. **Name & Title** (lines 64-70)
2. **About Me Text** (lines 99-107)
3. **Contact Information** (lines 339-350)
4. **Social Links** (lines 353-365) - Update href attributes with your actual links

### Projects
Update project information in `index.html` (lines 207-279):
- Project titles
- Descriptions
- Technology tags
- Links to live demos and GitHub repos

### Experience & Education
Modify the timeline section in `index.html` (lines 291-322):
- Dates
- Job titles/degrees
- Company/institution names
- Descriptions

### Skills
Update skill percentages in `index.html` (lines 135-194):
- Change the `data-percent` attribute for each skill
- Modify skill names and icons

## 🚀 How to Launch

1. **Open Directly**: Simply double-click on `index.html` to open in your browser

2. **Using Live Server** (Recommended for development):
   ```bash
   # If you have VS Code with Live Server extension
   # Right-click on index.html and select "Open with Live Server"
   ```

3. **Using Python Simple Server**:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   Then navigate to `http://localhost:8000`

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 🎮 Easter Egg

Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A

## 📝 Form Integration

The contact form currently shows a demo submission. To make it functional:

1. **Option 1**: Use a service like [Formspree](https://formspree.io)
   - Sign up for a free account
   - Add your endpoint to the form action

2. **Option 2**: Use [EmailJS](https://www.emailjs.com)
   - Sign up and get your service ID
   - Integrate with the JavaScript code

3. **Option 3**: Create a backend endpoint
   - Set up a server (Node.js, PHP, Python, etc.)
   - Handle form submissions

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Variables and Grid/Flexbox)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Inter & Space Grotesk)

## 📄 License

This portfolio template is free to use for personal and commercial projects.

## 🤝 Credits

Designed and built with ❤️ by Kamil Solanki

---

**Note**: Remember to optimize your images for web performance using tools like:
- [TinyPNG](https://tinypng.com)
- [Squoosh](https://squoosh.app)
- [ImageOptim](https://imageoptim.com)

For best results, keep images under 500KB each.
