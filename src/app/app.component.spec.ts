import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { DUMMY_USERS } from './dummy-users';
import { provideRouter } from '@angular/router';

describe('has to find the user', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should include the header component', () => {
    const headerEl = fixture.debugElement.query(By.css('myapp-header'));
    expect(headerEl).toBeTruthy();
  });

  it('should contains the same nuber of entires as the source', () => {
    const users: DebugElement[] = fixture.debugElement.queryAll(
      By.css('app-side-bar')
    );
    expect(users.length).toEqual(DUMMY_USERS.length);
  });
  it('should display app-tasks when a user is selected', () => {
    component.onSelect('u1');
    fixture.detectChanges();
    const tasksComp = fixture.debugElement.query(By.css('app-tasks'));
    expect(tasksComp).toBeTruthy();
  });
  it('should show the fallback test if no user is selected', () => {
    const tasksComp: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(tasksComp.textContent).toContain(
      'Select a user to see tasks of the user !'
    );
  });
  it('should change the user when user is selected', () => {
    const userId: string = DUMMY_USERS[0].id;
    component.onSelect(userId);
    expect(component.selectedUser?.().id).toEqual(userId);
  });
});
