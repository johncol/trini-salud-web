import { Injectable } from '@angular/core';

import { NavigationItem } from './navigation.item';
import { RoleService } from './../authorization/role.service';

@Injectable()
export class NavigationService {
    private allItems: { [name: string] : NavigationItem } = {};
    private itemsPerRole: { [name: string] : NavigationItem[] } = {};

    constructor(
        private roleService: RoleService
    ) {
        this.initService();
    }

    getNavigationItems(): NavigationItem[] {
        if (this.roleService.isIpsWorker()) {
            return this.itemsPerRole[this.roleService.getIpsWorker()];
        } else if (this.roleService.isCustomer()) {
            return this.itemsPerRole[this.roleService.getCustomer()];
        }
        // console.info('Using IpsWorker nav items when no role is found');
        // return this.itemsPerRole[this.roleService.getIpsWorker()];
        throw new Error('NavigationService.getNavigationItems(): should not get here!');
    }

    private initService(): void {
        this.initAllItems();
        this.initItemsForIpsWorker();
        this.initItemsForCustomer();
    }

    private initAllItems(): void {
        this.allItems = {
            'dashboard': new NavigationItem('Inicio', '/dashboard'),
            'create-customer': new NavigationItem('Registrar cliente', '/customer/create'),
            'upload-certificate': new NavigationItem('Cargar certificado', '/certificate/upload'),
            'search-certificate': new NavigationItem('Buscar certificado', '/certificate/search'),
            'logout': new NavigationItem('Salir', '/logout')
        };
    }

    private initItemsForIpsWorker(): void {
        this.itemsPerRole[this.roleService.getIpsWorker()] = [
            this.allItems['dashboard'],
            this.allItems['create-customer'],
            this.allItems['upload-certificate'],
            this.allItems['search-certificate'],
            this.allItems['logout']
        ];
    }

    private initItemsForCustomer(): void {
        this.itemsPerRole[this.roleService.getCustomer()] = [
            this.allItems['search-certificate'],
            this.allItems['logout']
        ];
    }

}