import {Component, AfterViewInit, Input, Output, OnDestroy, HostBinding, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import { TransitionService } from '../transition.service';
import { ConfigService } from '../config.service';
import { BlockPlace, Config } from '../classes';

@Component({
  selector: 'app-block-place',
  templateUrl: './block-place.component.html',
  styleUrls: ['./block-place.component.scss'],
})
export class BlockPlaceComponent implements AfterViewInit, OnDestroy {

  @Input() public sectionSequence: number;
  @Input() public sequence: number;

  @Input() public block: BlockPlace;
  @HostBinding('class.highlighted') public highlighted = true;
  @ViewChild('blockPlace') private _blockPlace;

  constructor(
    private _transitionService: TransitionService,
    private _configService: ConfigService) {
  }

  public updateBlock = (width: number): void => {
    this.block.width = +width;
    // ToDo: возможно нужно вызвать метод обновления секции, но объект конфига обновился почему то сам без next()
  }

  public ngAfterViewInit() {
    // this._blockPlace.nativeElement.onmouseover = () => {
    //   this.highlighted = true;
    // };
    // this._blockPlace.nativeElement.onmouseleave = () => {
    //   this.highlighted = false;
    // };
  }

  public ngOnDestroy() {
    // this._blockPlace.nativeElement.onmouseover = null;
    // this._blockPlace.nativeElement.onmouseleave = null;
  }

}
