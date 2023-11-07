import { Component, OnInit } from '@angular/core';
import { IntesaDocument } from '@models/document.model';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';
import { DocumentsService } from './services/documents.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: User = { fullName: 'Lola Ponorac' };
  documents$: Observable<IntesaDocument[]>;
  documents: IntesaDocument[];

  constructor(private _documentsService: DocumentsService) {}

  ngOnInit(): void {
    this._documentsService.getAllDocuments$().subscribe();
    this.documents$ = this._documentsService.getDocuments$();
  }
}
