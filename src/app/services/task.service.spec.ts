import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { Task } from '../models/task';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
    service.taskList = [
      {
        id: 0,
        name: "Mock task",
        description: "This is a mock test",
        done: false
      }
    ]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list all tasks', (done: DoneFn) => {
    expect(service.getTasks().subscribe(
      res => {
        expect(res).toEqual([{
          id: 0,
          name: "Mock task",
          description: "This is a mock test",
          done: false
        }]);
        done();
      }
    ))
  });

  it('should create a new task', (done: DoneFn) => {
    let newTask: Task = {
      id: 1,
      name: "New mock task",
      description: "This is a new mock task",
      done: false
    };

    expect(service.registerTask(newTask).subscribe(
      () => {
        expect(service.taskList[1]).toEqual(newTask);
        done();
      }
    ));
  });

  it('should edit an existing task', (done: DoneFn) => {
    let newTask: Task = {
      id: 0,
      name: "Edited mock task",
      description: "This is a new mock task",
      done: false
    };

    expect(service.editTask(0, newTask).subscribe(
      () => {
        expect(service.taskList[0]).toEqual(newTask);
        done();
      }
    ));
  })

  it('should delete an existing task', (done: DoneFn) => {
    let currentListSize = service.taskList.length;

    expect(service.deleteTask(0).subscribe(
      () => {
        expect(service.taskList.length).toEqual(currentListSize - 1);
        done();
      }
    ));
  });
});
