import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import { TaskListComponent } from './task-list.component';
import { MatCardModule } from '@angular/material/card';
import { TaskCardComponent } from './task-card/task-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    TaskListRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class TaskListModule { }
