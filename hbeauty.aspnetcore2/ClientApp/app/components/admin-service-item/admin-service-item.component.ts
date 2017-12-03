
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

    delete(id: number) {

        if (!confirm('确定删除?')) return false;

        this.serviceItemService.delete(id).subscribe(
            res => {
                if (res.done) {
                    var itemIndex = this.items.findIndex(x => x.id == id);
                    this.items.splice(itemIndex, 1);
                    alert('done');
                }
            }
        )
    }


    
    
    

}
