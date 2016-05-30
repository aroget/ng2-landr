import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';


/**
 * Components
 */
import CardNotificationComponent from '../../../../components/cards/card-notification/card-notification.component';
/**
 * Services
 */
import EventsService from '../../../../services/events.service';

@Component({
    directives: [
        ROUTER_DIRECTIVES,
        CardNotificationComponent  
    ],
    providers: [
        EventsService
    ],
    styles: [require('./add.scss')],
    template: `
        <div class="twelve columns">
            <card-notification [class]="class" [messages]="messages"></card-notification>
            <form class="six columns offset-by-three column" #form="ngForm" (submit)=onSubmit(form.value)>
                <input type="text" ngControl="name" placeholder="Event Name">
                
                <input type="text" id="address" ngControl="address" placeholder="Event Address">
                
                <input type="date" ngControl="date" placeholder="Event Date">
                
                <select ngControl="language">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </select>
                
                <button class="primary" type="sbumit">Create</button>
            </form>
        </div>
    `
})
export default class AddContainerComponent implements OnInit {
    class: string;
    messages: Array<string> = [];
    
    constructor(
        private _router: Router,
        private _events: EventsService
    ) { }

    ngOnInit() { }
    
    private onSubmit(data) {
       let promise = this._events.saveEvent(data);
       
       promise.then(
           (res) => this.onSuccess(res),
           (err) => this.onError(err)
       )
    }
    
    private onSuccess(res) {
        console.log(res);
        this.messages.push(res);
        this.class= "success";
        setTimeout(() => {this._router.navigate(['All'])}, 1000)
    }
    
    private onError(err) {
        this.messages.push(err);
        this.class= "error";
    }

}