import { OccasionalArticleOrderDTO } from './occasional-article-order.dto';
import { SouvenirOrderDTO } from './souvenir-order.dto';
import { FlowerOrderDTO } from './flower-order.dto';

export interface ShoppingCartDTO {
  id: string;
  name: string;
  occasionalArticleOrderDTOs: OccasionalArticleOrderDTO[];
  souvenirOrderDTOs: SouvenirOrderDTO[];
  flowerOrderDTOs: FlowerOrderDTO[];
}
