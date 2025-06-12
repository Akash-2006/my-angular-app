import { Component, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from './tasks/tasks.component';

export interface UserType {
  id: string;
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users: UserType[] = DUMMY_USERS;
  selectedUser?: WritableSignal<UserType> = signal(DUMMY_USERS[9]);

  onSelect(id: string) {
    this.selectedUser?.set(DUMMY_USERS[this.findSelectedUser(id)]);
  }

  private findSelectedUser(id: string): number {
    return DUMMY_USERS.findIndex((user) => user.id === id);
  }
}
