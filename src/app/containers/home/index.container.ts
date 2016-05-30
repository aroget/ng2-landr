import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/** 
 * Component 
 **/
 import AppLoaderComponent from '../../components/loader/loader.component';
 import AppBannerComponent from '../../components/banner/banner.component';
 import AppEventListComponent from '../../components/event-list/event-list.component';

/** 
 * Services 
 **/
import SettingsService from '../../services/settings.service';
import EventsService from '../../services/events.service';

@Component({
    directives: [
      AppLoaderComponent,
      AppBannerComponent,
      AppEventListComponent
    ],
    providers: [
        SettingsService,
        EventsService
    ],
    template: `
    <div *ngIf="loading">
        <app-loader></app-loader>
    </div>
    <div *ngIf="!loading">
        <app-banner [data]="banner" [background]="background"></app-banner>
        <div class="container">
            <app-event-list [events]="events"></app-event-list>
        </div>
    </div>
    `
})
export default class HomeContainerComonent implements OnInit {
    loading: boolean = true;
    banner: any;
    events: Array<any>;
    background: string;
    phone: string;
    email: string;
    
    constructor(
        private _events: EventsService,
        private _settings: SettingsService
    ) { }
    
    getData() {
        const settings$ = this._settings.getSettings();
        const events$ = this._events.getEvents();

        settings$.subscribe((res) => this.banner = {
            title: res[0].title,
            description: res[0].description,
            background: res[0].banner,
            phone: res[0].phone,
            email: res[0].email
        })
        events$.subscribe((res) => this.events = res)
        
        setTimeout( () => {this.loading = false}, 2000)
        
        // setTimeout( () => { 
        //   Observable
        //     .forkJoin([settings$, events$, banner$])
        //     .subscribe(
        //         (res) => this.onSuccess(res),
        //         (err) => this.onError(err)
        //     )  
        // }, 1000)
    }
    
    onSuccess(res) {
        console.log('done');
        this.loading = false;
        this.banner = {
            title: res[0].title,
            description: res[0].description,
        }
        this.background = res;
        this.events = res[0];
    }
    
    onError(err) {
        console.log(err);
    }

    ngOnInit() {
        this.getData()
     }

}
