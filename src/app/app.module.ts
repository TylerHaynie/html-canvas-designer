import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Shard01Component } from './shards/shard-01/shard-01.component';
import { Shard02Component } from './shards/shard-02/shard-02.component';
import { Shard03Component } from './shards/shard-03/shard-03.component';

@NgModule({
  declarations: [
    AppComponent,
    Shard01Component,
    Shard02Component,
    Shard03Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
