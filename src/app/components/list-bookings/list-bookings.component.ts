import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies.service';
import { SelectItem } from "primeng/api";
import { PrimeNGConfig } from "primeng/api";
import { SignoutComponent } from '../signout/signout.component';
import { Bookings } from 'src/app/models/bookings';
import { BookingService } from 'src/app/services/booking.service';


@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css']
})
export class ListBookingsComponent implements OnInit {

  bookings: Bookings[] = [];
  movies: Movies[] = [];
  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  filters={
    keyword: '',
    sortBy: 'Name'
  }

  constructor(private _moviesService: MoviesService, private _signoutComponent: SignoutComponent, private _bookingService: BookingService) { }

  ngOnInit(): void {

    this._bookingService.getBookingsByUser().subscribe(
      data => {
        this.bookings = data
        for(let i=0;i<this.bookings.length;i++)
        {
          this._moviesService.getMovie(this.bookings[i].movieId).subscribe(
            data => this.movies.push(data) 
          )
        }
        this.sortOptions = [
          {label: 'Price High to Low', value: '!price'},
          {label: 'Price Low to High', value: 'price'}
      ];
      }
      
    )
   

  }
  listMovies() {
    this._moviesService.getMovies().subscribe(
      data => this.movies = this.filterMovies(data)
    )
  }

  filterMovies(movies: Movies[]) {
    return movies.filter((e) => {
      return e.moviename.toLowerCase().includes(this.filters.keyword.toLowerCase());
    }).sort((a, b) => {
      if (this.filters.sortBy === 'Name') {
        return a.moviename.toLowerCase() < b.moviename.toLowerCase() ? -1: 1;
      }
      else if(this.filters.sortBy === 'Price') {
        return a.price > b.price ? -1: 1;
      }
      else if(this.filters.sortBy === 'Genre'){
        return a.genre.toLowerCase() < b.genre.toLowerCase() ? -1: 1;
      }
    })
  }

  logoutfunc()
  {
    this._signoutComponent.logoutfunc();
  }
}
