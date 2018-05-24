import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlockPlace } from '../classes';
import * as _ from 'lodash';
import {ConfigService} from '../config.service';
import {TransitionService} from '../transition.service';

@Component({
  selector: 'app-section-row',
  templateUrl: './section-row.component.html',
  styleUrls: ['./section-row.component.scss']
})
export class SectionRowComponent implements OnInit {
  @Input() public rowSequence: number;
  @Input() public sectionSequence: number;
  @Input() public maxColumnCount: number;
  @Input() public blocks: BlockPlace[] = [];

  public defaultBlockWidth = 40;

  constructor(
    private _transitionService: TransitionService,
    private _configService: ConfigService) {
  }

  public onAddButtonClick = (event: MouseEvent) => {
   this._configService.addBlock(event, this.sectionSequence, this.rowSequence);
  }

  public onMouseUp = (position: number): void => {
    debugger
    const location = {
      sectionSequence: this.sectionSequence,
      sequence: this.rowSequence,
      position: position
    }
    this._transitionService.setBlockLocation(location);
  }

  public ngOnInit() {
  }

}
