import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BlockPlace } from './classes';

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

    avatar.style.width = this._dragObject.blockWidth; // ширина блока в px во время переноса

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
    if (!_.isNil(droppable) && _.isEmpty(droppable.children)) {
      return droppable;
    }
  }

  private finishDrag = (event): void => {
    const dropElem = this.findDroppable(event) as HTMLElement;

    if (!_.isNil(dropElem)) {
      dropElem.appendChild(this._dragObject.avatar);

debugger
      dropElem.style.width = this._dragObject.blockPlaceWidth;

      this._dragObject.avatar.style.left = this.getCoords(dropElem).left + 'px';
      this._dragObject.avatar.style.top = this.getCoords(dropElem).top + 'px';
    } else {
      this._dragObject.avatar.rollBack();
    }
  }

  private highlightDroppable = (event) => {
    const droppable = this.findDroppable(event);
    console.log(droppable);
    if (!_.isNil(droppable)) {
      droppable.className = 'droppable highlighted';

      droppable.addEventListener('mouseleave', (ev) => {
        droppable.className = 'droppable';
      });
    }
  }

  private onMouseDown = (event, elem: HTMLElement): void => {
    if (event.which !== 1) {
      return;
    }

    const blockPlace = elem.parentNode.parentNode as HTMLElement;

    this._dragObject.elem = elem.parentNode;
    this._dragObject.downX = event.pageX;
    this._dragObject.downY = event.pageY;
    this._dragObject.blockWidth = elem.clientWidth + 'px';
    this._dragObject.blockPlaceWidth = blockPlace.style.width;
  }

  public onMouseMove = (event): void => {
    debugger
    if (_.isNil(this._dragObject.elem)) {
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
      this._dragObject.shiftX = this._dragObject.downX - coords.left;
      this._dragObject.shiftY = this._dragObject.downY - coords.top;

      this.startDrag(event);

    }

    this._dragObject.avatar.style.left = event.pageX - this._dragObject.shiftX + 'px';
    this._dragObject.avatar.style.top = event.pageY - this._dragObject.shiftY + 'px';

  }

  private onMouseUp = (event, blockElement): void => {
    if (!_.isNil(this._dragObject.avatar)) {
      this.finishDrag(event);
    }
    // this._dragObject.avatar.style.width = '';
    debugger
    this._dragObject = {};
    // blockElement.style.width
    document.body.className = '';
  }

  public dragManager = (blockObj: BlockPlace, blockElement: HTMLElement): void => {
    debugger
    this.onMouseDown(event, blockElement);
    document.onmousemove = (event: MouseEvent) => {
      this.onMouseMove(event);
    };
    document.onmouseup = (event: MouseEvent) => {
      this.onMouseUp(event, blockElement);
    };
  }
}
