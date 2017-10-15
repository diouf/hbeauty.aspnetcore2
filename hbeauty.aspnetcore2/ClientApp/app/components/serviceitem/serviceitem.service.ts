import { DataService } from './../../data.service';
import {Injectable} from "@angular/core";
import { Http } from '@angular/http';

/*

import {Observable} from 'rxjs/Rx';
equals the following two lines - 'rxjs/Rx' contains both Observable and Observable.throw
import 'rxjs/add/Observable/throw';
import {Observable} from 'rxjs/Observable';

*/
@Injectable()
export class ServiceItemService extends DataService{

    constructor(http:Http){
        super("api/GetAllServiceItem",http);
    }
}