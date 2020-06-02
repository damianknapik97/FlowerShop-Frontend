import { FlowerOrderDTO } from '../product-order/flower-order.dto';
import { OccasionalArticleOrderDTO } from '../product-order/occasional-article-order.dto';
import { SouvenirOrderDTO } from '../product-order/souvenir-order.dto';

export interface ShoppingCartDTO {
  id: string;
  name: string;
  occasionalArticleOrderDTOs: OccasionalArticleOrderDTO[];
  souvenirOrderDTOs: SouvenirOrderDTO[];
  flowerOrderDTOs: FlowerOrderDTO[];
}
