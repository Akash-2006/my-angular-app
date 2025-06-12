import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
export interface NewTaskType {
  taskTitle: string;
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
  @Input({ required: true }) userId?: string;
  taskTitle = '';
  taskSummary = '';
  dueDate = '';
  private readonly taskService = inject(TasksService);

  onClose() {
    this.close.emit();
  }

  addTaskToUser(newTask: NewTaskType) {
    this.taskService.addTask(newTask, this.userId ?? '');
    this.taskService.isNewTaskSelected = false;
  }

  onSubmit() {
    if (!this.taskTitle || !this.taskSummary || !this.dueDate) {
      alert('❌ Validation failed');
      return;
    }
    const newTask: NewTaskType = {
      taskTitle: this.taskTitle,
      dueDate: this.dueDate,
      taskSummary: this.taskSummary,
    };
    this.addTaskToUser(newTask);
  }
}
