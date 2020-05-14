import { Component, OnInit } from '@angular/core';

import { ArrayUtilities } from 'src/app/core/utilites';
import { BouquetDTO } from 'src/app/core/dto';
import { BouquetService } from 'src/app/core/services';

@Component({
  selector: 'app-bouquet',
  templateUrl: 'bouquet.component.html',
  styleUrls: ['./bouquet.component.sass'],
})
export class BouquetComponent implements OnInit {
  public message: string;
  public viewModel: BouquetDTO[][];
  public elemntsInRow = 3;

  constructor(
    private bouquetService: BouquetService,
    private arrayUtils: ArrayUtilities
  ) {}

  ngOnInit() {
    this.getAllBouquets();
  }

  private getAllBouquets(): void {
    let model: BouquetDTO[];
  }
}
