/* 
 *  Copyright 2021 Pixelada s. Coop. And. <info (at) pixelada (dot) org>
 *  
 *  This file is part of SEM
 *  
 *  SEM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *  
 *  SEM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  
 *  You should have received a copy of the GNU General Public License
 *  along with SEM.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Component} from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IUser } from '../../services/pixapi.service';

@Component({
  selector: 'app-carnet',
  templateUrl: './carnet.page.html',
  styleUrls: ['./carnet.page.scss'],
})
export class CarnetPage {
  name: string;
  surnames: string;
  affiliation_date: string;
  dni: string;
  section_name: string;
  job: string;
  birthdate: string;
  address: string;
  phone: number;
  email: string;
  number_affiliate: number;

  toggledView: boolean = false;
  
  constructor(public sessionSvc: SessionService, public router: Router,
              public toastCtrl: ToastController) {
  }
  ionViewWillEnter() {
    console.log('tab2 will enter');
    // we check if logged and we are an active user
    this.sessionSvc.userData().then(
      (data) => {
        this.name = (data as IUser).name;
        this.surnames = (data as IUser).surnames;
        this.affiliation_date = (data as IUser).affiliation_date;
        this.dni = (data as IUser).id_card;
        this.section_name = (data as IUser).section_name;
        this.job = (data as IUser).job;
        this.birthdate = (data as IUser).birthdate;
        this.address = (data as IUser).address + ' '
          + (data as IUser).zipcode 
          + ' ' + (data as IUser).location
          + ' (' + (data as IUser).province + ')';
        this.phone = (data as IUser).phone;
        this.email = (data as IUser).email;
        this.number_affiliate = (data as IUser).number;
      },
      (error) => {
        this.presentToast('Usuario no registrado! error:' + error);
        this.router.navigateByUrl('/login');
    })
    .catch(
        (error) => {
          this.presentToast('Usuario no registrado! error:' + error);
          this.router.navigateByUrl('/login');
    });
  }
  /* function for showing bottom system message thanks to toastcontroller */
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
        message: text,
        position: 'bottom',
        duration: 4000
    });
    toast.present();
  }
  back() {
    console.log('back to main page');
    this.router.navigateByUrl('main');
  }
  toggleView() {
    if(!this.toggledView) {
      this.toggledView = true;
    } else {
      this.toggledView = false;
    }
  }
}
