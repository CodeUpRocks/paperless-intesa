import { DocumentStatus, IntesaDocument } from '@models/document.model';
import { FutureStep } from '@models/steps.model';

export const DOCUMENTS_FOR_REVIEW: IntesaDocument[] = [
  {
    changesetID: 1,
    documentName: 'Dokument 1',
    order: 1,
    clientQESRequired: false,
    bankQESRequired: true,
    changeButtonVisible: false,
    acceptButtonVisible: true,
    documentStatus: DocumentStatus.INITIAL,
    documentUrl:
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
    processId: 1,
    processStatusId: 1,
  },
  {
    changesetID: 2,
    documentName: 'Long name Dokument',
    order: 2,
    clientQESRequired: false,
    bankQESRequired: true,
    changeButtonVisible: false,
    acceptButtonVisible: true,
    documentStatus: DocumentStatus.INITIAL,
    documentUrl:
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
    processId: 1,
    processStatusId: 1,
  },
  {
    changesetID: 3,
    documentName: 'Dokument 3',
    order: 3,
    clientQESRequired: false,
    bankQESRequired: true,
    changeButtonVisible: false,
    acceptButtonVisible: true,
    documentStatus: DocumentStatus.INITIAL,
    documentUrl:
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
    processId: 1,
    processStatusId: 1,
  },
];

export const DOCUMENTS_TO_SIGN: IntesaDocument[] = [
  {
    changesetID: 4,
    documentName: 'Dokument 2',
    order: 4,
    clientQESRequired: true,
    bankQESRequired: true,
    changeButtonVisible: true,
    acceptButtonVisible: true,
    documentStatus: DocumentStatus.INITIAL,
    documentUrl:
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
    processId: 1,
    processStatusId: 1,
  },
  {
    changesetID: 5,
    documentName: 'Long name Dokument 1',
    order: 5,
    clientQESRequired: true,
    bankQESRequired: true,
    changeButtonVisible: true,
    acceptButtonVisible: true,
    documentStatus: DocumentStatus.INITIAL,
    documentUrl:
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
    processId: 1,
    processStatusId: 1,
  },
  {
    changesetID: 6,
    documentName: 'Dokument 4',
    order: 6,
    clientQESRequired: true,
    bankQESRequired: true,
    changeButtonVisible: true,
    acceptButtonVisible: true,
    documentStatus: DocumentStatus.INITIAL,
    documentUrl:
      'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
    processId: 1,
    processStatusId: 1,
  },
];

export const REVIEW_FUTURE_STEPS: FutureStep[] = [
  {
    title: 'Pregled dokumenta',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    title: 'Prihvatanje dokumenta',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];

export const SIGNING_FUTURE_STEP: FutureStep = {
  title: 'Potpisivanje dokumenta',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
};
