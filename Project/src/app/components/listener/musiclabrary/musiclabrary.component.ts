import { Component, OnInit } from '@angular/core';
import { FavouriteService } from 'src/app/services/favourite.service';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-musiclabrary',
  templateUrl: './musiclabrary.component.html',
  styleUrls: ['./musiclabrary.component.scss']
})
export class MusiclabraryComponent implements OnInit{
  songs: any[] = [];
  userID: number = 1; // Cần lấy userID từ token hoặc session

  constructor(private musicService: MusicService, private favouriteService: FavouriteService) {}

  ngOnInit(): void {
    this.fetchSongs();
  }

  fetchSongs(): void {
    this.musicService.getAllSongs().subscribe(
      (data) => {
        this.songs = data;
      },
      (error) => {
        console.error('Error fetching songs:', error);
      }
    );
  }
  addToFavourite(songID: number): void {
    this.favouriteService.addFavourite(this.userID, songID).subscribe(
      (response) => {
        alert('Song added to favourites!');
      },
      (error) => {
        console.error('Error adding song to favourites:', error);
        alert('Failed to add song to favourites.');
      }
    );
  }
}
