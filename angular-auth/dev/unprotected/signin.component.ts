import {Component, OnInit} from "angular2/core";
import {FormBuilder, ControlGroup, Validators} from "angular2/common";
import {AuthService} from '../shared/auth.service';

@Component({
    template: `
        <h3>Please sign up to use all features</h3>
        <form [ngFormModel]="myForm" (ngSubmit)="onSignin()">
            <div class="input-group">
                <label for="email">E-Mail</label>
                <input [ngFormControl]="myForm.find('email')" type="email" id="email">
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input [ngFormControl]="myForm.find('password')" type="password" id="password">
            </div>
            <button type="submit" [disabled]="!myForm.valid">Sign In</button>
        </form>
    `
})
export class SigninComponent implements OnInit {
    myForm: ControlGroup;
    error = false;
    errorMessage = '';

    constructor(private _fb: FormBuilder, private _authService: AuthService) { }

    onSignin() {
        this._authService.signinUser(this.myForm.value);
    }

    ngOnInit():any {
        this.myForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        }); 
    }
}