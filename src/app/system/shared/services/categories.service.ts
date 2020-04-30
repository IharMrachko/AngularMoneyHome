import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../../../shared/base-api';
import {Category} from '../models/category.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CategoriesService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }
  addCategory(category: Category): Observable<Category> {
    return this.post('categories', category);
  }

  getCategories(): Observable<Category[]> {
    return this.get('categories');
  }
  getCategoryById(id: number): Observable<Category> {
    return  this.get(`categories/${id}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }
}
