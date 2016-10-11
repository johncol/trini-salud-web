import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutComponent } from './../../login/logout.component';
import { LoginComponent } from './../../login/login.component';
import { CreateCustomerComponent } from './../../customer/create-customer/create-customer.component';
import { CustomerCreatedComponent } from './../../customer/customer-created/customer-created.component';
import { UploadCertificateComponent } from './../../certificate/upload-certificate/upload-certificate.component';
import { SearchCertificateComponent } from './../../certificate/search-certificate/search-certificate.component';
import { CertificateResultComponent } from './../../certificate/certificate-result/certificate-result.component';
import { DashboardComponent } from './../../dashboard/dashboard.component';
import { SuccessProcessComponent } from './../../shared/success-process/success-process.component';

import { AuthorizationGuard } from './../authorization/authorization.guard';
import { CertificateResultGuard } from './../../certificate/certificate-result/certificate-result.guard';
import { CustomerCreatedGuard } from './../../customer/customer-created/customer-created.guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthorizationGuard] },
    { path: 'customer/create', component: CreateCustomerComponent, canActivate: [AuthorizationGuard] },
    { path: 'customer/created', component: CustomerCreatedComponent, canActivate: [CustomerCreatedGuard] },
    { path: 'certificate/upload', component: UploadCertificateComponent, canActivate: [AuthorizationGuard] },
    { path: 'certificate/search', component: SearchCertificateComponent, canActivate: [AuthorizationGuard] },
    { path: 'certificate', component: CertificateResultComponent, canActivate: [CertificateResultGuard] },
    { path: 'success', component: SuccessProcessComponent, canActivate: [AuthorizationGuard] },
    { path: '', pathMatch: 'full', redirectTo: '/login' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
