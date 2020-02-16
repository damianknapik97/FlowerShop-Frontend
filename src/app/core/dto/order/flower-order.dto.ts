import { FlowerDTO } from '../flower.dto';

export interface FlowerOrderDTO {
  id: string;
  itemCount: number;
  flowerDTO: FlowerDTO;
}
