import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { FirebaseAuth } from 'angularfire2';

/**
 * Components
 */
import CardNotificationComponent from '../../components/cards/card-notification/card-notification.component';
import AppLoaderComponent from '../../components/loader/loader.component';

@Component({
    directives: [
        AppLoaderComponent,
        CardNotificationComponent  
    ],
    styles: [require('./login.scss')],
    template: `
        <div *ngIf="loading">
            <app-loader></app-loader>
        </div>
        <div *ngIf="!loading">
            <div class="form-wrapper four columns offset-by-four column">
                <card-notification 
                [class]="class" 
                [messages]="messages">
            </card-notification>
            <form #form="ngForm" (submit)=onSubmit(form.value)>
                <div class="row">
                    <input  #username type="text" ngControl="username" placeholder="Email">
                </div>
                <div class="row">
                    <input #password type="password" ngControl="password" placeholder="Password">
                </div>
                
                <button class="primary" type="submit">Submit</button> 
            </form>
            </div>
        </div>
    `
})
export default class LoginContainerComonent implements OnInit {
    messages: Array<string>;
    loading: boolean = false;
    class: string;
    
    constructor(
        private _router: Router,
        private _auth: FirebaseAuth
    ) { }

    private onSubmit(form) {
        this.loading = true;
        this.messages = [];
        this.class = null;
        
        let promise = this._auth.login({
            email: form.username, 
            password: form.password
        });

        promise.then(
            (res) => this.onSucess(res),
            (err) => this.onError(err)
        )

        console.log(form);
    }

    private onSucess(data) {
        this.loading = false;
        this._router.navigate(['Admin/Index'])
        console.log(data)
    }
    
    private onError(err) {
        this.loading = false;
        this.messages.push(err);
        this.class = "alert";
    }

    ngOnInit() { 
        console.log(this);
    }

}
