import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-listartist',
  templateUrl: './listartist.component.html',
  styleUrls: ['./listartist.component.scss']
})
export class ListartistComponent implements OnInit {
  artists: any[] = []; // Danh sách nghệ sĩ

  constructor(private artistService: ArtistService, private router: Router) {}

  ngOnInit(): void {
    this.loadArtists();
  }

  // Tải danh sách nghệ sĩ
  loadArtists(): void {
    this.artistService.getArtists().subscribe(
      (data) => {
        this.artists = data;
      },
      (error) => {
        console.error('Error fetching artists:', error);
      }
    );
  }
  viewArtistSongs(artistId: string): void {
    this.router.navigate(['/songs', artistId]); // Điều hướng đến trang bài hát
  }
}
