import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TabsUsersPageRoutingModule } from './tabs-users-routing.module';

import { TabsUsersPage } from './tabs-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsUsersPageRoutingModule
  ],
  declarations: [TabsUsersPage]
})
export class TabsUsersPageModule {}
