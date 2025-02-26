import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HabitFormComponent } from './components/habit-form/habit-form.component';
import { HabitListComponent } from './components/habit-list/habit-list.component';
import { HabitDetailsComponent } from './components/habit-details/habit-details.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { CalendarComponent } from './components/calendar/calendarComponent';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'habits', component: HabitListComponent },
  { path: 'habit/:id', component: HabitDetailsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'create-habit', component: HabitFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'edit/:id', component: EditFormComponent }, 
  { path: '**', redirectTo: 'dashboard' } // Wildcard route 
];
