import { Component, OnInit } from '@angular/core';
import { AuthenticationGuard, AuthenticationService } from '../../core/security';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  constructor( private authenticationGuard: AuthenticationGuard, private authenticationService: AuthenticationService ) {}


  ngOnInit() {
  }

}
