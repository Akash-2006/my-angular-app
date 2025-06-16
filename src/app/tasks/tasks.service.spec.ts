import { dummyTasks } from '../dummy-tasks';
import { NewTaskType } from './new-task-bar/new-task-bar.component';
import { loadData, TasksService } from './tasks.service';

class FakeLocalStorage {
  private store: Record<string, string> = {};

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}

describe('testing tasks services', () => {
  let taskService: TasksService;
  beforeEach(() => {
    taskService = new TasksService();
  });
  it('should add task', () => {
    const newTask: NewTaskType = {
      taskTitle: 'go to market',
      taskSummary: 'and bye some furits',
      dueDate: '12-01-2024',
    };
    const length = taskService.tasksOrigin().length;
    taskService.addTask(newTask, 'u1');
    expect(taskService.tasksOrigin().length).toEqual(length + 1);
  });
  it('should add task', () => {
    const newTask: NewTaskType = {
      taskTitle: 'go to market',
      taskSummary: 'and bye some furits',
      dueDate: '12-01-2024',
    };
    const length = taskService.tasksOrigin().length;
    taskService.addTask(newTask, null);
    expect(taskService.tasksOrigin().length).toEqual(length + 1);
  });
  it('should remove the task', () => {
    const length = taskService.tasksOrigin().length;
    taskService.removeTask('t1');
    expect(taskService.tasksOrigin().length).toEqual(length - 1);
  });
  it('should get tasks for user', () => {
    const user1Tasks = dummyTasks.filter((task) => task.userId === 'u1');
    const tasks = taskService.getTasks('u1');
    expect(tasks.length).toEqual(user1Tasks.length);
    tasks.forEach((task) => {
      expect(task.userId).toEqual('u1');
    });
  });
});

describe('testing outer local storage functions', () => {
  beforeEach(() => {
    const fakeStorage = new FakeLocalStorage();
    spyOn(localStorage, 'getItem').and.callFake(
      fakeStorage.getItem.bind(fakeStorage)
    );
    spyOn(localStorage, 'setItem').and.callFake(
      fakeStorage.setItem.bind(fakeStorage)
    );
  });
  it('should load dummy data it has no tasks', () => {
    const data = loadData();
    expect(data).toEqual(dummyTasks);
  });

  it('should give data if data is present', () => {
    const mockData = [
      {
        id: 't1',
        userId: 'u1',
        title: 'Test Task',
        dueDate: '2025-06-30',
        summary: '',
        isDone: false,
      },
    ];
    localStorage.setItem('tasks', JSON.stringify(mockData));

    const result = loadData();
    expect(result).toEqual(mockData);
  });
});
