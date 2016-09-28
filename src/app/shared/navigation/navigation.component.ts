import { Component, OnInit } from '@angular/core';

import { NavigationItem } from './navigation.item';

@Component({
    selector: 'ts-navigation',
    templateUrl: 'navigation.component.html'
})
export class NavigationComponent implements OnInit {
    items: NavigationItem[];

    ngOnInit(): void {
        this.items = [
            new NavigationItem('Inicio', '/home'),
            new NavigationItem('Registrar cliente', '/customer/create'),
            new NavigationItem('Cargar certificado', '/certificate/upload'),
            new NavigationItem('Buscar certificado', '/certificate/search'),
            new NavigationItem('Salir', '/logout')
        ];
    }
}
