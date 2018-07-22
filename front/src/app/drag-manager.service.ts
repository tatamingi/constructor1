import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BlockPlace } from './classes';
import {TransitionService} from './transition.service';

@Injectable()
export class DragManagerService {
  private _dragObject;
  private _defaultBlockWidth = 130;
  private _defaultBlockHeight = 100;

  constructor(
    private _transitionService: TransitionService) {
    this._dragObject = {};
  }

  private startDrag = (): void => {
    const avatar = this._dragObject.avatar;
    document.body.appendChild(avatar);
    avatar.style.zIndex = 9999;
    avatar.style.position = 'absolute';
  }

  getCoords = (elem) => {
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  private createAvatar = () => {
    let avatar;

    if (this._dragObject.elem.className.indexOf('draggable-from-menu') > -1) {
      avatar = this._dragObject.elem._.cloneNode(true);
    } else {
      avatar = this._dragObject.elem;
    }

    if (this._dragObject.fromSplitView) {
      avatar.style.width = this._defaultBlockWidth + 'px';
      avatar.style.height = this._defaultBlockHeight + 'px';
    } else {
      avatar.style.width = this._dragObject.blockWidth; // ширина блока в px во время перенос
      avatar.style.height = this._defaultBlockHeight + 'px';
    }

    const old = {
      parent: avatar.parentNode,
      nextSibling: avatar.nextSibling,
      position: avatar.position || '',
      left: avatar.left || '',
      top: avatar.top || '',
      zIndex: avatar.zIndex || ''
    };

    avatar.rollBack = function() {
      old.parent.insertBefore(avatar, old.nextSibling);
      avatar.style.position = old.position;
      avatar.style.left = old.left;
      avatar.style.top = old.top;
      avatar.style.zIndex = old.zIndex;
    };

    this._dragObject.avatar = avatar;
  }

  private findDroppable = (event) => {

    this._dragObject.avatar.style.display = 'none';
    const elem = document.elementFromPoint(event.clientX, event.clientY);
    this._dragObject.avatar.style.display = '';
    const droppable = elem.closest('.droppable');


    if (!_.isNil(droppable) && _.isEmpty(droppable.children[0].children)) {
      return droppable;
    }
  }

  private finishDrag = (event): void => {
    const dropElem = this.findDroppable(event) as HTMLElement;

    if (!_.isNil(dropElem)) {
      dropElem.children[0].appendChild(this._dragObject.avatar);
      dropElem.style.width = this._dragObject.blockPlaceWidth;
    } else {
      this._dragObject.avatar.rollBack();
    }
  }

  private onMouseDown = (event, elem: HTMLElement): void => {
    if (event.which !== 1) {
      return;
    }

    const blockPlace = elem.parentElement.parentElement.parentElement;

    this._dragObject.elem = elem.parentNode;
    this._dragObject.downX = event.pageX;
    this._dragObject.downY = event.pageY;
    this._dragObject.blockWidth = elem.clientWidth + 'px';
    if (!_.isEmpty(blockPlace.style.width)) {
      this._dragObject.blockPlaceWidth = blockPlace.style.width;
    } else {
      this._dragObject.blockPlaceWidth = '40%';
    }
    if (!_.isNil(event.target.closest('.split-view-zone'))) {
      this._dragObject.fromSplitView = true;
    }
  }

  public onMouseMove = (event): void => {
    if (_.isNil(this._dragObject)) {
      return;
    }

    if (_.isNil(this._dragObject.avatar)) {
      const moveX = event.pageX - this._dragObject.downX;
      const moveY = event.pageY - this._dragObject.downY;
      if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
        return;
      }

      document.body.className = 'select-unable';

      this.createAvatar();

      const coords = this.getCoords(this._dragObject.avatar);

      if (this._dragObject.fromSplitView) {
        this._dragObject.shiftX = this._defaultBlockWidth / 2;
        this._dragObject.shiftY = this._defaultBlockHeight / 2;
      } else {
        this._dragObject.shiftX = this._dragObject.downX - coords.left;
        this._dragObject.shiftY = this._dragObject.downY - coords.top;
      }

      this.startDrag();
    }
      this._dragObject.avatar.style.left = event.pageX - this._dragObject.shiftX + 'px';
      this._dragObject.avatar.style.top = event.pageY - this._dragObject.shiftY + 'px';
  }

  private onMouseUp = (event, blockObj): void => {

    if (_.isEmpty(this._dragObject)) {
      return;
    }

    if (!_.isNil(this._dragObject.avatar)) {
      this.finishDrag(event);
    }
    document.onmousemove = null;
    document.onmouseup = null;
    this._dragObject.elem.style = '';
    document.body.className = '';
    this._dragObject = {};

    this._transitionService.setEvent([event, blockObj]);
  }

  public dragManager = (blockObj: BlockPlace, blockElement: HTMLElement): void => {
    this.onMouseDown(event, blockElement);
    document.onmousemove = (event: MouseEvent) => {
      this.onMouseMove(event);
    };
    document.onmouseup = (event: MouseEvent) => {
      this.onMouseUp(event, blockObj);
    };
  }
}
