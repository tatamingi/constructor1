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

  public addSplitViewClick = (event: MouseEvent, side: string): void => {
    event.preventDefault();
    event.stopPropagation();
    this.showAddSplitViewButton = false;
    this.addSplitView.emit(side);
    this.sectionsWidth = 100;
    this._configService.addBlock(event, null, null, side);
  }

  public addSectionClick = (): void => {
    this._configService.addSection();
  }

  public ngOnInit() {
    this._configService.getConfig().subscribe((config: Config) => {
      if (!_.isEmpty(config) && !_.isNil(config.sections)) {
        this.sections = config.sections;
      }
    });
  }

}
