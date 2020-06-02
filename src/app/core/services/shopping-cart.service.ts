import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageResponseDTO, Price } from '../dto';
import { Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { ShoppingCartDTO } from '../dto/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/shopping-cart';
  }

  public getShoppingCart(): Observable<ShoppingCartDTO> {
    return this.http.get<ShoppingCartDTO>(this.apiUrl);
  }

  public retrieveTotalNumberOfProducts(
    shoppingCartID: string
  ): Observable<number> {
    const httpParams = new HttpParams();
    httpParams.set('id', shoppingCartID);

    return this.http.get<number>(this.apiUrl + '/count', {
      params: httpParams,
    });
  }

  public putFlower(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.put<MessageResponseDTO>(this.apiUrl + '/flower', params);
  }

  public putOccasionalArticle(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.put<MessageResponseDTO>(
      this.apiUrl + '/occasional-article',
      params
    );
  }

  public putSouvenir(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.put<MessageResponseDTO>(this.apiUrl + '/souvenir', params);
  }

  public deleteFlowerOrder(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<MessageResponseDTO>(this.apiUrl + '/flower', {
      params,
    });
  }

  public deleteOccasionalArticleOrder(
    id: string
  ): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<MessageResponseDTO>(
      this.apiUrl + '/occasional-article',
      { params }
    );
  }

  public deleteSouvenirOrder(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<MessageResponseDTO>(this.apiUrl + '/souvenir', {
      params,
    });
  }

  public countTotalPrice(shoppingCartID: string): Observable<Price> {
    const params = new HttpParams().set('id', shoppingCartID);
    return this.http.get<Price>(this.apiUrl + '/total-price', { params });
  }

  /**
   * Get rid of null values to avoid errors in console
   */
  public initializeMissingArrays(shoppingCart: ShoppingCartDTO) {
    if (shoppingCart != null) {
      if (shoppingCart.flowerOrderDTOs == null) {
        shoppingCart.flowerOrderDTOs = [];
      }

      if (shoppingCart.occasionalArticleOrderDTOs == null) {
        shoppingCart.occasionalArticleOrderDTOs = [];
      }

      if (shoppingCart.souvenirOrderDTOs == null) {
        shoppingCart.souvenirOrderDTOs = [];
      }
    }
  }

  public isShoppingCartEmpty(shoppingCart: ShoppingCartDTO): boolean {
    if (shoppingCart == null) {
      return true;
    }

    const combinedLength =
      shoppingCart.flowerOrderDTOs.length +
      shoppingCart.occasionalArticleOrderDTOs.length +
      shoppingCart.souvenirOrderDTOs.length;

    if (combinedLength > 0) {
      return false;
    }

    return true;
  }

  /**
   * Searches shopping cart for all the already added items, counts their prices,
   * checks if currencies match, and return total price with currency.
   *
   * @param shoppingCartID
   * @param shipping
   */
  public countTotalPriceWithDelivery(
    shoppingCartID: string,
    shipping: Price
  ): Promise<Price> {
    let totalPricePromise = this.countTotalPrice(shoppingCartID).toPromise();
    totalPricePromise = totalPricePromise.then<Price>((value: Price) => {
      value.amount = Number(value.amount) + Number(shipping.amount);
      return value;
    });

    return totalPricePromise;
  }
}
