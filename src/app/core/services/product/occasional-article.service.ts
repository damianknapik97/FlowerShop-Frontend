import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageResponseDTO, OccasionalArticleDTO, RestPage } from '../../dto';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../order/shopping-cart.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OccasionalArticleService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private shoppingCartService: ShoppingCartService
  ) {
    this.apiUrl = environment.apiUrl + '/product/occasional-article';
  }

  public retrievePage(
    pageNumber: number
  ): Observable<RestPage<OccasionalArticleDTO>> {
    const params = new HttpParams().set('page', pageNumber.toString());

    return this.http.get<RestPage<OccasionalArticleDTO>>(this.apiUrl, {
      params,
    });
  }

  public addToShoppingCart(id: string): Observable<MessageResponseDTO> {
    return this.shoppingCartService.putOccasionalArticle(id);
  }
}
