import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OccasionalArticleDto, RestPage } from '../dto';
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

  public retrievePage(pageNumber: number): Observable<RestPage<OccasionalArticleDto>> {
    const params = new HttpParams().set('page', pageNumber.toString());

    return this.http.get<RestPage<OccasionalArticleDto>>(this.apiUrl, {params});
  }
}
