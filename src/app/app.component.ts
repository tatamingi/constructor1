import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {ConfigService} from './config.service';
import { DragManagerService } from './drag-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public splitViewWidth = 50; // default split-view width in %
  public dropZoneWidth = 100;
  public displaySplitView = 'none';
  public dropZoneReversed = false;
  public splitViewEnable = false;

  public items = ['Документ', 'Поручение', 'Задание', 'item4', 'item5', 'item6', 'item7', 'item8',
    'item9', 'item10', 'item11', 'item12'];

  constructor(
    private _configService: ConfigService,
    private _dragManagerService: DragManagerService) {
    if (!_.isNil(this._configService.config) && !_.isNil(this._configService.config.splitView)) {
      this.splitViewEnable = true;
      this.displaySplitView = '';
      this.splitViewWidth = this._configService.config.splitView.width;
      this.dropZoneWidth = 100 - this.splitViewWidth;
      if (this._configService.config.splitView.position === 'left') {
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

  public ngOnInit() {
  }
}
