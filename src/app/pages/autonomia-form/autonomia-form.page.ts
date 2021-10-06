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
import { ModalController, ToastController } from '@ionic/angular';
import { FormSendingService } from '../../services/form-sending.service';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autonomia-form',
  templateUrl: './autonomia-form.page.html',
  styleUrls: ['./autonomia-form.page.scss'],
})
export class AutonomiaFormPage implements OnInit {
  message: string;
  title: string;
  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController,
              private formSendSvc: FormSendingService, private sessionSvc: SessionService,
              private router: Router) { 
    this.message = '';
    this.title = '';
  }
  /*! checking if user is currently logged when creating in dialog */
  ngOnInit() {
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
        this.modalCtrl.dismiss({
          sent: false,
          err: error
        });
        this.router.navigateByUrl('/login');
    });
  }
 
  send() {
    /*TODO: check if form is not blank */
    if (!this.isEmpty(this.message)) {
      if (!this.isEmpty(this.title))  { 
        this.formSendSvc.send(this.title, this.message).then(
          (ok) => {
            this.modalCtrl.dismiss({
              sent: true,
              err: false
            });
          },
          (error) => {
            this.modalCtrl.dismiss({
              sent: false,
              err: error
            });
        });
      } else {
        this.presentToast('¡Debes rellenar el título del mensaje!');
      }
    } else {
      this.presentToast('¡Debes rellenar el cuerpo del mensaje!');
    }
  }

  close() {
    this.modalCtrl.dismiss({
      sent: false,
      err: false
    });
  }
  isEmpty(strToCheck) {
    return (strToCheck.length === 0 || !strToCheck.trim());
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
