import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drag-zone',
  templateUrl: './drag-zone.component.html',
  styleUrls: ['./drag-zone.component.scss']
})
export class DragZoneComponent implements OnInit {
  @Input() public items: string[];

  constructor() { }

  ngOnInit() {
  }

}
