import { ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

declare let $: any;

export class FileValidators {
    element: any;

    constructor(private elementRef: ElementRef, private elementId: string) {
        this.element = $(elementRef.nativeElement).find('#' + elementId)[0];
    }

    public required(control: FormControl): any {
        if (this.element.files.length === 0) {
            return {
                fileRequired: { valid: false }
            };
        }
    }

}
