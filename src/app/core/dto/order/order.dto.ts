import { DeliveryAddressDTO } from './delivery-address.dto';
import { ShoppingCartDTO } from './shopping-cart.dto';

export interface OrderDTO {
  id: string;
  message: string;
  deliveryDate: string;
  deliveryAddressDTO: DeliveryAddressDTO;
  shoppingCartDTO: ShoppingCartDTO;
  placementDate: string;
  additionalNote: string;
}
