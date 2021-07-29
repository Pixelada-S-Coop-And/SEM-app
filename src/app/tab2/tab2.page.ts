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
import { SessionService } from '../services/session.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
name: string;
  constructor(public sessionSvc: SessionService, public router: Router,
              public toastCtrl: ToastController) {
    this.name = 'Carolina Heras Rodriguez'
  }
  ionViewWillEnter() {
    console.log('tab2 will enter');
    // we check if logged and we are an active user
    this.sessionSvc.userData().then(
      (data) => {
        // do nothing
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
}
