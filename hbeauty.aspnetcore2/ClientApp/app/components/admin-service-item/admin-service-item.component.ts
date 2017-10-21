import { DomSanitizer } from '@angular/platform-browser';
import { ServiceItemService } from './../../services/serviceitem.service';
import { Component } from '@angular/core';

@Component({
    selector: 'admin-servie-item',
    templateUrl:'./admin-service-item.component.html'
})
export class AdminServiceItemComponent {
    items:any[];

    constructor( private serviceItemService:ServiceItemService, private domSanitizer: DomSanitizer ){
    }

    ngOnInit(){

    }

}
