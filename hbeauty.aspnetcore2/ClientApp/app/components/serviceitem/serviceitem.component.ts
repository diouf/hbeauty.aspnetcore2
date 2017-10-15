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
        
        this.serviceItemService.getAllServiceItem().subscribe(
            res => {
                this.items = res.json();  
            },
            (error:AppError) => {
                if(error instanceof NotfoundError){
                    //this.form.setError(error.originalError);
                    alert('resource not found');
                }

                alert('there was an error getting data');
            }
        );
        
        this.serviceItemService.postServiceItem().subscribe(
            res =>{
                console.log(res.json());
            }
        )
    }
}