import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-listmusic',
  templateUrl: './listmusic.component.html',
  styleUrls: ['./listmusic.component.scss']
})
export class ListmusicComponent {
  songs: any[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(): void {
    this.musicService.getAllSongs().subscribe(
      (response) => {
        this.songs = response;
      },
      (error) => {
        alert('Failed to load songs: ' + error.message);
      }
    );
  }
}
