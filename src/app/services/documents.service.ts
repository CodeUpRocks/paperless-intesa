import { Injectable } from '@angular/core';
import { IntesaDocument } from '@models/document.model';
import { BehaviorSubject } from 'rxjs';
import {
  DOCUMENTS_FOR_REVIEW,
  DOCUMENTS_TO_SIGN,
} from '../mocks/document.mock';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private _documentsForReview$ = new BehaviorSubject<IntesaDocument[]>(
    DOCUMENTS_FOR_REVIEW
  );
  private _documentsForSigning$ = new BehaviorSubject<IntesaDocument[]>(
    DOCUMENTS_TO_SIGN
  );

  getDocumentsForReview$() {
    return this._documentsForReview$.asObservable();
  }

  getDocumentsForSigning$() {
    return this._documentsForSigning$.asObservable();
  }
}
