import { Component, Input } from '@angular/core';
import { DocumentStatus, IntesaDocument } from '@models/document.model';
import { toDocumentType } from '@shared/utils/document.utils';

@Component({
  selector: 'app-document-menu-list',
  templateUrl: './document-menu-list.component.html',
  styleUrls: ['./document-menu-list.component.scss'],
})
export class DocumentMenuListComponent {
  @Input() title: string;
  @Input() documents: IntesaDocument[];
  @Input() documentsLeft = 0;

  parseDocumentType(clientQESRequired: boolean) {
    return toDocumentType(clientQESRequired);
  }

  isDisabled(status: DocumentStatus) {
    return status === DocumentStatus.INITIAL;
  }

  trackByFn(_: number, document: IntesaDocument) {
    return document.changesetID;
  }
}
