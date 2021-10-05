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
import { SessionService } from '../../services/session.service';
import { ToastController } from '@ionic/angular';
import { IRegistration } from '../../services/pixapi.service';
import { GlobalService } from '../../services/global.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  pass: string;
  passwordType = 'password';
  passwordIcon = 'eye-off';
  constructor(private sessionSvc: SessionService, private toastCtrl: ToastController,
              public globalSvc: GlobalService, private router: Router) { }

  ionViewWillEnter() {
    console.log('tab1 will enter');
    // we check if logged and we are an active user
    this.sessionSvc.userData().then(
      (data) => {
        this.router.navigateByUrl('main');
      },
      (error) => {
        // do nothing
    })
    .catch(
      (error) => {
        // do nothing
    });
  }

  /*! trying to make a logging with the provided pass */
  login() {
    this.sessionSvc.login(this.pass).then (
      (session_id) => {
        console.log('recibiendo id de sesión: ', session_id);
        this.globalSvc.set(this.globalSvc.session_id_key, session_id);
        this.presentToast('Has entrado en tu carnet virtual!');
        this.router.navigateByUrl('main');
      },
      (errorMsg) => {        
        this.presentToast('falló la autenticación: '+ errorMsg);
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
}
