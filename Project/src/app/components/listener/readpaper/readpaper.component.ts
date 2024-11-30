import { Component } from '@angular/core';
import { PaperService } from 'src/app/services/paper.service';

@Component({
  selector: 'app-readpaper',
  templateUrl: './readpaper.component.html',
  styleUrls: ['./readpaper.component.scss']
})
export class ReadpaperComponent {
  papers: any[] = [];

  constructor(private paperService: PaperService ) {}

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
}
