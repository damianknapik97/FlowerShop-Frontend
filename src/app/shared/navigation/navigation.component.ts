import { Component, OnInit } from '@angular/core';
import { AuthenticationGuard} from '../../core/security';
import { LoginGuard } from 'src/app/core/security/login.guard';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  constructor( public authenticationGuard: AuthenticationGuard,
               public loginGuard: LoginGuard,
               public authenticationService: AuthenticationService ) {}


  ngOnInit() {
  }

}
