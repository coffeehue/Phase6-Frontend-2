import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bookings } from '../models/bookings';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private getUrl: string = "http://localhost:8081/api/v1/bookings";

  constructor(private _httpClient: HttpClient) { }

  getBookings(): Observable<Bookings[]> {
    return this._httpClient.get<Bookings[]>(this.getUrl).pipe(
      map(response => response)
    )
  }

  saveBookings(bookings: Bookings) :Observable<Bookings>{
    return this._httpClient.post<Bookings>(this.getUrl,bookings);
  }

  getBooking(id: number): Observable<Bookings> {
    return this._httpClient.get<Bookings>(`${this.getUrl}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteBooking(id: number): Observable<any> {
    return this._httpClient.delete(`${this.getUrl}/${id}`,{responseType: 'text'});
  }

  getBookingsByUser(): Observable<Bookings[]> {
    return this._httpClient.get<Bookings[]>(this.getUrl +"byuser/" + 1).pipe(
      map(response => response)
    )
  }
  
}
