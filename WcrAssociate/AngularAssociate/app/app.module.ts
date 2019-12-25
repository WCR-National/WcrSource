import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';  

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
//import { LoginComponent } from './components/login/login.component';  
import {  PasswordValidator, ParentErrorStateMatcher } from '../app/_helpers/validators';
import { AuthComponent } from './components/auth/auth.component';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
    FooterComponent,
    HeaderComponent,
    SharedModule
} from '../app/shared';

import {
    ApiService,
    AuthGuard,
    JwtService,
    ProfilesService,
    UserService,
    HomeAuthResolver,
    NoAuthGuard

} from './services/auth';


@NgModule({
  declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        //LoginComponent,
        //RegisterComponent,
        FooterComponent,
        HeaderComponent,
        AuthComponent
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
      AppRoutingModule,
      SharedModule
    ],
    providers: [
        HttpClientModule,
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        ApiService,
        AuthGuard,
        JwtService,
        ProfilesService,
        UserService,
        HomeAuthResolver,
        NoAuthGuard,
        PasswordValidator,
        ParentErrorStateMatcher

    ],
    bootstrap: [AppComponent]  
})
export class AppModule { }
