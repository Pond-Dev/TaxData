import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaxService, TaxType } from 'src/app/services/tax.service';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  taxData: TaxType;
  displayDialog: boolean = false;
  constructor(private router: Router, private taxService: TaxService) {
    this.taxData = this.taxService.getTaxData();
  }

  ngOnInit(): void {}

  onClickBack() {
    this.router.navigateByUrl('/details');
  }

  onClickConfirm() {
    this.displayDialog = true;
  }
}
