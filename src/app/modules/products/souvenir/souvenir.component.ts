import { Component, Input, OnInit } from '@angular/core';

import { AbstractProduct } from '../abstract-product';
import { ArrayUtilities } from 'src/app/core/utilites';
import { AuthenticationGuard } from 'src/app/core/security';
import { MatSnackBar } from '@angular/material';
import { MessageResponseDTO } from 'src/app/core/dto';
import { RestPage } from 'src/app/core/dto/rest-page';
import { SouvenirDTO } from 'src/app/core/dto/product/souvenir.dto';
import { SouvenirService } from 'src/app/core/services/product/souvenir.service';

@Component({
  selector: 'app-souvenir',
  templateUrl: 'souvenir.component.html',
  styleUrls: ['./souvenir.component.sass'],
})
export class SouvenirComponent extends AbstractProduct implements OnInit {
  @Input() public page = 1;
  private _elemntsInRow = 3;
  private _pageSize = 12;
  private _collectionSize: number;
  private _viewModel: SouvenirDTO[][];
  private _resourcesLoaded = false;
  private _imagesLoaded: boolean[] = []; // Used to store information about loaded in viewModel

  constructor(
    private service: SouvenirService,
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

  public onPageChange(pageNumber: number) {
    this._resourcesLoaded = false;
    this._imagesLoaded = this.resetLoadedImages(
      this._imagesLoaded,
      this._pageSize
    );
    this.retrieveProductsPage(pageNumber);
  }

  public retrieveProductsPage(pageNumber: number): void {
    let page: RestPage<SouvenirDTO>;
    this.service.retrievePage(pageNumber - 1).subscribe(
      (result: RestPage<SouvenirDTO>) => {
        page = result;
        this._pageSize = result.size;
        this._collectionSize = result.totalElements;
        this._viewModel = this.arrayUtils.convertToTwoDimensions(
          page.content as object[],
          this._elemntsInRow
        ) as SouvenirDTO[][];
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

  public addToShoppingCart(productID: string) {
    this.service.addToShoppingCart(productID).subscribe(
      (result: MessageResponseDTO) => {
        this.snackBar.open(result.message, '', { duration: 1500 });
      },
      (error: any) => {
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

  public get viewModel(): SouvenirDTO[][] {
    return this._viewModel;
  }

  public get resourcesLoaded(): boolean {
    return this._resourcesLoaded;
  }

  public get imagesLoaded(): boolean[] {
    return this._imagesLoaded;
  }
}
