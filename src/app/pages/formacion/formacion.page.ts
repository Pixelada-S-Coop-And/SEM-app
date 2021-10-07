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
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.page.html',
  styleUrls: ['./formacion.page.scss'],
})
export class FormacionPage implements OnInit {

  constructor(private toastCtrl: ToastController, private router: Router,
    public iab: InAppBrowser) { }

  ngOnInit() {
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
  openUrl(url) {
    let regExp = new RegExp('(http|https)://');
    if(!regExp.test(url)) {
      url = 'http://' + url;
    }
    console.log('trying to open: ' + url);
    this.presentToast('abriendo el enlace: ' + url + " en tu navegador web, fuera de esta aplicación.");
    const ref = this.iab.create(url, '_system', 'location=yes');
    ref.close();
  }
}
