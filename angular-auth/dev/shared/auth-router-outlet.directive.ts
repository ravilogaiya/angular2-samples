import {RouterOutlet} from "angular2/router";
import {Directive} from "angular2/core";
import {ElementRef} from "angular2/core";
import {DynamicComponentLoader} from "angular2/core";
import {Router} from "angular2/router";
import {Attribute} from "angular2/core";
import {ComponentInstruction} from "angular2/router";
import {AuthService} from "./auth.service";

@Directive({
    selector: 'auth-router-outlet'
})
export class AuthRouterOutlet extends RouterOutlet {
    private _protectedRoutes = {
        'protected' : true,
        'supersecret' : true
    };

    constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader, private _parentRouter: Router, @Attribute('name') _nameAttr: string, private _authService: AuthService) {
        super(_elementRef, _loader, _parentRouter, _nameAttr);
    }

    activate(nextInstruction: ComponentInstruction): Promise<any> {
        const url = nextInstruction.urlPath;
        if (this._protectedRoutes[url] && !this._authService.isAuthenticated()) {
            this._parentRouter.navigate(['Signin']);
            console.log("url = " + url);
        }

        return super.activate(nextInstruction);
    }
}