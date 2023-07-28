import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ModalEditComponent } from './Pages/modal-edit/modal-edit.component';
import { ModalAddComponent } from './Pages/modal-add/modal-add.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalEditComponent,
    ModalAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
