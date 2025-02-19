import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Habit } from '../../models/habit';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-active-habit',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './active-habit.component.html',
  styleUrl: './active-habit.component.scss'
})
export class ActiveHabitComponent {
  @Input() habit!: Habit;
  habitId!: number;
  constructor(private habitService: HabitService, private cdRef: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.habitId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Habit ID:', this.habit.id);
  }

  updateProgress(increment: boolean) {
    if (!this.habit) {
      console.error('Error: Habit is undefined');
      return;
    }

    this.habitService.updateProgress(this.habit.id!, increment).subscribe({
      next: () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        if (increment) {
          this.habit.totalCompleted++;
          this.habit.lastCompleted = new Date();
          console.log(yesterday.toDateString());
          console.log(this.habit.lastCompleted.toDateString() === yesterday.toDateString());
          console.log(this.habit.lastCompleted.toDateString());
          if (this.habit.lastCompleted.toDateString() === yesterday.toDateString() || this.habit.lastCompleted.toDateString() === null) {
            this.habit.streak++;
          }
          else if (this.habit.lastCompleted.toDateString() !== yesterday.toDateString()) {
            this.habit.streak = 1;
          }
        } else {
          if (this.habit.totalCompleted > 0) {
            this.habit.totalCompleted--;
          }
          if (this.habit.streak > 0) {
            this.habit.streak--;
          }
        }
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error updating habit:', err);
      }
    });
  }
}
