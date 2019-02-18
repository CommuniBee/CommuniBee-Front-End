import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() modalClosed: EventEmitter<void>;

  constructor() {
    this.modalClosed = new EventEmitter();
  }

  closeModal(): void {
    this.modalClosed.emit();
  }
}
