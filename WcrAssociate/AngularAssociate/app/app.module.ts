import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';  

import {
    MatButtonModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatCardModule, MatSidenavModule, MatFormFieldModule,
    MatInputModule, MatTooltipModule, MatToolbarModule
} from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';  
import { LoginComponent } from './components/login/login.component';  
import { RegisterComponent } from './components/register/register.component';  






@NgModule({
  declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent

  ],
  imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatMenuModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatIconModule,
      MatRadioModule,
      MatCardModule,
      MatSidenavModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      MatToolbarModule,
      MatSelectModule,
      AppRoutingModule
  ],
    providers: [HttpClientModule],
    bootstrap: [AppComponent]  
})
export class AppModule { }
