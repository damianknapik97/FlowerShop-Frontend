import { OccasionalArticleDto } from '../occasional-article.dto';

export interface OccasionalArticleOrderDto {
  id: string;
  itemCount: number;
  occasionalArticle: OccasionalArticleDto;
}
