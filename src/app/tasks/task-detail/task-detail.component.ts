import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { Task, TasksService } from '../tasks.service'

@Component({
  standalone: false,
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
})
export class TaskDetailComponent implements OnInit {
  task?: Task

  constructor(
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.task = this.tasksService.getTaskById(id)
  }

  goBack(): void {
    this.routerExtensions.back()
  }
}