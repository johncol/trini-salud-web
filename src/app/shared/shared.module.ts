import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ShowPasswordGlyphiconComponent } from './show-password-glyphicon/show-password-glyphicon.component';
import { SuccessProcessComponent } from './success-process/success-process.component';
import { LoadingComponent } from './loading/loading.component';

import { AuthorizationGuard } from './authorization/authorization.guard';
import { AuthorizationService } from './authorization/authorization.service';
import { NavigationService } from './navigation/navigation.service';
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
    NavigationComponent,
    SuccessProcessComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [
    AuthorizationGuard,
    AuthorizationService,
    NavigationService,
    RoleService,
    RoutingService,
    SessionService,
    UrlService
  ],
  exports: [
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    ShowPasswordGlyphiconComponent,
    NavigationComponent,
    SuccessProcessComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
