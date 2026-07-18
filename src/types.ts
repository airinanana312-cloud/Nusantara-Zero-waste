export interface CarbonInput {
  // Transport
  carDistance: number; // km per week
  carType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  motorbikeDistance: number; // km per week
  publicTransportDistance: number; // km per week (bus/train)
  flightsShort: number; // roundtrips per year (domestic/short-haul < 3 hours)
  flightsLong: number; // roundtrips per year (international > 3 hours)

  // Energy
  electricityBill: number; // kWh per month (or Rp divided by approx 1500)
  lpgCylinders: number; // standard 3kg cylinders or 12kg cylinders equivalent per month
  waterUsage: number; // m3 per month (optional, but good)

  // Food
  meatFrequency: 'every_meal' | 'daily' | 'few_times' | 'rarely' | 'vegan';
  foodWaste: 'high' | 'medium' | 'low' | 'zero'; // food waste habits
  localFoodRatio: number; // percentage of local food purchased (0-100)

  // Waste & Lifestyle
  plasticBottles: number; // bottles thrown away per week
  plasticBags: number; // bags used per week
  wasteSorting: 'none' | 'partial' | 'full'; // recycling habit
}

export interface EmissionBreakdown {
  transport: number; // kg CO2e / year
  energy: number; // kg CO2e / year
  food: number; // kg CO2e / year
  waste: number; // kg CO2e / year
  total: number; // kg CO2e / year
}

export interface Pledge {
  id: string;
  title: string;
  description: string;
  category: 'transport' | 'energy' | 'food' | 'waste';
  co2Reduction: number; // kg CO2e saved per year
  iconName: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface AlternativeItem {
  id: string;
  original: string;
  alternative: string;
  why: string;
  impact: string;
  category: 'dapur' | 'kamar_mandi' | 'belanja' | 'bepergian';
}
