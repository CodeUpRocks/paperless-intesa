import { Component, OnInit } from '@angular/core';
import {
  DocumentStatus,
  IntesaDocument,
  IntesaDocumentType,
} from '@models/document.model';
import { User } from '@models/user.model';
import { toDocumentType } from '@shared/utils/document.utils';
import { BehaviorSubject, forkJoin, map, of } from 'rxjs';
import { DOCUMENTS_FOR_REVIEW, DOCUMENTS_TO_SIGN } from './mocks/document.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: User = { fullName: 'Lola Ponorac' };
  documents$ = new BehaviorSubject<IntesaDocument[]>([]);

  get documents() {
    return this.documents$.value;
  }

  ngOnInit(): void {
    this.fetchDocuments$().subscribe(documents =>
      this.documents$.next(documents)
    );
  }

  private fetchDocuments$() {
    return forkJoin([of(DOCUMENTS_FOR_REVIEW), of(DOCUMENTS_TO_SIGN)]).pipe(
      map(([dataForReview, dataForSign]) =>
        [...dataForReview, ...dataForSign].sort((a, b) => a.order - b.order)
      )
    );
  }

  private updateSigningDocumentsStatus(status: DocumentStatus) {
    const documents = this.documents.reduce((docs, curr) => {
      const documentStatus = curr.clientQESRequired
        ? status
        : curr.documentStatus;

      docs.push({ ...curr, documentStatus });

      return docs;
    }, [] as IntesaDocument[]);

    this.documents$.next(documents);
  }

  handleStartProcess() {
    // Find the first document that has INITIAL status
    const currentIndex = this.documents.findIndex(
      document => document.documentStatus === DocumentStatus.INITIAL
    );

    if (currentIndex < 0) {
      return;
    }

    const documents = [...this.documents];

    // Update status to be VIEWING
    documents[currentIndex] = {
      ...documents[currentIndex],
      documentStatus: DocumentStatus.VIEWING,
    };

    this.documents$.next(documents);
  }

  handleAccepted(documentId: string | number) {
    // Find index of a documents that ACCEPTED
    const index = this.documents.findIndex(
      document => document.changesetID === documentId
    );

    const documents = [...this.documents];

    // Get the document type
    const currentDocumentType = toDocumentType(
      documents[index].clientQESRequired
    );

    // There is different status for different document type
    const documentStatus =
      currentDocumentType === IntesaDocumentType.FOR_REVIEW
        ? DocumentStatus.ACCEPTED
        : DocumentStatus.QESRequested;

    // Update document status
    documents[index] = {
      ...documents[index],
      documentStatus,
    };

    const nextDocument = documents[index + 1];

    // Check if we have more documents that needs to be VIEWED
    if (nextDocument) {
      const nextDocumentType = toDocumentType(nextDocument.clientQESRequired);

      // If they are of the same type set status of the next document to VIEWING
      if (
        currentDocumentType === nextDocumentType &&
        nextDocument.documentStatus === DocumentStatus.INITIAL
      ) {
        nextDocument.documentStatus = DocumentStatus.VIEWING;
      }
    }

    this.documents$.next(documents);
  }

  handleSignatureRequest() {
    this.updateSigningDocumentsStatus(DocumentStatus.QESInitiated);

    setTimeout(() => {
      this.updateSigningDocumentsStatus(DocumentStatus.QESSigned);

      // TODO: Handle partally rejected or reject all documents scenarios
      // this.updateSigningDocumentsStatus(DocumentStatus.QESRejected);
    }, 3000);
  }

  handleChangeRequested(documentId: string | number) {
    const index = this.documents.findIndex(
      document => document.changesetID === documentId
    );

    const documents = [...this.documents];

    documents[index] = {
      ...documents[index],
      documentStatus: DocumentStatus.CHANGE_REQUESTED,
    };

    this.documents$.next(documents);

    setTimeout(() => {
      this.updateSigningDocumentsStatus(DocumentStatus.INITIAL);
    }, 3000);
  }
}
