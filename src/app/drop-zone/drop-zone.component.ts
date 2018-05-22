import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Section, Config } from '../classes';
import * as _ from 'lodash';
import {ConfigService} from '../config.service';
import {TransitionService} from '../transition.service';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss']
})
export class DropZoneComponent implements OnInit {
  @Output() public addSplitView = new EventEmitter<string>();
  // @Output() public onAddSectonClick = new EventEmitter(<>)
  @Input() public showAddSplitViewButton = true;

  public addSplitViewButtonWidth = 5;
  public sectionsWidth = 85;
  public addSectionButtonLabel = 'добавить секцию';
  public sections: Section[] = [];

  constructor(
    private _configService: ConfigService,
    private _transitionService: TransitionService) {
  }

  public addSplitViewClick = (side: string): void => {
    this.showAddSplitViewButton = false;
    this.addSplitView.emit(side);
    this.sectionsWidth = 100;
  }

  public addSectionClick = (event: MouseEvent): void => {
    this._transitionService.setOverlayPosition([event.clientY, event.clientX]);
  }

  public ngOnInit() {
    this._configService.getConfig().subscribe((config: Config) => {
      if (!_.isNil(config) && !_.isNil(config.sections)) {
        this.sections = config.sections;
      }
    });
  }

}
