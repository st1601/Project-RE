import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/default/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ArtistHomeComponent } from './components/artist/artist-home/artist-home.component';
import { ListenerHomeComponent } from './components/user/listener-home/listener-home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavAdminComponent } from './components/admin/nav-admin/nav-admin.component';
import { FooterComponent } from './components/default/footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AdminHomeComponent,
        ArtistHomeComponent,
        ListenerHomeComponent,
        NavAdminComponent,
        FooterComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule, // Đảm bảo đã import AppRoutingModule
        HttpClientModule
        NgModule,
      ],
      providers: [],
      bootstrap: [AppComponent]

})
export class AppModule { }
