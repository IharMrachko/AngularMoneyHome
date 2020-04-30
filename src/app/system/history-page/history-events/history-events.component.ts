import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {EventModel} from '../../shared/models/event.model';

@Component({
  selector: 'mrI-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: EventModel[] = [];
  searchValue = '';
  searchPlaceholder = 'сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    });
  }

  getEventClass(event: EventModel) {
     return {
       'label': true,
       'label-danger': event.type === 'outcome',
       'label-success': event.type === 'income',
     };
  }

  changeCreteria(field: string) {
   const namesMap = {
     amount: 'Сумма',
     date: 'Дата',
     category: 'Категория',
     type: 'Тип'
   };

   this.searchPlaceholder = namesMap[field];
   this.searchField = field;
  }
}
