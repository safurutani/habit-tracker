export interface Habit {
  id?: number;
  name: string;
  description?: string;
  startDate: Date;
  goal: number;
  frequency: number;
  frequencyUnit: string;
  totalCompleted: number;
  lastCompleted: Date | null;
  isActive: boolean;
  streak: number;
  longestStreak: number;
}
