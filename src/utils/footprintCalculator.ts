import type { FootprintData } from '../components/Wizard';

export interface EmissionsBreakdown {
  energy: number; // tonnes CO2e
  transport: number; // tonnes CO2e
  food: number; // tonnes CO2e
  lifestyle: number; // tonnes CO2e
  total: number; // tonnes CO2e
}

export const calculateEmissions = (data: FootprintData): EmissionsBreakdown => {
  // 1. Energy
  const electricityEmissions = (data.electricity * 12 * 0.4) / 1000; // kg to tonnes
  let heatingEmissions = 0;
  if (data.heatingType === 'gas') {
    heatingEmissions = (data.heatingUsage * 12 * 2.0) / 1000;
  } else if (data.heatingType === 'oil') {
    heatingEmissions = (data.heatingUsage * 12 * 2.5) / 1000;
  } else if (data.heatingType === 'lpg') {
    heatingEmissions = (data.heatingUsage * 12 * 1.6) / 1000;
  }
  const totalEnergy = (electricityEmissions + heatingEmissions) / data.householdMembers;

  // 2. Transport
  let vehicleFactor = 0;
  if (data.vehicleType === 'petrol') vehicleFactor = 0.19;
  else if (data.vehicleType === 'diesel') vehicleFactor = 0.18;
  else if (data.vehicleType === 'hybrid') vehicleFactor = 0.11;
  else if (data.vehicleType === 'ev') vehicleFactor = 0.05;
  
  const vehicleEmissions = (data.vehicleDistance * 52 * vehicleFactor) / 1000;
  const publicEmissions = (data.publicDistance * 52 * 0.04) / 1000;
  const flightEmissions = ((data.shortFlights * 300 * 0.15) + (data.longFlights * 3000 * 0.11)) / 1000;
  const totalTransport = vehicleEmissions + publicEmissions + flightEmissions;

  // 3. Food
  let dietDailyEmissions = 5.5; // default
  if (data.dietType === 'high-meat') dietDailyEmissions = 8.0;
  else if (data.dietType === 'average') dietDailyEmissions = 5.5;
  else if (data.dietType === 'flexitarian') dietDailyEmissions = 3.8;
  else if (data.dietType === 'vegetarian') dietDailyEmissions = 2.8;
  else if (data.dietType === 'vegan') dietDailyEmissions = 1.8;
  
  const totalFood = (dietDailyEmissions * 365) / 1000;

  // 4. Lifestyle / Waste
  let wasteDailyEmissions = 1.5;
  if (data.recycleHabits === 'active') wasteDailyEmissions = 1.0;
  else if (data.recycleHabits === 'partial') wasteDailyEmissions = 1.3;
  
  let shoppingAddon = 0; // tonnes/year
  if (data.shoppingHabits === 'minimalist') shoppingAddon = -0.2;
  else if (data.shoppingHabits === 'heavy') shoppingAddon = 0.6;
  
  const totalLifestyle = ((wasteDailyEmissions * 365) / 1000) + shoppingAddon;

  const total = totalEnergy + totalTransport + totalFood + Math.max(0.1, totalLifestyle);

  return {
    energy: parseFloat(totalEnergy.toFixed(2)),
    transport: parseFloat(totalTransport.toFixed(2)),
    food: parseFloat(totalFood.toFixed(2)),
    lifestyle: parseFloat(Math.max(0.1, totalLifestyle).toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
};
