import { Injectable } from '@angular/core';
import { DocumentStatus, IntesaDocument } from '@models/document.model';
import { toDocumentType } from '@shared/utils/document.utils';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private _documents$ = new BehaviorSubject<IntesaDocument[]>([]);
  documents$ = this._documents$.asObservable();
  currentDocument: IntesaDocument | undefined = undefined;

  get currentDocumentType() {
    return this.currentDocument
      ? toDocumentType(this.currentDocument.clientQESRequired)
      : null;
  }

  setDocuments(documents: IntesaDocument[]) {
    this._documents$.next([...documents]);
    this.currentDocument = documents.find(
      document => document.documentStatus === DocumentStatus.VIEWING
    );
  }

  getDocumentsForReview$() {
    return this._documents$.pipe(
      map(documents =>
        documents.filter(document => !document.clientQESRequired)
      )
    );
  }

  getDocumentsForSign$() {
    return this._documents$.pipe(
      map(documents => documents.filter(document => document.clientQESRequired))
    );
  }
}
