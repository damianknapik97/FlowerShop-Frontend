import { Price } from './price.dto';

export interface OccasionalArticleDto {
  id: string;
  name: string;
  price: Price;
  description: string;
  theme: string;
}
