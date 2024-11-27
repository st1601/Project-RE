import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './components/default/login/login.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ArtistComponent } from './components/artist/artist/artist.component';
import { ListenerComponent } from './components/listener/listener/listener.component';
import { PasswordComponent } from './components/default/password/password.component';
import { FooterComponent } from './components/default/footer/footer.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, },
  { path: 'artist', component: ArtistComponent, canActivate: [AuthGuard], data: { roles: ['artist'] } },
  { path: 'listener', component: ListenerComponent, canActivate: [AuthGuard], data: { roles: ['listener'] } },
  { path: 'reset', component: PasswordComponent },
  { path: 'foot', component: FooterComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
