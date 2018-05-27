import { Component, OnInit, Input } from '@angular/core';
import {Config, SplitView} from '../classes';
import * as _ from 'lodash';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-split-view-zone',
  templateUrl: './split-view-zone.component.html',
  styleUrls: ['./split-view-zone.component.scss']
})
export class SplitViewZoneComponent implements OnInit {
  public blockName: string;
  public showBlock: boolean;
  public blockWidth: number;
  public addBlockLabel = 'добавить блок';

  constructor(private _configService: ConfigService) { }

  ngOnInit() {
    this._configService.getConfig().subscribe((config: Config) => {
      if (!_.isNil(config) && !_.isNil(config.splitView)) {
        this.showBlock = true;
        this.blockName = config.splitView.name;
        this.blockWidth = config.splitView.width;
      }
    });
  }

}
