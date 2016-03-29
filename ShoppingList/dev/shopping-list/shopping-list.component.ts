import {Component} from 'angular2/core';
import {ShoppingListNewItemComponent} from './shopping-list-new-item.component';
import {ShoppingListItemComponent} from './shopping-list-item.component';
import {ListItem} from '../list-item';

@Component({
	selector: 'sth-shopping-list',
	template: `
		<section>
			<sth-shopping-list-new-item (itemAdded)="onItemAdded($event)"></sth-shopping-list-new-item>
		</section>
		<section>
			<h3>My List</h3>
			<div class='list'>
				<ul>
					<li *ngFor="#listItem of listItems" (click)="onSelect(listItem)">{{listItem.name}} ({{listItem.amount}})</li>
				</ul>
			</div>
		</section>
		<section *ngIf="selectedItem != null">
			<sth-shopping-list-item [item]="selectedItem" (removed)="onRemoved($event)"></sth-shopping-list-item>
		</section>
	`,
	directives: [ShoppingListNewItemComponent, ShoppingListItemComponent]
})
export class ShoppingListComponent {
	listItems = new Array<ListItem>();
	selectedItem: ListItem;

	onItemAdded(item: ListItem) {
		this.listItems.push({name: item.name, amount: item.amount});
	}

	onSelect(item: ListItem) {
		this.selectedItem = item;
	}

	onRemoved(item: ListItem) {
		this.listItems.splice(this.listItems.indexOf(item), 1);
		this.selectedItem = null;
	}
}