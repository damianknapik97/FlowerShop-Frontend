import { Component, OnInit } from '@angular/core';
import { AuthenticationGuard} from '../../core/security';
import { LoginGuard } from 'src/app/core/security/login.guard';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AdminGuard } from 'src/app/core/security/admin.guard';
import { EmployeeGuard } from 'src/app/core/security/employee.guard';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  constructor( public authenticationGuard: AuthenticationGuard,
               public loginGuard: LoginGuard,
               public employeeGuard: EmployeeGuard,
               public adminGuard: AdminGuard,
               public authenticationService: AuthenticationService) {}


  ngOnInit() {
  }

}
