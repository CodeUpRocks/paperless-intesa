import {
  DocumentState,
  DocumentType,
  IntesaDocument,
} from '@models/document.model';

export const hasReviews = (documents: IntesaDocument[]) => {
  return documents.some(
    (document: IntesaDocument) => document.type === DocumentType.FOR_REVIEW
  );
};

export const hasSigns = (documents: IntesaDocument[]) => {
  return documents.some(
    (document: IntesaDocument) => document.type === DocumentType.FOR_SIGNING
  );
};

export const hasChangings = (documents: IntesaDocument[]) => {
  return documents.some(
    (document: IntesaDocument) => document.state === DocumentState.CHANGING
  );
};
