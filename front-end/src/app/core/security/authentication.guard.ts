import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './';

/*tslint:disable */
@Injectable()
export class AuthenticationGuard implements CanActivate {

constructor(private authenticationService: AuthenticationService, private router: Router){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

		const currentToken = this.authenticationService.currentTokenValue;
		
		console.log(currentToken)
		 if(currentToken != null && currentToken !== ''){
			return true;
		}

		this.router.navigate(['/account/login']);
		return false;
	}
}