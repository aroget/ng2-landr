import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import '../style/app.scss';


import HomeContainerComponent from './containers/home/index.container';
import AdminContainerComponent from './containers/admin/index.container';
import LoginContainerComponent from './containers/login/index.container';

import AppRouterComponent from './directives/router.directive';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app', // <my-app></my-app>
  providers: [],
  directives: [
    ...ROUTER_DIRECTIVES,
    AppRouterComponent
  ],
  template: `
  <div class="twelve columns">
    <app-router></app-router>
  </div>
  `
})
@RouteConfig([
  {path: '/', component: HomeContainerComponent, name: 'Home'},
  {path: '/admin/...', component: AdminContainerComponent, name: 'Admin'},
  {path: '/login', component: LoginContainerComponent, name: 'Login'}
])
export class AppComponent { }
