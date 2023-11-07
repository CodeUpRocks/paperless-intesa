import {
  DocumentStatus,
  DocumentType,
  IntesaDocument,
} from '@models/document.model';

export const hasReviews = (documents: IntesaDocument[]) => {
  return documents.some(
    (document: IntesaDocument) => !document.clientQESRequired
  );
};

export const hasSigns = (documents: IntesaDocument[]) => {
  return documents.some(
    (document: IntesaDocument) => document.clientQESRequired
  );
};

export const hasChangings = (documents: IntesaDocument[]) => {
  return documents.some(
    (document: IntesaDocument) =>
      document.documentStatus === DocumentStatus.CHANGE_REQUESTED
  );
};
