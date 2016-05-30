import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import BannerService from '../../../services/banner.service';
import SettingsService from '../../../services/settings.service';

import AppLoaderComponent from '../../../components/loader/loader.component';

@Component({
    directives: [
        AppLoaderComponent
    ],
    providers: [
        SettingsService,
        BannerService
    ],
    styles: [`
        img {
            max-width: 100%;
        }
    `],
    template: `
        <div *ngIf="loading">
            <app-loader></app-loader>
        </div>
        <div *ngIf="!loading">
            Pick a banner image for your home page.
            
            <div class="image-viewer">
                <div class="row">
                    <img src="{{image}}">
                </div>
                
                <div class="row">
                    <button class="secondary u-pull-left" (click)=onNewImage()>New Image</button>
                    <button class="primary u-pull-left" (click)=onSave(image)>Save</button>
                </div>
            </div>
        </div>
    `
})
export default class BannerContainerComponent implements OnInit {
    loading: boolean = true;
    image: string;
    
    constructor(
        private _setting: SettingsService,
        private _image: BannerService
    ) { }

    private getData() {
        const _setting = this._setting.getSettings();

        this
            ._setting
            .getSettings()
            .subscribe(
                (res) => this.onSuccess(res),
                (err) => this.onError(err)
            )
    }
    
    private onNewImage(image) {
        this.loading = true;
        this
            ._image
            .getPhoto()
            .subscribe(
                (res) => {
                this.image = res;
                this.loading = false;
                },
                (err) => this.onError(err)
            )
    }
    
    private onSave(image) {
        this._setting.updateSettings({banner: image})
    }
    
    private onSuccess(data) {
        let image = typeof data[0] === 'undefined' ? "https://images.unsplash.com/photo-1448920231336-a3886589d68a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1200&h=900&fit=crop&s=0c671eadfea1574b0bc6c400975b125a" : data[0].banner;
        this.image = image;
        this.loading = false;
    }
    
    private onError(err) {
        console.log(err)
    }

    ngOnInit() {
        this.getData();
    }

}