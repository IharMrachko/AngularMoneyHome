import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/seervices/users.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'mrI-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UsersService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forBiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, Validators.required),
      'agree': new FormControl(false, Validators.requiredTrue),
    });

  }

  onSubmit() {
    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name
    };

    this.userService.createUser(user).subscribe(() => {
      this.router.navigate(['/login'], {
        queryParams: {
          nowCanLogin: true
        }
      });
    });
  }
  forBiddenEmails(control: FormControl): Promise<any> {
    return new Promise<any>((res, rej) => {
       this.userService.getUserByEmail(control.value).subscribe((user: User) => {
         if (user) {
           res({forBiddenEmail: true});
         } else {
           res(null);
         }
       });
    });
  }
}
