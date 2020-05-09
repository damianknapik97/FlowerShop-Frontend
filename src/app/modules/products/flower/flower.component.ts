import { Component, Input, OnInit } from '@angular/core';
import { FlowerDTO, MessageResponseDTO } from 'src/app/core/dto';

import { ArrayUtilities } from 'src/app/core/utilites';
import { AuthenticationGuard } from 'src/app/core/security';
import { FlowerService } from 'src/app/core/services';
import { MatSnackBar } from '@angular/material';
import { RestPage } from 'src/app/core/dto/rest-page';
import { async } from 'rxjs/internal/scheduler/async';
import { delay } from 'rxjs/operators';

/* TODO: Think of ways to remove the flickering when changing pages (Images are loading fast) */

@Component({
  selector: 'app-flower',
  templateUrl: 'flower.component.html',
  styleUrls: ['./flower.component.sass'],
})
export class FlowerComponent implements OnInit {
  public resourcesLoaded = false;
  public viewModel: FlowerDTO[][];
  public elemntsInRow = 3;
  @Input() page = 1;
  @Input() pageSize = 12;
  @Input() collectionSize;
  private imageLoaded: boolean[] = []; // Used to store information about loaded in viewModel

  constructor(
    private flowerService: FlowerService,
    private arrayUtils: ArrayUtilities,
    private snackBar: MatSnackBar,
    public authenticationGuard: AuthenticationGuard
  ) {
    this.resetLodadedImages(this.pageSize);
  }

  ngOnInit() {
    this.getFlowersPage(this.page);
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

  public onChangePage(pageNumber: number): void {
    this.resetLodadedImages(this.pageSize);
    this.getFlowersPage(pageNumber);
  }

  private getFlowersPage(pageNumber: number): void {
    let page: RestPage<FlowerDTO>;
    this.flowerService.retrievFlowerPage(pageNumber - 1).subscribe(
      (result: RestPage<FlowerDTO>) => {
        page = result;
        this.pageSize = result.size;
        this.collectionSize = result.totalElements;
        this.viewModel = this.arrayUtils.convertToTwoDimensions(
          page.content as object[],
          this.elemntsInRow
        ) as FlowerDTO[][];
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

  public addToShoppingCart(id: string): void {
    this.flowerService.addToShoppingCart(id).subscribe(
      (result: MessageResponseDTO) => {
        this.snackBar.open(result.message, '', { duration: 1500 });
      },
      (error: any) => {
        this.snackBar.open(error, '', { duration: 1500 });
      }
    );
  }
}
