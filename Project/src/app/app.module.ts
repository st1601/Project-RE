import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/default/login/login.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ArtistComponent } from './components/artist/artist/artist.component';
import { ListenerComponent } from './components/listener/listener/listener.component';
import { PasswordComponent } from './components/default/password/password.component';
import { FooterComponent } from './components/default/footer/footer.component';
import { NavbaradminComponent } from './components/admin/navbaradmin/navbaradmin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserlistComponent } from './components/admin/userlist/userlist.component';
import { CreateuserComponent } from './components/admin/createuser/createuser.component';
import { ListmusicComponent } from './components/admin/listmusic/listmusic.component';
import { ListpaperComponent } from './components/admin/listpaper/listpaper.component';
import { CreatepaperComponent } from './components/admin/createpaper/createpaper.component';
import { NavbarartistComponent } from './components/artist/navbarartist/navbarartist.component';
import { ArtistsongComponent } from './components/artist/artistsong/artistsong.component';
import { CreatemusicComponent } from './components/artist/createmusic/createmusic.component';
import { NavbarlistenComponent } from './components/listener/navbarlisten/navbarlisten.component';
import { MusiclabraryComponent } from './components/listener/musiclabrary/musiclabrary.component';
import { ReadpaperComponent } from './components/listener/readpaper/readpaper.component';
import { FavouriteComponent } from './components/listener/favourite/favourite.component';
import { ListartistComponent } from './components/listener/listartist/listartist.component';
import { SongfilterComponent } from './components/listener/songfilter/songfilter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ArtistComponent,
    ListenerComponent,
    PasswordComponent,
    FooterComponent,
    NavbaradminComponent,
    UserlistComponent,
    CreateuserComponent,
    ListmusicComponent,
    ListpaperComponent,
    CreatepaperComponent,
    NavbarartistComponent,
    ArtistsongComponent,
    CreatemusicComponent,
    NavbarlistenComponent,
    MusiclabraryComponent,
    ReadpaperComponent,
    FavouriteComponent,
    ListartistComponent,
    SongfilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


