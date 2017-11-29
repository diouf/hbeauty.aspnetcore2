import {Router,ActivatedRoute} from '@angular/router'
import { FileService } from './../../services/file.service';
import { ServiceItemService } from './../../services/serviceitem.service';
import { Component } from '@angular/core';
import { ServiceItemVideoService } from './../../services/serviceitemvideo.service';
import {DomSanitizer} from '@angular/platform-browser';

import {SimpleNotificationsComponent,NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'admin-edit-servie-item',
    templateUrl:'./admin-edit-service-item.component.html',
    styleUrls: ['./admin-edit-service-item.component.css']
})
export class AdminEditServiceItemComponent {
    
    public options = {
        position: ["bottom", "right"],
        timeOut: 2000,
        lastOnBottom: true
    }

    model:any = null;
    isEdit: boolean = false;

    constructor( 
        private notificationsService:NotificationsService,
        private router:Router,
        private activatedRoute:ActivatedRoute,
        private serviceItemService:ServiceItemService,
        private fileService: FileService,
        private serviceItemVideoService: ServiceItemVideoService,
        private domSanitizer: DomSanitizer
    ){
        //console.log('notificationService:',this.notificationsService);
    }
    
    ngOnInit(){
        this.activatedRoute.paramMap
            .subscribe(params => {
            let tmpid = params.get('serviceItemId')||'0';
            let id = parseInt(tmpid);

            this.isEdit = id > 0;

            this.getItem(id);
        });
    }

    getItem(id:number){
        this.serviceItemService.getById(id).subscribe(
            model=> {
                this.model = model;
            }
        );
    }
    onSubmit(){
        this.serviceItemService.create(this.model).subscribe(
            data=> {
                this.router.navigateByUrl('/ad/serviceitems')
            }
        );
    }

    deleteImage(img:any) {
        
                if( !confirm('确定删除该图片?') ) return false;
                
                this.serviceItemService.deleteImage(img.id,img.url)
                .subscribe(res=>{
                    if(res.done){
                        var images = this.model.images as any[];
                        var imgIndex = images.findIndex(x => x.id == img.id);
                        this.model.images.splice(imgIndex,1);

                        this.notificationsService.success('done');
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
        
        this.fileService.uploadServiceItemImage(formData,parameters)

        .subscribe(
            res=>{
                if(res.done) {
                    this.model.images.push(res.newImage);
                    this.notificationsService.success('done');
                }
                else alert(res.msg);
            }
        )
        
    }

    handleVidUrl(url:string){
        if(url.length===0) return null;
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }

    deleteVideo(v:any){
        if( !confirm('确定删除该视频?') ) return false;

        this.serviceItemVideoService.delete(v.id).subscribe(
            res =>{
                
                var videos = this.model.videos as any[];
                var imgIndex = videos.findIndex(x => x.id == v.id);
                this.model.videos.splice(imgIndex,1);
                this.notificationsService.success('done');
            }
        );
    }

    onVideoSubmit(fVideo:any){
        var item = fVideo.value;
        this.serviceItemVideoService.create(item).subscribe(
            data => {
                this.model.videos.unshift(data);
                this.notificationsService.success('done');
            }
        )
    }
}
