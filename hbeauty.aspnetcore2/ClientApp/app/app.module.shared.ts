
import { ErrorHandler } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoComponent } from './components/info/info.component';
import { IntroComponent } from './components/intro/intro.component';

import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ServiceItemComponent } from './components/serviceitem/serviceitem.component';

import { AdminComponent } from './components/admin/admin.component';
import { AdminServiceItemComponent } from './components/admin-service-item/admin-service-item.component';
import { AdminEditServiceItemComponent } from './components/admin-edit-service-item/admin-edit-service-item.component';

//services
import { ServiceItemService } from './services/serviceitem.service';
import { FileService } from './services/file.service';
import { ServiceItemVideoService } from './services/serviceitemvideo.service';

import {AppErrorHandler} from './app-error-handler';

//pipes
import { Summary } from './pipes/Summary';


import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

@NgModule({
    providers:[
        ServiceItemService,
        FileService,
        ServiceItemVideoService,
        {provide:ErrorHandler,useClass:AppErrorHandler},
        NotificationsService
    ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        HeaderComponent,
        InfoComponent,
        ServiceItemComponent,
        IntroComponent,
        AdminComponent,
        AdminServiceItemComponent,
        AdminEditServiceItemComponent,
        Summary
    ],
    imports: [
        SimpleNotificationsModule,
        CommonModule,
        HttpModule,
        FormsModule,
        
        RouterModule.forRoot([
            { path: '', component:HomeComponent},

            { path: 'ad', component:AdminComponent,
              children:[
                  {path: 'serviceitems', component: AdminServiceItemComponent},
                  {path: 'serviceitems/:serviceItemId', component: AdminEditServiceItemComponent}
                ]
            },

            { path: 'dion', redirectTo:'ad'},
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo:''}
        ]),
    ]
})
export class AppModuleShared {
}
