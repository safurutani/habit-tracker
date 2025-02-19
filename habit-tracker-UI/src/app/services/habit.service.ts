import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habit } from '../models/habit';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(this.apiUrl);
  }

  getHabitById(id: number): Observable<Habit> {
    return this.http.get<Habit>(`${this.apiUrl}/${id}`);
  }

  getActiveHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${this.apiUrl}/GetActiveHabits`);
  }

  createHabit(habit: Habit): Observable<Habit> {
    const habitDateFormatted = {
      ...habit,
      date: habit.startDate.toISOString()
    }
    return this.http.post<Habit>(this.apiUrl, habitDateFormatted);
  }

  updateHabit(id: number, habit: Habit): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, habit);
  }

  updateProgress(id: number, increment: boolean): Observable<Habit> {
    return this.http.put<Habit>(`${this.apiUrl}/UpdateProgress/${id}`, {increment});
  }

  deleteHabit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
