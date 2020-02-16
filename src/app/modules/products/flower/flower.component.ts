import { Component, OnInit, Input } from '@angular/core';
import { FlowerService } from 'src/app/core/services';
import { FlowerDTO } from 'src/app/core/dto';
import { ArrayUtilities } from 'src/app/core/utilites';
import { RestPage } from 'src/app/core/dto/rest-page';
import { MatSnackBar } from '@angular/material';
import { AuthenticationGuard } from 'src/app/core/security';

@Component({
  selector: 'app-flower',
  templateUrl: 'flower.component.html',
  styleUrls: ['./flower.component.sass']
})
export class FlowerComponent implements OnInit {
  public message = 'Waiting for products to load...';
  public viewModel: FlowerDTO[][];
  public elemntsInRow = 3;
  @Input() page = 1;
  @Input() pageSize;
  @Input() collectionSize;

  constructor(private flowerService: FlowerService,
              private arrayUtils: ArrayUtilities,
              private snackBar: MatSnackBar,
              public authenticationGuard: AuthenticationGuard) { }

  ngOnInit() {
    this.getFlowersPage(this.page);

  }

  public onChangePage(pageNumber: number) {
    this.getFlowersPage(pageNumber);
  }

  private getFlowersPage(pageNumber: number): void {
    let page: RestPage<FlowerDTO>;
    this.flowerService.retrievFlowerPage(pageNumber - 1).subscribe(
      result => {
        page = result;
        this.message = '';
        this.pageSize = result.size;
        this.collectionSize = result.totalElements;
        this.viewModel = this.arrayUtils.convertToTwoDimensions(page.content as object[], this.elemntsInRow) as FlowerDTO[][];
      },
      error => {
        this.message = error;
      }

    );
  }

  public addToShoppingCart(id: string) {
    this.flowerService.addToShoppingCart(id).subscribe(
      result => {
        this.snackBar.open(result.message, '', {duration: 1500});
      },
      error => {
        this.snackBar.open(error, '', {duration: 1500});
      }
    );
  }
}
