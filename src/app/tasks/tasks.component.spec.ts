import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task/task.component';
import { DebugElement, signal } from '@angular/core';
import { UserType } from '../app.component';
import { TasksService } from './tasks.service';
import { TasksComponent } from './tasks.component';

class MockTasksService {
  isNewTaskSelected = false;
  removeTask = jasmine.createSpy('removeTask');
  getTasks = jasmine.createSpy('getTasks').and.returnValue([]);
  loadTasks = jasmine.createSpy('load tasks');
}

describe('tasks Componet', () => {
  let fixture: ComponentFixture<TasksComponent>;
  let component: TasksComponent;
  let mockService: MockTasksService;
  const mockUser = signal<UserType>({
    id: 'u1',
    name: 'Test User',
    avatar: 'test.jpg',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
      providers: [{ provide: TasksService, useClass: MockTasksService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    component.user = mockUser;
    mockService = TestBed.inject(TasksService) as unknown as MockTasksService;

    fixture.detectChanges();
  });

  it('should fetch all the user', () => {
    component.fetchTasks();
    expect(mockService.getTasks).toHaveBeenCalledWith(mockUser().id);
  });
  it('should return undefined if user is not present', () => {
    component.user = undefined;
    fixture.detectChanges();
    expect(component.fetchTasks()).toBeFalsy();
  });
  it('should call removeTask function', () => {
    component.removeTask('t1');
    expect(mockService.removeTask).toHaveBeenCalled();
  });
  it('should isNewTaskSelected become false if we click on the close tag', () => {
    mockService.isNewTaskSelected = true;
    component.onSelectClose();
    expect(mockService.isNewTaskSelected).toBeFalsy();
  });
  it('should isNewTaskSelected become true if we click openingButton', () => {
    component.onSelectNewTask();
    expect(mockService.isNewTaskSelected).toBeTruthy();
  });
});
