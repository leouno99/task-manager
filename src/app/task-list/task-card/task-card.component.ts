import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input() task!: Task

  constructor() { }

  ngOnInit(): void {
  }

}
