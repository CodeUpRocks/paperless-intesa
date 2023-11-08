import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { components } from './components';
import { directives } from './directives';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, PdfViewerModule],
  declarations: [...components, ...directives],
  exports: [...components, ...directives],
  providers: [],
})
export class SharedModule {}
