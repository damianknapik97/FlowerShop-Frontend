import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AccountRole } from '../constants/account-role.enum';
import { AuthenticationGuard } from './authentication.guard';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private authenticationGuard: AuthenticationGuard) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isEmployee()) {
      return true;
    } else {
      this.authenticationService.redirectToMainPage('You don\'t have required privileges for such action', 'Error');
    }
    return false;
  }


  /**
   * Check if user is properly authenticated, and his account has assigned role "EMPLOYEE"
   */
  isEmployee(): boolean {
    if (this.authenticationGuard.isAuthenticated() &&
    (this.authenticationService.currentUserValue.role === AccountRole.ROLE_EMPLOYEE
      || this.authenticationService.currentUserValue.role === AccountRole.ROLE_ADMIN)) {
      return true;
    }
    return false;
  }
}
