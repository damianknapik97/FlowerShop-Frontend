import { BouquetDTO, MessageResponseDTO, RestPage } from 'src/app/core/dto';
import { Component, Input, OnInit } from '@angular/core';

import { AbstractProduct } from '../abstract-product';
import { ArrayUtilities } from 'src/app/core/utilites';
import { AuthenticationGuard } from 'src/app/core/security';
import { BouquetService } from 'src/app/core/services';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-bouquet',
  templateUrl: './bouquet.component.html',
  styleUrls: ['./bouquet.component.sass'],
})
export class BouquetComponent extends AbstractProduct implements OnInit {
  @Input() public page = 1;
  private _elemntsInRow = 2;
  private _pageSize = 12;
  private _collectionSize: number;
  private _sorting = 'NONE';
  private _viewModel: BouquetDTO[][];
  private _resourcesLoaded = false;
  private _imagesLoaded: boolean[] = []; // Used to store information about loaded in viewModel

  constructor(
    private service: BouquetService,
    private arrayUtils: ArrayUtilities,
    private snackBar: MatSnackBar,
    public authenticationGuard: AuthenticationGuard
  ) {
    super();
    this._imagesLoaded = this.resetLoadedImages(
      this._imagesLoaded,
      this._pageSize
    );
  }

  ngOnInit() {
    this.retrieveProductsPage(this.page);
  }

  public onPageChange(pageNumber: number): void {
    this._resourcesLoaded = false;
    this._imagesLoaded = this.resetLoadedImages(
      this._imagesLoaded,
      this._pageSize
    );
    this.retrieveProductsPage(pageNumber);
  }

  public retrieveProductsPage(pageNumber: number): void {
    this.service.retrieveBouquetPage(pageNumber - 1, this._sorting).subscribe(
      (result: RestPage<BouquetDTO>) => {
        this._collectionSize = result.totalElements;
        this._viewModel = this.arrayUtils.convertToTwoDimensions(
          result.content as object[],
          this._elemntsInRow
        ) as BouquetDTO[][];
        this._resourcesLoaded = true;
      },
      (error: any) => {
        console.log(error);
        this.snackBar.open("Couldn't load resources", 'Error', {
          duration: 3000,
        });
        this._resourcesLoaded = true;
      }
    );
  }

  public addToShoppingCart(productID: string): void {
    this.service.addToShoppingCart(productID).subscribe(
      (result: MessageResponseDTO) => {
        this.snackBar.open(result.message, '', { duration: 1500 });
      },
      (error: any) => {
        console.log(error);
        this.snackBar.open(error, '', { duration: 1500 });
      }
    );
  }

  public get elemntsInRow(): number {
    return this._elemntsInRow;
  }

  public get pageSize(): number {
    return this._pageSize;
  }

  public get collectionSize(): number {
    return this._collectionSize;
  }

  public get viewModel(): BouquetDTO[][] {
    return this._viewModel;
  }

  public get resourcesLoaded(): boolean {
    return this._resourcesLoaded;
  }

  public get imagesLoaded(): boolean[] {
    return this._imagesLoaded;
  }
}
