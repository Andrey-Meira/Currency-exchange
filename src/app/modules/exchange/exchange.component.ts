import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExchangeService } from 'src/app/core/service/exchange.service';
import { ExchangeRateList } from 'src/app/interfaces/ExchangeRateList.interface';
import { Environment as env} from 'src/environments/Environment';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent {
  showCurrency: boolean = false;
  code: string = '';
  hasCalledRate: boolean = false;
  loading: boolean = false;
  panelExpanded: boolean = false;

  symbol: string = env.symbol;

  exchangeRate: any = {
    exchangeRate: 5.0357,
    fromSymbol: 'USD',
    lastUpdatedAt: '2023-05-31T03:12:22.000+00:00',
    success: true,
    toSymbol: 'BRL',
  };

  exchangeRateList: ExchangeRateList[] = [
    {
      close: 0.03597,
      date: '2023-05-31T03:00:00.000+00:00',
      high: 0.03597,
      low: 0.03576,
      open: 0.03594,
    },
    {
      close: 0.03595,
      date: '2023-05-30T03:00:00.000+00:00',
      high: 0.03612,
      low: 0.03558,
      open: 0.03558,
    },
    {
      close: 0.03559,
      date: '2023-05-29T03:00:00.000+00:00',
      high: 0.03563,
      low: 0.03539,
      open: 0.0354,
    },
    {
      close: 0.03539,
      date: '2023-05-26T03:00:00.000+00:00',
      high: 0.03591,
      low: 0.03531,
      open: 0.03579,
    },
    {
      close: 0.03584,
      date: '2023-05-25T03:00:00.000+00:00',
      high: 0.03589,
      low: 0.03536,
      open: 0.03541,
    },
    {
      close: 0.03542,
      date: '2023-05-24T03:00:00.000+00:00',
      high: 0.03586,
      low: 0.03537,
      open: 0.0358,
    },
    {
      close: 0.0358,
      date: '2023-05-23T03:00:00.000+00:00',
      high: 0.03586,
      low: 0.03559,
      open: 0.03572,
    },
    {
      close: 0.03566,
      date: '2023-05-22T03:00:00.000+00:00',
      high: 0.03619,
      low: 0.03565,
      open: 0.03613,
    },
  ];

  constructor(
    public service: ExchangeService,
    private _snackBar: MatSnackBar
  ) {}

  getCurrentExchange() {
    if (!this.code) {
      return false;
    }

    this.loading = true;

    this.code = this.code.toLocaleUpperCase();
    this.service.getCurrentExchange(this.code).subscribe({
      next: (data) => {
        this.hasCalledRate = false;
        this.loading = false;
        if (!data.success) {
          this._snackBar.open(
            'Ocorreu um erro, por favor tente novamente',
            'Fechar',
            {
              horizontalPosition: 'end',
            }
          );
          return false;
        }
        this.exchangeRate = data;
        this.showCurrency = true;
        return true;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this._snackBar.open(
          'Ocorreu um erro, por favor tente novamente',
          'Fechar',
          {
            horizontalPosition: 'end',
          }
        );
      },
    });
    return true;
  }

  getExchangeRate() {
    this.panelExpanded = true;

    if (this.hasCalledRate) {
      return true;
    }

    this.exchangeRateList = [];
    this.service.getExchangeRate(this.code).subscribe({
      next: (data) => {
        if (!data.success) {
          this._snackBar.open(
            'Ocorreu um erro, por favor tente novamente',
            'Fechar',
            {
              horizontalPosition: 'end',
            }
          );
          return false;
        }
        this.hasCalledRate = true;
        this.exchangeRateList = data.data;
        this.exchangeRateList.splice(0, 1);

        this.exchangeRateList.forEach((item: any) => {
          item.diff = this.calculateDiff(item.close);
        });

        return true;
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(
          'Ocorreu um erro, por favor tente novamente',
          'Fechar',
          {
            horizontalPosition: 'end',
          }
        );
      },
    });

    return false;
  }

  calculateDiff(close: number) {
    return (((this.exchangeRate.exchangeRate - close) / close) * 100).toFixed(
      2
    );
  }

  closeCurrency() {
    this.showCurrency = false;
  }
}
