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
  NbButtonGroupModule,
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
    NbButtonGroupModule,
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
    NbButtonGroupModule,
  ]
})
export class NebularModule {}