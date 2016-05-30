import { Component, OnInit } from '@angular/core';

/**
 * Components
 */
import AppLoaderComponent from '../../../../components/loader/loader.component';

import { DateFormatterFromNowPipe } from '../../../../pipes/date-formatter';

/**
 * Services
 */
import EventsService from '../../../../services/events.service';

@Component({
    directives: [
        AppLoaderComponent
    ],
    pipes: [DateFormatterFromNowPipe],
    providers: [
     EventsService   
    ],
    styles: [require('./all.scss')],
    template: `
        <div *ngIf="loading">
            <app-loader></app-loader>
        </div>
        <div *ngIf="!loading">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>Language</th>
                    <th>Going</th>
                    <th>Actions</th>
                </tr>
                <tr *ngFor="let event of events">
                    <td>{{event.name}}</td>
                    <td>{{event.address}}</td>
                    <td>{{event.date | dateFormatterFromNow}}</td>
                    <td>{{event.language | uppercase}}</td>
                    <td>{{event.attendees}}</td>
                    <td>
                        <p class="action-button delete" (click)=onDelete(event)>Delete</p>
                    </td>
                </tr>
            </table>
        </div>
    `
})
export default class AddContainerComponent implements OnInit {
    loading: boolean = true;
    events: Array<any>;
    
    class: string;
    messages: Array<string> = [];
    
    constructor(
        private _events: EventsService
    ) { }
    
    private getData() {
        this
            ._events
            .getEvents()
            .subscribe(
                (res) => this.onSuccess(res),
                (err) => this.onError(err)
            )
    }
    
    private onDelete(event) {
        this._events.delete(event);
    }
    
    private onUpdate(event) {
        
    }
    
    private onSuccess(res) {
        console.log(res)
        this.events = res;
        this.loading = false;
    }
    
    private onError(err) {
        console.log(err);
    }
    
    ngOnInit() {
        this.getData()
    }

}