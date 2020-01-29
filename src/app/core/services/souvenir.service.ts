import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestPage } from '../dto/rest-page';
import { SouvenirDTO } from '../dto/souvenir.dto';


@Injectable({
  providedIn: 'root'
})
export class SouvenirService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/product/souvenir';
  }

  public retrievePage(pageNumber: number): Observable<RestPage<SouvenirDTO>> {
    const params = new HttpParams().set('page', pageNumber.toString());

    return this.http.get<RestPage<SouvenirDTO>>(this.apiUrl, {params});
  }
}
