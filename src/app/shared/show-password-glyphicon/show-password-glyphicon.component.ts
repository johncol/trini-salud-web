import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ts-show-password-glyphicon',
    templateUrl: 'show-password-glyphicon.component.html'
})
export class ShowPasswordGlyphiconComponent {
    @Output() show: EventEmitter<boolean> = new EventEmitter<boolean>();
    visible: boolean = false;

    togglePassword(): void {
        this.visible = !this.visible;
        this.show.emit(this.visible);
    }
}
