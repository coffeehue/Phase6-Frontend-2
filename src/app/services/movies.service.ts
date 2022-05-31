import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movies } from '../models/movies';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private getUrl: string = "http://localhost:8081/api/v1/movies";

  constructor(private _httpClient: HttpClient) { }

  getMovies(): Observable<Movies[]> {
    return this._httpClient.get<Movies[]>(this.getUrl).pipe(
      map(response => response)
    )
  }

  saveMovie(movies: Movies) :Observable<Movies>{
    return this._httpClient.post<Movies>(this.getUrl,movies);
  }

  getMovie(id: number): Observable<Movies> {
    return this._httpClient.get<Movies>(`${this.getUrl}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteMovie(id: number): Observable<any> {
    return this._httpClient.delete(`${this.getUrl}/${id}`,{responseType: 'text'});
  }
}
