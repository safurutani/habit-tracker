import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Habit } from '../../models/habit';
import { HabitService } from '../../services/habit.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'; 
@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule],
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.scss'
})
export class HabitFormComponent {
  habitForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private habitService: HabitService) {
    this.habitForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      goal: [1, [Validators.required, Validators.min(1)]],
      frequency: [1, [Validators.required, Validators.min(1)]],
      frequencyUnit: ['Day', Validators.required],

      // Not shown in form
      startDate: [new Date()],
      isActive: [true],
      totalCompleted: [0],
      lastCompleted: [null],
      streak: [0],
      longestStreak: [0]
    });
  }

  onSubmit() {
    if (this.habitForm.valid) {
      const newHabit: Habit = {
        name: this.habitForm.value.name,
        description: this.habitForm.value.description || '',
        startDate: new Date,
        goal: this.habitForm.value.goal,
        frequency: this.habitForm.value.frequency,
        frequencyUnit: this.habitForm.value.frequencyUnit,

        // Not shown in form
        totalCompleted: 0,
        lastCompleted: null,
        isActive: true,
        streak: 0,
        longestStreak: 0
      };
      this.habitService.createHabit(newHabit).subscribe(response => {
        console.log('Habit created', response);
        this.habitForm.reset();
      });
    }
  }
}
