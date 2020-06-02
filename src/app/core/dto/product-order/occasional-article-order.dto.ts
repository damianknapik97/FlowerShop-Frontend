import { OccasionalArticleDTO } from '../product/occasional-article.dto';

export interface OccasionalArticleOrderDTO {
  id: string;
  itemCount: number;
  occasionalArticleDTO: OccasionalArticleDTO;
}
