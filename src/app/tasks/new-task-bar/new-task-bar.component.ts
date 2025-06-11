import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
export interface newTaskType {
  taskTiltle: string;
  taskSummary: string;
  dueDate: string;
}
@Component({
  selector: 'app-new-task-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task-bar.component.html',
  styleUrl: './new-task-bar.component.css',
})
export class NewTaskBarComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<newTaskType>();
  taskTitle = '';
  taskSummary = '';
  dueDate = '';

  onClose() {
    this.close.emit();
  }
  onSubmit() {
    this.submit.emit({
      taskTiltle: this.taskTitle,
      taskSummary: this.taskSummary,
      dueDate: this.dueDate,
    });
  }
}
