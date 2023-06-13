import { Component } from '@angular/core';
import { Environment as env } from 'src/environments/Environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  symbol: string = env.symbol;

  reaload() {
    window.location.reload();
  }
}
