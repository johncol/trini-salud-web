import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShowPasswordGlyphiconComponent } from './show-password-glyphicon/show-password-glyphicon.component';

import { SessionService } from './session/session.service';
import { UrlService } from './url/url.service';

@NgModule({
  declarations: [
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    ShowPasswordGlyphiconComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    SessionService,
    UrlService
  ],
  exports: [
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    ShowPasswordGlyphiconComponent
  ]
})
export class SharedModule { }
