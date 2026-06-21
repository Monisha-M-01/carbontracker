import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EcoSapling } from './EcoSapling';

describe('EcoSapling mascot companion', () => {
  it('displays correct dialogue text based on stage (mood)', () => {
    // Gloomy Sprout Stage
    const { rerender } = render(<EcoSapling savedCarbon={0} todaySavings={0} />);
    expect(screen.getByText(/Gloomy Sprout/i)).toBeInTheDocument();

    // Happy Sapling Stage
    rerender(<EcoSapling savedCarbon={10} todaySavings={2} />);
    expect(screen.getByText(/Happy Sapling/i)).toBeInTheDocument();
  });
});
