import { Component } from '@angular/core';
import { ExchangeService } from 'src/app/core/service/exchange.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent {
  showCurrency: boolean = true;
  code: string = '';
  hasCalledRate: boolean = false;

  obj: any = {
    exchangeRate: 5.0357,
    fromSymbol: 'USD',
    lastUpdatedAt: '2023-05-31T03:12:22.000+00:00',
    success: true,
    toSymbol: 'BRL',
  };

  exchangeRate: any = [
    {
      close: 5.0357,
      date: '2023-05-31T03:00:00.000+00:00',
      high: 5.0419,
      low: 5.0357,
      open: 5.0419,
    },
    {
      close: 5.0419,
      date: '2023-05-30T03:00:00.000+00:00',
      high: 5.0686,
      low: 4.9986,
      open: 5.0131,
    },
    {
      close: 5.0131,
      date: '2023-05-29T03:00:00.000+00:00',
      high: 5.0201,
      low: 4.9732,
      open: 4.9939,
    },
  ];

  constructor(public service: ExchangeService) {}

  getCurrentExchange() {
    console.log(this.code);

    if (!this.code) {
      return false;
    }

    this.code = this.code.toLocaleUpperCase();
    // this.service.getCurrentExchange(this.code).subscribe({
    //   next: (data) => {
    //     console.log(data);

    this.obj = {
      exchangeRate: 5.0357,
      fromSymbol: 'USD',
      lastUpdatedAt: '2023-05-31T03:12:22.000+00:00',
      success: true,
      toSymbol: 'BRL',
    };
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
    return true;

    // this.showCurrency = !this.showCurrency;
    // this.teste = !this.teste;
  }

  getExchangeRate() {
    if (this.hasCalledRate) {
      return true;
    }

    this.exchangeRate.forEach((item: any) => {
      item.diff = this.calculateDiff(item.close);
    });

    // this.service.getExchangeRate(this.code).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.exchangeRate = data.data;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });

    return false;
  }

  calculateDiff(close: number) {
    console.log(close);
    return (((this.obj.exchangeRate - close) / close) * 100).toFixed(2);
  }
}
