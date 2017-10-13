
import { Component, Inject,OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ServiceItemService } from './serviceitem.service';

@Component({
    selector: 'service-item',
    templateUrl: './serviceitem.component.html'
})
export class ServiceItemComponent {
    public items: any[];
    constructor( private serviceItemService:ServiceItemService ){
    }
    
    OnInit(){
        this.serviceItemService.getAllServiceItem().subscribe(result => {
            this.items = result.json();
            console.log(result);
            console.log(this.items);
        }, error => console.error(error));
    }
    /*
    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/GetAllServiceItem').subscribe(result => {
            this.items = result.json();

            console.log(result);
            console.log(this.items);

        }, error => console.error(error));
    }
    */
}