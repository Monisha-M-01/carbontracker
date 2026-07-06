# EcoSphere — Daily Carbon Footprint Tracker

EcoSphere is a web application that helps users track, understand, and reduce their daily carbon footprint. It uses science-backed emission models (EPA, DEFRA, Poore & Nemecek — Science, 2018) and provides an engaging, gamified experience to encourage sustainable daily habits.

## Features

### Daily Activity Logger
- Log transportation, diet, household energy, and waste & consumption through intuitive sliders and dropdowns.
- Register custom eco-actions (e.g., planting trees, cycling to work) for instant footprint deductions.
- View a live footprint preview that updates in real time as inputs change.

### Interactive Mascot (EcoSapling)
- An animated SVG companion whose mood reflects your daily logging activity and cumulative savings.
- Eye-tracking follows the cursor for a responsive, interactive feel.

### Weekly Logs & Trends
- Persistent daily log history showing dates, footprint values, savings, and XP earned.
- Visual trend chart for the last 7 days.

### Virtual Forest
- A gamified dashboard where trees sprout, grow, and mature based on cumulative carbon savings and XP.
- One tree is earned for every 20 kg of CO₂ saved — the approximate annual absorption of a mature tree.

### Cinematic Intro
- An animated entrance screen with particle effects and a randomly selected environmental fact.

## Tech Stack

| Technology   | Details                  |
|--------------|--------------------------|
| Framework    | React 19 + Vite 8        |
| Language     | TypeScript               |
| Styling      | Vanilla CSS              |
| Icons        | Lucide React             |
| Testing      | Vitest + React Testing Library |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/` by default.

### Other Scripts

| Command           | Description                  |
|--------------------|------------------------------|
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run test`    | Run the test suite           |
| `npm run lint`    | Lint the codebase            |

## Project Structure

```
src/
├── components/
│   ├── DailyLogger.tsx      # Activity logging form
│   ├── Dashboard.tsx         # Main dashboard view
│   ├── EcoSapling.tsx        # Animated mascot companion
│   ├── HabitsTracker.tsx     # Custom eco-habits manager
│   ├── HistoryLog.tsx        # Logs history & trend chart
│   ├── VirtualForest.tsx     # Gamified forest grid
│   ├── Offsets.tsx           # Carbon offset information
│   ├── Wizard.tsx            # Onboarding wizard
│   ├── IntroScreen.tsx       # Cinematic intro animation
│   ├── IntroModal.tsx        # Intro modal overlay
│   └── FallingLeaves.tsx     # Decorative leaf animation
├── utils/
│   └── footprintCalculator   # Emission calculation logic
├── App.tsx                   # Root application component
├── index.css                 # Global styles & design tokens
└── main.tsx                  # Application entry point
```

## Data Persistence

All log history, streak metrics, XP, and virtual forest progress are stored in the browser's `localStorage`. Data is retained across page refreshes and browser restarts — no server or account required.
