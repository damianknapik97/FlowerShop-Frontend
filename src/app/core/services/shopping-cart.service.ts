import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ShoppingCartDTO } from '../dto/order';
import { Price, MessageResponseDTO } from '../dto';

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

  public retrieveTotalNumberOfProducts(shoppingCartID: string): Observable<number> {
    const httpParams = new HttpParams();
    httpParams.set('id', shoppingCartID);

    return this.http.get<number>(this.apiUrl + '/count', {params: httpParams});
  }

  public putFlower(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.put<MessageResponseDTO>(this.apiUrl + '/flower', params);
  }

  public putOccasionalArticle(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.put<MessageResponseDTO>(this.apiUrl + '/occasional-article', params);
  }

  public putSouvenir(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.put<MessageResponseDTO>(this.apiUrl + '/souvenir', params);

  }

  public deleteFlowerOrder(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<MessageResponseDTO>(this.apiUrl + '/flower', {params});
  }

  public deleteOccasionalArticleOrder(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<MessageResponseDTO>(this.apiUrl + '/occasional-article', {params});
  }

  public deleteSouvenirOrder(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<MessageResponseDTO>(this.apiUrl + '/souvenir', {params});
  }

  public countTotalPrice(shoppingCartID: string): Observable<Price> {
    const params = new HttpParams().set('id', shoppingCartID);
    return this.http.get<Price>(this.apiUrl + '/total-price', {params});
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

    const combinedLength = shoppingCart.flowerOrderDTOs.length +
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
   * @param shoppingCart
   */
  public countTotalPriceWithDelivery(shoppingCartID: string, shipping: Price): Promise<Price> {
    let totalPricePromise = this.countTotalPrice(shoppingCartID).toPromise();
    totalPricePromise = totalPricePromise.then(
      (value: Price) => {
        value.amount = Number(value.amount) + Number(shipping.amount);
        return value;
    });

    return totalPricePromise;

    /* Count total price of all avaiable products in shopping cart, taking into account their qunatity
    if (shoppingCart.flowerOrderDTOs != null) {
      for (const flowerOrder of shoppingCart.flowerOrderDTOs) {
        totalPrice +=  flowerOrder.flowerDTO.price.amount * flowerOrder.itemCount;
        currenciesArray.push(flowerOrder.flowerDTO.price.currency);
      }
    }

    if (shoppingCart.occasionalArticleOrderDTOs != null) {
      for (const occasionalArticleOrder of shoppingCart.occasionalArticleOrderDTOs) {
        totalPrice += occasionalArticleOrder.occasionalArticleDTO.price.amount * occasionalArticleOrder.itemCount;
        currenciesArray.push(occasionalArticleOrder.occasionalArticleDTO.price.currency);
      }
    }

    if (shoppingCart.souvenirOrderDTOs != null) {
      for (const souvenirOrder of shoppingCart.souvenirOrderDTOs) {
        totalPrice += souvenirOrder.souvenirDTO.price.amount * souvenirOrder.itemCount;
        currenciesArray.push(souvenirOrder.souvenirDTO.price.currency);
      }
    }

    */

    /* Add shipping costs
    totalPrice += shipping.amount;
    currenciesArray.push(shipping.currency);
    */

    /* Check if currencies are all the same, if not throw error or something
    for (let iterator = 1; iterator < currenciesArray.length ; iterator++) {
      if (currenciesArray[iterator + 1] != null) {
        if (currenciesArray[iterator] !== currenciesArray[iterator + 1]) {
          throwError('Currencies in provided shopping cart are not the same !');
        }
      }
    }
    */

    //return {amount: totalPrice, currency: currenciesArray[0]};
  }
}
