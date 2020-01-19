import { Price } from './price.dto';

export interface FlowerDto {
    id: string;
    name: string;
    price: Price;
    description: string;
    height: number;
}
