using Microsoft.EntityFrameworkCore;
using HabitTrackerAPI.Models;
namespace HabitTrackerAPI.Data
{
    public class HabitTrackerDbContext : DbContext
    {
        public HabitTrackerDbContext(DbContextOptions<HabitTrackerDbContext> options) : base(options)
        {
        }
        public DbSet<Habit> Habits { get; set; }
        public DbSet<HabitCompletion> HabitCompletions { get; set; }
    }
}
