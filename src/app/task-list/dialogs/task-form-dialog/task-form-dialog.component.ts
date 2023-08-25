import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.scss']
})
export class TaskFormDialogComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    done: new FormControl(false)
  })

  constructor(
    public dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task | undefined
  ) { }

  ngOnInit(): void {
    /* istanbul ignore else */
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }

}
