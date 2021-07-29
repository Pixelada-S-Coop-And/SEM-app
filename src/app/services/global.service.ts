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
import { Storage } from '@ionic/storage';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // storage interface
  private _storage: Storage | null = null;
  // storage keys
  session_id_key: string = 'KEY_SESSION_ID';

  constructor( private storage: Storage) { 
    this.init();
  }

  async init() {
    if(!this._storage) {
      const storage = await this.storage.create();
      this._storage = storage;
      await this._storage.defineDriver(cordovaSQLiteDriver);
    }
  }
  // Create and expose methods that users of this service can
  // call
  public async set(key: string, value: any) {
    if(!this._storage) {
      await this.init();
    }
    this._storage?.set(key, value);
  }
  public async get(key: string) : Promise<any> {
    if(!this._storage) {
      await this.init();
    }
    const myPromise = new Promise((resolve, reject) => {
      this._storage.get(key).then(
        (val) => {
          resolve(val);
        },
        (err) => {
          reject(err);
      });
    });
    return myPromise;
  }
  public clear() {
    this._storage.clear();
  }
  public async keys() : Promise<any>  {
    if (!this._storage) {
      await this.init();
    }
    return await this._storage?.keys();
  }
}
