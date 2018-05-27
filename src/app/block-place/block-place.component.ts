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
  @Input() public position: number;

  @Input() public block: BlockPlace;
  @HostBinding('class.highlighted') public highlighted = true;
  @ViewChild('blockPlaceWrapper') private _blockPlaceWrapper;

  private blockPlaceBox

  constructor(
    private _transitionService: TransitionService,
    private _configService: ConfigService) {
  }

  public updateBlock = (width: number): void => {
    this.block.width = +width;
    // ToDo: возможно нужно вызвать метод обновления секции, но объект конфига обновился почему то сам без next()
  }

  public ngAfterViewInit() {
    this._transitionService.getEvent().subscribe((res) => {
      const event = res[0];
      const block = res[1];
      this.blockPlaceBox = this._blockPlaceWrapper.nativeElement.getBoundingClientRect();
      if (event.clientX > this.blockPlaceBox.x &&
          event.clientX < this.blockPlaceBox.x + this.blockPlaceBox.width &&
          event.clientY > this.blockPlaceBox.y &&
          event.clientY < this.blockPlaceBox.y + this.blockPlaceBox.height) {
        block.sequence = this.sequence;
        block.position = this.position;
        // this._configService.updateConfig();
      }
    });
  }

  public ngOnDestroy() {
  }

}
