import { Observable } from "rxjs";
import { BouquetDto } from "../dto/bouquet.dto";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class BouquetService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + "/products/bouquets";
  }

  public retrieveFullBouquetList(): Observable<BouquetDto[]> {
    return this.http.get<BouquetDto[]>(this.apiUrl + "/all");
  }
}
