import { Component } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    items: FirebaseListObservable<any[]>;

    constructor(private db: AngularFireDatabase) {

    }

    ngOnInit() {
        this.items = this.db.list('/cuisines');
    }
}
