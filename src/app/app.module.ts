import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Shard01Component } from './shards/shard-01/shard-01.component';
import { DesignerComponent } from './shards/designer/designer.component';

@NgModule({
  declarations: [
    AppComponent,
    Shard01Component,
    DesignerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
