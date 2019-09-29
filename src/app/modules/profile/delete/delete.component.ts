import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services';

@Component({
  selector: 'app-delete',
  templateUrl: 'delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {

  private message: string = '';
  private modelPassword: string = '';

  constructor(private accService: AccountService) { }

  ngOnInit() {
  }

  private deleteAccount(): void {
    this.accService.delete(this.modelPassword).subscribe(
      result => {
        location.reload();
      },
      error => {
        this.message = error;
      }
    )
  }
}
