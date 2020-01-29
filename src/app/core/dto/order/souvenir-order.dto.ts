import { SouvenirDTO } from '../souvenir.dto';

export interface SouvenirOrderDTO {
  id: string;
  itemCount: number;
  souvenirDTO: SouvenirDTO;
}
