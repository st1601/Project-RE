import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-artistsong',
  templateUrl: './artistsong.component.html',
  styleUrls: ['./artistsong.component.scss']
})
export class ArtistsongComponent {
  songs: any[] = [];

  constructor(private authService: AuthService, private musicService: MusicService, private router: Router) {}

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs() {
    const userID = this.authService.getUserID();
    if (userID) {
      this.musicService.getSongsByArtist(userID).subscribe(
        (data: any) => {
          this.songs = data;
        },
        (error) => {
          console.error('Error loading songs', error);
        }
      );
    }
  }
  goToCreateMusic() {
    this.router.navigate(['/createmusic']);
  }
  showDeletePopup(songTitle: string, songId: number) {
    document.getElementById('deletePopup')!.style.display = 'flex';
    document.getElementById('deleteSongTitle')!.textContent = songTitle;
    
    document.getElementById('confirmDelete')!.onclick = () => {
      this.deleteSong(songId);
    };
  }

  deleteSong(songId: number) {
    fetch(`/api/music/delete/${songId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Song deleted successfully');
        location.reload(); // Reload or update the page as needed
      } else {
        alert('Failed to delete song');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while deleting the song');
    });

    document.getElementById('deletePopup')!.style.display = 'none';
  }

  hideDeletePopup() {
    document.getElementById('deletePopup')!.style.display = 'none';
  }
}
