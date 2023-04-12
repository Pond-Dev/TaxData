import { Injectable } from '@angular/core';

export type OptionType = {
  id: string;
  name: string;
};
export type TaxType = {
  filingType: string;
  saleAmount: number;
  selectedMonth: OptionType;
  selectedYear: OptionType;
  selectedType: OptionType | null;
  taxAmount: number;
  totalAmount: number;
};

@Injectable({
  providedIn: 'root',
})
export class TaxService {
  private taxData: TaxType = {
    filingType: 'Ordinary Filing',
    saleAmount: 0,
    selectedMonth: { id: '1', name: 'January' },
    selectedYear: { id: '2020', name: '2020' },
    selectedType: null,
    taxAmount: 0,
    totalAmount: 0,
  };

  getTaxData() {
    return this.taxData;
  }

  setTaxData(data: TaxType) {
    this.taxData = data;
  }
}
