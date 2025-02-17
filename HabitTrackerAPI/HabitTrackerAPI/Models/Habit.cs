namespace HabitTrackerAPI.Models
{
    public class Habit
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = null;
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public int Goal { get; set; } = 1;
        public int Frequency { get; set; } = 1; 
        public string FrequencyUnit { get; set; }
        public int TotalCompleted { get; set; } = 0;
        public DateTime? LastCompleted { get; set; }
        public bool IsActive { get; set; } = true;
        public int Streak { get; set; } = 0;
        public int LongestStreak { get; set; } = 0;

    }
}
