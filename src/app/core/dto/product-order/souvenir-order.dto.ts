import { SouvenirDTO } from '../product/souvenir.dto';

export interface SouvenirOrderDTO {
  id: string;
  itemCount: number;
  souvenirDTO: SouvenirDTO;
}
