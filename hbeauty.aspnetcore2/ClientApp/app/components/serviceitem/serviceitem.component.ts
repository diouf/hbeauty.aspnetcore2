import { NotfoundError } from './../../not-found-error';
import { AppError } from './../../app-error';

import { Component, Inject,OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ServiceItemService } from './serviceitem.service';

@Component({
    selector: 'service-item',
    templateUrl: './serviceitem.component.html'
})
export class ServiceItemComponent  {
    public items: any[];
    
    constructor( private serviceItemService:ServiceItemService ){
    }
    
    ngOnInit(){
        
        this.serviceItemService.getAll().subscribe(
            res => this.items = res.json()
        );

        
        this.serviceItemService.create(null).subscribe(
            res =>{
                console.log(res.json());
            },
            (error:Response) =>{
                if(error instanceof NotfoundError ){
                    // do something
                }
                //re-throw to upper level - here is AppErrorHandler
                else throw error;
            }
        )
        
        
    }
}