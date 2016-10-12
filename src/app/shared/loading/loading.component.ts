import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ts-loading',
    templateUrl: 'loading.component.html',
    styleUrls: ['loading.component.css']
})
export class LoadingComponent implements OnInit {
    @Input() display: boolean;
    @Input() message: string;

    constructor() { }

    ngOnInit() { }

    windowHeight(): number {
        return window.innerHeight;
    }


}