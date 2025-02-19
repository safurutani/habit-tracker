import { Component, Input } from '@angular/core';
import { Habit } from '../../models/habit'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-habit',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './habit.component.html',
  styleUrl: './habit.component.scss'
})
export class HabitComponent {
  @Input() habit!: Habit;
}
