import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OccasionalArticleDTO, RestPage } from '../dto';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OccasionalArticleService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/product/occasional-article';
  }

  public retrievePage(pageNumber: number): Observable<RestPage<OccasionalArticleDTO>> {
    const params = new HttpParams().set('page', pageNumber.toString());

    return this.http.get<RestPage<OccasionalArticleDTO>>(this.apiUrl, {params});
  }
}
