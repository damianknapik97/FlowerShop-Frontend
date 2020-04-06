import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './modules/account/account.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/account/login/login.component';
import { RegisterComponent } from './modules/account/register/register.component';
import { ManageDetailsComponent } from './modules/profile/manage-details/manage-details.component';

import { AuthenticationGuard } from './core/security';
import { ChangePasswordComponent } from './modules/profile/change-password/change-password.component';
import { DeleteComponent } from './modules/profile/delete/delete.component';
import { ProductsComponent } from './modules/products/products.component';
import { BouquetComponent } from './modules/products/bouquet/bouquet.component';
import { FlowerComponent } from './modules/products/flower/flower.component';
import { SouvenirComponent } from './modules/products/souvenir/souvenir.component';
import { OccasionalArticleComponent } from './modules/products/occasional-article/occasional-article.component';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart.component';
import { OrderComponent } from './modules/order/order.component';
import { DeliveryAddressComponent} from './modules/order/delivery-address/delivery-address.component';
import { PaymentComponent } from './modules/order/payment/payment.component';
import { SummaryComponent } from './modules/order/summary/summary.component';
import { DetailsComponent } from './modules/order/details/details.component';
import { DisplayOrdersComponent } from './modules/profile/display-orders/display-orders.component';
import { LoginGuard } from './core/security/login.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent}
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'display-orders', component: DisplayOrdersComponent},
      { path: 'manage-details', component: ManageDetailsComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'delete', component: DeleteComponent }
    ]
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: 'flower', component: FlowerComponent },
      { path: 'occasional-article', component: OccasionalArticleComponent},
      { path: 'souvenir', component: SouvenirComponent },
      { path: 'bouquet', component: BouquetComponent }
    ]
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'delivery-address', component: DeliveryAddressComponent},
      { path: 'details', component: DetailsComponent},
      { path: 'payment', component: PaymentComponent},
      { path: 'summary', component: SummaryComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
