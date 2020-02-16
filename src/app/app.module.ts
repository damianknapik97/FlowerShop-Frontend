import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NG_VALIDATORS } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { LoginComponent } from './modules/account/login/login.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { HomeComponent } from './modules/home/home.component';
import { RegisterComponent } from './modules/account/register/register.component';
import { AccountComponent } from './modules/account/account.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService, AuthenticationGuard } from './core/security';
import { ErrorInterceptor, JwtInterceptor } from './core/interceptors';
import { MatchStringValidatorDirective } from './core/directives/match-string.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';
import { ManageDetailsComponent } from './modules/profile/manage-details/manage-details.component';
import { DeleteComponent } from './modules/profile/delete/delete.component';
import { ChangePasswordComponent } from './modules/profile/change-password/change-password.component';
import { ProductsComponent } from './modules/products/products.component';
import { BouquetComponent } from './modules/products/bouquet/bouquet.component';
import { FlowerComponent } from './modules/products/flower/flower.component';
import { SouvenirComponent } from './modules/products/souvenir/souvenir.component';
import { OccasionalArticleComponent } from './modules/products/occasional-article/occasional-article.component';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart.component';
import { FooterComponent } from './shared/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    RegisterComponent,
    AccountComponent,
    MatchStringValidatorDirective,
    ManageDetailsComponent,
    DeleteComponent,
    ChangePasswordComponent,
    ProductsComponent,
    BouquetComponent,
    FlowerComponent,
    SouvenirComponent,
    OccasionalArticleComponent,
    ShoppingCartComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgbModule
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
