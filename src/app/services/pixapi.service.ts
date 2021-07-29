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
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

declare var require: any;
// const TOKEN_KEY = '1235465a1c0058719712b867b67fa1e9'; // 'auth-token';
const SECRETS = require('../../../secrets.json');

export interface IBasicAPIMsg {
  status: string;
  msg: string;
}

export interface IRegistration {
  affiliate_id: number;
  creation_date: string;
  session_id: string;
}

export interface IUser {
  active: number;
  address: string;
  affiliation_date: string;
  birthdate: string;
  cp: string;
  dni: string;
  email: string;
  id: number;
  job: string;
  location: string;
  name: string;
  phone: number;​​​
  province: string; ​​​
  province_id: number;
  province_name: string;
  renovation_date: string;
  section_id: number;
  section_name: string;
  surnames: string;
}

export interface INotification {
  ID: number;
  creation_date: string;
  title: string;
  text: string;
  section: string[];
  link: string;
  docs: {
    title: string;
    link: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class PixapiService {
  // JSON AND STORE tags
  TOKEN = SECRETS.KEY;
  //
  myData: any = [];
  BASE_URL = SECRETS.BASE_URL;
  API_URL = this.BASE_URL + 'api/';

  constructor(public http: HttpClient) {}
  //////////////////////////////////////////
  /* REGISTRY */
  //////////////////////////////////////////
  /*! login function, it takes a pass and token, and try to do
      a login, returns a session id to remember */
  login(password) {
    const myPromise = new Promise((resolve, reject) => {
      const url = this.API_URL + 'affiliate/login';
      const jsonData = JSON.stringify({
        pass: password,
        token: this.TOKEN
      });
      console.log('DEBUG api login, sending:', jsonData);
      this.http.post(url, jsonData).subscribe(
        (data) => {
          console.log('DEBUG api login, receiving:', data);
          this.myData = data;
          if (this.myData.result === 'error') {
            reject(this.myData.msg);
          } else {
            resolve(this.myData.data.session.session_id as string);
          }
        },
        error => {
          console.log('DEBUG api login, ERROR receiving:', error);
          reject(error.statusText);
        });
    });
    return myPromise;
  }

  /*!function for logging out api session */
  logout(sessionId) {
    const myPromise = new Promise((resolve, reject) => {
      const url = this.API_URL + 'affiliate/logout';
      const jsonData = JSON.stringify({
              session_id: sessionId,
              token: this.TOKEN
      });
      console.log('DEBUG api logout, sending:', jsonData);
      this.http.post(url, jsonData).subscribe(
        data => {
          this.myData = data;
          console.log('DEBUG api logout, receiving:', data);
          if (this.myData.result === 'error') {
            reject(this.myData.msg);
          } else {
            resolve(this.myData.data);
          }
        },
        error => {
          console.log('DEBUG api logout, ERROR receiving:', error);
          reject(error.statusText);
        });
      });
    return myPromise;
   }

  /*! take user data: */
  userData(sessionId) {
    const myPromise = new Promise((resolve, reject) => {
      const url = this.API_URL + 'affiliate/data';
      const jsonData = JSON.stringify({
            session_id: sessionId,
            token: this.TOKEN
      });
      console.log('DEBUG api userData, sending:', jsonData);
      this.http.post(url, jsonData).subscribe(
        data => {
          this.myData = data;
          console.log('DEBUG api userData, receiving:', data);
          if (this.myData.result === 'error') {
            reject(this.myData.msg);
          } else {
            resolve(this.myData.data);
          }
        },
        error => {
          console.log('DEBUG api userData, ERROR receiving:', error);
          reject(error.statusText);
        });
    });
    return myPromise;
  }
  /*! edit user data: */
  editUser(newName, newEmail, newPass, sessionId) {
    const myPromise = new Promise((resolve, reject) => {
    const url = this.API_URL + 'user/edit';
    const jsonData = JSON.stringify({
      email: newEmail,
      pass: newPass,
      name: newName,
      session_id: sessionId,
      token: this.TOKEN
    });
    console.log('DEBUG api editUser, sending:', jsonData);
    this.http.post(url, jsonData).subscribe(
      data => {
        this.myData = data;
        console.log('DEBUG api editUser, receiving:', data);
        if (this.myData.result === 'error') {
          reject(this.myData.msg);
        } else {
          resolve(this.myData.data);
        }
      },
      error => {
        console.log('DEBUG api editUser, ERROR receiving:', error);
        reject(error.statusText);
      });
    });
    return myPromise;
  }
  //////////////////////////////////////////
  /* USER DATA */
  //////////////////////////////////////////
  /*! take user data: */
  formSend(sessionId, title, content) {
    const myPromise = new Promise((resolve, reject) => {
      const url = this.API_URL + 'affiliate/form_send';
      const jsonData = JSON.stringify({
            session_id: sessionId,
            token: this.TOKEN,
            subject: title,
            content: content
      });
      console.log('DEBUG api sendForm, sending:', jsonData);
      this.http.post(url, jsonData).subscribe(
        data => {
          this.myData = data;
          console.log('DEBUG api sendForm, receiving:', data);
          if (this.myData.result === 'error') {
            reject(this.myData.msg);
          } else {
            resolve(this.myData);
          }
        },
        error => {
          console.log('DEBUG api sendForm, ERROR receiving:', error);
          reject(error.statusText);
        });
    });
    return myPromise;
  }
  //////////////////////////////////////////
  /* NOTIFICATIONS */
  //////////////////////////////////////////
  /*! get notifications list: */
  notificationsList(lastTime, sessionId): Promise<string[]> {
    return new Promise((resolve, reject) => {
    const url = this.API_URL + 'user/notifications.php';
    const jsonData = JSON.stringify({
      last_time: lastTime,
      session_id: sessionId,
      token: this.TOKEN
    });
    console.log('DEBUG api notificationsList, sending:', jsonData);
    this.http.post<any>(url, jsonData).subscribe(
      myData => {
        console.log('DEBUG api notificationsList, receiving:', myData);
        if ( myData.result === 'error') {
          reject(myData);
        } else {
          resolve(myData.data);
        }
      },
        error => {
          console.log('DEBUG api notificationsList, ERROR receiving:', error);
          reject(error.statusText);
      });
    });
  }
  //////////////////////////////////////////
  /* SENDING EMAIL */
  //////////////////////////////////////////
  ///////////////////////////////////////////
  /*! MISCELLANEOUS FUNCTIONS*/
  ///////////////////////////////////////////
  /*! datetime to MySQL datetime function */
  dateForMysql(date: Date): string {
    let retDate, year, month, day: string;
    year = String(date.getFullYear());
    month = String(date.getMonth() + 1);
    if (month.length === 1) {
        month = '0' + month;
    }
    day = String(date.getDate());
    if (day.length === 1) {
        day = '0' + day;
    }
    retDate = year + '-' + month + '-' + day;
    return retDate;
  }
}
