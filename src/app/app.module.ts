import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    NgChartsModule
  ],
  providers: [
    File,
    FileOpener,
    EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }, 
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
