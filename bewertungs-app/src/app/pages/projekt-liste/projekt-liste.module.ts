import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy';
import { RouterModule } from '@angular/router';
import { ProjektListePage } from './projekt-liste.page';

@NgModule({
  declarations: [ProjektListePage],
  imports: [CommonModule, IonicModule, RouterModule.forChild([{ path: '', component: ProjektListePage }])],
})
export class ProjektListePageModule {}