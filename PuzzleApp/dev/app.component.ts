import {Component} from 'angular2/core';
import {PuzzleComponent} from './puzzle/puzzle.component'

@Component({
    selector: 'my-app',
    template: `
        <sth-puzzle></sth-puzzle>
    `,
    directives: [PuzzleComponent]
})
export class AppComponent {

}
