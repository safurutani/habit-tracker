namespace HabitTrackerAPI.Models
{
    public class HabitCompletionDto
    {
        public int Id { get; set; }
        public int HabitId { get; set; }
        public DateTime CompletedOn { get; set; }
        public string? HabitName { get; set; } = string.Empty;
        public string? HabitColor { get; set; } = "#FF0000";
    }
}