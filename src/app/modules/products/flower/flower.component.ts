import { Component, OnInit } from '@angular/core';
import { FlowerService } from 'src/app/core/services';
import { FlowerDto } from 'src/app/core/dto';
import { ArrayUtilities } from 'src/app/core/utilites';

@Component({
  selector: 'app-flower',
  templateUrl: 'flower.component.html',
  styleUrls: ['./flower.component.sass']
})
export class FlowerComponent implements OnInit {

  public message: string;
  public displayModel: FlowerDto[][];
  public elemntsInRow = 3;

  constructor(private flowerService: FlowerService,
              private arrayUtils: ArrayUtilities) { }

  ngOnInit() {
    this.getAllFlowers();
  }

  private getAllFlowers(): void {
    let model: FlowerDto[];
    this.flowerService.retrieveFullFlowerList().subscribe(
      result => {
        model = result;
      },
      error => {
        this.message = error;
      }
    ).add(() => {
      this.displayModel = this.arrayUtils.convertToTwoDimensions(model, this.elemntsInRow) as FlowerDto[][];
    });
  }



}
