import { Directive, Attribute, ViewContainerRef, DynamicComponentLoader } from '@angular/core';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { Router, RouterOutlet, ComponentInstruction, OnActivate } from '@angular/router-deprecated';
import { AngularFire } from 'angularfire2';
import * as Firebase from 'firebase';

@Directive({
  selector: 'app-router',
  providers: [
    HTTP_PROVIDERS,
    AngularFire
  ]
})
export default class AppRouterComponent extends RouterOutlet { 
  private parentRouter: Router;
  private auth: AngularFire;
  private role: string;
  private isLoggedIn: boolean = false;

  constructor(
    _viewContainerRef: ViewContainerRef,
    _loader: DynamicComponentLoader,
    _parentRouter: Router,
    @Attribute('name') nameAttr: string,
    _auth: AngularFire
    ) {
      super(_viewContainerRef, _loader, _parentRouter, nameAttr);
      this.parentRouter = _parentRouter;
      this.auth = _auth
    }

  activate(instruction: ComponentInstruction) {
        let ref = new Firebase("https://aroget-angular-attack.firebaseio.com");
        let _self = this;

        ref.onAuth(function(authData) {
            if (!authData) {
                if (instruction.routeName.toLowerCase() === 'admin') {
                    _self.parentRouter.navigate(['Login'])
                } 
            } 
        })
        

    return super.activate(instruction);
  }
}
