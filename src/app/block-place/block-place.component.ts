import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { TransitionService } from '../transition.service';
import { ConfigService } from '../config.service';
import { BlockPlace, Config } from '../classes';

@Component({
  selector: 'app-block-place',
  templateUrl: './block-place.component.html',
  styleUrls: ['./block-place.component.scss']
})
export class BlockPlaceComponent implements OnInit {
  public block;
  private _newBlock: BlockPlace;

  @Output() public newBlockPosition = new EventEmitter<number>();

  @Input() public sectionSequence: number;
  @Input() public sequence: number;

  @Input() public set blockPlace(data: any) {
    this.block = data;
    if (_.isEmpty(data)) {
      this.showAddButton = true;
    }
  }

  public showAddButton: boolean;

  constructor(
    private _transitionService: TransitionService,
    private _configService: ConfigService) {
  }

  public onAddButtonClick = (event: MouseEvent, position: number) => {
    this._transitionService.setOverlayPosition([event.clientY, event.clientX]);

    const sub = this._transitionService.getBlockName().subscribe((name: string) => {
      const newBlock = new BlockPlace(name, this.sequence, position, 10); // ToDO: width?
      this._configService.updateSections(this.sectionSequence, newBlock);
      sub.unsubscribe();
    });
  }

  ngOnInit() {
  }

}
