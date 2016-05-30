import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export default class SettingsService {
    _settings: any;
    _endpoint: string;

  constructor(
    private _http: Http,
    private _firebase: AngularFire
  ) { 
      this._endpoint = 'https://aroget-angular-attack.firebaseio.com/settings/';
      this._settings = _firebase.database.list('/settings')
  }
  
    getSettings() {
        return this._settings;
        
        // let ref = new Firebase(this._endpoint);
        // var result = [];
        
        // let promise = new Promise( (resolve, reject) => {
        //     ref.on('value', (snap) => {
        //         snap.forEach(item => {
        //             result.push(item.val())
        //             resolve(result);
        //         })
        //     })
        // }) 
        
        // return promise.then(
        //     (res) => console.log(res), 
        //     (err) => console.log("err")
        // )
        
    }
  
  saveSettings(data:Array<any>) {
      let promise = this._settings.push(data);
      
      promise.then(
          (res) => console.log(res),
          (err) => console.log(err)
      )
  }
  
  updateSettings(data) {
      
      let promise = this._settings.update('-KHkJlkoOZmzZ19on4f4', data);
      
      promise.then(
          (res) => console.log('update successful'),
          (err) => console.log(err)
      )
  }
}