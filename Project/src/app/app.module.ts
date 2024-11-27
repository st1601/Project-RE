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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ArtistComponent,
    ListenerComponent,
    PasswordComponent,
    FooterComponent,
    NavbaradminComponent
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


