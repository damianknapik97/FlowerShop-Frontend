import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './';

/*tslint:disable */
@Injectable()
export class AuthenticationGuard implements CanActivate {

constructor(private authenticationService: AuthenticationService, private router: Router){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

		let currentToken: String = this.authenticationService.currentTokenValue;

		let firstPathSegment: String = route.url.find(
			index => 1
		).path;

		if(firstPathSegment === 'account' && currentToken == null) {
			return true;
		}
		if(firstPathSegment === 'account' && currentToken != null){
			return false;
		}
		if(currentToken != null){
			return true;
		}

		this.router.navigate(['/']);
		return false;
	}
}