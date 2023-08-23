import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  taskList: Task[] = [
    {
      name: "Criar um aplicativo de gerenciamento de tarefas",
      description: "Este portal precisará visualizar, criar, editar e apagar tarefas, assim como ter uma tela de login para acesso e criação de usuários",
      done: false
    },
    {
      name: "Criar um aplicativo de gerenciamento de tarefas",
      description: "Este portal precisará visualizar, criar, editar e apagar tarefas, assim como ter uma tela de login para acesso e criação de usuários",
      done: false
    },
    {
      name: "Criar um aplicativo de gerenciamento de tarefas",
      description: "Este portal precisará visualizar, criar, editar e apagar tarefas, assim como ter uma tela de login para acesso e criação de usuários",
      done: false
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
