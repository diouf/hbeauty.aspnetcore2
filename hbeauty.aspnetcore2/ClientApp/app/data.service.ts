import { NotfoundError } from './not-found-error';
import { AppError } from './app-error';
import { Inject } from '@angular/core';
import {Injectable} from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Observable} from 'rxjs/Rx';

/*

import {Observable} from 'rxjs/Rx';
equals the following two lines - 'rxjs/Rx' contains both Observable and Observable.throw
import 'rxjs/add/Observable/throw';
import {Observable} from 'rxjs/Observable';

*/
@Injectable()
export class DataService{

    // constructor(private url:string, private http:Http,  @Inject('BASE_URL') private baseUrl?: string ){
    // }

    constructor(private url:string, protected http:Http){
    }

    getAll() {
        return this.http.get(this.url )
        .map(response => response.json())
        .catch( this.handlError);
    }
    
    getById(id:number){
        return this.http.get(this.url+'/'+id )
        .map(response => response.json())
        .catch( this.handlError);
    }

    create(entity:any){
        return this.http.post(this.url,entity)
        .map(response => response.json())
        .catch(this.handlError);
    }
    
    update(entity:any){
        return this.http.post(this.url,entity)
        .map(response => response.json())
        .catch(this.handlError);
    }

    delete(id:number){
        return this.http.delete(this.url+'/'+id)
        .map(response => response.json())
        .catch(this.handlError);
    }
    
    protected handlError(error:Response){
        if(error.status === 404) return Observable.throw(new NotfoundError() );
        
        return Observable.throw(new AppError(error) );
    }
}