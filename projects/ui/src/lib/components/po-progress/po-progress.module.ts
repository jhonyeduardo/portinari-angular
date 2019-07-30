import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PoProgressComponent } from './po-progress.component';
import { PoProgressBarComponent } from './po-progress-bar/po-progress-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PoProgressComponent
  ],
  declarations: [
    PoProgressBarComponent,
    PoProgressComponent
  ]
})
export class PoProgressModule {}
