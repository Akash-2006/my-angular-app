import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { TaskType } from './tasks.component';
import { dummyTasks } from '../dummy-tasks';
import { newTaskType } from './new-task-bar/new-task-bar.component';

@Injectable({ providedIn: 'root' })
export class TasksService {
  tasksOrigin: WritableSignal<TaskType[]> = signal(dummyTasks);
  getTasks(userId: string) {
    return this.tasksOrigin().filter((task) => userId === task.userId);
  }

  removeTask(taskId: string) {
    const updated = this.tasksOrigin().filter((task) => task.id !== taskId);
    this.tasksOrigin.set(updated);
  }

  addTask(event: newTaskType, userId: string) {
    const newTask: TaskType = {
      id: crypto.randomUUID(),
      userId: userId || '',
      title: event.taskTitle,
      dueDate: event.dueDate,
      summary: event.taskSummary,
      isDone: false,
    };
    this.tasksOrigin.set([...this.tasksOrigin(), newTask]);
  }
}
