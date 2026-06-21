import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DailyLogger } from './DailyLogger';

describe('DailyLogger component', () => {
  it('renders correct labels and button', () => {
    const mockSave = vi.fn();
    render(<DailyLogger onSaveLog={mockSave} streak={3} />);

    // Check header
    expect(screen.getByText("Record Today's Activities")).toBeInTheDocument();
    
    // Check initial estimated footprint preview exists
    expect(screen.getByText("Estimated Today")).toBeInTheDocument();

    // Check save button
    const saveButton = screen.getByText("Calculate & Log Today's Footprint");
    expect(saveButton).toBeInTheDocument();
  });

  it('calls onSaveLog when clicking calculate button', () => {
    const mockSave = vi.fn();
    render(<DailyLogger onSaveLog={mockSave} streak={3} />);

    const saveButton = screen.getByText("Calculate & Log Today's Footprint");
    fireEvent.click(saveButton);

    expect(mockSave).toHaveBeenCalled();
  });
});
