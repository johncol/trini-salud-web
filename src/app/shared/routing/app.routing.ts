import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutComponent } from './../../login/logout.component';
import { LoginComponent } from './../../login/login.component';
import { CreateCustomerComponent } from './../../customer/create-customer/create-customer.component';
import { UploadCertificateComponent } from './../../certificate/upload-certificate/upload-certificate.component';
import { SearchCertificateComponent } from './../../certificate/search-certificate/search-certificate.component';
import { CertificateResultComponent } from './../../certificate/certificate-result/certificate-result.component';
import { DashboardComponent } from './../../dashboard/dashboard.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'customer/create', component: CreateCustomerComponent },
    { path: 'certificate/upload', component: UploadCertificateComponent },
    { path: 'certificate/search', component: SearchCertificateComponent },
    { path: 'certificate/:id', component: CertificateResultComponent },
    { path: '', pathMatch: 'full', redirectTo: '/login' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
