
import { Injectable } from '@angular/core'

export interface Task {
  id: number
  title: string
  subject: string
  dueDate: string
  completed: boolean
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Resolver ejercicios de cálculo',
      subject: 'Cálculo Vectorial',
      dueDate: '28 oct. 2026',
      completed: false,
    },
    {
      id: 2,
      title: 'Estudiar arquitectura de datos',
      subject: 'Arquitectura de Datos',
      dueDate: '29 oct. 2026',
      completed: false,
    },
    {
      id: 3,
      title: 'Preparar práctica de redes',
      subject: 'Redes de Computadores',
      dueDate: '30 oct. 2026',
      completed: true,
    },
  ]

  getTasks(): Task[] {
    return this.tasks
  }

  getTaskById(id: number): Task | undefined {
  return this.tasks.find((task) => task.id === id)
}

  toggleTask(id: number): void {
    const task = this.tasks.find((item) => item.id === id)

    if (task) {
      task.completed = !task.completed
    }
  }
}
