import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'service-item',
    templateUrl: './serviceitem.component.html'
})
export class ServiceItemComponent {
    public items: any[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/GetAllServiceItem').subscribe(result => {
            this.items = result.json();

            console.log(result);
            console.log(this.items);

        }, error => console.error(error));
    }
}