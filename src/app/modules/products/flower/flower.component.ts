import { Component, OnInit } from '@angular/core';
import { FlowerService } from 'src/app/core/services';
import { FlowerDto } from 'src/app/core/dto';

@Component({
  selector: 'app-flower',
  templateUrl: 'flower.component.html',
  styleUrls: ['./flower.component.sass']
})
export class FlowerComponent implements OnInit {

  public message: string;
  public model: FlowerDto[];

  constructor(private flowerService: FlowerService) { }

  ngOnInit() {
    this.getAllFlowers();
  }

  private getAllFlowers(): void {
    this.flowerService.retrieveFullBouquetList().subscribe(
      result => {
        this.model = result;
      },
      error => {
        this.message = error;
      }
    );
  }

}
