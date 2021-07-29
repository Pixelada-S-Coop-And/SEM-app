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
import { ToastController } from '@ionic/angular';
import { INotification } from '../services/pixapi.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
testNotification1: INotification;
testNotification2: INotification;
  constructor(private sessionSvc: SessionService, private toastCtrl: ToastController,
              private router: Router) {
    this.testNotification1 = {
      ID: 1,
      creation_date: new Date().toISOString(),
      title: 'Notificación de prueba',
      text: '<p>Abierto el plazo de inscripción al curso tal</p> <p> Apuntaros! </p>',
      section: ['Todas'],
      link: 'www',
      docs: [{
        title: 'prueba',
        link: 'www'
      }]
    }
    this.testNotification2 = {
      ID: 2,
      creation_date: new Date().toISOString(),
      title: 'Otra notificación de prueba',
      text: '<p>Inicio del proceso de alegaciones para tal cual cosa</p> <p> Alegad!</p>',
      section: ['Todas'],
      link: 'www',
      docs: [{
        title: 'prueba',
        link: 'www'
      }]
    }
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
