import { Injectable } from '@angular/core';
import { DocumentStatus, IntesaDocument } from '@models/document.model';
import { BehaviorSubject, forkJoin, map, of } from 'rxjs';
import {
  DOCUMENTS_FOR_REVIEW,
  DOCUMENTS_TO_SIGN,
} from '../mocks/document.mock';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private documents$ = new BehaviorSubject<IntesaDocument[]>([]);
  private currentDocumentIndex = -1;

  getDocuments$() {
    return this.documents$.asObservable();
  }

  getDocumentsValue() {
    return this.documents$.value;
  }

  getDocumentsForReview$() {
    return this.documents$.pipe(
      map(documents =>
        documents.filter(document => !document.clientQESRequired)
      )
    );
  }

  getDocumentsForSign$() {
    return this.documents$.pipe(
      map(documents => documents.filter(document => document.clientQESRequired))
    );
  }

  /**
   * Handled inside app component
   */
  getAllDocuments$() {
    return forkJoin([of(DOCUMENTS_FOR_REVIEW), of(DOCUMENTS_TO_SIGN)]).pipe(
      map(([dataForReview, dataForSign]) => {
        const documents = [...dataForReview, ...dataForSign].map(
          (data, index) => {
            return { ...data, index };
          }
        );
        this.documents$.next([...documents]);
        return documents;
      })
    );
  }

  /**
   * Handled inside app component
   */
  updateDocumentStatus(documentStatus: DocumentStatus) {
    const docs = [...this.documents$.value];
    docs[this.currentDocumentIndex] = {
      ...docs[this.currentDocumentIndex],
      documentStatus: documentStatus,
    };
    this.documents$.next([...docs]);
    if (!(documentStatus === DocumentStatus.CHANGE_REQUESTED)) {
      this.goToNextDocument();
    }
  }

  /**
   * Handled inside app component
   */
  goToNextDocument() {
    const currIndex = this.documents$.value.findIndex(
      document => document.documentStatus == DocumentStatus.INITIAL
    );

    if (currIndex < 0) {
      this.setCurrentIndex(-1);
      return;
    }

    const documents = [...this.documents$.value];
    const documentStatus = DocumentStatus.VIEWING;
    documents[currIndex] = {
      ...documents[currIndex],
      documentStatus,
    };
    this.documents$.next([...documents]);
    this.setCurrentIndex(currIndex);
  }

  setCurrentIndex(index: number) {
    this.currentDocumentIndex = index;
  }

  /**
   * Handled inside app component
   */
  acceptSignDocument(documentStatus: DocumentStatus) {
    const docs: IntesaDocument[] = this.documents$.value.reduce(
      (acc: IntesaDocument[], curr: IntesaDocument) => {
        if (curr.clientQESRequired) {
          const doc: IntesaDocument = { ...curr, documentStatus };
          acc.push(doc);
        } else {
          acc.push(curr);
        }
        return acc;
      },
      []
    );
    this.documents$.next([...docs]);
  }

  /**
   * Handled inside app component
   */
  errorOcured() {
    const docs: IntesaDocument[] = this.documents$.value.reduce(
      (acc: IntesaDocument[], curr: IntesaDocument) => {
        if (curr.clientQESRequired) {
          const doc: IntesaDocument = {
            ...curr,
            documentStatus: DocumentStatus.QESRejected,
          };
          acc.push(doc);
        } else {
          acc.push(curr);
        }
        return acc;
      },
      []
    );
    this.documents$.next([...docs]);
  }
}
