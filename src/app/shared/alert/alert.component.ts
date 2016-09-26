import { Component, Input } from '@angular/core';

@Component({
    selector: 'ts-alert',
    templateUrl: 'alert.component.html'
})
export class AlertComponent {
    @Input() type: string;
    @Input() message: string;
}
