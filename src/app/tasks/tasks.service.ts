import { Injectable, signal, WritableSignal } from '@angular/core';
import { TaskType } from './tasks.component';
import { dummyTasks } from '../dummy-tasks';
import { NewTaskType } from './new-task-bar/new-task-bar.component';
export function storeData(data: TaskType[]) {
  localStorage.setItem('tasks', JSON.stringify(data));
}
export function loadData(): TaskType[] {
  const data = localStorage.getItem('tasks');
  return !data ? dummyTasks : JSON.parse(data);
}

@Injectable({ providedIn: 'root' })
export class TasksService {
  tasksOrigin: WritableSignal<TaskType[]> = signal(dummyTasks);
  public isNewTaskSelected = false;
  constructor() {}
  loadTasks() {
    this.tasksOrigin.set(loadData());
  }

  getTasks(userId: string) {
    return this.tasksOrigin().filter((task) => userId === task.userId);
  }

  removeTask(taskId: string) {
    const updated = this.tasksOrigin().filter((task) => task.id !== taskId);
    this.tasksOrigin.set(updated);
    this.saveTasks();
  }

  addTask(event: NewTaskType, userId: string | null) {
    const newTask: TaskType = {
      id: crypto.randomUUID(),
      userId: userId ?? null,
      title: event.taskTitle,
      dueDate: event.dueDate,
      summary: event.taskSummary,
      isDone: false,
    };
    this.tasksOrigin.set([...this.tasksOrigin(), newTask]);
    this.saveTasks();
  }

  private saveTasks() {
    storeData(this.tasksOrigin());
  }
}
