import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockRoutingModule } from './block-routing.module';
import { CreateBlockComponent } from './create-block/create-block.component';
import { EditBlockComponent } from './edit-block/edit-block.component';
import { ViewBlockComponent } from './view-block/view-block.component';


@NgModule({
  declarations: [
    CreateBlockComponent,
    EditBlockComponent,
    ViewBlockComponent
  ],
  imports: [
    CommonModule,
    BlockRoutingModule
  ]
})
export class BlockModule { }
