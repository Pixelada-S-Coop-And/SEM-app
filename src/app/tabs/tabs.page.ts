import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AutonomiaFormPage } from '../pages/autonomia-form/autonomia-form.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private modalCtrl: ModalController) {}

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
    } else {
      if (data.err === true) {
        console.log('sent error!')
      }
    }
    return;
  }
}
