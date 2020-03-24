import { Component, OnInit, Input } from '@angular/core';
import { SouvenirDTO } from 'src/app/core/dto/souvenir.dto';
import { SouvenirService } from 'src/app/core/services';
import { ArrayUtilities } from 'src/app/core/utilites';
import { RestPage } from 'src/app/core/dto/rest-page';
import { MatSnackBar } from '@angular/material';
import { AuthenticationGuard } from 'src/app/core/security';
import { MessageResponseDTO } from 'src/app/core/dto';

@Component({
  selector: 'app-souvenir',
  templateUrl: 'souvenir.component.html',
  styleUrls: ['./souvenir.component.sass']
})
export class SouvenirComponent implements OnInit {
  public resourcesLoaded = false;
  public viewModel: SouvenirDTO[][];
  public elemntsInRow = 3;
  @Input() page = 1;
  @Input() pageSize;
  @Input() collectionSize;

  constructor(private service: SouvenirService,
              private arrayUtils: ArrayUtilities,
              private snackBar: MatSnackBar,
              public authenticationGuard: AuthenticationGuard) { }

  ngOnInit() {
    this.getSouvenirsPage(this.page);

  }

  public onChangePage(pageNumber: number) {
    this.getSouvenirsPage(pageNumber);
  }

  private getSouvenirsPage(pageNumber: number): void {
    let page: RestPage<SouvenirDTO>;
    this.service.retrievePage(pageNumber - 1).subscribe(
      (result: RestPage<SouvenirDTO>) => {
        page = result;
        this.pageSize = result.size;
        this.collectionSize = result.totalElements;
        this.viewModel = this.arrayUtils.convertToTwoDimensions(page.content as object[], this.elemntsInRow) as SouvenirDTO[][];
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
        this.snackBar.open(error, '', {duration: 1500});
      }
    );
  }
}
