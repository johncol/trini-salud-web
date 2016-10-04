import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';

import { RoutingService } from './../../../shared/routing/routing.service';
import { CertificateService } from './../../../backend/certificate/certificate.service';
import { CertificateResultService } from './../../certificate-result/certificate-result.service';
import { SearchCertificateResponse } from './../../../backend/certificate/search-certificate/search-certificate.response';

@Component({
    selector: 'ts-search-certificate-form',
    templateUrl: 'search-certificate-form.component.html'
})
export class SearchCertificateFormComponent implements OnInit {
    form: FormGroup;
    state: any;

    constructor(
        private formBuilder: FormBuilder,
        private routingService: RoutingService,
        private certificateService: CertificateService,
        private certificateResultService: CertificateResultService
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            identification: ['', Validators.required]
        });
        this.initState();
    }

    onSubmit(): void {
        this.form.valid ? this.executeSearch() : this.handleFormError(); 
    }

    private initState(): void {
        this.state = {
            error: false,
            message: null,
        };
    }

    private executeSearch(): void {
        this.certificateService.get(this.form.value.identification)
            .subscribe(response => this.handleSearchResponse(response));
    }

    private handleSearchResponse(response: SearchCertificateResponse): void {
        if (response.success) {
            this.certificateResultService.save(response);
            this.routingService.toCertificate();
        } else {
            this.initState();
            this.state.message = "No se encontraron resultados";
        }
    }

    private handleFormError(): void {
        this.initState();
        this.state.error = true;
        this.state.message = "Debe ingresar el número de indentificación del paciente";
    }

}
