namespace HabitTrackerAPI.Models
{
    public class HabitCompletion
    {
        public int Id { get; set; }
        public int HabitId { get; set; }
        public DateTime CompletedOn { get; set; }
    }
}