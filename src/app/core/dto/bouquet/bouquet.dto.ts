import { BouquetAddonDTO } from './bouquet-addon.dto';
import { BouquetFlowerDTO } from './bouquet-flower.dto';
import { Price } from '../price.dto';

export interface BouquetDTO {
  id: string;
  name: string;
  bouquetFlowerList: BouquetFlowerDTO[];
  bouquetAddonList: BouquetAddonDTO[];
  imageLarge: string;
  imageMedium: string;
  imageSmall: string;
  totalPrice: Price;
  userCreated: boolean;
}
