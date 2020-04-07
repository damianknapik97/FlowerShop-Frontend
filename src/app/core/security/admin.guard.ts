import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AccountRole } from '../constants/account-role.enum';
import { AuthenticationGuard } from './authentication.guard';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private authenticationGuard: AuthenticationGuard) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isAdmin()) {
      return true;
    } else {
      this.authenticationService.redirectToMainPage('Your account doesn\'t have enought privileges for such action', 'Error');
    }
    return false;
  }

  /**
   * Check if user is properly authenticated, and his account has assigned role "ADMIN"
   */
  isAdmin(): boolean {
    const user = this.authenticationService.currentUserValue;
    if (this.authenticationGuard.isAuthenticated() && this.authenticationService.currentUserValue.role === AccountRole.ROLE_ADMIN) {
      return true;
    }
    return false;
  }

}

