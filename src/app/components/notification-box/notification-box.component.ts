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

import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { INotification } from '../../services/pixapi.service';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss'],
})
export class NotificationBoxComponent implements OnInit {
  @Input() myNotification: INotification;
  hided: boolean;
  expanded: boolean;
  description: SafeHtml;

  constructor( public sanitizer: DomSanitizer) { 
    this.hided = false;
    this.expanded = false;
  }

  ngOnInit() {}

  ngAfterContentInit() {
    this.description = this.sanitizer.bypassSecurityTrustHtml(this.myNotification.text);
  }

  expand() {
    if(this.hided !== true) {
      if(this.expanded === true) {
        this.expanded = false;
      } else {
        this.expanded = true;
      }
    }
  }

  hide(){
    if(this.hided === true) {
      this.hided = false;
    } else {
      this.hided = true;
    }
  }

}
