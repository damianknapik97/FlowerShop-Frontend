import { Price } from './price.dto';

export interface SouvenirDto {
  id: string;
  name: string;
  price: Price;
  description: string;
}
