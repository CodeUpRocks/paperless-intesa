import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { components } from '@steps/components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavToolbarComponent } from './layouts/side-nav-toolbar/side-nav-toolbar.component';
import { SharedModule } from '@shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [BrowserModule, SharedModule, AppRoutingModule, PdfViewerModule],
  providers: [],
  bootstrap: [AppComponent],
  declarations: [AppComponent, SideNavToolbarComponent, ...components],
})
export class AppModule {}
