import { OccasionalArticleOrderDto } from './occasional-article-order.dto';
import { SouvenirOrderDto } from './souvenir-order.dto';
import { FlowerOrderDto } from './flower-order.dto';

export interface ShoppingCartDto {
  id: string;
  name: string;
  occasionalArticleOrderList: OccasionalArticleOrderDto[];
  souvenirOrderList: SouvenirOrderDto[];
  flowerOrderList: FlowerOrderDto[];
}
