import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {CategoriesService} from '../../shared/services/categories.service';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'mrI-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;

  message: Message;

  constructor(private categoryService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm) {
    let {name, capacity} = form.value;
    if(capacity < 0) capacity *= -1;
    const category = new Category(name, capacity, +this.currentCategoryId);
    this.categoryService.updateCategory(category)
      .subscribe((editCategory: Category) => {
       this.onCategoryEdit.emit(editCategory);
       this.message.text = 'Категрия успешно отредактирована!';
       window.setTimeout(() => this.message.text = '', 5000);
      });
  }

  onCategoryChange() {
   this.currentCategory = this.categories
     .find(c => c.id === +this.currentCategoryId);
  }
}
