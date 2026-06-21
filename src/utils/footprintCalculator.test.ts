import { describe, it, expect } from 'vitest';
import { calculateEmissions } from './footprintCalculator';
import type { FootprintData } from '../components/Wizard';

describe('footprintCalculator - calculateEmissions', () => {
  it('correctly calculates emissions for an eco-friendly vegan profile', () => {
    const veganProfile: FootprintData = {
      householdMembers: 2,
      electricity: 100, // low electricity (kWh/month)
      heatingType: 'none', // no gas/oil/lpg
      heatingUsage: 0,
      vehicleType: 'ev',
      vehicleDistance: 50, // 50 km/week
      publicDistance: 10,
      shortFlights: 0,
      longFlights: 0,
      dietType: 'vegan', // 1.8 kg CO2e/day
      recycleHabits: 'active', // 1.0 kg CO2e/day
      shoppingHabits: 'minimalist', // -0.2 tonnes/year
    };

    const result = calculateEmissions(veganProfile);

    expect(result).toHaveProperty('energy');
    expect(result).toHaveProperty('transport');
    expect(result).toHaveProperty('food');
    expect(result).toHaveProperty('lifestyle');
    expect(result).toHaveProperty('total');

    // Verify expectations:
    // Food footprint: (1.8 * 365) / 1000 = 0.657 -> 0.66
    expect(result.food).toBe(0.66);

    // Energy: (100 * 12 * 0.4) / 1000 / 2 = 0.24 tonnes
    expect(result.energy).toBe(0.24);
  });

  it('correctly calculates emissions for a high carbon meat-heavy profile', () => {
    const heavyProfile: FootprintData = {
      householdMembers: 1,
      electricity: 600,
      heatingType: 'gas',
      heatingUsage: 200,
      vehicleType: 'petrol',
      vehicleDistance: 300,
      publicDistance: 0,
      shortFlights: 5,
      longFlights: 2,
      dietType: 'high-meat', // 8.0 kg CO2e/day
      recycleHabits: 'none', // 1.5 kg CO2e/day
      shoppingHabits: 'heavy', // 0.6 tonnes/year
    };

    const result = calculateEmissions(heavyProfile);

    // Verify expectations:
    // Food: (8.0 * 365) / 1000 = 2.92
    expect(result.food).toBe(2.92);

    // Lifestyle: ((1.5 * 365) / 1000) + 0.6 = 0.5475 + 0.6 = 1.15 tonnes
    expect(result.lifestyle).toBe(1.15);

    // Total should be high
    expect(result.total).toBeGreaterThan(10);
  });
});
