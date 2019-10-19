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


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent  }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'manage-details', component: ManageDetailsComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'delete', component: DeleteComponent }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: 'bouquet', component: BouquetComponent },
      { path: 'flower', component: FlowerComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
