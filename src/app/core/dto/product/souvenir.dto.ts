import { Price } from '../price.dto';

export interface SouvenirDTO {
  id: string;
  name: string;
  price: Price;
  description: string;
  imageLarge: string;
  imageMedium: string;
  imageSmall: string;
}
