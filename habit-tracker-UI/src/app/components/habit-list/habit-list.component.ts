import { Component, OnInit } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit';
import { CommonModule } from '@angular/common';
import { HabitComponent } from '../habit/habit.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, HabitComponent, RouterLink],
  templateUrl: './habit-list.component.html',
  styleUrl: './habit-list.component.scss'
})
export class HabitListComponent implements OnInit {
  habits: Habit[] = [];
  constructor(private habitService: HabitService) { }

  ngOnInit(): void {
    this.habitService.getHabits().subscribe((data: Habit[]) => {
      this.habits = data;
    });
  }
}
