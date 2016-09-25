import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShowPasswordGlyphiconComponent } from './show-password-glyphicon/show-password-glyphicon.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ShowPasswordGlyphiconComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    ShowPasswordGlyphiconComponent
  ]
})
export class SharedModule { }
