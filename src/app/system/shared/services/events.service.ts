import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../../../shared/base-api';
import {Observable} from 'rxjs';
import {EventModel} from '../models/event.model';

@Injectable({providedIn: 'root'})
export class EventsService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: EventModel): Observable<EventModel> {
    return this.post('events', event);
  }

  getEvents(): Observable<EventModel[]> {
    return this.get('events');
  }
  getEventById (id: string): Observable<EventModel> {
    return this.get(`events/${id}`);
  }
}
