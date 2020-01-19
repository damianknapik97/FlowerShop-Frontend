import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FlowerDto } from '../dto/flower.dto';
import { Observable } from 'rxjs';
import { RestPage } from '../dto/rest-page';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/product/flower';
  }

  public retrievFlowerPage(page: number): Observable<RestPage<FlowerDto>> {
    if (page < 0) {
      page = 0;
    }
    const params = new HttpParams().set('page', page.toString());

    return this.http.get<RestPage<FlowerDto>>(this.apiUrl, { params });
  }
}
