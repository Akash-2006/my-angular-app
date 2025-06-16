import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBarComponent } from './side-bar.component';

describe('testing side bar component', () => {
  let fixture: ComponentFixture<SideBarComponent>;
  let component: SideBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call select event', () => {
    component.user = { id: 'u1', name: 'User 1', avatar: 'avatar1.png' };
    spyOn(component.select, 'emit');
    component.onSelectUser();
    expect(component.select.emit).toHaveBeenCalled();
  });
  it('should return correct image path', () => {
    component.user = { id: 'u1', name: 'User 1', avatar: 'avatar1.png' };
    expect(component.imagePath()).toBe('../../assets/users/avatar1.png');
  });
  it('should return default image path when user is not defined', () => {
    component.user = null;
    expect(component.imagePath()).toBe('../../assets/users/user-1.jpg');
  });
});
