import {
  DocumentState,
  DocumentStep,
  DocumentType,
  IntesaDocument,
} from '@models/document.model';

export const DOCUMENTS_FOR_REVIEW: IntesaDocument[] = [
  {
    id: 1,
    name: 'Dokument 1',
    type: DocumentType.FOR_REVIEW,
    state: DocumentState.INITIAL,
    currentStep: DocumentStep.REVIEW,
  },
  {
    id: 2,
    name: 'Long name Dokument',
    type: DocumentType.FOR_REVIEW,
    state: DocumentState.INITIAL,
    currentStep: DocumentStep.REVIEW,
  },
  {
    id: 3,
    name: 'Dokument 3',
    type: DocumentType.FOR_REVIEW,
    state: DocumentState.INITIAL,
    currentStep: DocumentStep.REVIEW,
  },
];

export const DOCUMENTS_TO_SIGN: IntesaDocument[] = [
  {
    id: 4,
    name: 'Dokument 1',
    type: DocumentType.FOR_SIGNING,
    state: DocumentState.INITIAL,
    currentStep: DocumentStep.REVIEW,
  },
  {
    id: 5,
    name: 'Long name Dokument',
    type: DocumentType.FOR_SIGNING,
    state: DocumentState.INITIAL,
    currentStep: DocumentStep.REVIEW,
  },
  {
    id: 6,
    name: 'Dokument 3',
    type: DocumentType.FOR_SIGNING,
    state: DocumentState.INITIAL,
    currentStep: DocumentStep.REVIEW,
  },
];
