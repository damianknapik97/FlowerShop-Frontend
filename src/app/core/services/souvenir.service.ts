import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { MessageResponseDTO } from '../dto';
import { Observable } from 'rxjs';
import { RestPage } from '../dto/rest-page';
import { ShoppingCartService } from './shopping-cart.service';
import { SouvenirDTO } from '../dto/product/souvenir.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SouvenirService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private shoppingCartService: ShoppingCartService
  ) {
    this.apiUrl = environment.apiUrl + '/product/souvenir';
  }

  public retrievePage(pageNumber: number): Observable<RestPage<SouvenirDTO>> {
    const params = new HttpParams().set('page', pageNumber.toString());

    return this.http.get<RestPage<SouvenirDTO>>(this.apiUrl, { params });
  }

  public addToShoppingCart(id: string): Observable<MessageResponseDTO> {
    return this.shoppingCartService.putSouvenir(id);
  }
}
