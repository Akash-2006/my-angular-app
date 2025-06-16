import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTaskBarComponent, NewTaskType } from './new-task-bar.component';
import { TasksService } from '../tasks.service';
import { MockTasksService } from '../tasks.component.spec';

describe('testing task-bar componet', () => {
  let fixture: ComponentFixture<NewTaskBarComponent>;
  let component: NewTaskBarComponent;
  let mockService: MockTasksService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: TasksService, useClass: MockTasksService }],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTaskBarComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(TasksService) as unknown as MockTasksService;
    fixture.detectChanges();
  });

  it('should not submit when form is invalid', () => {
    component.taskTitle = '';
    component.taskSummary = '';
    component.dueDate = '';
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('❌ Validation failed');
  });

  it('should call addTaskToUser when form is valid', () => {
    component.taskTitle = 'Test';
    component.taskSummary = 'Summary';
    component.dueDate = '2025-06-30';
    const spy = spyOn(component, 'addTaskToUser');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('should add task to user', () => {
    const newTask: NewTaskType = {
      taskTitle: 'Test Task',
      taskSummary: 'This is a test task',
      dueDate: '2025-06-30',
    };
    component.addTaskToUser(newTask);
    expect(mockService.addTask).toHaveBeenCalled();
  });
  it('should emit the close event when onClose is called', () => {
    spyOn(component.close, 'emit');
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
