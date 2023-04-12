import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  items: any[];
  title = 'submit-tax';
  constructor() {
    this.items = [
      {
        label: 'Input Detail',
        routerLink: 'details',
      },
      {
        label: 'Review & Confirm',
        routerLink: 'reviews',
      },
    ];
  }
  ngOnInit() {}
}
