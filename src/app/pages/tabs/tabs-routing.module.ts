import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'usuarios',
        loadChildren: () => import('../usuarios/usuarios.module').then(m => m.UsuariosPageModule)
      },
      {
        path: 'grafica',
        loadChildren: () => import('../grafica/grafica.module').then(m => m.GraficaPageModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
