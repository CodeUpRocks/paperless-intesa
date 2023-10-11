import { Component, OnInit } from '@angular/core';
import { User } from '@models/user.model';
import { StepService } from './services/step.service';
import { ProcessSteps } from '@models/document.model';
import { DocumentsService } from './services/documents.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: User = { fullName: 'Lola Ponorac' };
  currentStep: any;
  steps = ProcessSteps;

  constructor(
    private stepService: StepService,
    private _documentsService: DocumentsService
  ) {}

  ngOnInit(): void {
    this._documentsService.getAllDocuments$().subscribe();

    this.stepService.currentProcessStep.subscribe(
      step => (this.currentStep = step)
    );
  }
}
