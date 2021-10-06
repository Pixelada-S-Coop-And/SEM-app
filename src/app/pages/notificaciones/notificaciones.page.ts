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
import { INotification } from '../../services/pixapi.service';
import { SessionService } from '../../services/session.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage {
  myNotifications: INotification[];
  notificationsLoaded: boolean;
  
  constructor(private sessionSvc: SessionService, private toastCtrl: ToastController,
              private router: Router, public notificationsSvc: NotificationsService,
              private alertCtrl: AlertController) {
    this.notificationsLoaded = false;
  }
  ionViewWillEnter() {
    console.log('tab1 will enter');
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
    this.notificationsSvc.getLastNotifications().then(
      (val) => {
        this.myNotifications = val;
        this.notificationsLoaded = true;
      },
      (err) => {
        console.log('error, returned notifications:' + err);
        this.notificationsLoaded = true;
    });
  }
  /*! function event of removing a notification */
  async onRemoveNotification(notification: INotification) {
    const alertConfirm = await this.alertCtrl.create({
      header: 'Borrar la notificación',
      message: 'Esta acción no podrá ser deshecha',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            console.log('deleting notification:' + notification.id);
            this.notificationsSvc.deleteNotification(notification.id).then(
              (ok) => {
                this.notificationsSvc.notificationsList().then(
                  (val) => {
                    this.myNotifications = val;
                    for (const notification of this.myNotifications) {
                      console.log('current notificacions:' + notification.id);
                    }
                  },
                  (err) => {
                    console.log('error, returned notifications:' + err);
                    this.myNotifications = null;
                });
            });
          }
        }
      ]
    });
    await alertConfirm.present();
  }
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
}
