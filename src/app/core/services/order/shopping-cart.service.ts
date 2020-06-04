import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageResponseDTO, Price } from '../../dto';
import { Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { ShoppingCartDTO } from '../../dto/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/shopping-cart';
  }

  /**
   * Returns shopping cart associated with user performing this request.
   */
  public getShoppingCart(): Observable<ShoppingCartDTO> {
    return this.http.get<ShoppingCartDTO>(this.apiUrl);
  }

  /**
   * Provides total number of products that are inside shopping cart
   * associated with provided id
   *
   * @param shoppingCartID - shopping cart id to count total number of products from.
   */
  public retrieveTotalNumberOfProducts(
    shoppingCartID: string
  ): Observable<number> {
    const httpParams = new HttpParams();
    httpParams.set('id', shoppingCartID);

    return this.http.get<number>(this.apiUrl + '/count', {
      params: httpParams,
    });
  }

  /**
   * Add a flower with provided id to the shopping cart of user performing this request.
   *
   * @param id - id of flower that will be put inside user shopping cart.
   */
  public putFlower(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.put<MessageResponseDTO>(this.apiUrl + '/flower', params);
  }

  /**
   * Add a occasional article with provided id to the shopping cart of user performing this request.
   *
   * @param id - id of occasional article that will be put inside user shopping cart.
   */
  public putOccasionalArticle(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.put<MessageResponseDTO>(
      this.apiUrl + '/occasional-article',
      params
    );
  }

  /**
   * Add a souvenir with provided id to the shopping cart of user performing this request.
   *
   * @param id - id of souvenir that will be put inside user shopping cart.
   */
  public putSouvenir(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.put<MessageResponseDTO>(this.apiUrl + '/souvenir', params);
  }

  /**
   * Add a bouquet with provided id to the shopping cart of user performing this request
   *
   * @param id - id of bouquet that will be put inside user shopping cart.
   */
  public putBouquet(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.put<MessageResponseDTO>(this.apiUrl + '/bouquet', params);
  }

  /**
   * Deletes order of flowers associated with shopping cart belonging
   * to user performing this request;
   *
   * @param id - id of the order to remove
   */
  public deleteFlowerOrder(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<MessageResponseDTO>(this.apiUrl + '/flower', {
      params,
    });
  }

  /**
   * Deletes order of occasional articles associated with shopping cart belonging
   * to user performing this request;
   *
   * @param id - id of the order to remove
   */
  public deleteOccasionalArticleOrder(
    id: string
  ): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<MessageResponseDTO>(
      this.apiUrl + '/occasional-article',
      { params }
    );
  }

  /**
   * Deletes order of souvenirs associated with shopping cart belonging
   * to user performing this request;
   *
   * @param id - id of the order to remove
   */
  public deleteSouvenirOrder(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<MessageResponseDTO>(this.apiUrl + '/souvenir', {
      params,
    });
  }

  /**
   * Deletes bouquet associated with shopping cart belonging
   * to user performing this request;
   *
   * @param id - id of the bouquet to remove
   */
  public deleteBouquet(id: string): Observable<MessageResponseDTO> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<MessageResponseDTO>(this.apiUrl + '/bouquet', {
      params,
    });
  }

  /**
   * Counts total price of all the products nested inside shopping cart
   * associated with provided ID.
   *
   * @param shoppingCartID - id of the shopping cart to count total price from.
   */
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

  /**
   * Determines if provided ShoppingCartDTO contains any products inside it.
   */
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
   * @param shoppingCartID - id of the shopping cart to count total price of.
   * @param shipping - shipping price that will be added to total price
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
