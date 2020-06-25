import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home';
import { DockingStationsComponent } from '../components/docking-stations';
import { BikesComponent } from '../components/bikes';
import { RepairsComponent } from '../components/repairs';
import { AnalyticsComponent } from '../components/analytics';
import { SettingsComponent } from '../components/settings';
import { AuthGuard } from '../_helpers';
import { Role } from '../models';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'dockingStations',
    component: DockingStationsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Employee, Role.Management, Role.Admin] },
  },
  {
    path: 'bikes',
    component: BikesComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Employee, Role.Management, Role.Admin] },
  },
  {
    path: 'repairs',
    component: RepairsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Employee, Role.Management, Role.Admin] },
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Management, Role.Admin] },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
