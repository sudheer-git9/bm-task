import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BmApiService {
  api: string = this.envService.currentEnvironment?.serverApi;

  constructor(private envService: EnvService, private httpC: HttpClient) {

  }
  getFpoDetails(): Observable<any> {
    return this.httpC.get(`${this.api}/api/v1/farmer/fpo/get-fpo-details`);
  }

  getFPODetailById(fpoDetailsId: number): Observable<any> {

    return this.httpC.get(`${this.api}/api/v1/farmer/fpo/get-fpo-details-by-id/${fpoDetailsId}`);
  }

  updateFPODetails(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data;',
    });
    return this.httpC.post(`${this.api}/api/v1/farmer/fpo/add-fpo-details`, body, { headers });
  }

}
