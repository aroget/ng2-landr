import { Component, OnInit, Input } from '@angular/core';

import EventsService from '../../services/events.service';

import CardNotificationComponent from '../../components/cards/card-notification/card-notification.component'

import { DateFormatterPipe, DateFormatterFromNowPipe} from '../../pipes/date-formatter';

@Component({
    selector: 'app-event-list',
    providers: [
        EventsService
    ],
    directives: [
        CardNotificationComponent
    ],
    pipes: [
        DateFormatterPipe,
        DateFormatterFromNowPipe
    ],
    styles: [require('./event-list.scss')],
    template: `
        <p class="next-event">Next event {{nextEvent.date | dateFormatterFromNow}} at {{nextEvent.address}}</p>
        
        <button class="primary" (click)=onClick() >View More</button>
        <card-notification [class]="class" [messages]="messages"></card-notification>
        
        <table class="twelve columns" *ngIf="isOpen">
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Date</th>
                <th>Language</th>
                <th>Attending</th>
            </tr>
            <tr *ngFor="let event of events">
                <td>{{event.name}}</td>
                <td>{{event.address}}</td>
                <td>{{event.date | dateFormatter:"MMMM Do, YYYY"}}</td>
                <td>{{event.language | uppercase}}</td>
                <td 
                    class="action" 
                    (click)="onSaveSeat(event)">
                    Save a spot
                </td>
            </tr>
        </table>
    `
})
export default class AppEventListComponent implements OnInit {
    nextEvent: any;
    class: string;
    messages: Array<any> = [];
    isOpen: boolean = false;
    
    constructor(
        private _event: EventsService
    ) {}
    
    @Input() events: Array<any>
    
    onClick() {
        this.isOpen = !this.isOpen;
        this.messages = [];
    }
    
    onSaveSeat(event, target) {
        let _self = this;
        let attendees = event.attendees || 0;
        let newData = { 
            $key: event.$key,
            attendees: attendees + 1 
        };
        
        let promise  = this._event.updateEvent(newData);
        
        promise.then(
            (res) => {
                _self.messages.push( { code: `Registered for ${event.name}` });
                _self.class = "success";
            },
            (err) => console.log(err)
        )

    }
    
    ngOnInit() {
        this.nextEvent = this.events[0];
    }

}