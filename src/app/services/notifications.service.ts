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

import { Injectable } from '@angular/core';
import { PixapiService } from './pixapi.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
STORAGE_KEY_LISTS = 'notifications_list';
STORAGE_KEY_TIME = 'notifications_last_time';
STORAGE_KEY_NOTIFIED = 'notifications_notified';

  constructor(private myApi: PixapiService, private myStorage: Storage) { }

  /*function for getting a notifications list*/
  getNotifications(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.myStorage.get(this.myApi.SESSION_ID).then(
        (id) => {
          this.myApi.notificationsList('0', id).then(
            (notList) => {
              resolve(notList);
            },
            (listErr) => {
              reject(listErr);
          });
        },
        (idErr) => {
          reject(idErr);
      });
    });
  }
  /*function for getting last notifications list*/
  getLastNotifications(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.myStorage.get(this.myApi.SESSION_ID).then(
        (id) => {
          this.myStorage.get(this.STORAGE_KEY_TIME).then (
            (time: number) => {
              this.myApi.notificationsList(time, id).then(
                (data: any) => {
                  // saving notifications
                  this.saveNotifications(data.notifications).then(
                    (ok) => {
                      // saving time
                      this.myStorage.set(this.STORAGE_KEY_TIME, data.time);
                      console.log('resolvemos con las notificaciones:', data.notifications);
                      resolve(data.notifications);
                  });
                },
                (listErr) => {
                  reject(listErr);
              });
            },
            (err) => {
              this.myApi.notificationsList(0, id).then(
                (notList) => {
                  resolve(notList);
                },
                (listErr) => {
                  reject(listErr);
              });
            });
          },
        (idErr) => {
          reject(idErr);
      });
    });
  }
  /*! function for saving notifications */
  private saveNotifications(list: string[]): Promise<string> {
    return new Promise((resolve) => {
      this.notificationsList().then(
        (oldList: string[]) => {
          let newList = list;
          if ( oldList) {
            if (oldList.length > 0) {
              newList = oldList.concat(list);
            }
          }
          this.myStorage.set(this.STORAGE_KEY_LISTS, newList);
          resolve('ok');
        },
        (err) => {
          this.myStorage.set(this.STORAGE_KEY_LISTS, list);
          resolve('ok');
      });
    });
  }
  /*! function for override notifications */
  private overrideNotifications(list) {
    this.myStorage.set(this.STORAGE_KEY_LISTS, list);
  }
  /*! function for getting notifications */
  notificationsList(): Promise<string[]>  {
    return new Promise((resolve, reject) => {
      this.myStorage.get(this.STORAGE_KEY_LISTS).then(
        (list: string[]) => {
          resolve(list);
        },
        (listErr) => {
          reject(null);
      });
    });
  }
  /*! function for removing a notification */
  deleteNotification(notification: string): Promise<string> {
    return new Promise((resolve) => {
      this.notificationsList().then(
        (list) => {
        const newList = list.filter(obj => obj !== notification);
        this.overrideNotifications(newList);
        resolve('ok');
      });
    });
  }
  /*! Notified function to set flag */
  notified(notified: boolean) {
    this.myStorage.set(this.STORAGE_KEY_NOTIFIED, notified);
  }
  /*! Is user notified? */
  isNotified(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.myStorage.get(this.STORAGE_KEY_NOTIFIED).then(
        (notified: boolean) => {
          resolve(notified);
        },
        (listErr) => {
          reject(false);
      });
    });
  }
}
