import { Component } from '@angular/core';
import { Config } from './classes';
import * as _ from 'lodash';
import {ConfigService} from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public splitViewWidth = 50; // default split-view width in %
  public dropZoneWidth = 100;
  public displaySplitView = 'none';
  public dropZoneReversed = false;
  public splitViewEnable = false;

  public items = ['Документ', 'Поручение', 'Задание', 'item4', 'item5', 'item6', 'item7', 'item8',
    'item9', 'item10', 'item11', 'item12'];

  constructor(private configService: ConfigService) {
    if (!_.isNil(this.configService.config) && !_.isNil(this.configService.config.splitView)) {
      this.splitViewEnable = true;
      this.displaySplitView = '';
      this.splitViewWidth = this.configService.config.splitView.width;
      this.dropZoneWidth = 100 - this.splitViewWidth;
      if (this.configService.config.splitView.position === 'left') {
        this.dropZoneReversed = true;
      }
    }

  }

  public addSplitView = (side: string) => {
    this.splitViewEnable = true;
    this.displaySplitView = '';
    this.dropZoneWidth = 100 - this.splitViewWidth;
    if (side === 'left') {
      this.dropZoneReversed = true;
    }
  }
}
