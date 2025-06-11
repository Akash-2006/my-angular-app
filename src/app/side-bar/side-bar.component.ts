import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { CardComponent } from '../shared/card/card.component';

interface userType {
  id: string;
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  @Input({ required: true }) user!: userType;
  @Input({ required: true }) selected!: boolean;
  @Output() select = new EventEmitter<string>();

  imagePath() {
    return `../../assets/users/${this.user.avatar}`;
  }

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
