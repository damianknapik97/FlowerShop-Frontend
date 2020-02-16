import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FlowerDTO } from '../dto/flower.dto';
import { Observable } from 'rxjs';
import { RestPage } from '../dto/rest-page';
import { ShoppingCartService } from './shopping-cart.service';
import { MessageResponseDTO } from '../dto';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {
  private apiUrl: string;

  constructor(private http: HttpClient, private shoppingCartService: ShoppingCartService) {
    this.apiUrl = environment.apiUrl + '/product/flower';
  }

  public retrievFlowerPage(page: number): Observable<RestPage<FlowerDTO>> {
    if (page < 0) {
      page = 0;
    }
    const params = new HttpParams().set('page', page.toString());

    return this.http.get<RestPage<FlowerDTO>>(this.apiUrl, { params });
  }

  public addToShoppingCart(id: string): Observable<MessageResponseDTO> {
    return this.shoppingCartService.putFlower(id);
  }

}
