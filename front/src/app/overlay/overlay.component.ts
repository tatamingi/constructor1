import { Component, OnInit, Input } from '@angular/core';
import {TransitionService} from '../transition.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  @Input() items: string[];

  public top: number;
  public left: number;
  public show = false;

  constructor(private _transitionService: TransitionService) { }

  public selectItem = (name: string) => {
    this.show = false;
    this._transitionService.setBlockName(name);
  }

  ngOnInit() {
    this._transitionService.getOverlayPosition().subscribe((position: number[]) => {
      if (!_.isEmpty(position)) {
        this.top = position[0];
        this.left = position[1];
        this.show = true;
      }
    });
  }

}
