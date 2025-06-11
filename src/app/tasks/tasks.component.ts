import {
  Component,
  computed,
  Input,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { userType } from '../app.component';
import { TaskComponent } from './task/task.component';
import { dummyTasks } from '../dummy-tasks';
import {
  NewTaskBarComponent,
  newTaskType,
} from './new-task-bar/new-task-bar.component';
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
  tasksOrigin: WritableSignal<TaskType[]> = signal(dummyTasks);
  isNewTaskSelected = false;

  tasks = computed(() =>
    this.tasksOrigin().filter((task) => this.user?.()?.id === task.userId)
  );

  removeTask(taskId: string) {
    const updated = this.tasksOrigin().filter((task) => task.id !== taskId);
    this.tasksOrigin.set(updated);
  }

  onSelectNewTask() {
    this.isNewTaskSelected = true;
  }
  onSelectClose() {
    this.isNewTaskSelected = false;
  }
  addTaskToUser(event: newTaskType) {
    const newTask: TaskType = {
      id: crypto.randomUUID(),
      userId: this.user?.()?.id || '',
      title: event.taskTiltle,
      dueDate: event.dueDate,
      summary: event.taskSummary,
      isDone: false,
    };
    this.tasksOrigin.set([...this.tasksOrigin(), newTask]);
    console.log('New task added:', this.tasksOrigin());
    this.isNewTaskSelected = false;
  }
}
