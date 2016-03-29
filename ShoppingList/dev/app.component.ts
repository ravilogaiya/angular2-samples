import {Component} from 'angular2/core';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';

@Component({
    selector: 'my-app',
    template: `
        <header>
        	<div class="brand">Shopping List</div>
        </header>
        <div class="main">
        	<sth-shopping-list></sth-shopping-list>
        </div>
    `,
    directives: [ShoppingListComponent]
})
export class AppComponent {

}
