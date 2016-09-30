import { Component, OnInit } from '@angular/core';

import { NavigationItem } from './navigation.item';

@Component({
    selector: 'ts-navigation',
    templateUrl: 'navigation.component.html'
})
export class NavigationComponent implements OnInit {
    items: NavigationItem[];
    visible: boolean = false;

    ngOnInit(): void {
        this.items = [
            new NavigationItem('Inicio', '/dashboard'),
            new NavigationItem('Registrar cliente', '/customer/create'),
            new NavigationItem('Cargar certificado', '/certificate/upload'),
            new NavigationItem('Buscar certificado', '/certificate/search'),
            new NavigationItem('Salir', '/logout')
        ];
    }

    toggleMenu(): void {
        this.visible = !this.visible;
    }
}
