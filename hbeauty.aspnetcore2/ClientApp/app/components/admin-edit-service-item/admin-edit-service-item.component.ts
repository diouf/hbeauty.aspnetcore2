import { FileService } from './../../services/file.service';
import { ServiceItemService } from './../../services/serviceitem.service';
import { Component } from '@angular/core';

@Component({
    selector: 'admin-edit-servie-item',
    templateUrl:'./admin-edit-service-item.component.html',
    styleUrls: ['./admin-edit-service-item.component.css']
})
export class AdminEditServiceItemComponent {
    
    
    constructor( private serviceItemService:ServiceItemService,private fileService: FileService){}
    
    ngOnInit(){}

    onImageSubmit(f:any){
        console.log(f);
    }

    onImageFileChange (event:any){
        console.log(event);
        let files = event.target.files; 
        this.saveFiles(files);
    }
    
    private saveFiles(files:any[]){
        if(files.length === 0 ) return;

        let formData :FormData = new FormData();
        for (var j = 0; j < files.length; j++) {
            formData.append("file[]", files[j], files[j].name);
        }

        var parameters = {
            serviceItemId:123
        }

        this.fileService.uploadServiceItemImage(formData,parameters)
        .subscribe(
            data=>{
                console.log(data);
            }
        )
        
    }

}
