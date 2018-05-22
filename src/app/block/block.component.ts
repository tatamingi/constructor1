import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() public blockName: string;
  @Input() public blockHeight = '100px';

  constructor() { }

  ngOnInit() {
  }

}
