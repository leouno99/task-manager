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
      name: "Criar aplicativo de gerenciamento de tarefas",
      description: "Criar um aplicativo em Angular que seja capaz de listar, criar, editar e excluir tarefas",
      done: true
    },
    {
      id: 1,
      name: "Fazer compras",
      description: "Ir fazer compras no shopping",
      done: false
    }
  ]

  currentId = 2;

  constructor() { }

  getTasks(): Observable<Task[]> {
    return of(this.taskList);
  }

  editTask(id: number, task: Task): Observable<boolean> {
    let index = this.taskList.findIndex(task => {
      return task.id === id;
    });

    this.taskList[index] = task;
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
