
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AdminUserService {

  constructor(private http: HttpClient) { }


  validate(request): Observable<any> {
    return this.http
      .post('http://localhost:6001/realestate/validateadminuser', request).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }

}