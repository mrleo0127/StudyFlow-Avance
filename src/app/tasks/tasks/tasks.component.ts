
import { Component } from '@angular/core'
import { Application, isAndroid } from '@nativescript/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { TasksService, Task } from '../tasks.service'

@Component({
  standalone: false,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: Task[]
  platformMessage = ''

  constructor(private tasksService: TasksService) {
    this.tasks = this.tasksService.getTasks()

    if (isAndroid) {
      this.platformMessage = 'StudyFlow para Android'
    }
  }

  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer
    sideDrawer.showDrawer()
  }

  toggleTask(id: number): void {
    this.tasksService.toggleTask(id)
  }

refreshList(args: any): void {
  const pullRefresh = args.object;

  const newTask: Task = {
    id: Date.now(),
    title: 'Nueva tarea ' + (this.tasks.length + 1),
    subject: 'General',
    dueDate: 'Por definir',
    completed: false,
  };

  this.tasks.push(newTask);
  pullRefresh.refreshing = false;
}

  get pendingCount(): number {
    return this.tasks.filter((task) => !task.completed).length
  }
}


