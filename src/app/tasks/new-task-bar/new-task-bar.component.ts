import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-task-bar',
  standalone: true,
  imports: [],
  templateUrl: './new-task-bar.component.html',
  styleUrl: './new-task-bar.component.css',
})
export class NewTaskBarComponent {
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
