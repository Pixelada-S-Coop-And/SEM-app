import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-enlaces',
  templateUrl: './enlaces.page.html',
  styleUrls: ['./enlaces.page.scss'],
})
export class EnlacesPage implements OnInit {

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
