import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, CalendarModule, CalendarView, CalendarUtils, CalendarA11y, CalendarDateFormatter, CalendarEventTitleFormatter } from 'angular-calendar';
import { HabitService } from '../../services/habit.service';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { startOfMonth, endOfMonth } from 'date-fns';


@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [CommonModule, CalendarModule],
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    providers: [{ provide: DateAdapter, useFactory: adapterFactory }, CalendarUtils, CalendarA11y, CalendarDateFormatter, CalendarEventTitleFormatter]
})
export class CalendarComponent implements OnInit {
    view: CalendarView = CalendarView.Month;
    viewDate: Date = new Date();
    events: CalendarEvent[] = [];

    constructor(private habitService: HabitService) { }

    ngOnInit(): void {
        this.loadHabitCompletions();
    }

    loadHabitCompletions(): void {
      const startDate = startOfMonth(this.viewDate);
      const month = startDate.getMonth() + 1; 
      const year = startDate.getFullYear();

      this.habitService.getHabitCompletions(month, year).subscribe({
        next: (completions) => {
          this.events = completions.map((completion) => ({
            start: new Date(completion.completedOn),
            title: completion.habitName,
            color: {
              primary: '#ad2121',
              secondary: '#FAE3E3',
            },
          }));
        },
        error: (err) => {
          console.error('Error fetching habit completions:', err);
        },
      });
    }

    onViewDateChange(date: Date): void {
        this.viewDate = date;
        this.loadHabitCompletions();
    }
}
