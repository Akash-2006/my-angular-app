import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskType } from '../tasks.component';
import { CardComponent } from '../../shared/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({ required: true }) taskOfUser?: TaskType;
  @Output() taskStat = new EventEmitter<string>();

  onToggleStatus() {
    this.taskStat.emit(this.taskOfUser?.id);
  }
}
