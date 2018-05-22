import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlockPlace } from '../classes';
import * as _ from 'lodash';

@Component({
  selector: 'app-section-row',
  templateUrl: './section-row.component.html',
  styleUrls: ['./section-row.component.scss']
})
export class SectionRowComponent implements OnInit {
  public row;

  @Input() public rowSequence: number;
  @Input() public sectionSequence: number;
  @Input() public maxColumnCount: number;

  @Input() public set blocks(data: BlockPlace[]) {
    if (!_.isEmpty(data)) {
      this.row = _.range(this.getBlocksMaxPosition(data) + 2);
      data.forEach((block: BlockPlace) => this.row[block.position] = block );
    }
  }

  private getBlocksMaxPosition = (blocks: BlockPlace[]): number =>
    _.max(blocks.map((block: BlockPlace) => block.position))

  constructor() {
  }

  ngOnInit() {
    if (_.isEmpty(this.row)) {
      this.row = _.range(this.maxColumnCount + 2);
    }
  }

}
