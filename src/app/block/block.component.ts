import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

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

  @Output() public updateBlock = new EventEmitter();

  @ViewChild('input') private input: ElementRef;

  public inputEnable: boolean;

  constructor() { }

  public updateWidth = (width: number) => {
    this.inputEnable = false;
    this.updateBlock.emit(width);
  }

  public toggleInput = (): void => {
    this.inputEnable = true;
  }

  ngOnInit() {
  }

}
