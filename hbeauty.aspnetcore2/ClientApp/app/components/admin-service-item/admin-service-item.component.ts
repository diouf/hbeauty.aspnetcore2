import { DomSanitizer } from '@angular/platform-browser';
import { ServiceItemService } from './../../services/serviceitem.service';
import { Component } from '@angular/core';

@Component({
    selector: 'admin-servie-item',
    templateUrl:'./admin-service-item.component.html',
    styleUrls: ['./admin-service-item.component.css']
})
export class AdminServiceItemComponent {

    loading = false;

    items:any[];
    model:any = null;

    constructor( private serviceItemService:ServiceItemService, private domSanitizer: DomSanitizer ){
    }

    ngOnInit(){
        this.serviceItemService.getAll().subscribe(
            items => this.items = items
        );
    }

    getItem(id:number){
        this.loading = true;
        this.serviceItemService.getById(id).subscribe(
            model=> {
                this.model = model; 
                this.loading = false;
            }
        );
    }

    onSubmit(){
        this.serviceItemService.create(this.model).subscribe(
            res=> {
                console.log(res);
                console.log('done');
            }
        );
    }
}
