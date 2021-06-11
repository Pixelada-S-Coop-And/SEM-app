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
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-autonomia-form',
  templateUrl: './autonomia-form.page.html',
  styleUrls: ['./autonomia-form.page.scss'],
})
export class AutonomiaFormPage implements OnInit {
  message: string;
  title: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  send() {
    /*TODO: check if form is not blank */
    this.modalCtrl.dismiss({
      sent: true,
      err: false
    });
  }

  close() {
    this.modalCtrl.dismiss({
      sent: false,
      err: false
    });
  }

}
