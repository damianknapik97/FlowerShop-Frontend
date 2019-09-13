import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { LoginComponent } from './modules/account/login/login.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { HomeComponent } from './modules/home/home.component';
import { RegisterComponent } from './modules/account/register/register.component';
import { AccountComponent } from './modules/account/account.component';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    ProfileComponent,
    NotFoundComponent,
    HomeComponent,
    RegisterComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
