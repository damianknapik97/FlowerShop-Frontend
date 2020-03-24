import { DeliveryAddressDTO } from './delivery-address.dto';
import { ShoppingCartDTO } from './shopping-cart.dto';
import { PaymentDTO } from './payment.dto';

export interface OrderDTO {
  id: string;
  message: string;
  deliveryDate: string;
  deliveryAddressDTO: DeliveryAddressDTO;
  shoppingCartDTO: ShoppingCartDTO;
  paymentDTO: PaymentDTO;
  placementDate: string;
  additionalNote: string;
  orderStatus: string;
}
