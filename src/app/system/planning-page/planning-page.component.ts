import { Component, OnInit } from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {forkJoin} from 'rxjs';
import {Bill} from '../shared/models/bill.model';
import {Category} from '../shared/models/category.model';
import {EventModel} from '../shared/models/event.model';

@Component({
  selector: 'mrI-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit {

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: EventModel[] = [];
  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventService: EventsService) { }

  ngOnInit() {
    forkJoin([this.billService.getBills(),
      this.categoriesService.getCategories(),
      this.eventService.getEvents()])
      .subscribe((data: [Bill[], Category[], EventModel[] ]) => {
        this.bill = data[0][0];
        this.categories = data[1];
        this.events = data[2];
        this.isLoaded = true;
      });



  }

    getCategoryCost(category: Category): number {
    const categoryEvent = this.events.filter(e => e.category === category.id && e.type === 'outcome');
    return categoryEvent.reduce((total, e) => {
       total += e.amount;
       return total;
    }, 0);
  }
  private getPercent(cat: Category): number {

    const percent = (100 * this.getCategoryCost(cat))/cat.capacity;

    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string{
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';


  }
}
