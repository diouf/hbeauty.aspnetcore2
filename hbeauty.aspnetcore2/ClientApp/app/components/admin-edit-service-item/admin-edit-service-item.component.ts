import { DomSanitizer } from '@angular/platform-browser';
import { ServiceItemService } from './../../services/serviceitem.service';
import { Component } from '@angular/core';

@Component({
    selector: 'admin-edit-servie-item',
    templateUrl:'./admin-edit-service-item.component.html',
    styleUrls: ['./admin-edit-service-item.component.css']
})
export class AdminEditServiceItemComponent {
    item:any;
    
    model={
        name_Cht:'',
        description:'some comment here...'
      };

    constructor( private serviceItemService:ServiceItemService, private domSanitizer: DomSanitizer ){
    }

    ngOnInit(){
        this.serviceItemService.getById(0).subscribe(
           item => this.item = item
        );
    }

    onSubmit(){
        this.serviceItemService.create(this.model).subscribe(
            res=> console.log(res)
        );
    }

}
