import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-habit-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatSlideToggleModule, FormsModule],
  templateUrl: './habit-details.component.html',
  styleUrl: './habit-details.component.scss'
})
export class HabitDetailsComponent implements OnInit {
  habit!: Habit;
  constructor(private route: ActivatedRoute, private habitService: HabitService) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.habitService.getHabitById(id).subscribe((data: Habit) => {
        this.habit = data;
      });
    }
  }
  onChange(isActive: boolean) {
    const updatedHabit = { ...this.habit, isActive };
    this.habitService.updateHabit(this.habit.id!, updatedHabit).subscribe({
      next: () => console.log('Habit updated:', this.habit.isActive),
      error: (err) => console.error('Error updating habit:', err),
    });
  }
}
