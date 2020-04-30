import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../models/bill.model';
import {BaseApi} from '../../../shared/base-api';

@Injectable()
export class BillService extends BaseApi {
   private apiKey: string = '170d45fdcf991139672569f476bb8907';
   constructor(public http: HttpClient) {
     super(http);
   }

  getBills(): Observable<Bill[]> {
   return this.get('bill');
  }

  getCurrency(): Observable<any> {
    return this.http.get(`http://data.fixer.io/api/latest?access_key=${this.apiKey}`);
  }
  updateBill(id: any, bill: Bill): Observable<Bill> {
    return this.put(`bill/${id}`, bill);
  }
}
