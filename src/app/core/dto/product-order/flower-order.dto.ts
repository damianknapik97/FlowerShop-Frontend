import { FlowerDTO } from '../product/flower.dto';

export interface FlowerOrderDTO {
  id: string;
  itemCount: number;
  flowerDTO: FlowerDTO;
}
