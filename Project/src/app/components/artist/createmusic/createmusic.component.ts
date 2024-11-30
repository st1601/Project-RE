import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-createmusic',
  templateUrl: './createmusic.component.html',
  styleUrls: ['./createmusic.component.scss']
})
export class CreatemusicComponent {
  title: string = '';
  genre: string = '';
  songFile: File | null = null;
  songImage: File | null = null;

  constructor(
    private router: Router,
    private musicService: MusicService,
    private authService: AuthService
  ) {}

  // Hàm xử lý khi người dùng chọn file nhạc
  onFileSelected(event: Event, fileType: 'song' | 'image') {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      if (fileType === 'song') {
        this.songFile = input.files[0];
      } else if (fileType === 'image') {
        this.songImage = input.files[0];
      }
    }
  }

  // Hàm để gửi dữ liệu lên server và điều hướng trở lại trang danh sách bài hát
  onSubmit() {
    if (!this.title || !this.genre || !this.songFile || !this.songImage) {
      alert('Vui lòng điền đầy đủ thông tin và chọn file');
      return;
    }

    const userID = this.authService.getUserID();
    const uploadDate = new Date().toISOString();

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('userID', userID!.toString());
    formData.append('genre', this.genre);
    formData.append('song_file', this.songFile);
    formData.append('upload_date', uploadDate);
    formData.append('song_image', this.songImage);

    this.musicService.createMusic(formData).subscribe(
      response => {
        console.log('Bài hát đã được tạo thành công', response);
        alert('Bài hát đã được tạo thành công');
        this.router.navigate(['/artist-songs']);
      },
      error => {
        console.error('Lỗi khi tạo bài hát', error);
        alert('Đã xảy ra lỗi khi tạo bài hát');
      }
    );
  }
}
