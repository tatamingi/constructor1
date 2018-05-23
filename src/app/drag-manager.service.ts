import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class DragManagerService {
  private _dragObject;

  constructor() {
    this._dragObject = {};
  }

  private startDrag = (event) => {
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

    return avatar;
  }

  private findDroppable = (event): Element => {
    debugger
    this._dragObject.avatar.style.display = 'none';
    const elem = document.elementFromPoint(event.clientX, event.clientY);
    this._dragObject.avatar.style.display = '';
    const droppable = elem.closest('.droppable');
    if (_.isEmpty(droppable.children)) {
      return droppable;
    }
  }

  private finishDrag = (event): void => {
    const dropElem = this.findDroppable(event);

    if (!_.isNil(dropElem)) {
      dropElem.appendChild(this._dragObject.avatar);
      this._dragObject.avatar.style.left = this.getCoords(dropElem).left + 'px';
      this._dragObject.avatar.style.top = this.getCoords(dropElem).top + 'px';
    } else {
      this._dragObject.avatar.rollBack();
    }
  }

  private onMouseDown = (event): void => {
    if (event.which !== 1) {
      return;
    }
    const elem = event.target.closest('.draggable') ||
                 event.target.closest('.draggable-from-menu');
    if (_.isNil(elem)) {
      return;
    }
    this._dragObject.elem = elem.parentNode;
    this._dragObject.downX = event.pageX;
    this._dragObject.downY = event.pageY;
  }

  public onMouseMove = (event): void => {
    if (_.isNil(this._dragObject.elem)) {
      return;
    }
    if (_.isNil(this._dragObject.avatar)) {
      const moveX = event.pageX - this._dragObject.downX;
      const moveY = event.pageY - this._dragObject.downY;
      if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
        return;
      }

      this._dragObject.avatar = this.createAvatar();

      const coords = this.getCoords(this._dragObject.avatar);
      this._dragObject.shiftX = this._dragObject.downX - coords.left;
      this._dragObject.shiftY = this._dragObject.downY - coords.top;

      this.startDrag(event);
    }

    this._dragObject.avatar.style.left = event.pageX - this._dragObject.shiftX + 'px';
    this._dragObject.avatar.style.top = event.pageY - this._dragObject.shiftY + 'px';
  }

  private onMouseUp = (event): void => {
    if (!_.isNil(this._dragObject.avatar)) {
      this.finishDrag(event);
    }
    this._dragObject = {};
  }

  public dragManager = (): void => {
    document.onmousedown = (event: MouseEvent) => {
      this.onMouseDown(event);
    };
    document.onmousemove = (event: MouseEvent) => {
      this.onMouseMove(event);
    };
    document.onmouseup = (event: MouseEvent) => {
      this.onMouseUp(event);
    };
  }
}
