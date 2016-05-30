import { Component, OnInit, Input } from '@angular/core';

import BannerService from '../../services/banner.service';

@Component({
    providers: [
        BannerService
    ],
    selector: 'app-banner',
    styles: [require('./banner.scss')],
    template: `
    <section [ngStyle]="{'background-image': 'linear-gradient(rgba(78,161,211,0.4), rgba(69,69,82,0.7)), url(' + data.background + ')'}">
        <div class="container details--wrapper">
            <div class="eight columns offset-by-two column details--copy">
                <h2>{{data.title}}</h2>
                <p>{{data.description}}</p>
                
                <div class="meta">
                    <a href="mailto:{{data.email}}">{{data.email}}</a>
                    |
                    <a href="call:{{data.phone}}">{{data.phone}}</a>
                </div>
            </div>
        </div>
    </section>
    `
    
})
export default class AppBannerComponent implements OnInit {
    loading: boolean= true;
    
    constructor(
        private _service: BannerService
    ) { }

    @Input() data:any
    
    ngOnInit() {
        console.log(this)
    }

}