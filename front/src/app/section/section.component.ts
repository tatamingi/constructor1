import { Component, OnInit, Input } from '@angular/core';
import { Section, BlockPlace, Config } from '../classes';
import * as _ from 'lodash';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  public rows = [];
  public maxColumnCount: number;
  public section: Section;
  public inputEnable: boolean;

  @Input() public sequence: number;

  private getRowsCount = (section: Section): number => _.max(section.blocks.map((block: BlockPlace) => block.sequence)) + 1
  private getColumnsCount = (section: Section): number => _.max(section.blocks.map((block: BlockPlace) => block.position)) + 1

  constructor(private _configService: ConfigService) {
  }

  public hideInput = (): void => {
    this.inputEnable = false;
  }

  public toggleInput = (): void => {
    this.inputEnable = true;
  }

  public ngOnInit() {
    this._configService.getConfig().subscribe((config: Config) => {
      debugger
      if (!_.isNil(config) && !_.isNil(config.sections)) {
        this.section = _.find(config.sections, (sec: Section) => sec.sequence === this.sequence);
        this.rows =  _.range(this.getRowsCount(this.section))
                      .map((rowIndex: number) => _.filter(this.section.blocks, (block: BlockPlace) => block.sequence === rowIndex));
        this.maxColumnCount = this.getColumnsCount(this.section);
      }
    });
  }

}
