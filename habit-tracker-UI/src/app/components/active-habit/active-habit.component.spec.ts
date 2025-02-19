import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveHabitComponent } from './active-habit.component';

describe('ActiveHabitComponent', () => {
  let component: ActiveHabitComponent;
  let fixture: ComponentFixture<ActiveHabitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveHabitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
