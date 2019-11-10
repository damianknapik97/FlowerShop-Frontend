import { Component, OnInit } from '@angular/core';
import { BouquetService } from 'src/app/core/services';
import { BouquetDto } from 'src/app/core/dto';
import { ArrayUtilities } from 'src/app/core/utilites';

@Component({
  selector: 'app-bouquet',
  templateUrl: 'bouquet.component.html',
  styleUrls: ['./bouquet.component.sass']
})
export class BouquetComponent implements OnInit {

  public message: string;
  public viewModel: BouquetDto[][];
  public elemntsInRow = 3;

  constructor(private bouquetService: BouquetService,
              private arrayUtils: ArrayUtilities) { }

  ngOnInit() {
    this.getAllBouquets();
  }

  private getAllBouquets(): void {
    let model: BouquetDto[];
    this.bouquetService.retrieveFullBouquetList().subscribe(
      res => {
        model = res;
      },
      error => {
        this.message = error;
      }
    ).add(() => {
      this.viewModel = this.arrayUtils.convertToTwoDimensions(model, this.elemntsInRow) as BouquetDto[][];
    });
  }
}
