import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TaskType } from '../tasks.component';
export interface newTaskType {
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
  private taskService = inject(TasksService);

  onClose() {
    this.close.emit();
  }

  addTaskToUser(newTask: newTaskType) {
    this.taskService.addTask(newTask, this.userId || '');
  }

  onSubmit() {
    if (!this.taskTitle || !this.taskSummary || !this.dueDate) {
      alert('❌ Validation failed');
      return;
    }
    const newTask: newTaskType = {
      taskTitle: this.taskTitle,
      dueDate: this.dueDate,
      taskSummary: this.taskSummary,
    };
    this.addTaskToUser(newTask);
  }
}
