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
import { PixapiService, IRegistration } from './pixapi.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})

/* class for managing session, simply login, logout and status */
export class SessionService {
  constructor(public myApi: PixapiService, public global: GlobalService) {
  }

  /*! function for login */
  login(pass) {
    const myPromise = new Promise((resolve, reject) => {
      this.myApi.login(pass).then(
      (session_id) => { // returned our user id
        resolve(session_id as string);
      },
      (errMsg) => {
        reject(errMsg);
      });
    });
    return myPromise;
  }
  /*! function for logout */
  logout() {
    const myPromise = new Promise((resolve, reject) => {
      this.global.get(this.global.session_id_key).then(
        (val) => {
          this.myApi.logout(val).then(
            (ok) => { // correct logout
              this.global.clear(); // HOT! clearing internal storage
              resolve(ok);
          },
            (err) => {
              reject(err);
          });
        },
        (err) => { // perhaps already logged out?
          reject(err);
        });
      });
    return myPromise;
  }
  /*! function for getting user data */
  userData() {
    const myPromise = new Promise((resolve, reject) => {
      this.global.get(this.global.session_id_key).then(
        (val) => {          
          this.myApi.userData(val).then(
            (userData) => {
              console.log(userData as string);
              resolve(userData);
            },
            (err) => {
              reject(err);
          });
        },
        (err) => {
          reject(err);
      });
    });
    return myPromise;
  }
}
