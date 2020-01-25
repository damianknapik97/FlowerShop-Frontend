import { SouvenirDto } from '../souvenir.dto';

export interface SouvenirOrderDto {
  id: string;
  itemCount: number;
  souvenir: SouvenirDto;
}
