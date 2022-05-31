import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Food } from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private getUrl: string = "http://localhost:8081/api/v1/Food";

  constructor(private _httpClient: HttpClient) { }

  getFoods(): Observable<Food[]> {
    return this._httpClient.get<Food[]>(this.getUrl).pipe(
      map(response => response)
    )
  }

  saveFood(movies: Food) :Observable<Food>{
    return this._httpClient.post<Food>(this.getUrl,movies);
  }

  getFood(id: number): Observable<Food> {
    return this._httpClient.get<Food>(`${this.getUrl}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteFood(id: number): Observable<any> {
    return this._httpClient.delete(`${this.getUrl}/${id}`,{responseType: 'text'});
  }
}
