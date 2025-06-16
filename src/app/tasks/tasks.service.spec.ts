import { dummyTasks } from '../dummy-tasks';
import { NewTaskType } from './new-task-bar/new-task-bar.component';
import { TasksService } from './tasks.service';

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
    taskService.addTask(newTask, '');
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
