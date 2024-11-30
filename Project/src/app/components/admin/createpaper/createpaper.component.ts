import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicService } from 'src/app/services/music.service';
import { PaperService } from 'src/app/services/paper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createpaper',
  templateUrl: './createpaper.component.html',
  styleUrls: ['./createpaper.component.scss']
})
export class CreatepaperComponent implements OnInit{
  paper: any = {
    songID: '',
    userID: '',
    content: '',
    paper_image: ''
  };
  songs: any[] = [];
  users: any[] = [];

  constructor(
    private userService: UserService,
    private musicService: MusicService,
    private paperService: PaperService,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadSongs();
    this.loadUsers();
  }

  loadSongs(): void {
    this.musicService.getAllSongs().subscribe(
      (response) => {
        this.songs = response;
      },
      (error) => {
        console.error('Failed to load songs:', error);
      }
    );
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Failed to load users:', error);
      }
    );
  }

  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.paper.paper_image = URL.createObjectURL(file);
    }
  }
  createPaper(): void {
    this.paperService.createPaper(this.paper).subscribe(
      () => {
        alert('Paper created successfully');
        this.router.navigate(['/papers']); // Redirect to list of papers
      },
      (error) => {
        alert('Failed to create paper: ' + error.message);
      }
    );
  }
}
