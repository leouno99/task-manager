import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardComponent } from './task-card.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', {
      editTask: of(true)
    });

    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [TaskCardComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TaskCardComponent);
        component = fixture.componentInstance;
        taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    component.task = {
      id: 1,
      name: "Mock Task test",
      description: "This is a mocked Task object",
      done: false
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alternate task done value', () => {
    let currentValue = component.task.done;
    component.onStatusChange();
    expect(component.task.done).not.toEqual(currentValue);
  });

  it('should edit task', () => {
    taskService.editTask.and.returnValue(of(true));

    let newTask = {
      id: 1,
      name: 'Mock task',
      description: 'This is a mock task',
      done: false
    }

    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(newTask)
    } as MatDialogRef<unknown>)

    component.onEditTask();

    expect(taskService.editTask).toHaveBeenCalledWith(1, newTask);
  });

  it('should emit event on delete', () => {
    spyOn(component.deleteTask, 'emit');
 
    component.onDeleteTask();
 
    expect(component.deleteTask.emit).toHaveBeenCalled();
 });
});
