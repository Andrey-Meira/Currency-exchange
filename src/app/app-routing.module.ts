import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'home',
  },
  {
    pathMatch: 'full',
    path: 'home',
    loadChildren: () => import('./modules/exchange/exchange.module').then(m => m.ExchangeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
