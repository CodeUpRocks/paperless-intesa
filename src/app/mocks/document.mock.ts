import { DocumentState, DocumentType } from '@models/document.model';

export const DOCUMENTS_FOR_REVIEW = [
  {
    id: 1,
    name: 'Dokument 1',
    type: DocumentType.FOR_REVIEW,
    state: DocumentState.INITIAL,
  },
  {
    id: 2,
    name: 'Long name Dokument',
    type: DocumentType.FOR_REVIEW,
    state: DocumentState.INITIAL,
  },
  {
    id: 3,
    name: 'Dokument 3',
    type: DocumentType.FOR_REVIEW,
    state: DocumentState.INITIAL,
  },
];

export const DOCUMENTS_TO_SIGN = [
  {
    id: 4,
    name: 'Dokument 1',
    type: DocumentType.FOR_SIGNING,
    state: DocumentState.INITIAL,
  },
  {
    id: 5,
    name: 'Long name Dokument',
    type: DocumentType.FOR_SIGNING,
    state: DocumentState.INITIAL,
  },
  {
    id: 6,
    name: 'Dokument 3',
    type: DocumentType.FOR_SIGNING,
    state: DocumentState.INITIAL,
  },
];
