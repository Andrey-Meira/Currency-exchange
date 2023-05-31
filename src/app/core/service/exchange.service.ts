import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment as env } from 'src/environments/Environment';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  url: string = 'https://api-brl-exchange.actionlabs.com.br/api/1.0/open/';

  constructor(public http: HttpClient) {}

  getCurrentExchange(code: string): Observable<any> {
    const params = new HttpParams()
      .set('apiKey', env.apiKey)
      .set('from_symbol', code)
      .set('to_symbol', env.symbol);

    return this.http.get(this.url + 'currentExchangeRate', { params });
  }

  getExchangeRate(code: string): Observable<any> {
    const params = new HttpParams()
      .set('apiKey', env.apiKey)
      .set('from_symbol', code)
      .set('to_symbol', env.symbol);

    return this.http.get(this.url + 'dailyExchangeRate', { params });
  }
}
