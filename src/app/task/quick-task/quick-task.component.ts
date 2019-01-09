import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {
  desc: string;
  constructor() { }

  ngOnInit() {
  }
  onSubmit({ value, valid }, ev: Event) {
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));
  }
}
