import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookings } from 'src/app/models/bookings';
import { BookingService } from 'src/app/services/booking.service';


import { SelectItem } from "primeng/api";
import { PrimeNGConfig } from "primeng/api";
import { SignoutComponent } from '../signout/signout.component';

@Component({
  selector: 'app-addtocartmovie',
  templateUrl: './addtocartmovie.component.html',
  styleUrls: ['./addtocartmovie.component.css']
})
export class AddtocartmovieComponent implements OnInit {
  movie: Movies = new Movies();
  booking : Bookings = new Bookings();
  qty: number = 1;
  totalcost: number= 0;
  
  constructor(private _movieService: MoviesService, 
    private _bookingService: BookingService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
     const id = +this._activatedRoute.snapshot.paramMap.get('id')
      this._movieService.getMovie(id).subscribe(
        data => this.movie  = data
      )

      this.booking.movieId = id
    }
  }

  calculatecost() {
    this.totalcost = this.qty * this.movie.price;
    console.log(this.qty * this.movie.price);
    
    
  }

  saveMovie() {
   
    
    this._movieService.saveMovie(this.movie).subscribe(
      data=>{
        console.log('response', data);
        this._router.navigateByUrl("/movies");
      }
    )
  }

  saveBooking() {
    this.booking.totalAmount = this.totalcost;
    this.booking.userId = 1;
    this._bookingService.saveBookings(this.booking).subscribe(
      data=>{
        console.log('response', data);
        this._router.navigateByUrl("/showmovies");
      }
    )
  }

  deleteMovie(id: number){
    this._movieService.deleteMovie(id).subscribe(
      data => {
        console.log('Deleted Response',data);
        this._router.navigateByUrl('/movies');
      }
    )
  }

}
