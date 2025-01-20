import { Component, OnInit } from '@angular/core';
import { TruckService , Truck} from '../truck.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-truck-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './truck-list.component.html',
  styleUrl: './truck-list.component.css'
})

export class TruckListComponent implements OnInit {

  trucks: Truck[] = [];

  constructor( private truckService: TruckService) {}

  ngOnInit(): void {
      this.truckService.getTrucks().subscribe(
        (data) => (this.trucks = data)
      )
  }
}
