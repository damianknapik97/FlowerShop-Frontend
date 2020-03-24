import { Component, OnInit, Input } from '@angular/core';
import { OccasionalArticleDTO, RestPage, MessageResponseDTO } from 'src/app/core/dto';
import { OccasionalArticleService } from 'src/app/core/services';
import { ArrayUtilities } from 'src/app/core/utilites';
import { MatSnackBar } from '@angular/material';
import { AuthenticationGuard } from 'src/app/core/security';

@Component({
  selector: 'app-occasional-article',
  templateUrl: 'occasional-article.component.html',
  styleUrls: ['./occasional-article.component.sass']
})
export class OccasionalArticleComponent implements OnInit {
  public resourcesLoaded = false;
  public viewModel: OccasionalArticleDTO[][];
  public elemntsInRow = 3;
  @Input() page = 1;
  @Input() pageSize;
  @Input() collectionSize;

  constructor(private service: OccasionalArticleService,
              private arrayUtils: ArrayUtilities,
              private snackBar: MatSnackBar,
              public authenticationGuard: AuthenticationGuard) {}

  ngOnInit() {
    this.getOccasionalArticlesPage(this.page);
  }

  public onChangePage(pageNumber: number) {
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
        this.snackBar.open('Couldn\'t load resources', 'Error', {duration: 3000});
        this.resourcesLoaded = true;
      }
    );
  }

  public addToShoppingCart(id: string) {
    this.service.addToShoppingCart(id).subscribe(
      (result: MessageResponseDTO) => {
        this.snackBar.open(result.message, '', {duration: 1500});
      },
      (error: any) => {
        console.log(error);
        this.snackBar.open(error, '', {duration: 1500});
      }
    );
  }

}
