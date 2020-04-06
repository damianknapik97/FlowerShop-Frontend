import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserDTO } from '../dto/account';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router, private snackBar: MatSnackBar) {}

  /**
   * Check if user is currently logged, if false, path can be activated.
   * This guard is used primarly for forbidding user to use login twice.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    /* Grab currently saved user */
    if (this.isLogged()) {
      this.router.navigate(['/']).then(
        () => {
          this.snackBar.open('You are already logged', 'Warning', {duration: 3500});
        }
      );
      return false;
    }
    return true;
  }

  /**
   * Actual logic for checking if user is already logged.
   */
  isLogged(): boolean {
    if (this.authenticationService.currentUserValue != null) {
      return true;
    }
    return false;
  }

}


