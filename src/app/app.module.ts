import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AccueilComponent } from './accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProblemeData } from './probleme/probleme-date';
import { TypeProblemeService } from './probleme/type-probleme.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProblemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule .forRoot(ProblemeData)
  ],
  providers: [TypeProblemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
