
import { ServiceItemService } from './../../services/serviceitem.service';
import { ServiceItemVideoService } from './../../services/serviceitemvideo.service';

import { Component } from '@angular/core';
import { FileService } from './../../services/file.service';
import {DomSanitizer} from '@angular/platform-browser';

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

    constructor( private serviceItemService:ServiceItemService, private fileService: FileService,
        private domSanitizer: DomSanitizer,private serviceItemVideoService : ServiceItemVideoService ){
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
            }
        );
        
    }

    deleteImage(img:any) {

        if( !confirm('确定删除该图片?') ) return false;

        this.loading = true;
        this.serviceItemService.deleteImage(img.id,img.url)
        .subscribe(res=>{
            if(res.done){
                var images = this.model.images as any[];
                var imgIndex = images.findIndex(x => x.id == img.id);
                this.model.images.splice(imgIndex,1);
                this.loading = false;
            }
        });
    }


    onImageFileChange (event:any){
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
        
        this.loading = true;
        this.fileService.uploadServiceItemImage(formData,parameters)

        .subscribe(
            res=>{
                if(res.done){
                    this.model.images.push(res.newImage);
                    this.loading = false;
                }else{
                    alert(res.msg);
                } 
            }
        )
        
    }

    handleVidUrl(url:string){
        if(url.length===0) return null;
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }

    deleteVideo(v:any){
        if( !confirm('确定删除该视频?') ) return false;

        this.loading = true;
        this.serviceItemVideoService.delete(v.id).subscribe(
            res =>{
                
                var videos = this.model.videos as any[];
                var imgIndex = videos.findIndex(x => x.id == v.id);
                this.model.videos.splice(imgIndex,1);
                this.loading = false;
            }
        );
    }

    onVideoSubmit(fVideo:any){

        this.loading = true;
        var item = fVideo.value;
        this.serviceItemVideoService.create(item).subscribe(
            data => {
                this.model.videos.unshift(data);
                this.loading = false;
            }
        )
    }

}
