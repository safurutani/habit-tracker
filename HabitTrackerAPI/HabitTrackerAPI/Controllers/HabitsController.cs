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

        [HttpGet("habit-completions")]
        public async Task<ActionResult<IEnumerable<HabitCompletionDto>>> GetHabitCompletions([FromQuery] int month, [FromQuery] int year)
        {
            // Validate month and year
            if (month < 1 || month > 12 || year < 1)
            {
                return BadRequest("Invalid month or year.");
            }

            // Calculate the start and end dates for the given month and year
            var startDate = new DateTime(year, month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            // Fetch habit completions within the specified month and year
            var habitCompletions = await _context.HabitCompletions
            .Where(hc => hc.CompletedOn >= startDate && hc.CompletedOn <= endDate)
            .Join(
                _context.Habits, 
                hc => hc.HabitId, 
                h => h.Id, 
                (hc, h) => new HabitCompletionDto
                {
                    Id = hc.Id,
                    HabitId = hc.HabitId,
                    CompletedOn = hc.CompletedOn,
                    HabitName = h.Name ?? "Unknown",
                    HabitColor = h.Color ?? "#FF0000"
                }
            )
            .ToListAsync();


            return habitCompletions;
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
            DateTime today = DateTime.Now.Date;

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
                Console.WriteLine($"Today's date: {today}");
                Console.WriteLine($"Last completed date: {habit.LastCompleted}");
                // Add to HabitCompletion table
                HabitCompletion habitCompletion = new HabitCompletion
                {
                    HabitId = habit.Id,
                    CompletedOn = today
                };
                _context.HabitCompletions.Add(habitCompletion);
            }

            // Decrement
            else
            {
                if (habit.TotalCompleted > 0)
                {
                    habit.TotalCompleted--;
                }
                if (habit.TotalCompleted == 0)
                {
                    habit.LastCompleted = null;
                }
                if (habit.LastCompleted.HasValue && habit.LastCompleted.Value.Date == today)
                {
                    habit.Streak = Math.Max(0, habit.Streak - 1);
                }
                

                // Remove the most recent completion log
                var mostRecentCompletion = await _context.HabitCompletions
                    .Where(hc => hc.HabitId == id)
                    .OrderByDescending(hc => hc.CompletedOn)
                    .FirstOrDefaultAsync();

                if (mostRecentCompletion != null)
                {
                    _context.HabitCompletions.Remove(mostRecentCompletion);
                }
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
