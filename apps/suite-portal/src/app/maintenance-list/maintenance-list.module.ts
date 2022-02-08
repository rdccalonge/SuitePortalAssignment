
import { NgModule, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceListComponent } from './maintenance-list.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [MaintenanceListComponent],
  exports: [MaintenanceListComponent]
})
export class MaintenanceListModule  {}