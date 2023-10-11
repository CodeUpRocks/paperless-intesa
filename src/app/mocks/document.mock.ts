import {
  DocumentState,
  DocumentType,
  IntesaDocument,
} from '@models/document.model';

export const DOCUMENTS_FOR_REVIEW: IntesaDocument[] = [
  {
    id: 1,
    name: 'Dokument 1',
    type: DocumentType.FOR_REVIEW,
    state: DocumentState.INITIAL,
    documentUrl:
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
  },
  {
    id: 2,
    name: 'Long name Dokument',
    type: DocumentType.FOR_REVIEW,
    state: DocumentState.INITIAL,
    documentUrl:
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
  },
  {
    id: 3,
    name: 'Dokument 3',
    type: DocumentType.FOR_REVIEW,
    state: DocumentState.INITIAL,
    documentUrl:
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
  },
];

export const DOCUMENTS_TO_SIGN: IntesaDocument[] = [
  {
    id: 4,
    name: 'Dokument 2',
    type: DocumentType.FOR_SIGNING,
    state: DocumentState.INITIAL,
    documentUrl:
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
  },
  {
    id: 5,
    name: 'Long name Dokument 1',
    type: DocumentType.FOR_SIGNING,
    state: DocumentState.INITIAL,
    documentUrl:
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
  },
  {
    id: 6,
    name: 'Dokument 4',
    type: DocumentType.FOR_SIGNING,
    state: DocumentState.INITIAL,
    documentUrl:
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
  },
];
