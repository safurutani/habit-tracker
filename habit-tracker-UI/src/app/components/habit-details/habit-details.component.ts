import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-habit-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatSlideToggleModule, FormsModule, MatButtonModule],
  templateUrl: './habit-details.component.html',
  styleUrl: './habit-details.component.scss'
})
export class HabitDetailsComponent implements OnInit {
  habit!: Habit;
  constructor(private route: ActivatedRoute, private router: Router, private habitService: HabitService) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.habitService.getHabitById(id).subscribe((data: Habit) => {
        this.habit = data;
      });
    }
  }

  // update the habit's isActive property
  onChange(isActive: boolean) {
    const updatedHabit = { ...this.habit, isActive };
    this.habitService.updateHabit(this.habit.id!, updatedHabit).subscribe({
      next: () => console.log('Habit updated:', this.habit.isActive),
      error: (err) => console.error('Error updating habit:', err),
    });
  }

  // delete the habit
  onDelete() {
    this.habitService.deleteHabit(this.habit.id!).subscribe({
      next: () => {
        console.log('Habit deleted:', this.habit.id);
        // navigate to the habits page and refresh the list
        this.router.navigate(['/habits'], { state: { refresh: true } });
      },
      error: (err) => console.error('Error deleting habit:', err),
    });
  }
}
