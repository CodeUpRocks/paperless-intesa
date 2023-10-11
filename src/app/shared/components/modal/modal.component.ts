import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IntesaDocument } from '@models/document.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() document: IntesaDocument;
  @Output() closeModal = new EventEmitter<any>();
  isModalOpen = false;
  fit = false;
  pdfSrc: any = '';

  ngOnInit(): void {
    this.pdfSrc = this.document.documentUrl;
  }

  onCloseModal() {
    this.closeModal.emit(true);
  }

  pageRendered(event: any) {
    this.fit = true;
  }
}
