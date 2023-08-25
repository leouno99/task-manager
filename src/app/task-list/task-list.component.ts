import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormDialogComponent } from './dialogs/task-form-dialog/task-form-dialog.component';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  taskList: Task[] = []

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(
      res => {
        /* istanbul ignore else */
        if (res) {
          this.taskList = res;
        }
      }
    )
  }

  onAddTask() {
    let dialogRef = this.dialog.open(TaskFormDialogComponent, { width: "600px", autoFocus: false });

    dialogRef.afterClosed().subscribe(
      dialogRes => {
        /* istanbul ignore else */
        if (dialogRes) {
          this.taskService.registerTask(dialogRes).subscribe(
            res => {
              /* istanbul ignore else */
              if (res) {
                this.getTasks();
              }
            }
          );
        }
      }
    )
  }

  onDeleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      res => {
        /* istanbul ignore else */
        if (res) {
          this.getTasks();
        }
      }
    )
  }

}
