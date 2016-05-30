import { Component, Input } from '@angular/core';

@Component({
    selector: 'card-notification',
    template: `
        <p *ngFor="let message of messages" class="{{class}}">{{message.code}}</p>
    `
})
export default class CardNotificationComponent {
    
    constructor() {
            
        if (this.class === 'undefined') {
            throw "Card Notification Component requires a Class attribute";
        }
        if (this.messages === []) {
            throw "Card Notification Component requires a Messages array";
        }
    }
    
    @Input() messages: Array<string>;
    @Input() class: string;
}