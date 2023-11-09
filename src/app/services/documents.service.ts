import { Injectable } from '@angular/core';
import {
  DocumentStatus,
  IntesaDocument,
  IntesaDocumentType,
} from '@models/document.model';
import { hasSigns, toDocumentType } from '@shared/utils/document.utils';
import { BehaviorSubject, delay, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private _documents$ = new BehaviorSubject<IntesaDocument[]>([]);
  documents$ = this._documents$.asObservable();
  currentDocument: IntesaDocument | undefined = undefined;

  get currentDocumentType() {
    return this.currentDocument
      ? toDocumentType(this.currentDocument.clientQESRequired)
      : hasSigns(this._documents$.value)
      ? IntesaDocumentType.FOR_SIGNING
      : IntesaDocumentType.FOR_REVIEW;
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

  getPdf(changesetID: number | string) {
    // TODO: Create an http request for fetching PDF for provided changesetID
    return of(
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'
    ).pipe(delay(300));
  }
}
