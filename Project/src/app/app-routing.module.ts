import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/default/login/login.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ArtistComponent } from './components/artist/artist/artist.component';
import { ListenerComponent } from './components/listener/listener/listener.component';
import { PasswordComponent } from './components/default/password/password.component';
import { FooterComponent } from './components/default/footer/footer.component';
import { UserlistComponent } from './components/admin/userlist/userlist.component';
import { CreateuserComponent } from './components/admin/createuser/createuser.component';
import { ListmusicComponent } from './components/admin/listmusic/listmusic.component';
import { ListpaperComponent } from './components/admin/listpaper/listpaper.component';
import { CreatepaperComponent } from './components/admin/createpaper/createpaper.component';
import { ArtistsongComponent } from './components/artist/artistsong/artistsong.component';
import { CreatemusicComponent } from './components/artist/createmusic/createmusic.component';
import { ReadpaperComponent } from './components/listener/readpaper/readpaper.component';
import { MusiclabraryComponent } from './components/listener/musiclabrary/musiclabrary.component';
import { FavouriteComponent } from './components/listener/favourite/favourite.component';
import { ListartistComponent } from './components/listener/listartist/listartist.component';
import { SongfilterComponent } from './components/listener/songfilter/songfilter.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, },
  // canActivate: [AuthGuard], data: { roles: [''] 
  { path: 'artist', component: ArtistComponent,  },
  { path: 'listen', component: ListenerComponent, },
  { path: 'reset', component: PasswordComponent },
  { path: 'foot', component: FooterComponent },
  { path: 'users', component: UserlistComponent },
  { path: 'createuser', component: CreateuserComponent },
  { path: 'listmusic', component: ListmusicComponent },
  { path: 'listpaper', component: ListpaperComponent },
  { path: 'createpaper', component: CreatepaperComponent },
  { path: 'artistsong', component: ArtistsongComponent },
  { path: 'createmusic', component: CreatemusicComponent },
  { path: 'readpaper', component: ReadpaperComponent },
  { path: 'labrary', component: MusiclabraryComponent },
  { path: 'favourite', component: FavouriteComponent },
  { path: 'listartist', component: ListartistComponent },
  { path: 'song', component: SongfilterComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
