import { Component, Input, OnInit } from '@angular/core';
import { DocumentStatus } from '@models/document.model';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-advertisements-step',
  templateUrl: './advertisements-step.component.html',
  styleUrls: ['./advertisements-step.component.scss'],
})
export class AdvertisementStepComponent implements OnInit {
  @Input() title = 'Molimo sačekajte';

  constructor(private _documentsService: DocumentsService) {}
  ngOnInit(): void {
    setTimeout(() => {
      // if (this.hasChangings) {
      // location.reload();
      // } else {
      // this._documentsService.errorOcured();
      this._documentsService.acceptSignDocument(DocumentStatus.QESSigned);
      // }
    }, 3000);
  }
}
