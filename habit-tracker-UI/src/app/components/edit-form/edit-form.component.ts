import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Habit } from '../../models/habit';
import { HabitService } from '../../services/habit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss'
})
export class EditFormComponent implements OnInit{
  editForm!: FormGroup;
  habit!: Habit;
  habitId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private habitService: HabitService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get habit id from the route
    this.habitId = Number(this.route.snapshot.paramMap.get('id'));

    // initialize the edit form
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      goal: ['', [Validators.required, Validators.min(1)]],
      frequency: ['', [Validators.required, Validators.min(1)]],
      frequencyUnit: ['', Validators.required]
    });

    // populate form with existing habit data
    this.habitService.getHabitById(this.habitId).subscribe((data: Habit) => {
      this.habit = data;
      this.editForm = this.formBuilder.group({
        name: [this.habit.name, Validators.required],
        description: [this.habit.description],
        goal: [this.habit.goal, [Validators.required, Validators.min(1)]],
        frequency: [this.habit.frequency, [Validators.required, Validators.min(1)]],
        frequencyUnit: [this.habit.frequencyUnit, Validators.required]
      });
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      // create a new habit object with the form values
      const updatedHabit: Habit = {
        id: this.habitId,
        ...this.editForm.value,
      };
      // update the habit using the HabitService
      this.habitService.updateHabit(updatedHabit.id!, updatedHabit).subscribe(response => {
        console.log('Habit updated', response);

        // navigate back to the habit details page
        this.router.navigate(['/habit', this.habitId]);
      });

      
    }
  }
}
