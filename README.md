# 💪 Strength Scenario Game

A modern, interactive React application that helps users discover their personal strengths through real-life scenarios. Built with React, Vite, and Tailwind CSS.

![Strength Game Screenshot](https://via.placeholder.com/800x400/667eea/white?text=Strength+Scenario+Game)

## ✨ Features

### 🎯 Core Functionality
- **30+ Realistic Scenarios** - Navigate through authentic situations from work, personal life, and social interactions
- **65+ Strength Types** - Comprehensive library of personal and professional strengths with detailed definitions
- **Personalized Results** - Get your top 5 strengths with career and personal life applications
- **Randomized Experience** - Scenarios are shuffled for a unique experience each time

### 🎨 User Experience
- **Welcome Screen** - Beautiful onboarding with game preview and instructions
- **Enhanced Visual Design** - Modern gradients with 3-color transitions for better visual appeal
- **Interactive Cards** - Expandable result cards with detailed strength information
- **Progress Animations** - Smooth progress bar with milestone celebrations
- **Micro-interactions** - Hover effects, button animations, and visual feedback
- **Mobile-First Design** - Optimized for touch devices with gesture support

### ♿ Accessibility
- **Keyboard Navigation** - Full keyboard support with proper focus management
- **Screen Reader Compatible** - ARIA labels and semantic HTML structure
- **High Contrast Support** - Respects system accessibility preferences
- **Reduced Motion** - Honors prefers-reduced-motion user settings
- **Touch-Friendly** - Minimum 48px touch targets for mobile devices

### 📱 Mobile Optimizations
- **Responsive Design** - Adapts perfectly to all screen sizes with mobile-first approach
- **Optimized Text Sizes** - Scalable typography that remains readable on small screens
- **Touch Gestures** - Tap-optimized interface with proper touch targets (minimum 48px)
- **Compact Layout** - Efficient use of screen space without compromising readability
- **Performance** - Hardware-accelerated animations and optimized loading
- **PWA Ready** - Configured for Progressive Web App capabilities

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd strength-game

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 🏗️ Technical Architecture

### Built With
- **React 18** - Modern React with hooks and concurrent features
- **Vite 7.0.5** - Fast build tool and development server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework with enhanced gradient system
- **Lucide React 0.525.0** - Beautiful, customizable SVG icons
- **ESLint 8.57.1** - Modern flat config for code quality
- **PostCSS** - CSS processing with autoprefixer

### Project Structure
```
src/
├── App.jsx          # Main application component
├── main.jsx         # React app entry point
├── index.css        # Global styles and animations
└── assets/          # Static assets

public/
├── index.html       # HTML template
└── game.svg         # Game controller favicon
```

### Key Components

#### Strength Definitions
- 65+ comprehensive strength definitions with complete icon mappings
- Each includes description, personal life examples, and career applications
- Enhanced visual presentation with 3-color gradient variations
- Organized in a structured object for easy maintenance

#### Scenario System
- 30+ carefully crafted scenarios
- Each scenario has 3 choices mapping to different strengths
- Randomized order for replay value

#### Results Engine
- Tallies strength selections across all scenarios
- Displays top 5 strengths with occurrence counts and rankings
- Interactive expandable cards with detailed information
- Enhanced visual design with custom icons for each strength type
- 3-color gradient system for better visual hierarchy

## 🎮 How to Use

1. **Start** - Click "Start Your Journey" on the welcome screen
2. **Navigate** - Read each scenario and choose your natural response
3. **Progress** - Watch your progress with animated indicators
4. **Results** - Discover your top strengths with detailed insights and enhanced visual design
5. **Explore** - View comprehensive strength information with career and personal applications
6. **Replay** - Play again for different scenarios and insights

## 🎨 Customization

### Adding New Strengths
Add new entries to the `strengthDefinitions` object in `App.jsx`:

```javascript
"Your New Strength": {
    description: "Your strength description...",
    personal: "How it applies to personal life...",
    career: "How it applies to career..."
}
```

### Adding New Scenarios
Add new scenarios to the `originalScenarios` array:

```javascript
{
    text: "Your scenario description...",
    choices: [
        { 
            text: "Choice 1...", 
            strengths: ["Strength1", "Strength2"] 
        },
        // ... more choices
    ]
}
```

### Styling
- Modify `src/index.css` for global styles and custom animations
- Use Tailwind classes in JSX for component styling with enhanced gradient system
- 3-color gradient variations available for visual hierarchy
- Custom animations and micro-interactions defined in CSS

## 🔧 Configuration

### Tailwind Configuration
The project uses Tailwind CSS v3 with custom configuration in `tailwind.config.js`.

### Build Configuration
Vite configuration is in `vite.config.js` with React plugin enabled. Build produces optimized bundles:
- JavaScript: ~235KB (70KB gzipped)
- CSS: ~30KB (6KB gzipped)
- HTML: ~1KB (0.6KB gzipped)

### PostCSS
PostCSS processes Tailwind directives and adds vendor prefixes via `postcss.config.js`.

### ESLint Configuration
Modern flat config format (ESLint 9+ compatible) with:
- React hooks validation
- Optimized rules for React components
- Clean code standards enforcement

## 🚀 Production Ready

### Code Quality
- ✅ **ESLint Clean** - Zero linting errors with modern flat config
- ✅ **Build Optimized** - Production builds tested and verified
- ✅ **Dependencies Clean** - All unused dependencies removed
- ✅ **Performance** - Optimized bundle sizes and loading times

### Latest Updates
- **Enhanced Gradients** - 3-color gradient system for better visual appeal
- **Complete Icon Coverage** - All 65+ strength types have matching icons
- **Improved Copy** - Enhanced results page descriptions
- **Custom Favicon** - Game controller icon reflecting the interactive nature
- **Mobile Responsiveness** - Optimized text sizes and layout for all screen sizes
- **Code Optimization** - Clean imports and modern ESLint configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons and emojis for visual enhancement
- Tailwind CSS for rapid UI development
- React team for the amazing framework
- Vite for lightning-fast development experience

---

Built with ❤️ and React
