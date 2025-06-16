import { Component, inject, Input, OnInit, Signal } from '@angular/core';
import { UserType } from '../app.component';
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
export class TasksComponent implements OnInit {
  @Input({ required: true }) user?: Signal<UserType>;

  protected readonly taskService = inject(TasksService);
  removeTask(taskId: string) {
    this.taskService.removeTask(taskId);
  }

  ngOnInit() {
    this.taskService.loadTasks();
  }
  fetchTasks() {
    if (this.user && this.user()?.id) {
      return this.taskService.getTasks(this.user()?.id);
    }
    return undefined;
  }
  onSelectNewTask() {
    this.taskService.isNewTaskSelected = true;
  }
  onSelectClose() {
    this.taskService.isNewTaskSelected = false;
  }
}
