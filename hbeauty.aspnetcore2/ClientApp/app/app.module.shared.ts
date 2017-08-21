import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyDjcII6dQNqK0oLPclA5WSA-FbF1Rv29T0",
            authDomain: "hbeauty-298cb.firebaseapp.com",
            databaseURL: "https://hbeauty-298cb.firebaseio.com",
            projectId: "hbeauty-298cb",
            storageBucket: "hbeauty-298cb.appspot.com",
            messagingSenderId: "170904808691"
        }),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ]
})
export class AppModuleShared {
}
