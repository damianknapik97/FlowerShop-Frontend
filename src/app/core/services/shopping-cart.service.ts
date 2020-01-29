import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingCartDTO } from '../dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/shopping-cart';
  }

  public getShoppingCart(): Observable<ShoppingCartDTO> {
    return this.http.get<ShoppingCartDTO>(this.apiUrl);
  }

  public retrieveTotalNumberOfProducts(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/count');
  }

  /**
   * Get rid of null values to avoid errors in console
   */
  public initializeMissingArrays(shoppingCart: ShoppingCartDTO) {
    if (shoppingCart != null) {
      if (shoppingCart.flowerOrderList == null) {
        shoppingCart.flowerOrderList = [];
      }

      if (shoppingCart.occasionalArticleOrderList == null) {
        shoppingCart.occasionalArticleOrderList = [];
      }

      if (shoppingCart.souvenirOrderList == null) {
        shoppingCart.souvenirOrderList = [];
      }
    }
  }
}
