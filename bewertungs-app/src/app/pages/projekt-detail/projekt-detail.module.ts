import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy';
import { RouterModule } from '@angular/router';
import { ProjektDetailPage } from './projekt-detail.page';

@NgModule({
  declarations: [ProjektDetailPage],
  imports: [CommonModule, IonicModule, RouterModule.forChild([{ path: '', component: ProjektDetailPage }])],
})
export class ProjektDetailPageModule {}