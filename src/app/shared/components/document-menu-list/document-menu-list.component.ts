import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DocumentState, IntesaDocument } from '@models/document.model';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-document-menu-list',
  templateUrl: './document-menu-list.component.html',
  styleUrls: ['./document-menu-list.component.scss'],
})
export class DocumentMenuListComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() documents: IntesaDocument[];
  currentIndex: number;
  documentsLeft: number;
  unSubscribe$: Subject<any> = new Subject<any>();

  constructor(private _documentsService: DocumentsService) {}

  ngOnInit(): void {
    this._documentsService
      .getCurrentDocumentIndexObservable$()
      .subscribe(index => {
        this.currentIndex = index;
      });

    this._documentsService
      .getDocumentsObservable$()
      .pipe(
        takeUntil(this.unSubscribe$),
        map(data => {
          const reducedDocuments = this.documents.reduce(
            (acc: IntesaDocument[], currenDoc: IntesaDocument) => {
              const doc = data.find(document => document.id === currenDoc.id);
              if (doc?.state === DocumentState.COMPLETED) {
                acc.push(doc);
              }

              return [...acc];
            },
            []
          );

          return reducedDocuments.length;
        })
      )
      .subscribe(data => (this.documentsLeft = this.documents.length - data));
  }

  trackByFn(index: number, document: IntesaDocument) {
    return document.id;
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(true);
    this.unSubscribe$.unsubscribe();
  }
}
