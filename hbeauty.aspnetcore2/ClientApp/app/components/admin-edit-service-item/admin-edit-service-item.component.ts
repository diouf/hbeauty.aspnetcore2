import { DomSanitizer } from '@angular/platform-browser';
import { ServiceItemService } from './../../services/serviceitem.service';
import { Component } from '@angular/core';

@Component({
    selector: 'admin-edit-servie-item',
    templateUrl:'./admin-edit-service-item.component.html',
    styleUrls: ['./admin-edit-service-item.component.css']
})
export class AdminEditServiceItemComponent {
    
    model:any;
    
    /*
    model = {
        name_Cht:'111',
        description:'222',
        name_Eng:'333',
        description_Eng:'444'
    };
    */

    constructor( private serviceItemService:ServiceItemService, private domSanitizer: DomSanitizer ){}
    
    ngOnInit(){
        
        this.serviceItemService.getById(0).subscribe(
            model => {
               this.model = model;
               console.log(this.model);
            }
        );
        
    }

    onSubmit(){
        this.serviceItemService.create(this.model).subscribe(
            res=> console.log(res)
        );
    }

}
