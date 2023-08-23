import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { TaskFormDialogComponent } from '../dialogs/task-form-dialog/task-form-dialog.component';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onStatusChange() {
    this.task.done = !this.task.done;
  }

  onEditTask() {
    let dialogRef = this.dialog.open(TaskFormDialogComponent, {
      width: "600px",
      autoFocus: false,
      data: this.task
    })

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.task = res;
        }
      }
    )
  }

  onDeleteTask() {
    this.deleteTask.emit();
  }

}
