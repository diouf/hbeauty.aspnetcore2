
import { ServiceItemService } from './../../services/serviceitem.service';
import { Component } from '@angular/core';
import { FileService } from './../../services/file.service';

@Component({
    selector: 'admin-servie-item',
    templateUrl:'./admin-service-item.component.html',
    styleUrls: ['./admin-service-item.component.css']
})
export class AdminServiceItemComponent {

    loading = false;
    editing = false;
    items:any[];
    model:any = null;

    constructor( private serviceItemService:ServiceItemService,private fileService: FileService ){
    }

    ngOnInit(){
        this.loading = true;
        this.serviceItemService.getAll().subscribe(
            items => {
                this.items = items;
                this.loading = false;
            }
        );
    }

    getItem(id:number){
        this.loading = true;
        this.serviceItemService.getById(id).subscribe(
            model=> {
                this.model = model; 
                this.loading = false;
                this.editing = true;
            }
        );
    }

    onSubmit(){
        this.loading = true;
        this.serviceItemService.create(this.model).subscribe(
            data=> {
                console.log(data);
                var index = this.items.findIndex(i=>i.id === data.id);
                if(index === -1) this.items.unshift(data);
                else {
                    this.items.splice(index,1);
                    this.items.unshift(data);
                }
                
                this.loading = false;
                this.editing = false;
            }
        );
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
            serviceItemId:this.model.id
        }

        this.fileService.uploadServiceItemImage(formData,parameters)
        .subscribe(
            data=>{
                console.log(data);
            }
        )
        
    }
}
