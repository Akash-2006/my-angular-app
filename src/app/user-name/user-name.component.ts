import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../tasks/tasks.service';
import { TaskType } from '../tasks/tasks.component';
import { TaskComponent } from '../tasks/task/task.component';
import { Title } from '@angular/platform-browser';
import { DUMMY_USERS } from '../dummy-users';
import { UserType } from '../app.component';

@Component({
  selector: 'app-user-name',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './user-name.component.html',
  styleUrl: './user-name.component.css',
})
export class UserNameComponent implements OnInit {
  users: UserType[] = DUMMY_USERS;
  private titleService = inject(Title);
  id: string = '';
  private taskService = new TasksService();
  fetchTasks(): TaskType[] {
    if (this.id) {
      return this.taskService.getTasks(this.id);
    }

    return [];
  }
  constructor(private route: ActivatedRoute) {}

  fetchUserName(): string {
    return this.users.find((user) => user.id === this.id)?.name || '';
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('name') || '';
      this.titleService.setTitle(this.fetchUserName());
    });
  }
}
