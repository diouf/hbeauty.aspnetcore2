import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";

@Injectable()
export class ServiceItemService{

    constructor(private http:Http,  @Inject('BASE_URL') private baseUrl: string ){
    }

    getAllServiceItem() {
        console.log('aaa');
        //return this.http.get(this.baseUrl + 'api/GetAllServiceItem');
        this.http.get(this.baseUrl + 'api/GetAllServiceItem').subscribe(
            (res) => {console.log(res);}
        )
    }
}