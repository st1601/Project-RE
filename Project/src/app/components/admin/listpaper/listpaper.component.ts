import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { PaperService } from 'src/app/services/paper.service';

@Component({
  selector: 'app-listpaper',
  templateUrl: './listpaper.component.html',
  styleUrls: ['./listpaper.component.scss']
})
export class ListpaperComponent {
  papers: any[] = [];
  showDeletePopup = false;
  paperIDToDelete: string | null = null;

  constructor(private paperService: PaperService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPapers();
  }

  loadPapers(): void {
    this.paperService.getAllPapers().subscribe(
      (response) => {
        this.papers = response;
      },
      (error) => {
        alert('Failed to load papers: ' + error.message);
      }
    );
  }
  openDeletePopup(paperID: string): void {
    this.showDeletePopup = true;
    this.paperIDToDelete = paperID;
  }

  closeDeletePopup(): void {
    this.showDeletePopup = false;
    this.paperIDToDelete = null;
  }

  deletePaper(): void {
    if (this.paperIDToDelete) {
      this.paperService.deletePaper(this.paperIDToDelete).subscribe(
        () => {
          alert('Paper deleted successfully');
          this.loadPapers();
          this.closeDeletePopup();
        },
        (error) => {
          alert('Failed to delete paper: ' + error.message);
        }
      );
    }
  }
  goToCreatePaper(): void {
    this.router.navigate(['/createpaper']);
  }
}
