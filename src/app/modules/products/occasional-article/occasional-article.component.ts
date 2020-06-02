import { Component, Input, OnInit } from '@angular/core';
import {
  MessageResponseDTO,
  OccasionalArticleDTO,
  RestPage,
} from 'src/app/core/dto';

import { ArrayUtilities } from 'src/app/core/utilites';
import { AuthenticationGuard } from 'src/app/core/security';
import { MatSnackBar } from '@angular/material';
import { OccasionalArticleService } from 'src/app/core/services/product/occasional-article.service';

@Component({
  selector: 'app-occasional-article',
  templateUrl: 'occasional-article.component.html',
  styleUrls: ['./occasional-article.component.sass'],
})
export class OccasionalArticleComponent implements OnInit {
  public resourcesLoaded = false;
  public viewModel: OccasionalArticleDTO[][];
  public elemntsInRow = 3;
  @Input() page = 1;
  @Input() pageSize = 12;
  @Input() collectionSize;
  private imageLoaded: boolean[] = []; // Used to store information about loaded in viewModel

  constructor(
    private service: OccasionalArticleService,
    private arrayUtils: ArrayUtilities,
    private snackBar: MatSnackBar,
    public authenticationGuard: AuthenticationGuard
  ) {
    this.resetLodadedImages(this.pageSize);
  }

  ngOnInit() {
    this.getOccasionalArticlesPage(this.page);
  }

  /* Returns image status for provided index */
  public isImageLoaded(imageIndex: number): boolean {
    return this.imageLoaded[imageIndex % this.pageSize];
  }

  /* Initializes array with false boolean values based on number of provided images from function argument. */
  private resetLodadedImages(totalImages: number): void {
    for (let i = 0; i < totalImages; i++) {
      this.imageLoaded[i] = false;
    }
  }

  /* Sets status of loading image inside booleans array. */
  public onImageLoad(imageIndex: number): void {
    /* Timeout is set in order to avoid flickering during fast page changing. */
    setTimeout(
      () => (this.imageLoaded[imageIndex % this.pageSize] = true),
      150
    );
  }

  public onChangePage(pageNumber: number) {
    this.resourcesLoaded = false;
    this.resetLodadedImages(this.pageSize);
    this.getOccasionalArticlesPage(pageNumber);
  }

  private getOccasionalArticlesPage(pageNumber: number): void {
    let page: RestPage<OccasionalArticleDTO>;
    this.service.retrievePage(pageNumber - 1).subscribe(
      (result: RestPage<OccasionalArticleDTO>) => {
        page = result;
        this.pageSize = result.size;
        this.collectionSize = result.totalElements;
        this.viewModel = this.arrayUtils.convertToTwoDimensions(
          page.content as object[],
          this.elemntsInRow
        ) as OccasionalArticleDTO[][];
        this.resourcesLoaded = true;
      },
      (error: any) => {
        console.log(error);
        this.snackBar.open("Couldn't load resources", 'Error', {
          duration: 3000,
        });
        this.resourcesLoaded = true;
      }
    );
  }

  public addToShoppingCart(id: string) {
    this.service.addToShoppingCart(id).subscribe(
      (result: MessageResponseDTO) => {
        this.snackBar.open(result.message, '', { duration: 1500 });
      },
      (error: any) => {
        console.log(error);
        this.snackBar.open(error, '', { duration: 1500 });
      }
    );
  }
}
