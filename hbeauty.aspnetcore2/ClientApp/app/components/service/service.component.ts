import { Component, OnInit } from '@angular/core';
import { SharedComponent } from '../shared/shared.component';

//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'service',
    templateUrl: './service.component.html'
})
export class ServiceComponent {

    public item1 = 100;
    //items: FirebaseListObservable<any[]>;

    //constructor(private db: AngularFireDatabase) {

    //}

    ngOnInit() {
        //this.items = this.db.list('/services');
        //console.log(this.db);
        console.log('????????????????????????????????????')
    }
}