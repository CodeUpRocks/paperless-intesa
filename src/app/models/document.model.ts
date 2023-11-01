export enum DocumentState {
  INITIAL = 'INITIAL',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
  WAITING = 'WAITING',
  CHANGING = 'CHANGING',
  ACTIVE = 'ACTIVE',
}

export enum DocumentStep {
  REVIEW = 1,
  ACCEPTANCE = 2,
  SIGNING = 3,
}

export enum DocumentType {
  FOR_REVIEW = 'FOR_REVIEW',
  FOR_SIGNING = 'FOR_SIGNING',
}

export enum ProcessState {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export enum ProcessSteps {
  INITIALSTEP = 'INITIAL',
  PREVIEWSTEP = 'PREVIEW',
  WAITING = 'WAITING',
  REVIEWSTEP = 'REVIEW',
  FINALSTEP = 'FINAL',
}

export interface IntesaDocument {
  id: number;
  name: string;
  state: DocumentState; // Track different states for a document
  type: DocumentType; // Determine which kind of document it is
  documentUrl: string;
  index?: number;
}
