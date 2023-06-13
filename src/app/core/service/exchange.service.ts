import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment as env } from 'src/environments/Environment';
import { ExchangeRate } from 'src/app/interfaces/ExchangeRate.interface';
import { ExchangeRateList } from 'src/app/interfaces/ExchangeRateList.interface';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  url: string = 'https://api-brl-exchange.actionlabs.com.br/api/1.0/open/';
  exchangeRate!: ExchangeRate;

  constructor(public http: HttpClient) {}

  getCurrentExchange(code: string): Observable<ExchangeRate> {
    const params = new HttpParams()
      .set('apiKey', env.apiKey)
      .set('from_symbol', code)
      .set('to_symbol', env.symbol);

    return this.http.get<ExchangeRate>(this.url + 'currentExchangeRate', { params });
  }

  getExchangeRate(code: string): Observable<ExchangeRateList> {
    const params = new HttpParams()
      .set('apiKey', env.apiKey)
      .set('from_symbol', code)
      .set('to_symbol', env.symbol);

    return this.http.get<ExchangeRateList>(this.url + 'dailyExchangeRate', { params });
  }
}
