import { AppError } from './../app-error';
import { NotfoundError } from './../not-found-error';
import { PlatformState } from '@angular/platform-server';

import {Injectable} from "@angular/core";
import { Http, RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class FileService{

    constructor(private http:Http){
    }
    
    uploadServiceItemImage(files:any, parameters:any){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        options.params = parameters;
        return  this.http.post('/api/File/UploadServiceItemImage', files, options)
                 .map(response => response.json())
                 .catch(error => Observable.throw(error));
    }

    private handlError(error:Response){
        if(error.status === 404) return Observable.throw(new NotfoundError() );
        
        return Observable.throw(new AppError(error) );
    }
}