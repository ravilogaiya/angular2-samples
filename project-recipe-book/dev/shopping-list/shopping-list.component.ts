import {Component} from 'angular2/core';
import {ShoppingListEditComponent} from "./shopping-list-edit.component";
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "../shared/shopping-list.service";
import {OnInit} from "angular2/core";

@Component({
    template: `
        <h1>Shopping List</h1>
        <my-shopping-list-edit [ingredient]="selectedItem"></my-shopping-list-edit>
        <div class="list">
            <button class="btn" (click)="onAddItem()">Add new Item</button>
            <ul>
                <li *ngFor="#item of shoppingList" (click)="onSelectItem(item)">{{item.name}} ({{item.amount}})</li>
            </ul>
        </div>
    `,
    directives: [ShoppingListEditComponent],
    providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
    shoppingList: Ingredient[];
    selectedItem: Ingredient = null;

    constructor(private _shoppingListService: ShoppingListService) {}

    onSelectItem(item: Ingredient) {
        this.selectedItem = item;
    }

    onAddItem() {
        this.selectedItem = null;
    }

    ngOnInit():any {
        this.shoppingList = this._shoppingListService.getAllItems();
    }
}