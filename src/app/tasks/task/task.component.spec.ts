import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';

describe('testing task componet', () => {
  let fixture: ComponentFixture<TaskComponent>;
  let component: TaskComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shoud emit the taskStat', () => {
    spyOn(component.taskStat, 'emit');
    component.onToggleStatus();
    expect(component.taskStat.emit).toHaveBeenCalled();
  });
});
