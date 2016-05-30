import { Component, OnInit } from '@angular/core';
import * as Firebase from 'firebase';
import { RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated'

/**
 * Containers
 */
import IndexContainerComponent from './index/index.container';
import SettingsContainerComponent from './settings/index.container';
import EventsContainerComponent from './events/index.container';
import BannerContainerComponent from './banner/index.container';
import ErrorContainerComponent from '../error/index.container';

@Component({
    directives: [
        RouterLink,
        ROUTER_DIRECTIVES
    ],
    styles: [require('./admin.scss')],
    template: `
    <div class="sidebar">
        <ul>
            <li>
                <a [routerLink]="['Index']">Dashboard</a>
            </li>
            <li>
                <a [routerLink]="['Events/All']">Events</a>
            </li>
            <li>
                <a [routerLink]="['Banner']">Banner</a>
            </li>
            <li>
                <a [routerLink]="['Settings']">Settings</a>
            </li>
            <li>
                <button class="primary" (click)=onSignOut()>Sign Out</button>
            </li>
        </ul>
    </div>
    <div class="main-content">
        <router-outlet></router-outlet>
    </div>
    `
})

@RouteConfig([
    {
    path: '/index',
    component: IndexContainerComponent,
    as: 'Index'
  },
  {
    path: '/settings',
    component: SettingsContainerComponent,
    as: 'Settings'
  },
  {
    path: '/events/...',
    component: EventsContainerComponent,
    as: 'Events'
  },
  {
    path: '/banner',
    component: BannerContainerComponent,
    as: 'Banner'
  },
  {
    path: '/**',
    component: ErrorContainerComponent,
    as: 'Error'
  }
])
export default class AdminContainerComonent implements OnInit {
    constructor(
        private _router: Router
    ) { }

    ngOnInit() { }
    
    onSignOut() {
        let ref = new Firebase("https://aroget-angular-attack.firebaseio.com");
        ref.unauth();
        this._router.navigate(['Login'])
    }

}
