import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsUsersPage } from './tabs-users.page';

const routes: Routes = [
  {
    path: '',
    component: TabsUsersPage,
    children: [
      {
        path: 'juegos',
        loadChildren: () => import('../juegos/juegos.module').then(m => m.JuegosPageModule)
      },
      {
        path: 'plataformas',
        loadChildren: () => import('../plataformas/plataformas.module').then(m => m.PlataformasPageModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsUsersPageRoutingModule {}
