import { DataService } from './../data.service';

import {Injectable} from "@angular/core";
import { Http } from '@angular/http';

@Injectable()
export class ServiceItemService extends DataService{

    constructor( http:Http){
        super(http,"api/ServiceItem");
    }

    deleteImage(id:number,fileName:string){
       return this.http.delete('/api/File/DeleteSetviceItemImage/'+id)
        .map(res=>res.json())
        .catch(super.handlError);
    }
}