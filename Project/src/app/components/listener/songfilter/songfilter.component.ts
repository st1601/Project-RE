import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-songfilter',
  templateUrl: './songfilter.component.html',
  styleUrls: ['./songfilter.component.scss']
})
export class SongfilterComponent implements OnInit{
  songs: any[] = []; // Danh sách bài hát
  artistId: string = ''; // ID nghệ sĩ

  constructor(private route: ActivatedRoute, private musicService: MusicService) {}

  ngOnInit(): void {
    this.artistId = this.route.snapshot.params['artistId']; // Lấy artistId từ URL
    this.loadSongs();
  }

  // Tải danh sách bài hát của nghệ sĩ
  loadSongs(): void {
    this.musicService.getSongsByArtist(this.artistId).subscribe(
      (data) => {
        this.songs = data;
      },
      (error) => {
        console.error('Error fetching songs:', error);
      }
    );
  }
}
