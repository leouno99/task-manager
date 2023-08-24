import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { TaskFormDialogComponent } from '../dialogs/task-form-dialog/task-form-dialog.component';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input() task!: Task;
  @Output() editTask = new EventEmitter();
  @Output() deleteTask = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService
  ) { }

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
      dialogRes => {
        if (dialogRes) {
          this.taskService.editTask(this.task.id, dialogRes).subscribe(
            res => {
              if (res) {
                this.editTask.emit();
              }
            }
          );
        }
      }
    )
  }

  onDeleteTask() {
    this.deleteTask.emit();
  }

}
