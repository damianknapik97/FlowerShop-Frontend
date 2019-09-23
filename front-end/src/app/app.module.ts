import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NG_VALIDATORS } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { LoginComponent } from './modules/account/login/login.component';
import { ProfileComponent } from './modules/account/profile/profile.component';
import { HomeComponent } from './modules/home/home.component';
import { RegisterComponent } from './modules/account/register/register.component';
import { AccountComponent } from './modules/account/account.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, AuthenticationService, AuthenticationGuard } from './core/security';
import { ErrorInterceptor } from './core/security';
import { MatchStringValidatorDirective } from './core/directives/match-string.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    RegisterComponent,
    AccountComponent,
    MatchStringValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AuthenticationGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
