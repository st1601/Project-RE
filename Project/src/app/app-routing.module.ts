import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { LoginComponent } from './components/default/login/login.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ArtistComponent } from './components/artist/artist/artist.component';
import { ListenerComponent } from './components/listener/listener/listener.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
  { path: 'artist', component: ArtistComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['artist'] } },
  { path: 'listener', component: ListenerComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['listener'] } },
  { path: '**', redirectTo: '/login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
