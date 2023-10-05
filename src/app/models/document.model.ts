export enum DocumentState {
  INITIAL = 'INITIAL',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
  WAITING = 'WAITING',
}

export enum DocumentType {
  FOR_REVIEW = 'FOR_REVIEW',
  FOR_SIGNING = 'FOR_SIGNING',
}

export enum ProcessState {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface IntesaDocument {
  id: number;
  name: string;
  state: DocumentState;
  type: DocumentType;
}
