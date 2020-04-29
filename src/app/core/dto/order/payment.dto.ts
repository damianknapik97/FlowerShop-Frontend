import { Price } from '../price.dto';

export interface PaymentDTO {
  id: string;
  totalPrice: Price;
  paymentType: string;
  wasPaid: boolean;
}
