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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { INotification } from '../../services/pixapi.service';
import { NotificationsService } from '../../services/notifications.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss'],
})
export class NotificationBoxComponent implements OnInit {
  @Input() myNotification: INotification;
  @Output() removeNotification = new EventEmitter<INotification>();
  expanded: boolean;
  description: SafeHtml;
  url_invite_text: string = '<p> Puedes ver la noticia en el blog, mediante tu navegador web, haciendo click aquí </p>';

  constructor( public sanitizer: DomSanitizer, public notificationsSvc: NotificationsService,
                public iab: InAppBrowser) { 
    this.expanded = false;
  }

  ngOnInit() {}

  ngAfterContentInit() {
    this.description = this.sanitizer.bypassSecurityTrustHtml(this.myNotification.content);
  }

  expand() {
    if(this.myNotification.active) {
      if(this.expanded === true) {
        this.expanded = false;
      } else {
        this.expanded = true;
      }
    }
  }

  hide(){
    if(this.myNotification.active !== 0) {
      this.myNotification.active = 0;
      this.notificationsSvc.updateNotification(this.myNotification);
    } else {
      this.myNotification.active = 1;
      this.notificationsSvc.updateNotification(this.myNotification);
    }
  }

  remove() {
    this.removeNotification.emit(this.myNotification);
  }

  openUrl(url) {
    console.log('trying to open: ' + url);
    const ref = this.iab.create(url, '_system', 'location=yes');
    ref.close();
  }

}
