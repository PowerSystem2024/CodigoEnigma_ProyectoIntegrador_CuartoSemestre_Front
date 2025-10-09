// src/app/shared/nebular.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbLayoutModule,
  NbUserModule,
  NbInputModule,
  NbMenuModule,
  NbButtonModule,
  NbPopoverModule,
  NbActionsModule,
  NbCardModule,
  NbIconModule,
  NbSearchModule,
} from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbUserModule,
    NbInputModule,
    NbMenuModule,
    NbButtonModule,
    NbPopoverModule,
    NbActionsModule,
    NbCardModule,
    NbIconModule,
    NbSearchModule,
    
  ],
  exports: [
    CommonModule,
    NbLayoutModule,
    NbUserModule,
    NbInputModule,
    NbMenuModule,
    NbButtonModule,
    NbPopoverModule,
    NbActionsModule,
    NbCardModule,
    NbIconModule,
    NbSearchModule,
  ]
})
export class NebularModule {}

