import { Price } from '../price.dto';

export interface OccasionalArticleDTO {
  id: string;
  name: string;
  price: Price;
  description: string;
  theme: string;
  imageLarge: string;
  imageMedium: string;
  imageSmall: string;
}
