import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DragZoneComponent } from './drag-zone/drag-zone.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { SplitViewZoneComponent } from './split-view-zone/split-view-zone.component';
import { BlockPlaceComponent } from './block-place/block-place.component';
import { BlockComponent } from './block/block.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { SectionComponent } from './section/section.component';
import { SectionRowComponent } from './section-row/section-row.component';
import { OverlayComponent } from './overlay/overlay.component';

import { TransitionService } from './transition.service';
import { ConfigService } from './config.service';

@NgModule({
  declarations: [
    AppComponent,
    DragZoneComponent,
    DropZoneComponent,
    SplitViewZoneComponent,
    BlockPlaceComponent,
    BlockComponent,
    AddButtonComponent,
    SectionComponent,
    SectionRowComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TransitionService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
