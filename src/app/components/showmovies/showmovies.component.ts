import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies.service';
import { SelectItem } from "primeng/api";
import { PrimeNGConfig } from "primeng/api";
import { SignoutComponent } from '../signout/signout.component';
@Component({
  selector: 'app-showmovies',
  templateUrl: './showmovies.component.html',
  styleUrls: ['./showmovies.component.css']
})
export class ShowmoviesComponent implements OnInit {
  movies: Movies[] = [];

  sortOrder: number;

  sortField: string;

  filters={
    keyword: '',
    sortBy: 'Name'
  }
  constructor(private _moviesService: MoviesService, private _signoutComponent: SignoutComponent) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("UserRole"));
    this._moviesService.getMovies().subscribe(
      data => this.movies = data
    )
  }


  deleteMovie(id: number){
    this._moviesService.deleteMovie(id).subscribe(
      data => {
        console.log('Deleted Response',data);
       
      }
    )
  }

  listMovies() {
    this._moviesService.getMovies().subscribe(
      data => this.movies = this.filterMovies(data)
    )
  }

  logoutfunc()
  {
    this._signoutComponent.logoutfunc();
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

}
