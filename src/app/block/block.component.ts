import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {DragManagerService} from '../drag-manager.service';
import { BlockPlace } from '../classes';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() public blockName: string;
  @Input() public blockHeight = '100px';
  @Input() public blockWidth: number;
  @Input() public draggableFromMenu: boolean;
  @Input() public draggable: boolean;
  @Input() public block: BlockPlace;

  @Output() public updateBlock = new EventEmitter();

  @ViewChild('input') private input: ElementRef;
  @ViewChild('blockElement') private blockElement: ElementRef;

  public inputEnable: boolean;

  constructor(private _dragManagerService: DragManagerService) { }

  public updateWidth = (width: number) => {
    this.inputEnable = false;
    this.updateBlock.emit(width);
  }

  public toggleInput = (): void => {
    this.inputEnable = true;
  }

  public toggleDragnDrop = (block: BlockPlace) => {
    this._dragManagerService.dragManager(block, this.blockElement.nativeElement);
  }

  ngOnInit() {
  }

}
