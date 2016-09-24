import { Component, Input } from '@angular/core';

@Component({
    selector: 'ts-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent {
    @Input() title: string;
    @Input() subtitle: string;
}
