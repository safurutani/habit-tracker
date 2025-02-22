import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActiveHabitComponent } from '../active-habit/active-habit.component';
import { Habit } from '../../models/habit';
import { HabitService } from '../../services/habit.service';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ActiveHabitComponent, MatGridListModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  habits: Habit[] = [];
  constructor(private habitService: HabitService) { }

  ngOnInit(): void {
    this.habitService.getHabits().subscribe((data: Habit[]) => {
      this.habits = data.filter(habit => habit.isActive);
    });
  }
}
