import { Component } from '@angular/core'
import { Application, isAndroid } from '@nativescript/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { TasksService, Task } from '../tasks.service'
import { RouterExtensions } from '@nativescript/angular'

@Component({
  standalone: false,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: Task[]
  platformMessage = ''

  constructor(
  private tasksService: TasksService,
  private routerExtensions: RouterExtensions
) {
  this.tasks = this.tasksService.getTasks()

  if (isAndroid) {
    this.platformMessage = 'StudyFlow para Android'
  }
}

openTaskDetail(id: number): void {
  this.routerExtensions.navigate(['/tasks', id], {
    transition: {
      name: 'fade',
    },
  })
}

  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer
    sideDrawer.showDrawer()
  }


toggleTask(id: number): void {
  this.tasksService.toggleTask(id)

  const task = this.tasks.find((item) => item.id === id)

  if (task && isAndroid) {
    const message = task.completed
      ? 'Tarea completada'
      : 'Tarea pendiente'

    android.widget.Toast.makeText(
      Application.android.context,
      message,
      android.widget.Toast.LENGTH_SHORT
    ).show()
  }
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


