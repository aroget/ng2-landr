import { Injectable } from '@angular/core';
import { Http, HTTP_PROVIDERS, Headers } from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export default class BannerService {
    _endpoint: string

    constructor(
        private _http: Http
    ) { 
        this._endpoint = 'https://source.unsplash.com/category/nature/1200x900';
    }
  
    public getPhoto() {
        return this
            ._http
            .get(this._endpoint)
            .map( (res) => res.url )
    }
}