import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, RouterLink } from '@angular/router-deprecated';

import AddContainerComponent from './add/index.container';
import AllContainerComponent from './all/index.container';

@RouteConfig([
  {path: '/add', component: AddContainerComponent, name: 'Add'},
  {path: '/all', component: AllContainerComponent, name: 'All'}
])

@Component({
    directives: [
        ROUTER_DIRECTIVES,
        RouterLink
    ],
    styles: [`
        div {
            text-align: center;
        }
        a {
            margin-right: 20px;
        }
        a:last-child {
            margin-right: 0;
        }
    `],
    template: `
    <div>
        <a [routerLink]="['Add']">Add</a>
        <a [routerLink]="['All']">All</a>
    </div>
    <router-outlet></router-outlet>
    `
})
export default class EventsContainerComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}