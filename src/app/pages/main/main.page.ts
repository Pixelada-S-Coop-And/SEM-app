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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {

  constructor(private router: Router, private sessionSvc: SessionService,
              private toastCtrl: ToastController) { }

  ionViewWillEnter() {
    console.log('main will enter');
    // we check if logged and we are an active user
    console.log('we check if logged and we are an active user');
    this.sessionSvc.userData().then(
      (data) => {
        // do nothing
        console.log('ok');
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

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      position: 'bottom',
      duration: 4000
    });
    toast.present();
  }

  goToCarnet() {
    console.log('going to carnet');
    this.router.navigateByUrl('/carnet');
  }
  goToNotificaciones() {
    console.log('going to notificaciones');
    this.router.navigateByUrl('/notificaciones');
  }
  goToCitaPrevia() {
    console.log('going to autonomia-form');
    this.router.navigateByUrl('/autonomia-form');
  }
}
