import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormDialogComponent } from './dialogs/task-form-dialog/task-form-dialog.component';

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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onAddTask() {
    let dialogRef = this.dialog.open(TaskFormDialogComponent, { width: "600px", autoFocus: false });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.taskList.push(res);
        }
      }
    )
  }

}
