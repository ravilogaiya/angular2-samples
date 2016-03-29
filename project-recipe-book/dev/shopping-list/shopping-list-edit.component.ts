import {Component} from 'angular2/core';
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "../shared/shopping-list.service";

@Component({
    selector: 'my-shopping-list-edit',
    template: `
        <h1>{{ingredient === null ? 'Add' : 'Edit'}} Item</h1>
        <form id="shopping-list-add" (ngSubmit)="onSubmit(f.value)" #f="ngForm">
            <label for="item-name">Name</label>
            <input type="text" id="item-name" required [ngModel]="ingredient?.name" ngControl="name">
            <label for="item-amount">Amount</label>
            <input type="text" id="item-amount" required [ngModel]="ingredient?.amount" ngControl="amount">
            <button class="btn" type="submit">{{ingredient === null ? 'Add' : 'Edit'}}</button>
            <button class="btn danger" *ngIf="ingredient !== null" (click)="onDelete()">Delete Item</button>
        </form>
    `,
    inputs: ['ingredient'],
    styleUrls: ['src/css/shopping-list.css']
})
export class ShoppingListEditComponent {
    ingredient: Ingredient;

    constructor(private _shoppingListService: ShoppingListService) {}

    onSubmit(item: Ingredient) {
        this.ingredient !== null
            ? this._shoppingListService.updateItem(this._shoppingListService.getIndexOfItem(this.ingredient), item)
            : this._shoppingListService.insertItem(item);
    }

    onDelete() {
        this._shoppingListService.deleteItem(this.ingredient);
        this.ingredient = null;
    }
}