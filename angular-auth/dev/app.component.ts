import {Component, OnInit} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from "angular2/router";
import {SignupComponent} from "./unprotected/signup.component";
import {SigninComponent} from "./unprotected/signin.component";
import {ProtectedComponent} from "./protected/protected.component";
import {SuperSecretComponent} from "./protected/supersecret.component";
import {HeaderComponent} from "./shared/header.component";
import {AuthService} from "./shared/auth.service";
import {AuthRouterOutlet} from "./shared/auth-router-outlet.directive";

@Component({
    selector: 'my-app',
    template: `
        <my-header></my-header>
        <div class="main">
            <auth-router-outlet></auth-router-outlet>
        </div>
    `,
    directives: [HeaderComponent, AuthRouterOutlet]
})
@RouteConfig([
    {path: '/signup', name: 'Signup', component: SignupComponent, useAsDefault: true},
    {path: '/signin', name: 'Signin', component: SigninComponent},
    {path: '/protected', name: 'Protected', component: ProtectedComponent},
    {path: '/supersecret', name: 'SuperSecret', component: SuperSecretComponent},
])
export class AppComponent implements OnInit {
    constructor(private _router: Router, private _authService: AuthService) {}

    ngOnInit(): any {
        this._authService.getLoggedOutEvent().subscribe(() => {
            this._router.navigate(['Signin']);
        });
    }
}