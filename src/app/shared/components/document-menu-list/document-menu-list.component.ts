import { Component, Input, OnInit } from '@angular/core';
import { IntesaDocument } from '@models/document.model';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-document-menu-list',
  templateUrl: './document-menu-list.component.html',
  styleUrls: ['./document-menu-list.component.scss'],
})
export class DocumentMenuListComponent implements OnInit {
  @Input() title: string;
  @Input() documents: IntesaDocument[];
  currentIndex: number;

  constructor(private _documentsService: DocumentsService) {}

  ngOnInit(): void {
    this._documentsService
      .getCurrentDocumentIndexObservable$()
      .subscribe(index => {
        this.currentIndex = index;
      });
  }

  trackByFn(index: number, document: IntesaDocument) {
    return document.id;
  }
}
