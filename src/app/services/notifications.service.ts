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
import { PixapiService, INotification } from './pixapi.service';
import { Storage } from '@ionic/storage';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private myApi: PixapiService, private myStorage: Storage,
              private global: GlobalService) { }

  /*function for getting a notifications list*/
  getNotifications(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.myStorage.get(this.global.session_id_key).then(
        (id) => {
          this.myApi.notificationsList('0', id).then(
            (data) => {
              this.saveReturnNotificationsTime(data).then(
                (notifications) => {
                  resolve(notifications as INotification[]);
                  },
                (err) => {
                  reject(err);
              });  
            },
            (err) => {
              reject(err);
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
      this.myStorage.get(this.global.session_id_key).then(
        (id) => {
          this.myStorage.get(this.global.last_time_notified_key).then(
            (lastTime) => {
              this.myApi.notificationsList(lastTime, id).then(
                (data) => {
                  this.saveReturnNotificationsTime(data).then(
                    (notifications) => {
                      resolve(notifications as INotification[]);
                    },
                    (err) => {
                      reject(err);
                  });                  
                },
                (err) => {
                  reject(err);
              });
            },
            (noLastTime) => {
              this.getNotifications().then(
                (ok) => {
                  resolve(ok);
                },
                (err) => {
                  reject(err);
              });
          });
        },
        (idErr) => {
          reject(idErr);
      });
    });
  }
  /*! function for saving notifications */
  private storeNotifications(list: INotification[]): Promise<string> {
    return new Promise((resolve) => {
      this.notificationsList().then(
        (oldList: INotification[]) => {
          let newList = list;
          if ( oldList) {
            if (oldList.length > 0) {
              newList = oldList.concat(list);
            }
          }
          newList = this.getUniqueListBy(newList, 'id');
          this.myStorage.set(this.global.notifications_list_key, newList);
          resolve('ok');
        },
        (err) => {
          this.myStorage.set(this.global.notifications_list_key, list);
          resolve('ok');
      });
    });
  }
  /*! function for getting local saved notifications */
  notificationsList(): Promise<INotification[]>  {
    return new Promise((resolve, reject) => {
      this.myStorage.get(this.global.notifications_list_key).then(
        (list: INotification[]) => {
          resolve(list);
        },
        (listErr) => {
          reject('No stored notifications');
      });
    });
  }
  /*! function for removing a notification */
  deleteNotification(notificationId: number): Promise<string> {
    return new Promise((resolve) => {
      this.notificationsList().then(
        (list) => {
        const newList = list.filter(obj => obj.id !== notificationId);
        this.myStorage.set(this.global.notifications_list_key, newList);
        resolve('ok');
      });
    });
  }
  /*! function for updating a notification */
  updateNotification(notification: INotification): Promise<string> {
    return new Promise((resolve) => {
      this.notificationsList().then(
        (list) => {
        const index = list.findIndex(obj => obj.id === notification.id);
        list[index] = notification;
        this.myStorage.set(this.global.notifications_list_key, list);
        resolve('ok');
      });
    });
  }
  /*! Notified function to set flag */
  /*
  notified(notified: boolean) {
    this.myStorage.set(this.STORAGE_KEY_NOTIFIED, notified);
  }
  */
  /*! Is user notified? */
  /*
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
  */
  private saveReturnNotificationsTime(data: any) {
    return new Promise((resolve, reject) => {
      if (data != null) {
        this.myStorage.set(this.global.last_time_notified_key, (data as any).time);
        if ((data as any).messages != null) {
          this.storeNotifications((data as any).messages).then (
            (ok) => {
              this.notificationsList().then(
                (notifications: INotification[]) => {
                  resolve(notifications);
                },
                (err) => {
                  resolve((data as any).messages as INotification[]);
                });
            },
            (err) => {
              resolve((data as any).messages as INotification[]);
          });
        } else {
          this.notificationsList().then(
            (notifications: INotification[]) => {
              resolve(notifications);
            },
            (err) => {
              reject(err);
          });
        }
      } else {
        reject('No data returned from API in notifications');
      }
    });
  }
  private getUniqueListBy(arr: INotification[], key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}
}
