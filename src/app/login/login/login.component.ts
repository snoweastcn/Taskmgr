import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.form = new FormGroup({
    //   email: new FormControl('513832354@qq.com', Validators.compose([Validators.required, Validators.email])),
    //   password: new FormControl('', Validators.required)
    // });

    this.form = this.fb.group({
      email: ['513832354@qq.com', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required]
    });
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);
    // this.form.controls['email'].setValidators(this.validate);
  }

  validate(c: FormControl): { [key: string]: any } {
    if (!c.value) {
      return null;
    }
    const pattern = /^513832354+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotValid: 'the email must start at 513532354'
    };
  }
}
