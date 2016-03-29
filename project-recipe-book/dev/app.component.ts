import {Component} from 'angular2/core';
import {RecipesComponent} from "./recipe-book/recipes.component";
import {RouteConfig} from "angular2/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: 'my-app',
    template: `
        <header>
            <nav>
                <ul>
                    <li><a [routerLink]="['Recipes']">Recipes</a></li>
                    <li><a [routerLink]="['ShoppingList']">Shopping List</a></li>
                </ul>
            </nav>
        </header>
        <div class="main">
            <router-outlet></router-outlet>
        </div>

    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/recipes/...', name: 'Recipes', component: RecipesComponent, useAsDefault: true},
    {path: '/shopping-list', name: 'ShoppingList', component: ShoppingListComponent},
])
export class AppComponent {

}