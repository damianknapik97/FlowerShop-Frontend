import { Component, OnInit } from '@angular/core';
import { BouquetService } from 'src/app/core/services';
import { BouquetDto } from 'src/app/core/dto';

@Component({
  selector: 'app-bouquet',
  templateUrl: 'bouquet.component.html',
  styleUrls: ['./bouquet.component.sass']
})
export class BouquetComponent implements OnInit {

  public message = '';
  public model: BouquetDto[];

  constructor(private bouquetService: BouquetService) { }

  ngOnInit() {
    this.getAllBouquets();
  }

  private getAllBouquets(): void {
    this.bouquetService.retrieveFullBouquetList().subscribe(
      res => {
        this.model = res;
      },
      error => {
        this.message = error;
      }
    );
  }
}
