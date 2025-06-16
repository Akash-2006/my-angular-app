import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';

interface UserType {
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
  @Input({ required: true }) user!: UserType | null;
  @Input({ required: true }) selected!: boolean;
  @Output() select = new EventEmitter<string>();

  imagePath() {
    if (!this.user) {
      return '../../assets/users/user-1.jpg';
    }
    return `../../assets/users/${this.user.avatar}`;
  }

  onSelectUser() {
    this.select.emit(this.user?.id);
  }
}
