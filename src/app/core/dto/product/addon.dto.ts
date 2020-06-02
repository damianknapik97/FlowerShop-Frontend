import { Price } from '../price.dto';

export interface AddonDTO {
  id: string;
  name: string;
  colour: string;
  price: Price;
  description: string;
  imageLarge: string;
  imageMedium: string;
  imageSmall: string;
}
