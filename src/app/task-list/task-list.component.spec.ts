import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', {
      getTasks: of([]),
      registerTask: of(true),
      deleteTask: of(true)
    });

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [TaskListComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;
        taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add task', () => {
    taskService.registerTask.and.returnValue(of(true));

    let newTask = {
      id: 0,
      name: 'Mock task',
      description: 'This is a mock task',
      done: false
    }

    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(newTask)
    } as MatDialogRef<unknown>);

    component.onAddTask();

    expect(taskService.registerTask).toHaveBeenCalledWith(newTask);
  });

  it('should delete task', () => {
    taskService.deleteTask.and.returnValue(of(true));

    component.onDeleteTask(0);

    expect(taskService.deleteTask).toHaveBeenCalledWith(0);
  });
});
