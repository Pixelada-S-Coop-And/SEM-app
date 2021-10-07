import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnlacesPageRoutingModule } from './enlaces-routing.module';

import { EnlacesPage } from './enlaces.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnlacesPageRoutingModule
  ],
  declarations: [EnlacesPage]
})
export class EnlacesPageModule {}
