import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services';
import { AuthenticationService } from 'src/app/core/security';

@Component({
  selector: 'app-delete',
  templateUrl: 'delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {

  public message: string = '';
  public modelPassword: string = '';

  constructor(private accService: AccountService, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  public deleteAccount(): void {
    this.accService.delete(this.modelPassword).subscribe(
      result => {
      },
      error => {
        this.message = error;
      }
    ).add(
      () => {
        this.authService.logout();
      }
    )
  }
}
