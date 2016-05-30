import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES, ControlGroup, Control, FormBuilder, Validators } from '@angular/common';

import SettingsService from '../../../services/settings.service';

@Component({
    providers: [
        SettingsService
    ],
    styles: [require('./settings.scss')],
    template: `
    <div *ngIf="!loading">
        <form [ngFormModel]="settings" id="settings" (submit)="onSubmit()">
            <label>Page Information:</label>
            <div class="row">
                <label>Title:</label>
                <input type="text" ngControl="title"> 
            </div>
            
            <div class="row">
                <label>Description:</label>
                <textarea ngControl="description"></textarea>
            </div>
            
            <label>User Details:</label>
            <div class="row">
                <div class="one-half column">
                    <label>Phone:</label>
                    <input type="phone" ngControl="phone">
                </div>
                
                <div class="one-half column">
                    <label>Email:</label>
                    <input type="email" ngControl="email">
                </div>
            </div>
            
            <div class="row">
                <label>Address:</label>
                <input type="text" ngControl="address">
            </div>
            

            <button class="primary u-pull-right" type="submit">Save</button>

        </form>
    </div>
    `
})
export default class SettingsContainerComponent implements OnInit {
    loading: boolean = true;
    isBlank: boolean = true;
    isEditing: boolean;
    
    settings: ControlGroup;
    title: Control;
    email: Control;
    phone: Control;
    description: Control;
    address: Control;
    
    constructor(
        private _settings: SettingsService,
        private _fb: FormBuilder
    ) { }
    
    onSubmit() {
        if (this.isBlank) {
            this._settings.saveSettings(this.settings.value)    
        }
        else {
            this._settings.updateSettings(this.settings.value)
        }
    }
    
    getData() {
        this
            ._settings
            .getSettings()
            .subscribe(
                (res) => this.onSuccess(res),
                (err) => this.onError(err)
            )
    }
    
    onSuccess(res) {
        let title = '';
        let description = '';
        let email = '';
        let phone = '';
        let address = '';
        
        if (res.length > 0) {
            this.isBlank = false;
            
            title = res[0].title;
            description = res[0].description;
            email = res[0].email;
            phone = res[0].phone;
            address = res[0].address;
        } 
        
        this.title = new Control(title, Validators.required);
        this.description = new Control(description, Validators.required);
        this.email = new Control(email, Validators.required);
        this.phone = new Control(phone, Validators.required);
        this.address = new Control(address, Validators.required);
        
        this.settings = this._fb.group({
            'title': this.title,
            'description': this.description,
            'email': this.email,
            'phone': this.phone,
            'address': this.address
        })
        
        this.loading = false;
        
        console.log(this)
    }
    
    onError(err) {
        
    }

    ngOnInit() {
        this.getData();
    }

}
