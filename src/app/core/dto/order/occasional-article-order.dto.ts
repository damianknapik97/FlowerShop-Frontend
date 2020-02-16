import { OccasionalArticleDTO } from '../occasional-article.dto';

export interface OccasionalArticleOrderDTO {
  id: string;
  itemCount: number;
  occasionalArticleDTO: OccasionalArticleDTO;
}
