import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { components } from './components';
import { directives } from './directives';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [BrowserModule, PdfViewerModule],
  declarations: [...components, ...directives],
  exports: [...components, ...directives],
  providers: [],
})
export class SharedModule {}
