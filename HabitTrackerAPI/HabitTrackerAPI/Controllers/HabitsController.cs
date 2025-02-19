using HabitTrackerAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HabitTrackerAPI.Models;
namespace HabitTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HabitsController : ControllerBase
    {
        private readonly HabitTrackerDbContext _context;
        public HabitsController(HabitTrackerDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Habit>>> GetHabits()
        {
            return await _context.Habits.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Habit>> GetHabit(int id)
        {
            var habit = await _context.Habits.FindAsync(id);
            if (habit == null)
            {
                return NotFound();
            }
            return habit;
        }

        [HttpPost]
        public async Task<ActionResult<Habit>> CreateHabit(Habit habit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.Habits.Add(habit);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetHabit), new { id = habit.Id }, habit);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHabit(int id, [FromBody] Habit habit)
        {
            if (id != habit.Id)
            {
                return BadRequest();
            }
            _context.Entry(habit).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        public class UpdateProgressDto
        {
            public bool Increment { get; set; }
        }

        [HttpPut("UpdateProgress/{id}")]
        public async Task<IActionResult> UpdateProgress(int id, [FromBody] UpdateProgressDto request)
        {   if (request == null)
            {
                return BadRequest("Request body cannot be null.");
            }
            var habit = await _context.Habits.FindAsync(id);
            if (habit == null)
            {
                return NotFound();
            }
            bool increment = request.Increment;
            DateTime today = DateTime.UtcNow.Date;

            // Increment
            if (increment)
            {
                habit.TotalCompleted++;

                // Update streak if next day
                if (habit.LastCompleted.HasValue && habit.LastCompleted.Value.Date == today.AddDays(-1))
                {
                    habit.Streak++;
                }

                // Reset streak if last completed was not yesterday
                else
                {
                    habit.Streak = 1; 
                }

                // Update longest streak
                if (habit.Streak > habit.LongestStreak)
                {
                    habit.LongestStreak = habit.Streak;
                }

                habit.LastCompleted = today;
            }
            // Decrement
            else
            {
                if (habit.TotalCompleted > 0)
                {
                    habit.TotalCompleted--;
                }
                if (habit.LastCompleted.HasValue && habit.LastCompleted.Value.Date == today)
                {
                    habit.Streak = Math.Max(0, habit.Streak - 1);
                }
                habit.LastCompleted = null;
            }
            _context.Entry(habit).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHabit(int id)
        {
            var habit = await _context.Habits.FindAsync(id);
            if (habit == null)
            {
                return NotFound();
            }
            _context.Habits.Remove(habit);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
