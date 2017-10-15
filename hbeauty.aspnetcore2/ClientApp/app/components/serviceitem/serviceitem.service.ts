import { NotfoundError } from './../../not-found-error';
import { AppError } from './../../app-error';
import { Inject } from '@angular/core';
import {Injectable} from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
//import 'rxjs/add/Observable/throw';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ServiceItemService{

    constructor(private http:Http,  @Inject('BASE_URL') private baseUrl: string ){
    }

    getAllServiceItem() {
        return this.http.get(this.baseUrl + 'api/GetAllServiceItem')
        .catch( (error:Response) => {
            if(error.status === 404) return Observable.throw(new NotfoundError(error.json() ) );
            
            return Observable.throw(new AppError(error) );
        });
    }

    postServiceItem(){
        return this.http.post(this.baseUrl + 'api/ServiceItem/Post',{"id":111,"name_Eng":"eng_Name"});
    }
}