import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FlowerDto } from '../dto/flower.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl + '/products/flower';
    }

    public retrieveFullFlowerList(): Observable<FlowerDto[]> {
        return this.http.get<FlowerDto[]>(this.apiUrl + '/all');
    }

}
