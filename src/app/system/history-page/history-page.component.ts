import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {forkJoin} from 'rxjs';
import {Category} from '../shared/models/category.model';
import {EventModel} from '../shared/models/event.model';
import * as moment from 'moment';

@Component({
  selector: 'mrI-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  categories: Category[] = [];
  events: EventModel[] = [];
  filterEvents: EventModel[] = [];
  chartData = [];
  isLoaded = false;
  isFilterVisible = false;

  constructor(private categoriesService: CategoriesService,
              private eventsService: EventsService) { }

  ngOnInit() {
    forkJoin([this.categoriesService.getCategories(), this.eventsService.getEvents()])
      .subscribe((data: [Category[], EventModel[]]) => {
        this.categories = data[0];
        this.events = data[1];
        this.isLoaded = true;
        this.setOriginalEvents();
        this.calculateChartData();
      });

  }
  private setOriginalEvents() {
    this.filterEvents = this.events.slice();
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat) => {
      const catEvent = this.filterEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });

  }

  private toggleFilterVisibility(dir: boolean) {
     this.isFilterVisible = dir;
  }
  openFilter() {
   this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filterEvents = this.filterEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    this.calculateChartData();

  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }
}
