import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-delete',
  templateUrl: 'delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {

  public message = '';
  public modelPassword = '';

  constructor(private accService: AccountService,
              private authService: AuthenticationService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public deleteAccount(): void {
    this.accService.delete(this.modelPassword).subscribe(
      (result: string) => {
        this.authService.logout();
      },
      (error: any) => {
        this.snackBar.open('Couldn\'t delete your account', 'Error', {duration: 3000});
      }
    );
  }
}
