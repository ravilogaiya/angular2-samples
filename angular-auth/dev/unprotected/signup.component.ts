import {Component, OnInit} from "angular2/core";
import {FormBuilder, ControlGroup, Validators, Control} from "angular2/common";
import {AuthService} from '../shared/auth.service';

@Component({
    template: `
        <h3>Please sign up to use all features</h3>
        <form [ngFormModel]="myForm" (ngSubmit)="onSignup()">
            <div class="input-group">
                <label for="email">E-Mail</label>
                <input [ngFormControl]="myForm.find('email')" type="email" id="email" #email="ngForm">
                <span *ngIf="!email.pristine && email.errors != null && email.errors['noEmail']">Invalid mail address</span>
                <!--<span *ngIf="email.errors['isTaken']">This username has already been taken</span>-->
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input [ngFormControl]="myForm.find('password')" type="password" id="password">
            </div>
            <div class="input-group">
                <label for="confirm-password">Confirm Password</label>
                <input [ngFormControl]="myForm.find('confirmPassword')" type="password" id="confirm-password" #confirmPassword="ngForm">
                <span *ngIf="!confirmPassword.pristine && confirmPassword.errors != null && confirmPassword.errors['passwordsNotMatch']">Passwords do not match</span>
            </div>
            <button type="submit" [disabled]="!myForm.valid">Sign Up</button>
        </form>
    `
})
export class SignupComponent implements OnInit {
    myForm:ControlGroup;
    error = false;
    errorMessage = '';

    constructor(private _fb:FormBuilder, private _authService: AuthService) {
    }

    onSignup() {
        this._authService.signupUser(this.myForm.value);
    }

    ngOnInit():any {
        this.myForm = this._fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])],
        });
    }

    isEmail(control:Control):{[s: string]: boolean} {
        if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            return {noEmail: true};
        }
    }

    isEqualPassword(control:Control):{[s: string]: boolean} {
        if (!this.myForm) {
            return {passwordsNotMatch: true};

        }
        if (control.value !== this.myForm.controls['password'].value) {
            return {passwordsNotMatch: true};
        }
    }
}