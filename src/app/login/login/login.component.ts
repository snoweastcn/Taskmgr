import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuoteService } from 'src/app/service/quote.service';
import { Quote } from 'src/app/domain/quote.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote: Quote = {
    cn: '提示标签是显示在表单字段下划线下方的额外的描述性文本。',
    en: 'Angular is a platform that makes it easy to build applications with the web.',
    pic: '/assets/images/kitten-cosmic.png'
  };
  constructor(
    private fb: FormBuilder,
    private quoteService$: QuoteService,
    private http: HttpClient) {
    this.quoteService$.getQuote().subscribe(q => this.quote = q);
  }

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
    const params = {
      uname: '513832354@qq.com',
      upwd: '123456',
    };
    this.http.get('/login', { params: params }).subscribe((data) => {
      console.log(data);
    });
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
