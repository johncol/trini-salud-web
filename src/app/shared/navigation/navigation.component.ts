import { Component, OnInit } from '@angular/core';

import { NavigationItem } from './navigation.item';
import { NavigationService } from './navigation.service';

@Component({
    selector: 'ts-navigation',
    templateUrl: 'navigation.component.html'
})
export class NavigationComponent implements OnInit {
    items: NavigationItem[];
    visible: boolean = false;

    constructor(
        private navigationService: NavigationService
    ) { }

    ngOnInit(): void {
        this.items = this.navigationService.getNavigationItems();
    }

    toggleMenu(): void {
        this.visible = !this.visible;
    }
}
