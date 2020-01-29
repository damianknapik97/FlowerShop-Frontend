import { Component, OnInit, Input } from '@angular/core';
import { OccasionalArticleDTO, RestPage } from 'src/app/core/dto';
import { OccasionalArticleService } from 'src/app/core/services';
import { ArrayUtilities } from 'src/app/core/utilites';

@Component({
  selector: 'app-occasional-article',
  templateUrl: 'occasional-article.component.html',
  styleUrls: ['./occasional-article.component.sass']
})
export class OccasionalArticleComponent implements OnInit {
  public message = 'Waiting for products to load...';
  public viewModel: OccasionalArticleDTO[][];
  public elemntsInRow = 3;
  @Input() page = 1;
  @Input() pageSize;
  @Input() collectionSize;

  constructor(
    private service: OccasionalArticleService,
    private arrayUtils: ArrayUtilities
  ) {}

  ngOnInit() {
    this.getOccasionalArticlesPage(this.page);
  }

  public onChangePage(pageNumber: number) {
    this.getOccasionalArticlesPage(pageNumber);
  }

  private getOccasionalArticlesPage(pageNumber: number): void {
    let page: RestPage<OccasionalArticleDTO>;
    this.service.retrievePage(pageNumber - 1).subscribe(
      result => {
        page = result;
        this.message = '';
        this.pageSize = result.size;
        this.collectionSize = result.totalElements;
        this.viewModel = this.arrayUtils.convertToTwoDimensions(
          page.content as object[],
          this.elemntsInRow
        ) as OccasionalArticleDTO[][];
      },
      error => {
        this.message = error;
      }
    );
  }
}
