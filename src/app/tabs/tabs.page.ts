import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AutonomiaFormPage } from '../pages/autonomia-form/autonomia-form.page';
import { GlobalService } from '../services/global.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController,
             public global: GlobalService) {
  }

  ngOnInit() {
  }

  async writeAutonomia() {
    const modal = await this.modalCtrl.create({
      component: AutonomiaFormPage,
      componentProps: {
      },
    });
    modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data.sent === true) {
      console.log('sent!!');
      this.presentToast('Su correo se ha enviado correctamente');
    } else {
      if (data.err === true) {
        console.log('sent error!')
        this.presentToast('Hubo un error al enviar el correo');
      }
    }
    return;
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
