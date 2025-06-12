import { Component, inject, Input, Signal } from '@angular/core';
import { userType } from '../app.component';
import { TaskComponent } from './task/task.component';
import { NewTaskBarComponent } from './new-task-bar/new-task-bar.component';
import { TasksService } from './tasks.service';
export interface TaskType {
  id: string;
  userId: string;
  title: string;
  dueDate: string;
  summary: string;
  isDone: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskBarComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) user?: Signal<userType>;
  isNewTaskSelected = false;
  private taskService = inject(TasksService);
  removeTask(taskId: string) {
    this.taskService.removeTask(taskId);
  }

  fetchTasks() {
    if (this.user && this.user()?.id) {
      return this.taskService.getTasks(this.user()?.id);
    }
    return;
  }
  onSelectNewTask() {
    this.isNewTaskSelected = true;
  }
  onSelectClose() {
    this.isNewTaskSelected = false;
  }
}
