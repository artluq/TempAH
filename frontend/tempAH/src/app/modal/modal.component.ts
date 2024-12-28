import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isVisible = false;
  @Input() modalTitle: string = '';
  @Input() modalMessage: string = '';
  @Output() closeModalEvent = new EventEmitter<void>(); // Event emitter to notify the parent component

  closeModal() {
    this.isVisible = false;
    this.closeModalEvent.emit(); // Emit the close event
  }

  openModal() {
    this.isVisible = true;
  }
}
