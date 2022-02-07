import { DialogComponent } from './dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [DialogComponent],
  exports: [DialogComponent]
})
export class DialogModule { }
