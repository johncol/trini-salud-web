import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ShowPasswordGlyphiconComponent } from './show-password-glyphicon/show-password-glyphicon.component';

import { AuthorizationService } from './authorization/authorization.service';
import { RoleService } from './authorization/role.service';
import { RoutingService } from './routing/routing.service';
import { SessionService } from './session/session.service';
import { UrlService } from './url/url.service';

@NgModule({
  declarations: [
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    ShowPasswordGlyphiconComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [
    AuthorizationService,
    RoleService,
    RoutingService,
    SessionService,
    UrlService,
  ],
  exports: [
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    ShowPasswordGlyphiconComponent,
    NavigationComponent
  ]
})
export class SharedModule { }
