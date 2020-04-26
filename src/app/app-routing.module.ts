import { RouterModule, Routes } from '@angular/router';

import { AccountAdministrationComponent } from './modules/admin/account-administration/account-administration.component';
import { AccountComponent } from './modules/account/account.component';
import { AccountDetailsComponent } from './modules/admin/account-administration/account-details/account-details.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AdminGuard } from './core/security/admin.guard';
import { AuthenticationGuard } from './core/security';
import { BouquetComponent } from './modules/products/bouquet/bouquet.component';
import { ChangePasswordComponent } from './modules/profile/change-password/change-password.component';
import { DeleteComponent } from './modules/profile/delete/delete.component';
import { DeliveryAddressComponent } from './modules/order/delivery-address/delivery-address.component';
import { DetailsComponent } from './modules/order/details/details.component';
import { DisplayOrdersComponent } from './modules/profile/display-orders/display-orders.component';
import { EmployeeComponent } from './modules/employee/employee.component';
import { EmployeeGuard } from './core/security/employee.guard';
import { FlowerComponent } from './modules/products/flower/flower.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/account/login/login.component';
import { LoginGuard } from './core/security/login.guard';
import { ManageDetailsComponent } from './modules/profile/manage-details/manage-details.component';
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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'display-orders', component: DisplayOrdersComponent },
      { path: 'manage-details', component: ManageDetailsComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'delete', component: DeleteComponent },
    ],
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: 'flower', component: FlowerComponent },
      { path: 'occasional-article', component: OccasionalArticleComponent },
      { path: 'souvenir', component: SouvenirComponent },
      { path: 'bouquet', component: BouquetComponent },
    ],
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'delivery-address', component: DeliveryAddressComponent },
      { path: 'details', component: DetailsComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'summary', component: SummaryComponent },
    ],
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [EmployeeGuard],
    children: [
      {
        path: 'order-administration',
        component: OrderAdministrationComponent,
        children: [
          {
            path: 'order-details/:id',
            component: OrderDetailsComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'account-administration',
        component: AccountAdministrationComponent,
        children: [
          {
            path: 'account-details/:id',
            component: AccountDetailsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
