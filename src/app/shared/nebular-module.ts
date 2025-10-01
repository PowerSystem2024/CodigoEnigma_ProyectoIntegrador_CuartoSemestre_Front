// src/app/shared/nebular.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbThemeModule,
  NbLayoutModule,
  NbDialogModule, // Sirve para mostrar los dialogos (ventanas modales) - Se uará en "Registro", "Editar producto", etc.
  NbToastrModule, // Sirve para mostrar los toasts (notificaciones temporales/ventanas emergentes) - se usará en "registro exitoso", "producto añadido", etc.
  NbMenuModule,
  NbUserModule,
  NbInputModule,
  NbButtonModule,
  NbPopoverModule,
  NbActionsModule,
  NbCardModule,
  NbIconModule,
  NbSearchModule,
  NbContextMenuModule, // Menús contextuales
} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  imports: [
    CommonModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    NbUserModule,
    NbInputModule,
    NbButtonModule,
    NbPopoverModule,
    NbActionsModule,
    NbCardModule,
    NbIconModule,
    NbSearchModule,
    NbContextMenuModule,
    NbEvaIconsModule,
  ],
  exports: [
    CommonModule,
    NbThemeModule,
    NbLayoutModule,
    NbDialogModule,
    NbToastrModule,
    NbUserModule,
    NbInputModule,
    NbMenuModule,
    NbButtonModule,
    NbPopoverModule,
    NbActionsModule,
    NbCardModule,
    NbIconModule,
    NbSearchModule,
    NbContextMenuModule,
    NbEvaIconsModule,
  ]
})
export class NebularModule {}
