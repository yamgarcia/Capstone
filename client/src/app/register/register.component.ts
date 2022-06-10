import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from './../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.InitializeForm();
  }

  InitializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('hello', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  register() {
    this.accountService.register(this.model).subscribe(
      (res) => {
        console.log(res);
        this.cancel();
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.errors.Username);
        this.toastr.error(err.error.errors.Password);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
