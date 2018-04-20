import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ITypeProbleme } from './typeProbleme';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class TypeProblemeService {
  private baseUrl = 'api/typesprobleme';

  constructor(private _http: HttpClient) { }

  obtenirTypeProbleme(): Observable<ITypeProbleme[]> {
    return this._http.get<ITypeProbleme[]>(this.baseUrl).do(data => console.log('obtenirTypeProbleme: ' + JSON.stringify(data))).catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err.error);
    return Observable.throw(err.message);
  }
}
