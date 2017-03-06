import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CelularComponent } from './celular/celular.component';
import { AplicacionComponent } from './aplicacion/aplicacion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CelularComponent,
    AplicacionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
