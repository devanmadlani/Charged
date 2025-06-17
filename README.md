# Charged

A modern health and wellness application built with Angular and Ionic, focused on providing personal insights into movement, nutrition, and mindset to help users build healthy habits.

## 🚀 Features

- **Health Tracking**: Monitor movement, nutrition, and mindset scores
- **Progress Visualization**: Interactive line charts and progress rings
- **Scan Analysis**: Detailed health scan results with trend analysis
- **Multi-language Support**: English and Dutch translations
- **Dark/Light Theme**: Adaptive theming system
- **Responsive Design**: Works seamlessly across mobile and desktop
- **Modern Angular**: Built with Angular 19+ using signal inputs and standalone components

## 🛠 Tech Stack

- **Frontend**: Angular 19+ with Ionic 8+
- **Language**: TypeScript
- **Styling**: SCSS with design tokens
- **Mobile**: Capacitor 7+
- **Icons**: HugeIcons
- **Charts**: D3.js
- **Internationalization**: ngx-translate
- **Testing**: Jasmine & Karma

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)
- Ionic CLI (`npm install -g @ionic/cli`)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd charged
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Generate design tokens** (optional)
   ```bash
   npm run transform-build:tokens
   ```

## 🚀 Running the Application

### Development Server

```bash
# Start the development server
npm start
# or
ng serve

# The app will be available at http://localhost:4200
```

### Build for Production

```bash
# Build the project
npm run build

# Build with specific configuration
ng build --configuration production
```

### Mobile Development

```bash
# Add mobile platforms
ionic capacitor add ios
ionic capacitor add android

# Run on mobile
ionic capacitor run ios
ionic capacitor run android
```

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                    # Core services and utilities
│   │   ├── guards/             # Route guards
│   │   ├── services/           # Core services (auth, translation, etc.)
│   │   └── configs/            # Configuration files
│   ├── features/               # Feature-specific components
│   │   ├── scan-accordion-list/ # Health scan accordion component
│   │   ├── scan-card-grid/     # Scan card grid layout
│   │   └── scrollable-ring/    # Scrollable progress ring
│   ├── models/                 # TypeScript interfaces and models
│   ├── pages/                  # Page components
│   │   ├── tabs/               # Tab-based pages (home, settings)
│   │   ├── admin/              # Admin dashboard
│   │   ├── auth-verify/        # Authentication
│   │   ├── login/              # Login page
│   │   ├── onboarding/         # User onboarding flow
│   │   └── self-scan/          # Health scan page
│   ├── shared/                 # Shared components and utilities
│   │   └── components/         # Reusable UI components
│   │       ├── line-chart/     # D3.js line chart component
│   │       ├── progress-ring/  # Circular progress indicator
│   │       ├── score-progress-bar/ # Score visualization
│   │       ├── survey/         # Survey component
│   │       └── week-tracker/   # Weekly habit tracker
│   └── app.routes.ts           # Application routing
├── assets/                     # Static assets
├── environments/               # Environment configurations
├── i18n/                       # Translation files
│   ├── en.ts                   # English translations
│   ├── nl.ts                   # Dutch translations
│   └── index.ts                # Translation exports
├── theme/                      # Theme and styling
│   ├── variables.scss          # SCSS variables
│   ├── light/                  # Light theme variables
│   └── dark/                   # Dark theme variables
└── tokens/                     # Design tokens
    ├── tokens.json             # Base design tokens
    ├── light.json              # Light theme tokens
    └── dark.json               # Dark theme tokens
```

## 🧩 Key Components

### Core Features

- **Progress Ring**: Circular progress indicators with color-coded scoring
- **Line Chart**: Interactive time-series data visualization using D3.js
- **Scan Accordion**: Expandable health category analysis
- **Week Tracker**: Weekly habit tracking with streak visualization

### Pages

- **Home**: Main dashboard with scan cards and progress overview
- **Settings**: User preferences and language selection
- **Self-Scan**: Detailed health analysis and progress tracking
- **Admin**: Administrative dashboard for user management
- **Onboarding**: Multi-step user registration and setup

## 🎨 Theming & Design

The application uses a design token system with:

- **Light/Dark themes**: Automatic theme switching based on user preference
- **Color system**: Semantic color tokens for consistent UI
- **Typography**: Standardized text styles and spacing
- **Component variants**: Consistent component styling across the app

### Design Tokens

```bash
# Transform design tokens
npm run transform:tokens

# Build tokens with Style Dictionary
npm run build:tokens

# Transform and build in one command
npm run transform-build:tokens
```

## 🌍 Internationalization

The app supports multiple languages:

- **English** (default)
- **Dutch**

### Adding Translations

1. Add translations to `src/i18n/en.ts` and `src/i18n/nl.ts`
2. Use the translation pipe in templates: `{{ 'KEY' | translate }}`
3. Access translations in components via `TranslationService`

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test -- --code-coverage

# Run e2e tests
npm run e2e
```

## 📱 Mobile Development

The app is built with Capacitor for native mobile functionality:

```bash
# Sync with native projects
ionic capacitor sync

# Open in native IDEs
ionic capacitor open ios
ionic capacitor open android
```

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run ESLint
- `npm run transform:tokens` - Transform design tokens
- `npm run build:tokens` - Build tokens with Style Dictionary
- `npm run transform-build:tokens` - Transform and build tokens

## 🏗 Development Guidelines

### Code Standards

- Use **signal inputs** for component inputs (Angular 17+)
- Follow **standalone component** architecture
- Implement **OnPush change detection** where possible
- Use **Ionic CSS variables** for theming

### Translation Keys

- Use descriptive, hierarchical keys: `FEATURE.SECTION.ELEMENT`
- Group related translations under common prefixes
- Provide translations for both English and Dutch
