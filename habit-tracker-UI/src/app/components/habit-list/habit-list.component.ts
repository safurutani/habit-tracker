import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit';
import { CommonModule } from '@angular/common';
import { HabitComponent } from '../habit/habit.component';
import { RouterLink } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, HabitComponent, RouterLink, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './habit-list.component.html',
  styleUrl: './habit-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HabitListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'frequency', 'totalCompleted', 'streak','active'];
  dataSource = new MatTableDataSource<Habit>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private habitService: HabitService) { }

  ngOnInit(): void {
    this.habitService.getHabits().subscribe((data: Habit[]) => {
      console.log("Fetched habits:", data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

}
