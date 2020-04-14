import { Component, Input, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { OrderAdministrationService } from 'src/app/core/services/administration/order-administration.service';
import { OrderDTO } from 'src/app/core/dto/order';
import { RestPage } from 'src/app/core/dto';

@Component({
  selector: 'app-order-administration',
  templateUrl: './order-administration.component.html',
  styleUrls: ['./order-administration.component.sass'],
})
export class OrderAdministrationComponent implements OnInit {
  @Input() public page = 0;
  @Input() public pageSize = 20;
  @Input() public collectionSize = 0;
  @Input() public sortingProperties: string[] = ['NONE'];
  public dataLoaded = false;
  public content: OrderDTO[];

  constructor(
    private service: OrderAdministrationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.retrieveSortingProperties();
    this.retrieveOrdersPage(
      this.page,
      this.pageSize,
      this.sortingProperties[0]
    );
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
        this.page = result.number;
        this.pageSize = pageSize;
        this.content = result.content;
        this.collectionSize = result.size;
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
