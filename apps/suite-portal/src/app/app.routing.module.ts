import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceListComponent } from '../maintenance-list/maintenance-list.component';
import { MaintenanceListModule } from '../maintenance-list/maintenance-list.module';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module.';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'maintenance-list',
    component: MaintenanceListComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [
    HomeModule,
    AdminModule,
    MaintenanceListModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      enableTracing: true,
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
