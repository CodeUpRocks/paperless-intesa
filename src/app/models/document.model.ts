export enum DocumentStatus {
  INITIAL = 1,
  VIEWING = 2,
  ACCEPTED = 3,
  CHANGE_REQUESTED = 4,
  QESInitiated = 5,
  QESRequested = 6,
  QESSigned = 7,
  QESRejected = 8,
}

export enum DocumentStep {
  REVIEW = 1,
  ACCEPTANCE = 2,
  SIGNING = 3,
  FINAL = 4,
}

export enum IntesaDocumentType {
  FOR_REVIEW = 'FOR_REVIEW',
  FOR_SIGNING = 'FOR_SIGNING',
}

export enum ProcessState {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export enum IntesaWizardStep {
  INITIAL = 'INITIAL',
  PREVIEW = 'PREVIEW',
  WAITING = 'WAITING',
  REVIEW = 'REVIEW',
  FINAL = 'FINAL',
}

export interface IntesaDocument {
  changesetID: number;
  documentName: string;
  order: number;
  clientQESRequired: boolean;
  bankQESRequired: boolean;
  changeButtonVisible: boolean;
  acceptButtonVisible: boolean;
  documentStatus: DocumentStatus;
  processId: number;
  processStatusId: number;
}
