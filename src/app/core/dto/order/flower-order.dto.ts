import { FlowerDto } from '../flower.dto';

export interface FlowerOrderDto {
  id: string;
  itemCount: number;
  flower: FlowerDto;
}
