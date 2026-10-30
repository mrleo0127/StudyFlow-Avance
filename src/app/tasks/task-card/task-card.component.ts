
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core'
import { action } from '@nativescript/core'
import { Task } from '../tasks.service'

@Component({
  standalone: false,
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input() task!: Task
  @Output() toggle = new EventEmitter<number>()

  constructor(private cdr: ChangeDetectorRef) {}

  onToggle(): void {
    this.toggle.emit(this.task.id)
  }

  async onChangeCategory(): Promise<void> {
    const categories = [
      'Cálculo Vectorial',
      'Arquitectura de Datos',
      'Redes de Computadores',
      'General',
    ]

    const selected = await action({
      title: 'Cambiar categoría',
      message: 'Selecciona la categoría de la tarea:',
      cancelButtonText: 'Cancelar',
      actions: categories,
    })

    if (selected && categories.includes(selected)) {
      this.task.subject = selected
      this.cdr.detectChanges()
    }
  }
}



