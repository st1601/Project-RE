import { Component, OnInit } from '@angular/core';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit{
  favourites: any[] = [];
  userID: number = 1; // Lấy userID từ token hoặc session

  constructor(private favouriteService: FavouriteService) {}

  ngOnInit(): void {
    this.fetchFavourites();
  }

  fetchFavourites(): void {
    this.favouriteService.getFavourites(this.userID).subscribe(
      (data) => {
        this.favourites = data;
      },
      (error) => {
        console.error('Error fetching favourites:', error);
      }
    );
  }
}
