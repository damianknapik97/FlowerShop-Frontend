import { Component, Input, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { OrderAdministrationService } from 'src/app/core/services/administration/order-administration.service';
import { OrderDTO } from 'src/app/core/dto/order';
import { RestPage } from 'src/app/core/dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-administration',
  templateUrl: './order-administration.component.html',
  styleUrls: ['./order-administration.component.sass'],
})
export class OrderAdministrationComponent implements OnInit {
  @Input() public page = 1;
  @Input() public pageSize = 10;
  @Input() public collectionSize = 0;
  @Input() public sortingProperties: string[] = ['NONE'];
  @Input() public currentSorting = 'NONE';
  public dataLoaded = false;
  public content: OrderDTO[];

  constructor(
    private service: OrderAdministrationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.retrieveSortingProperties();
    this.retrieveOrdersPage(this.page, this.pageSize, this.currentSorting);
  }

  public reloadConent(page: number, pageSize: number, sortingProperty: string) {
    this.retrieveOrdersPage(page, pageSize, sortingProperty);
    this.snackBar.open('Table data refreshed', 'Information', {
      duration: 2500,
    });
  }

  public navigate(orderID: string): void {
    this.router.navigate([
      '/employee',
      'order-administration',
      'order-details',
      orderID,
    ]);
  }

  public retrieveSortingProperties(): void {
    this.service.retriveSortingProperties().subscribe((res: string[]) => {
      this.sortingProperties = res;
    });
  }

  public retrieveOrdersPage(
    page: number,
    pageSize: number,
    sortingProperty: string
  ): void {
    this.service.retrieveOrdersPage(page, pageSize, sortingProperty).subscribe(
      (result: RestPage<OrderDTO>) => {
        this.pageSize = pageSize;
        this.content = result.content;
        this.collectionSize = result.totalElements;
        this.dataLoaded = true;
      },
      (err: any) => {
        this.snackBar.open('Couldn\t retrieve orders page', 'Error', {
          duration: 3000,
        });
        console.log(err);
      }
    );
  }
}
