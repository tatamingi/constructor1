import { Injectable } from '@angular/core';
import {BlockPlace, Config, Section} from './classes';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ConfigService {
  public config: Config;
  private configSubj = new BehaviorSubject<Config>(this.config);

  constructor() {
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
            {
              name: 'document',
              sequence: 0,
              position: 1,
              width: 40
            },
            {
              name: 'document',
              sequence: 1,
              position: 0,
              width: 50
            },
            {
              name: 'document',
              sequence: 1,
              position: 2,
              width: 100
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

  public addSection = (name: string) => {
   debugger
    // const section = new Section(name, )
    // this.config.
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
