import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies.service';
import { SelectItem } from "primeng/api";
import { PrimeNGConfig } from "primeng/api";
import { SignoutComponent } from '../signout/signout.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  

  movies: Movies[] = [];
  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  filters={
    keyword: '',
    sortBy: 'Name'
  }
  constructor(private _moviesService: MoviesService, private _signoutComponent: SignoutComponent,private _router: Router   ) { }

  ngOnInit(): void {
    if(localStorage.getItem("UserRole")!="true"){
      this._router.navigateByUrl("/showmovies");
    }
    this._moviesService.getMovies().subscribe(
      data => this.movies = data
    )
    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
  ];
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

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}
}
