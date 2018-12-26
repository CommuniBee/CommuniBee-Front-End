import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { getCommunibeeApiUrl } from '../../../configuration';

@Injectable({
  providedIn: 'root',
})
export class BackendHttpService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = getCommunibeeApiUrl();
  }

  get(path: string): Promise<any> {
    return this.http.get(`${this.url}/${path}`).pipe(
      retry(3),
    ).toPromise();
  }

  post(path: string, body: any): Promise<any> {
    return this.http.post(`${this.url}/${path}`, body).toPromise();
  }

  put(path: string, body: any): Promise<any> {
    return this.http.put(`${this.url}/${path}`, body).toPromise();
  }

  delete(path: string): Promise<any> {
    return this.http.delete(`${this.url}/${path}`).toPromise();
  }
}
