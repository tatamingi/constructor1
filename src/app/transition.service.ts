import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TransitionService {
  private _overlayPosition = new BehaviorSubject<number[]>([]);
  private _blockName = new Subject<string>();
  private _event = new Subject<string>();

  public setOverlayPosition = (position: number[]): void => {
    this._overlayPosition.next(position);
  }

  public getOverlayPosition = (): Observable<number[]> => this._overlayPosition.asObservable();

  public setBlockName = (name: string): void => {
    this._blockName.next(name);
  }

  public getBlockName = (): Subject<string> => this._blockName;

  public setEvent = (event): void => {
    this._event.next(event);
  }

  public getEvent = (): Subject<any> => this._event;

}

