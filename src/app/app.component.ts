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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private background: BackgroundMode,
    private localNotifications: LocalNotifications, private router: Router,
    private ntfsSvc: NotificationsService) {
    this.platform.ready().then(() => {
      this.background.setDefaults({ title: 'Aplicación SEM', text: 'Notificaciones del sindicato trabajando en segundo plano', resume: true, hidden: true, silent: false});
      this.background.on('enable').subscribe(() => {
        setInterval (() => {
          this.checkNotifications();
        }, 10000);
        console.log('activated');
      });
      this.localNotifications.on('click').subscribe(
        res => {
          this.router.navigateByUrl('/notificaciones');
      });
      this.background.on('activate').subscribe(() => {
        this.background.disableWebViewOptimizations();
      });
      this.background.overrideBackButton();
      this.background.disableBatteryOptimizations();
      this.background.excludeFromTaskList();
      this.background.enable();
      
    });
  }

  checkNotifications() {
    this.ntfsSvc.getLastNotifications().then(
      (data: any) => {
        console.log('number of notifications got:', data.length);
        if (data.length > 0) {
          let notified: boolean;
          this.ntfsSvc.isNotified().then(
            (isIt: boolean) => {
              console.log('Have we notified?', isIt);
              notified = isIt;
              if (!notified) {
                this.notify();
              }
            },
            (err) => { // it doesn't exists, create!
              console.log('ERROR getting notified');
              this.notify();
          });
        }
      },
      (err) => {
        console.log('not getting notifications:', err);
    });
  }
  /*! function to notify */
  notify() {
    // we have to notificate the user
    console.log('sending a local notification!');
    this.localNotifications.schedule({
      id: 1,
      title: 'Notificación SEM',
      text: '¡Tienes notificaciones nuevas en semApp!',
      led: 'FF0000',
      icon: 'res://ic_launcher'
      // smallIcon: 'res://icon_notification' // TODO: not working!
    });
    this.ntfsSvc.notified(true);
  }
}
