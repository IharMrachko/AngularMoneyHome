import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  exports: [ReactiveFormsModule, FormsModule ],
  declarations: []
})
export class SharedModule {

}
