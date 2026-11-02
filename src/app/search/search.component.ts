import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { TasksService, Task } from '../tasks/tasks.service'

@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  searchText = ''
  tasks: Task[] = []

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks()
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  get filteredTasks(): Task[] {
    const search = this.searchText.toLowerCase().trim()

    if (!search) {
      return this.tasks
    }

    return this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(search) ||
        task.subject.toLowerCase().includes(search)
    )
  }
}
