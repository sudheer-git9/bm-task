import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  getData(): Observable<any> {
    return this.http.get('https://mocki.io/v1/072f4309-6b86-4ecc-b055-e16192d9f76a');
  }
}
