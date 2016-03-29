import {Injectable} from 'angular2/core';
import {User} from './user.interface';
import {EventEmitter} from "angular2/core";
declare var Firebase: any;

@Injectable()
export class AuthService {
	private _userLoggedOut = new EventEmitter<any>();

	signupUser(user: User) {
		const firebaseRef = new Firebase('https://crackling-torch-9590.firebaseio.com');
		firebaseRef.createUser({
			email: user.email,
			password: user.password
		}, function(error, userData) {
			if (error) {
				console.error(error);
			} else {
				console.log('Successfully create user: ' + userData.uid);
			}
		});
	}

	signinUser(user: User) {
		const firebaseRef = new Firebase('https://crackling-torch-9590.firebaseio.com');
		firebaseRef.authWithPassword({
			email: user.email,
			password: user.password
		}, function(error, authData) {
			if (error) {
				console.error(error);
			} else {
                localStorage.setItem('angular-auth-token', authData.token);
				console.log('Successfully authenticated: ' + authData);
			}
		});
	}

	logout() {
		localStorage.removeItem("angular-auth-token");
		this._userLoggedOut.emit(null);
	}

	getLoggedOutEvent() {
		return this._userLoggedOut;
	}

	isAuthenticated(): boolean {
		return localStorage.getItem('angular-auth-token') != null;
	}
}
