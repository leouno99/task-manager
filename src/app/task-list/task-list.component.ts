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
      name: "Funcionalidade de criar uma tarefa",
      description: "Haverá a possibilidade de adicionar tarefas na lista",
      done: false
    },
    {
      name: "Funcionalidade de editar uma tarefa",
      description: "Haverá a possibilidade de editar as tarefas existentes na lista",
      done: false
    },
    {
      name: "Funcionalidade de deletar uma tarefa",
      description: "Haverá a possibilidade de remover uma tarefa da lista",
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

  onDeleteTask(index: number) {
    this.taskList.splice(index, 1);
  }

}
