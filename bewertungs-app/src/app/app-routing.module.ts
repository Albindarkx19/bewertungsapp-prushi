import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () => import('./pages/projekt-liste/projekt-liste.module').then(m => m.ProjektListePageModule)
  },
  {
    path: 'projects/:id',
    loadChildren: () => import('./pages/projekt-detail/projekt-detail.module').then(m => m.ProjektDetailPageModule)
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'projects' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
