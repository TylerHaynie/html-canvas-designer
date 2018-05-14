import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { CssGridGenerationComponent } from './shards/css-grid-generation/css-grid-generation.component';
import { DesignerComponent } from './shards/designer/designer.component';

@NgModule({
  declarations: [
    AppComponent,
    CssGridGenerationComponent,
    DesignerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
