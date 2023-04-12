import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaxService, OptionType } from 'src/app/services/tax.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  filingType: string;
  displayDialog: boolean = false;

  monthOption: OptionType[] = [
    { id: '1', name: 'January' },
    { id: '2', name: 'February' },
    { id: '3', name: 'March' },
    { id: '4', name: 'April' },
    { id: '5', name: 'May' },
    { id: '6', name: 'June' },
    { id: '7', name: 'July' },
    { id: '8', name: 'August' },
    { id: '9', name: 'September' },
    { id: '10', name: 'October' },
    { id: '11', name: 'November' },
    { id: '12', name: 'December' },
  ];
  yearOption: OptionType[] = this.getOptionYear();
  typeOption: OptionType[] = [{ id: 'On-Time', name: 'On-Time' }];

  selectedMonth: OptionType = this.monthOption[0];
  selectedYear: OptionType = this.yearOption[0];
  selectedType: OptionType = this.typeOption[0];

  saleAmount: number;
  taxAmount: number;
  taxAmountFromSystem: number;
  surCharge: number;
  penalty: number;
  totalAmount: number;

  invalid: any = {};

  constructor(private router: Router, private taxService: TaxService) {
    const initialDetailsData = this.taxService.getTaxData();
    this.filingType = initialDetailsData.filingType;
    this.selectedMonth = initialDetailsData.selectedMonth;
    this.selectedYear = initialDetailsData.selectedYear;
    this.saleAmount = initialDetailsData.saleAmount;
    this.taxAmount = initialDetailsData.taxAmount;
    this.surCharge = 0;
    this.penalty = 200;
    this.totalAmount = initialDetailsData.totalAmount;
    this.taxAmountFromSystem = this.taxAmount;
    this.getSurCharge();
    this.getTotalAmount();
  }

  ngOnInit(): void {}

  onClickViewExchangeRate() {
    window.open(
      'https://www.scb.co.th/en/personal-banking/foreign-exchange-rates.html'
    );
  }

  getOptionYear() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2020; year <= currentYear; year++) {
      years.push(year);
    }
    return years.map((year) => {
      return { id: `${year}`, name: `${year}` };
    });
  }
  onBlurSaleAmount() {
    this.taxAmount = Number((this.saleAmount * 0.07).toFixed(3));
    this.taxAmountFromSystem = this.taxAmount;
    this.getSurCharge();
    this.getTotalAmount();
  }
  onBlurTaxAmount() {
    this.getSurCharge();
    this.getTotalAmount();
  }

  getSurCharge() {
    this.surCharge = Number((this.taxAmount * 0.1).toFixed(3));
  }
  getTotalAmount() {
    this.totalAmount = this.taxAmount + this.surCharge + this.penalty;
  }
  onClickNext() {
    this.invalid = {};
    //check  saleAmount
    if (this.saleAmount === 0) {
      this.invalid.saleAmount = 'กรุณาระบุจำนวน saleAmount';
    }
    //check select month
    if (Number(this.selectedYear.id) === new Date().getFullYear()) {
      if (Number(this.selectedMonth.id) > new Date().getMonth()) {
        this.invalid.month = 'ไม่สามารถเลือกเกินเดือนปัจจุบันได้';
      }
    }
    //check taxAmount
    if (
      20 > this.taxAmount - this.taxAmountFromSystem &&
      this.taxAmount - this.taxAmountFromSystem > -20
    ) {
    } else {
      this.invalid.taxAmount = `taxAmount ต้องอยู่ระหว่าง ${
        this.taxAmountFromSystem + 20
      } ถึง ${
        this.taxAmountFromSystem - 20 < 0 ? 0 : this.taxAmountFromSystem - 20
      }`;
    }

    // all pass
    if (Object.keys(this.invalid).length === 0) {
      this.router.navigateByUrl('/reviews');
    } else {
      this.displayDialog = true;
    }
  }
  ngOnDestroy() {
    const format = {
      filingType: this.filingType,
      selectedMonth: this.selectedMonth,
      selectedYear: this.selectedYear,
      selectedType:
        this.filingType === 'Ordinary Filing' ? null : this.selectedType,
      saleAmount: this.saleAmount,
      taxAmount: this.taxAmount,
      totalAmount: this.totalAmount,
    };
    this.taxService.setTaxData(format);
  }
}
