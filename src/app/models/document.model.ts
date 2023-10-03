export enum DocumentState {
  REVIEW = 'REVIEW',
  SIGN = 'SIGN',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
  WAITING = 'WAITING',
}

export interface Document {
  name: string;
  state: DocumentState;
}
