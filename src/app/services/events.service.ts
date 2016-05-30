import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export default class EventsService {
    _endpoint: string;
    _events: FirebaseListObservable<any>;
    _key: string;

  constructor(
    private _http: Http,
    private _firebase: AngularFire
  ) { 
      this. _endpoint = 'https://aroget-angular-attack.firebaseio.com/events/'
      this._events = _firebase.database.list('/events')
  }
  
  getEvents() {
      return this._events;
  }

  saveEvent(data:Array<any>) {
      let promise = this._events.push(data);
      
      return promise.then(
          (res) => { return { code: "Event saved succesfully" } },
          (err) => { return { code: err } }
      )
  }
  
  delete(event) {
    let url = this._endpoint + event.$key;
    let item = new Firebase(this._endpoint + event.$key);
    item.remove();
  }
  
  updateEvent(data) {
      let promise = this._events.update(data.$key, {attendees: data.attendees });
      
      return promise.then(
          (res) => { return "Registered" },
          (err) => console.log(err)
      )
  }
}