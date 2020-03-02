import { Price } from '../price.dto';
import { PaymentType } from '../../constants/payment-type.enum';

export interface PaymentDTO {
  id: string;
  totalPrice: Price;
  paymentType: PaymentType;
}
