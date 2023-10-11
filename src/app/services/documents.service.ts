import { Injectable } from '@angular/core';
import {
  DocumentState,
  DocumentType,
  IntesaDocument,
} from '@models/document.model';
import { BehaviorSubject, forkJoin, map, of, tap } from 'rxjs';
import {
  DOCUMENTS_FOR_REVIEW,
  DOCUMENTS_TO_SIGN,
} from '../mocks/document.mock';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private documents$ = new BehaviorSubject<IntesaDocument[]>([]);
  private currentDocumentIndex$ = new BehaviorSubject<number>(-1);
  private currentDocument$ = new BehaviorSubject<any>({});

  getDocumentsObservable$() {
    return this.documents$.asObservable();
  }

  getDocumentsValue() {
    return this.documents$.value;
  }

  getAllDocuments$() {
    return forkJoin([of(DOCUMENTS_FOR_REVIEW), of(DOCUMENTS_TO_SIGN)]).pipe(
      tap(([dataForReview, dataForSign]) => {
        const documents = [...dataForReview, ...dataForSign].map(
          (data, index) => {
            return { ...data, index };
          }
        );
        this.documents$.next(documents);
      })
    );
  }

  getDocumentsForReview$() {
    return this.documents$.pipe(
      map(documents =>
        documents.filter(document => document.type === DocumentType.FOR_REVIEW)
      )
    );
  }

  getDocumentsForSign$() {
    return this.documents$.pipe(
      map(documents =>
        documents.filter(document => document.type === DocumentType.FOR_SIGNING)
      )
    );
  }

  getCurrentDocumentIndexObservable$() {
    return this.currentDocumentIndex$.asObservable();
  }

  getCurrentDocumentIndexValue() {
    return this.currentDocumentIndex$.value;
  }
  getCurrentDocumentObservable$() {
    return this.currentDocument$.asObservable();
  }

  getCurrentDocumentValue() {
    return this.currentDocument$.value;
  }

  updateDocumentStatus(state: DocumentState) {
    const docs = [...this.documents$.value];
    docs[this.currentDocumentIndex$.value] = {
      ...docs[this.currentDocumentIndex$.value],
      state,
    };
    this.documents$.next(docs);
    this.goToNextDocument();
  }

  goToNextDocument() {
    const currIndex = this.currentDocumentIndex$.value + 1;
    const documents = this.documents$.value;
    this.currentDocumentIndex$.next(documents[currIndex] ? currIndex : -1);
    this.currentDocument$.next(documents[currIndex]);
  }

  acceptSignDocument(state: DocumentState) {
    const docs: IntesaDocument[] = this.documents$.value.reduce(
      (acc: IntesaDocument[], curr: IntesaDocument) => {
        if (curr.type === DocumentType.FOR_SIGNING) {
          const doc: IntesaDocument = { ...curr, state };
          acc.push(doc);
        } else {
          acc.push(curr);
        }
        return acc;
      },
      []
    );
    this.documents$.next(docs);
  }
}
