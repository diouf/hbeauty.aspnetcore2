import { NotfoundError } from './../../not-found-error';
import { AppError } from './../../app-error';

import { Component, Inject,OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ServiceItemService } from './../../services/serviceitem.service';

import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'service-item',
    templateUrl: './serviceitem.component.html'
})
export class ServiceItemComponent  {
    public items: any[];
    
    constructor( private serviceItemService:ServiceItemService, private domSanitizer: DomSanitizer ){
    }

    ngOnInit(){
        this.serviceItemService.getAll().subscribe(
            items => this.items = items
        );
    }

    handleVidUrl(url:string){
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
}