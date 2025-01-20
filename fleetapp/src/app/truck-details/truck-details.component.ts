import { Component, OnInit } from '@angular/core';
import { TruckService } from '../truck.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-truck-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './truck-details.component.html',
  styleUrl: './truck-details.component.css'
})
export class TruckDetailsComponent implements OnInit {

  truck: any;
  
  constructor(
    private route: ActivatedRoute,
    private truckSerice: TruckService
  ){}

  ngOnInit(): void {
    const id =  this.route.snapshot.paramMap.get('id');

    if(id){
      this.truckSerice.getTruckById(+id).subscribe(
        (data) => { this.truck = data }
      );
    }

    throw new Error('Method not implemented.');
  }

}
