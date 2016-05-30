import { Component } from '@angular/core';

@Component({
    selector: 'app-loader',
    styles: [require('./loader.scss')],
    template: `
        <div>
            <p>Loading...</p>
        </div>
    `
})
export default class AppLoaderComponent {
    constructor() { }



}