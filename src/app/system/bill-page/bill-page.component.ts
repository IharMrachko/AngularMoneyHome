import { Component, OnInit } from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/models/bill.model';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'mrI-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss'],
  animations: [
    trigger('loaded', [
      state('clickRefresh', style({
        color: 'red',
        transition: 'color 2s'
      })),
      state('clickRefreshEnd', style({
        color: 'white'
      })),
      transition('clickRefresh <=> clickRefreshEnd', animate(200))
    ])
  ]
})
export class BillPageComponent implements OnInit {

  usd: string;
  rub: string;
  aud: string;
  date: string;
  billValueRU: number;
  billValueEUR: number;
  billValueUSD: number;
  loadedAnimation: string;
  constructor(private billService: BillService) { }

  ngOnInit() {
    this.loadCurrency();
  }

  loadCurrency() {
     this.billService.getBills().subscribe((bill: Bill[]) => {
     this.billValueRU = bill[0]['value'];
     this.billValueEUR = bill[1]['value'];
     this.billValueUSD = bill[2]['value'];

    } );
    this.billService.getCurrency().subscribe((data) => {
      this.usd = data['rates']['USD'];
      this.rub = data['rates']['RUB'];
      this.aud = data['rates']['AUD'];
      this.date = data.date;
    });
 }
  updateload() {
    this.loadCurrency();
    this.loadedAnimation = 'clickRefresh';
    setTimeout(() => {
      this.loadedAnimation = 'clickRefreshEnd';
    }, 3000);
  }
}
