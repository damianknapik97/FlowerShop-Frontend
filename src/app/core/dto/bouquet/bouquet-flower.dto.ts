import { FlowerDTO } from '../product/flower.dto';

export interface BouquetFlowerDTO {
  id: string;
  itemCount: number;
  flowerDTO: FlowerDTO;
}
