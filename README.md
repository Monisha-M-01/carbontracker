# EcoSphere — Daily Carbon Footprint Logger & Virtual Forest

**EcoSphere** is a premium, gamified web application designed to help users track, understand, and reduce their daily carbon footprint. Built on science-backed models (EPA, DEFRA, Science 2018), it encourages daily eco-friendly micro-habits through visual, interactive rewards.

---

## 🌟 Core Features

### 1. Daily Activity Logger
* **Themed Trackers:** Segmented forms for Transportation, Diet choices, Household Energy (Heating/AC/Electronics), and Waste & Consumption.
* **Custom Eco-Actions:** Register custom green habits (like planting trees or avoiding elevators) to receive instant footprint deductions.
* **Live Footprint Preview:** Dynamically displays estimated daily carbon output in kilograms as you adjust the sliders.

### 2. Expressive Cartoon Mascot (EcoSapling)
Features a responsive, cute anime-style mascot in the corner that reacts dynamically to your logging habits:
* **Gloomy Sprout 🌧️:** Active when no habits are logged and cumulative carbon reduction is low. Drooping leaves and tears.
* **Chilling Sapling 💤:** Active when no habits are logged but cumulative carbon is high. Closed relaxed eyes and floating sleep Zzz's.
* **Happy Sapling 🌱:** Active when you log carbon savings today. Waving hands and growing red flowers.
* **Ecstatic Canopy 🌸✨:** Active when you log high daily carbon savings (>= 5 kg). Heart eyes, star sparkles, pink blossoms, and victory gestures.
* *Bonus:* The mascot's glossy eyes track your mouse cursor in real-time!

### 3. Weekly Logs History
* Track footprint trends over time with custom-designed visual charts.
* Complete logs list showing dates, daily footprints, savings, and XP earned.
* Clear records utility to reset history.

### 4. My Virtual Forest
* Gamified dashboard where trees grow, develop, and bloom into a lush forest based on your cumulative carbon savings and experience points (XP).

### 5. Cinematic Entrance & facts
* When loading the application, you are presented with a deep-green, animated cinematic transition page featuring a pulsing globe, rising atmosphere particles, and a randomly selected, intriguing environmental fact.

---

## 🛠️ Tech Stack
* **Framework:** React 19 + Vite 8
* **Language:** TypeScript
* **Styling:** Vanilla CSS (Tailored HSL theme colors, glassmorphism, responsive grids, and micro-animations)
* **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation
1. Install project dependencies:
   ```bash
   npm install
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the address shown (usually `http://localhost:5173/`).

---

## 💾 Data Persistence
All log history, streak metrics, XP points, and virtual forest growth are persisted locally inside the browser's **`localStorage`**. Your data remains fully intact across tab closures, refreshes, and reboots.

