import { ErrorInterceptor, JwtInterceptor } from './core/interceptors';
import { FormsModule, NG_VALIDATORS } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

import { AccountAdministrationComponent } from './modules/admin/account-administration/account-administration.component';
import { AccountComponent } from './modules/account/account.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BouquetComponent } from './modules/products/bouquet/bouquet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChangePasswordComponent } from './modules/profile/change-password/change-password.component';
import { DeleteComponent } from './modules/profile/delete/delete.component';
import { DeliveryAddressComponent } from './modules/order/delivery-address/delivery-address.component';
import { DetailsComponent } from './modules/order/details/details.component';
import { DisplayOrdersComponent } from './modules/profile/display-orders/display-orders.component';
import { EmployeeComponent } from './modules/employee/employee.component';
import { FlowerComponent } from './modules/products/flower/flower.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/account/login/login.component';
import { ManageDetailsComponent } from './modules/profile/manage-details/manage-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material';
import { MatchStringValidatorDirective } from './core/directives/match-string.directive';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { NgModule } from '@angular/core';
import { OccasionalArticleComponent } from './modules/products/occasional-article/occasional-article.component';
import { OrderAdministrationComponent } from './modules/employee/order-administration/order-administration.component';
import { OrderComponent } from './modules/order/order.component';
import { OrderDetailsComponent } from './modules/employee/order-administration/order-details/order-details.component';
import { PaymentComponent } from './modules/order/payment/payment.component';
import { ProductsComponent } from './modules/products/products.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { RegisterComponent } from './modules/account/register/register.component';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart.component';
import { SouvenirComponent } from './modules/products/souvenir/souvenir.component';
import { SummaryComponent } from './modules/order/summary/summary.component';

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
    FooterComponent,
    OrderComponent,
    DeliveryAddressComponent,
    PaymentComponent,
    DetailsComponent,
    SummaryComponent,
    DisplayOrdersComponent,
    AdminComponent,
    EmployeeComponent,
    OrderAdministrationComponent,
    AccountAdministrationComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
