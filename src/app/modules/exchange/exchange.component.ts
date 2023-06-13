import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExchangeService } from 'src/app/core/service/exchange.service';
import { ExchangeRate } from 'src/app/interfaces/ExchangeRate.interface';
import { ExchangeRateList } from 'src/app/interfaces/ExchangeRateList.interface';
import { ExchangeRateListItem } from 'src/app/interfaces/ExchangeRateListItem.interface';
import { Environment as env } from 'src/environments/Environment';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent {
  symbol: string = env.symbol;
  showCurrency: boolean = false;
  code: string = '';
  hasCalledRate: boolean = false;
  loading: boolean = false;
  panelExpanded: boolean = false;
  exchangeRate!: ExchangeRate;
  exchangeRateList: ExchangeRateListItem[] = [];

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

        this.exchangeRateList.forEach(
          (item: ExchangeRateListItem, index: number) => {
            item.diff = this.calculateDiff(
              item.close,
              index > 0
                ? this.exchangeRateList[index - 1].close
                : this.exchangeRate.exchangeRate
            );
          }
        );

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

  calculateDiff(close: number, lastClose: number) {
    return parseFloat((((lastClose - close) / close) * 100).toFixed(2));
  }

  closeCurrency() {
    this.showCurrency = false;
  }
}
