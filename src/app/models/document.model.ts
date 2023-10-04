export enum DocumentState {
  REVIEW = 'REVIEW',
  SIGN = 'SIGN',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
  WAITING = 'WAITING',
}

export enum ProcessState {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface Document {
  name: string;
  state: DocumentState;
}
