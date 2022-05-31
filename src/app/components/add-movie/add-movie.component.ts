import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movie: Movies = new Movies();
  constructor(private _movieService: MoviesService, 
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(localStorage.getItem("UserRole")!="true"){
      this._router.navigateByUrl("/showmovies");
    }
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
     const id = +this._activatedRoute.snapshot.paramMap.get('id')
      this._movieService.getMovie(id).subscribe(
        data => this.movie  = data
      )
    }
  }

  saveMovie() {
    this._movieService.saveMovie(this.movie).subscribe(
      data=>{
        console.log('response', data);
        this._router.navigateByUrl("/movies");
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
