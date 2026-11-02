import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core'
import { action, alert } from '@nativescript/core'
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
  @Output() detail = new EventEmitter<number>()
  @ViewChild('statusButton') statusButton?: ElementRef

onOpenDetail(): void {
  this.detail.emit(this.task.id)
}

  constructor(private cdr: ChangeDetectorRef) {}

  onToggle(): void {
  const button = this.statusButton?.nativeElement

  if (button) {
    button.rotate = 0

    button.animate({
      rotate: 360,
      duration: 350,
    }).then(() => {
      button.rotate = 0
    })
  }

  this.toggle.emit(this.task.id)
}
  onTitleLongPress(): void {
  alert({
    title: 'Información de la tarea',
    message: this.task.title,
    okButtonText: 'Aceptar',
  })
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



