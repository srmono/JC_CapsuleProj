import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

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

  //createTruck
  //updateTruck
  //deleteTruck
}
