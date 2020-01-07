import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './objects/app.component'
import { ArtService } from './objects/art.service'

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  providers:    [ ArtService ],
  declarations: [ AppComponent, ArtService ],
  bootstrap:    [ AppComponent, ArtService ]
})
export class AppModule { }
