import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private snackBar: MatSnackBar) {}

  /**
   * Check if user has saved details in local storage, and if the token and role are not null.
   * If this check fails, user is redirected to the main page with snack bar popping up informing him about the problem.
   *
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.authenticationService.redirectToMainPage('You need to be authenticated for such action', 'Error');
    }
    return false;
  }

  /**
   * Actual logic used for checking if user role is authenticated on current page.
   * This method is reused in Navigator component for determining which menu position should user be able to view.
   */
  isAuthenticated(): boolean {
    const user = this.authenticationService.currentUserValue;
    if (user != null) {
      if (user.role != null && user.token != null) {
        return true;
      }
    }
    return false;
  }
}
