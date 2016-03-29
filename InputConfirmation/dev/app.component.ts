import {Component} from 'angular2/core';
import {InputComponent} from './bindings/input.component';
import {ConfirmComponent} from './bindings/confirm.component';

@Component({
    selector: 'my-app',
    template: `
    	<div class="container">
        	<sth-input (submitted)="onSubmit($event)" [myself]="confirmedMyself"></sth-input>
        </div>
        <br>
        <div class="container">
        	<sth-confirm (confirmed)="onConfirm($event)" [myself]="myself"></sth-confirm>
        </div>
    `,
    directives: [InputComponent, ConfirmComponent]
})
export class AppComponent {
	myself = { name: '', age: '' };
	confirmedMyself = { name: '', age: '' };

	onSubmit(myself: {name: string, age: string}) {
		this.myself = { name: myself.name, age: myself.age };
	}

	onConfirm(myself: { name: string, age: string }) {
		this.confirmedMyself = { name: myself.name, age: myself.age };
	}
}
