import { Injectable } from '@angular/core';
import {BlockPlace, Config, Section, SplitView} from './classes';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TransitionService} from './transition.service';

@Injectable()
export class ConfigService {
  public config: Config;
  private configSubj = new BehaviorSubject<Config>(this.config);
  private _defaultBlockWidth = 40;
  private _defaultSectionName = 'имя секции';
  private defaultSplitViewWidth = 50;

  constructor(private _transitionService: TransitionService) {
    // this.config = {};
    this.config = {
      splitView:
        {
          name: 'files',
          width: 40,
          position: 'left'
        },
      sections: [
        {
          name: 'Документ',
          sequence: 0,
          blocks: [
            {
              name: 'document',
              sequence: 0,
              position: 0,
              width: 20
            },
            // {
            //   name: 'document',
            //   sequence: 0,
            //   position: 1,
            //   width: 40
            // },
            {
              name: 'document',
              sequence: 1,
              position: 0,
              width: 50
            }
          ]
        },
        {
          name: 'Поручение',
          sequence: 1,
          blocks: [
            {
              name: 'taskCard',
              sequence: 0,
              position: 0,
              width: 100
            }
          ]
        }]
    };

    this.configSubj.next(this.config);
  }

  public updateConfig = () => {
    debugger
    this.configSubj.next(this.config);
  }

  public addBlock = (event: MouseEvent, sectionSequence?: number, rowSequence?: number, side?: string) => {
    this._transitionService.setOverlayPosition([event.clientY, event.clientX]);
debugger
    const sub = this._transitionService.getBlockName().subscribe((name: string) => {
      if (!_.isNil(sectionSequence) && !_.isNil(rowSequence)) {
        const section = this.config.sections[sectionSequence];
        const position = section.blocks.length;
        const newBlock = new BlockPlace(name, rowSequence, position, this._defaultBlockWidth);
        section.blocks.push(newBlock);
      }
      if (!_.isNil(side)) {
        const splitView = new SplitView(name, this.defaultSplitViewWidth, side);
        this.config.splitView = splitView;
      }
      this.configSubj.next(this.config);
      sub.unsubscribe();
    });
  }

  public addSection = (): void => {
    if (_.isNil(this.config.sections)) {
      this.config.sections = [];
      this.config.sections.push(new Section(this._defaultSectionName, 0, []));
      this.configSubj.next(this.config);
      return;
    }
    this.config.sections.push(new Section(this._defaultSectionName, this.config.sections.length, []));
    this.configSubj.next(this.config);
  }

  public updateSections = (sectionSequence: number, block: BlockPlace): void => {
    if (!_.isNil(this.config.sections)) {
      const sectionUpd = _.find(this.config.sections, (section: Section) =>
        section.sequence === sectionSequence).blocks

      sectionUpd.forEach((item: BlockPlace) => {
        if (block.sequence === item.sequence && block.position === block.position) {
          item = block;
          return;
        }
      });

      sectionUpd.push(block);
      this.configSubj.next(this.config);
    }
  }

  public getConfig = (): Observable<Config> => this.configSubj.asObservable();
}
