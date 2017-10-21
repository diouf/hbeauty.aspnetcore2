import { DomSanitizer } from '@angular/platform-browser';
import { ServiceItemService } from './../../services/serviceitem.service';
import { Component } from '@angular/core';

@Component({
    selector: 'admin-servie-item',
    templateUrl:'./admin-service-item.component.html',
    styleUrls: ['./admin-service-item.component.css']
})
export class AdminServiceItemComponent {
    items:any[];

    constructor( private serviceItemService:ServiceItemService, private domSanitizer: DomSanitizer ){
    }

    ngOnInit(){
        this.serviceItemService.getAll().subscribe(
            items => this.items = items
        );
    }
}