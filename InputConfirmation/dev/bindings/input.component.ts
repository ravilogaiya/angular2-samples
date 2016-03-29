import {Component, EventEmitter} from 'angular2/core';

@Component({
	selector: 'sth-input',
	template: `
		<h1>Your details, please</h1>
		<div>
			<label for="name">Your Name</label>
			<input type="text" id="name" [(ngModel)]="myself.name" (keyup)="onKeyup()">
		</div>
		<div>
			<label for="age">Your Age</label>
			<input type="text" id="age" [(ngModel)]="myself.age" (keyup)="onKeyup()">
		</div>
		<br>
		<div>Filled out: {{isFilled1 ? 'Yes' : 'No'}}</div>
		<div>Valid : {{isValid1 ? 'Yes' : 'No'}}</div>
		<br>
		<button [disabled]="!isValid1" (click)="onSubmit()">Submit</button>
 	`,
	inputs: ['myself'],
 	outputs: ['submitted']
})
export class InputComponent {
	myself = { name: '', age: '' };
	isFilled1 = false;
	isValid1 = false;
	submitted = new EventEmitter<{name: string, age: string}>();

	onKeyup() {
		if (this.myself.name != '' && this.myself.age != '') {
			this.isFilled1 = true;
		} else {
			this.isFilled1 = false;
		}

		if (this.myself.name != '' && /^\d+$/.test(this.myself.age)) {
			this.isValid1 = true;
		} else {
			this.isValid1 = false;
		}
	}

	onSubmit() {
		this.submitted.emit(this.myself);
	}
}