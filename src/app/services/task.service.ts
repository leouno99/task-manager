import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskList: Task[] = [
    {
      id: 0,
      name: "Funcionalidade de criar uma tarefa",
      description: "Haverá a possibilidade de adicionar tarefas na lista",
      done: false
    },
    {
      id: 1,
      name: "Funcionalidade de editar uma tarefa",
      description: "Haverá a possibilidade de editar as tarefas existentes na lista",
      done: false
    },
    {
      id: 2,
      name: "Funcionalidade de deletar uma tarefa",
      description: "Haverá a possibilidade de remover uma tarefa da lista",
      done: false
    }
  ]

  currentId = 3;

  constructor() { }

  getTasks(): Observable<Task[]> {
    return of(this.taskList);
  }

  editTask(newTask: Task): Observable<boolean> {
    let index = this.taskList.findIndex(currentTask => {
      return currentTask.id === newTask.id;
    });

    this.taskList[index] = newTask;
    return of(true);
  }

  registerTask(task: Task): Observable<boolean> {
    let newTask = task;
    newTask.id = this.currentId++;
    this.taskList.push(newTask);
    return of(true);
  }

  deleteTask(id: number): Observable<boolean> {
    let index = this.taskList.findIndex(task => {
      return task.id === id;
    });

    this.taskList.splice(index, 1);
    return of(true);
  }
}
