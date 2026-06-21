# EcoSphere — Daily Carbon Footprint Logger & Virtual Forest

**EcoSphere** is a premium, gamified web application designed to help users track, understand, and reduce their daily carbon footprint. Built on science-backed models (EPA, DEFRA, Science 2018), it encourages daily eco-friendly micro-habits through visual, interactive rewards.

---

## 📋 Hackathon Submission Details

### 1. Chosen Vertical
* **Vertical:** Environmental Sustainability & Daily Eco-Habit Tracking
* **Deployment Status:** Automated build and deployment active via GitHub Pages & Actions.
* **Target Persona:** Conscious citizens looking for an engaging, gamified daily assistant to track, understand, and reduce their individual carbon footprint.

### 2. Approach & Logic
* **Science-Backed Emissions Modeling:** The application calculates daily carbon footprint using coefficients inspired by EPA, DEFRA, and Poore & Nemecek (Science, 2018):
  * **Transportation:** Emits based on fuel type (e.g., Petrol: `0.19 kg/km`, Diesel: `0.18 kg/km`, EV: `0.05 kg/km`, Transit: `0.04 kg/km`, Active: `0 kg/km`).
  * **Diet Choices:** Baseline daily diet carbon footprint (Vegan: `1.8 kg`, Vegetarian: `2.8 kg`, Average: `5.5 kg`, High-Meat: `8.0 kg`).
  * **Household Energy:** Heating/AC usage at `1.2 kg/hour`, and active electronics/appliances at `0.45 kg/hour`.
  * **Waste & Shopping:** Garbage output is `1.5 kg/day` baseline, reduced by `0.6 kg` if recycled/composted; shopping purchases add `1.5 kg` per item.
  * **Custom Action Deduction:** Subtracts `2.0 kg` per registered custom green habit.
* **Responsive Mascot Companion (EcoSapling):** Built with SVG and React, this mascot reacts to your mouse cursor by rotating its body and adjusting its pupil direction. Its visual mood changes based on daily logging history:
  * *Gloomy Sprout (🌧️):* No logs today and low total savings. Features drooping arms and tear particles.
  * *Chilling Sapling (💤):* No logs today but high total savings. Features sleeping eyes and floating Zzz's.
  * *Happy Sapling (🌱):* Daily carbon savings > 0 kg. Features waving arms and red flowers.
  * *Ecstatic Canopy (🌸✨):* Daily carbon savings >= 5 kg. Features victory gestures, heart eyes, and pink blossoms.
* **Virtual Forest Translation:** Every 20 kg of carbon saved (representing the average annual carbon absorption of a single mature tree) sprouts and grows a new tile in the virtual forest grid (Sprout -> Sapling -> Pine -> Oak).

### 3. How the Solution Works
1. **Cinematic Startup Page:** A dark-green immersive entrance screen with particle effects and random environmental facts.
2. **Activity Logger:** Sliders, dropdowns, and cards let you quickly log energy, food, and travel. A real-time preview panel recalculates as you tweak values.
3. **Logs History & Trends:** Persistent daily logs list and a clean SVG-drawn trend chart for the last 7 days.
4. **Virtual Forest Canvas:** Gamified visual representation of lifetime carbon savings, tracking tree maturation levels and XP metrics.

### 4. Assumptions Made
* **Daily Baseline:** The standard benchmark daily carbon footprint is assumed to be `18.0 kg CO₂e`.
* **Tree Value:** One grown tree is earned for every `20.0 kg` of cumulative carbon saved.
* **Client-Only Architecture:** Designed as a single-page React app using `localStorage` for high performance, zero backend lag, and privacy.

---

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

