import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnlacesPage } from './enlaces.page';

const routes: Routes = [
  {
    path: '',
    component: EnlacesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnlacesPageRoutingModule {}
