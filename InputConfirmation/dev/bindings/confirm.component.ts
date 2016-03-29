import {Component, EventEmitter} from 'angular2/core';

@Component({
	selector: 'sth-confirm',
	template: `
		<h1>You submitted following details. Is this correct?</h1>
		<p>Your name is <span class="highlight">{{myself.name}}</span> and you're <span class="highlight">{{myself.age}}</span> years old. Please click on 'Confirm' if you have any changes to this information.</p>
		<div>
			<label for="name">Your Name</label>
			<input type="text" id="name" [(ngModel)]="myself.name" (keyup)="onKeyup()">
		</div>
		<div>
			<label for="age">Your Age</label>
			<input type="text" id="age" [(ngModel)]="myself.age" (keyup)="onKeyup()">
		</div>
		<br>
		<div>Filled out: {{isFilled2 ? 'Yes' : 'No'}}</div>
		<div>Valid : {{isValid2 ? 'Yes' : 'No'}}</div>
		<br>
		<button [disabled]="!isValid2" (click)="onConfirm()">Confirm</button>
 	`,
 	inputs: ['myself'],
	outputs: ['confirmed']
})
export class ConfirmComponent {
	myself = { name: '', age: '' };
	isFilled2 = false;
	isValid2 = false;
	confirmed = new EventEmitter<{ name: string, age: string }>();

	onKeyup() {
		if (this.myself.name != '' && this.myself.age != '') {
			this.isFilled2 = true;
		} else {
			this.isFilled2 = false;
		}

		if (this.myself.name != '' && /^\d+$/.test(this.myself.age)) {
			this.isValid2 = true;
		} else {
			this.isValid2 = false;
		}
	}

	onConfirm() {
		this.confirmed.emit(this.myself);
	}
}