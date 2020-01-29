import { Price } from './price.dto';

export interface FlowerDTO {
    id: string;
    name: string;
    price: Price;
    description: string;
    height: number;
}
