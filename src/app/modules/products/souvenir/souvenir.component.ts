import { Component, OnInit, Input } from '@angular/core';
import { SouvenirDto } from 'src/app/core/dto/souvenir.dto';
import { SouvenirService } from 'src/app/core/services';
import { ArrayUtilities } from 'src/app/core/utilites';
import { RestPage } from 'src/app/core/dto/rest-page';

@Component({
  selector: 'app-souvenir',
  templateUrl: 'souvenir.component.html',
  styleUrls: ['./souvenir.component.sass']
})
export class SouvenirComponent implements OnInit {
  public message = 'Waiting for products to load...';
  public viewModel: SouvenirDto[][];
  public elemntsInRow = 3;
  @Input() page = 1;
  @Input() pageSize;
  @Input() collectionSize;

  constructor(private service: SouvenirService,
              private arrayUtils: ArrayUtilities) { }

  ngOnInit() {
    this.getSouvenirsPage(this.page);

  }

  public onChangePage(pageNumber: number) {
    this.getSouvenirsPage(pageNumber);
  }

  private getSouvenirsPage(pageNumber: number): void {
    let page: RestPage<SouvenirDto>;
    this.service.retrievePage(pageNumber - 1).subscribe(
      result => {
        page = result;
        this.message = '';
        this.pageSize = result.size;
        this.collectionSize = result.totalElements;
        this.viewModel = this.arrayUtils.convertToTwoDimensions(page.content as object[], this.elemntsInRow) as SouvenirDto[][];
      },
      error => {
        this.message = error;
      }
    );
  }
}
