import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OccasionalArticleDTO, RestPage, MessageResponseDTO } from '../dto';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OccasionalArticleService {
  private apiUrl: string;

  constructor(private http: HttpClient, private shoppingCartService: ShoppingCartService) {
    this.apiUrl = environment.apiUrl + '/product/occasional-article';
  }

  public retrievePage(pageNumber: number): Observable<RestPage<OccasionalArticleDTO>> {
    const params = new HttpParams().set('page', pageNumber.toString());

    return this.http.get<RestPage<OccasionalArticleDTO>>(this.apiUrl, {params});
  }

  public addToShoppingCart(id: string): Observable<MessageResponseDTO> {
    return this.shoppingCartService.putOccasionalArticle(id);
  }
}
