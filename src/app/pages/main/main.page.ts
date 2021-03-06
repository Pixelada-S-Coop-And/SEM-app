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
import { GlobalService } from '../../services/global.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {

  constructor(private router: Router, private sessionSvc: SessionService,
              private toastCtrl: ToastController, private global: GlobalService,
              public iab: InAppBrowser) { }

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
    if(this.global.error_sending_email) {
      this.global.error_sending_email = false;
      this.presentToast('Hubo un error mandando el email de cita previa, si el problema persiste contacte con soporte');
    }
    if (this.global.mail_sent) {
      this.global.mail_sent = false;
      this.presentToast('Email enviado correctamente, espere a que se le contacte');
    }
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
  goToEnlaces() {
    console.log('going to enlaces');
    this.router.navigateByUrl('/enlaces');
  }
  goToEmpleo() {
    console.log('going to empleo');
    this.router.navigateByUrl('/empleo');
  }
  goToFormacion() {
    console.log('going to formacion');
    this.router.navigateByUrl('/formacion');
  }
  goToSeccsSind() {
    console.log('going to secciones');
    this.router.navigateByUrl('/secciones');
  }
  goToRecursos() {
    console.log('going to recursos');
    this.router.navigateByUrl('/recursos');
  }
  goToCursos() {
    console.log('going to cursos');
    this.router.navigateByUrl('/cursos');
  }
  openUrl(url, check = true) {
    let regExp = new RegExp('(http|https)://');
    if(!regExp.test(url) && check) {
      url = 'http://' + url;
    }
    console.log('trying to open: ' + url);
    this.presentToast('abriendo el enlace: ' + url + " en tu navegador web, fuera de esta aplicaci??n.");
    const ref = this.iab.create(url, '_system', 'location=yes');
    ref.close();
  }
}
