import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormDialogComponent } from './task-form-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

describe('TaskFormDialogComponent', () => {
  let component: TaskFormDialogComponent;
  let fixture: ComponentFixture<TaskFormDialogComponent>;
  let dialogRef: MatDialogRef<TaskFormDialogComponent>;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj(MatDialogRef, ['close']);

    await TestBed.configureTestingModule({
      declarations: [TaskFormDialogComponent],
      imports: [MatDialogModule, ReactiveFormsModule],
      providers: [
        {
          provide: MatDialogRef, useValue: dialogRef
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when confirming', () => {
    component.onSubmit();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
