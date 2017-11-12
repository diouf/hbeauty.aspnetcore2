
import { ServiceItemService } from './../../services/serviceitem.service';

import { Component } from '@angular/core';
import { FileService } from './../../services/file.service';

@Component({
    selector: 'admin-servie-item',
    templateUrl:'./admin-service-item.component.html',
    styleUrls: ['./admin-service-item.component.css']
})
export class AdminServiceItemComponent {
    
    items:any[];

    constructor( private serviceItemService:ServiceItemService){}
    
    ngOnInit(){
        this.serviceItemService.getAll().subscribe(
            items => {
                this.items = items;
            }
        );
    }

    


    
    
    

}
