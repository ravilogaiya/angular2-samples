import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataService {
	
	constructor(private _http: Http) {
		// code...
	}

	getAllData() : Observable<any> {
		const token = localStorage.getItem('angular-auth-token') !== null ? '?auth=' + localStorage.getItem('angular-auth-token') : '';
		return this._http.get('https://crackling-torch-9590.firebaseio.com/users/data.json' + token).map(response => response.json());
	}

	addData(data: any) : Observable<any> {
		const body = JSON.stringify(data);
		const headers = new Headers();
		const token = localStorage.getItem('angular-auth-token') !== null ? '?auth=' + localStorage.getItem('angular-auth-token') : '';
		headers.append('Content-Type', 'application/json');
		return this._http.post('https://crackling-torch-9590.firebaseio.com/users/data.json' + token, body, {headers: headers}).map(respone => respone.json())
	}

	deleteAllData(): Observable<any> {
		const token = localStorage.getItem('angular-auth-token') !== null ? '?auth=' + localStorage.getItem('angular-auth-token') : '';
		return this._http.delete('https://crackling-torch-9590.firebaseio.com/users/data.json' + token).map(response => response.json());
	}
}