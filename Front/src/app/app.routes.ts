import { Routes } from '@angular/router';
import { ListenerHomeComponent } from './components/user/listener-home/listener-home.component';
import { ArtistHomeComponent } from './components/artist/artist-home/artist-home.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { LoginComponent } from './components/default/login/login.component';
import { FooterComponent } from './components/default/footer/footer.component';


export const routes: Routes = [
    { path: ' ', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminHomeComponent },
  { path: 'artist', component: ArtistHomeComponent },
  { path: 'listener', component: ListenerHomeComponent },
  
  { path: 'footer', component: FooterComponent },
];
