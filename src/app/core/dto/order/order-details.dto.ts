import { DateTimeDTO } from '../date-time-dto';

export interface OrderDetailsDTO {
  message: string;
  deliveryDate: DateTimeDTO;
  additionalNote: string;
}
