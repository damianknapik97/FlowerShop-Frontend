import { BouquetDTO } from '../dto/bouquet/bouquet.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BouquetService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/products/bouquets';
  }

  public retrieveFullBouquetList(): Observable<BouquetDTO[]> {
    return this.http.get<BouquetDTO[]>(this.apiUrl + '/all');
  }
}
