import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './';
import { User } from '../model/user.viewmodel';

/*tslint:disable */
@Injectable()
export class AuthenticationGuard implements CanActivate {

	private user:User

	constructor(private authenticationService: AuthenticationService, private router: Router){
		this.user = this.authenticationService.currentUserValue; 
	}

	

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

		this.user = this.authenticationService.currentUserValue; 

		let firstPathSegment: String = route.url.find(
			index => 1
		).path;

		let canActivateLogin = this.canActivateLogin(firstPathSegment);
		if(canActivateLogin != null){
			return canActivateLogin;
		}

		if(this.isAuthenticated){
			return true;
		} else {
			this.router.navigate(['/']);
			return false
		}
		
	}

	canActivateLogin(route: String) {
		if(route === 'account' && this.user == null) {
			return true;
		} else if(route === 'account' && this.user != null){
			return false;
		}
		return null;
	}

	isAuthenticated() {
		if(this.user != null){
			return true;
		}
		return false;

	}

}