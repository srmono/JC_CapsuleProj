import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Truck {
  id: number,
  model: string,
  status: string,
  details: string
}

@Injectable({
  providedIn: 'root'
})

export class TruckService {

  private apiUrl = `http://localhost:3001/trucks`;

  constructor(
    private http: HttpClient
  ) { }

  getTrucks(): Observable<Truck[]> {
    return this.http.get<Truck[]>(this.apiUrl);
  }

  //getTruckById
  getTruckById(id: number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  //Pagination API CALL
  getTrucksWithOffset(start: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?_start=${start}&_limit=${limit}`);
  }

  getTotalTrucks(): Observable<number> {
    return this.http
      .get<any>(`${this.apiUrl}?_start=0&_limit=1`, { observe: 'response' })
      .pipe(
        map((response) => {
          // Extract the total count from the response headers
          const totalCount = Number(response.headers.get('x-total-count'));
          return totalCount;
        })
      );
  }

  //createTruck
  //updateTruck
  //deleteTruck
}
