import { Component, OnInit } from '@angular/core';
import { TruckService, Truck } from '../truck.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-truck-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css'],
})
export class TruckListComponent implements OnInit {
  trucks: Truck[] = [];
  limit: number = 5; // Items per page
  totalItmes: number = 0; // Total items from API
  totalPages: number = 0; // Total pages
  currentPage: number = 1; // Current page
  pages: number[] = []; // Pages array for pagination

  constructor(private truckService: TruckService) {}

  ngOnInit(): void {
    this.fetchTrucks(this.currentPage);
  }

  fetchTrucks(page: number): void {
    const backendPage = page - 1; // Convert to 0-based page index for backend
  
    // Fetch paginated data
    this.truckService.getTrucksWithOffset(backendPage, this.limit).subscribe((data) => {
      console.log(data); // Debug response
  
      // Assign values from the backend response
      this.trucks = data.content; // Truck list
      this.totalItmes = data.totalElements; // Total items from backend
      this.totalPages = data.totalPages; // Total pages from backend
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Update pagination
    });
  
    this.currentPage = page; // Update current page in the frontend
  }
  

  // fetchTrucks(page: number): void {
  //   const start = (page - 1) * this.limit; // Calculate offset
  
  //   this.truckService.getTrucksWithOffset(start, this.limit).subscribe((data) => {
  //     this.trucks = data; // Update trucks
  
  //     // Fetch total count and update pagination details
  //     this.truckService.getTotalTrucks().subscribe((totalCount) => {
  //       this.totalItmes = totalCount; // Total items
  //       this.totalPages = Math.ceil(this.totalItmes / this.limit); // Total pages
  //       this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Generate page numbers
  
  //       console.log('Total Items:', this.totalItmes); // Debugging
  //       console.log('Total Pages:', this.totalPages); // Debugging
  //       console.log('Pages Array:', this.pages); // Debugging
  //     });
  //   });
  
  //   this.currentPage = page; // Update current page
  // }

  goToPage(page: number): void {
    // Ensure totalPages is valid before checking conditions
    if (this.totalPages === 0 || page < 1 || page > this.totalPages) {
      return; // Prevent invalid navigation
    }
    // Proceed to fetch trucks for the selected page
    this.fetchTrucks(page);
  }
}




// import { Component, OnInit } from '@angular/core';
// import { TruckService , Truck} from '../truck.service';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-truck-list',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './truck-list.component.html',
//   styleUrl: './truck-list.component.css'
// })

// export class TruckListComponent implements OnInit {

//   trucks: Truck[] = [];
//   start: number = 0;
//   limit: number = 5; // items per page

//   totalItmes: number = 0; // total items from api
//   totalPages: number = 0; // Total pages
//   currentPage: number = 1; //Current page

//   pages: number[] = []; // Pages array for pagination

//   constructor( private truckService: TruckService) {}

//   ngOnInit(): void {
//     this.fetchTrucks(this.currentPage);
//   }

//   fetchTrucks(page: number): void {

//     const start = (page - 1) * this.limit; //calculate offset

//     this.truckService.getTrucksWithOffset(
//       this.start, this.limit
//     ).subscribe(

//       (data) => {

//         this.trucks = data

//         //Fetch the total count from the servers response handlers
//         this.truckService.getTotalTrucks().subscribe(
//           (totalCount) => {
//             this.totalItmes = totalCount;
//             this.totalPages = Math.ceil( this.totalItmes / this.limit);

//             this.pages = Array.from({ length: this.totalPages}, (_, i) => i + 1)
//           }) 
//       });

//       this.currentPage = page; // Update the current page
//   }

//   goToPage(page: number): void {
//     if (page < 1 || page > this.totalPages) {
//       return; // Prevent invalid page navigation
//     }
//     this.fetchTrucks(page); // Fetch data for the selected page
//   }

//   /** fetching trucks by limit
//    * ngOnInit(): void {
//     this.fetchTrucks();
//   }

//   fetchTrucks(): void {
//     this.truckService.getTrucksWithOffset(
//       this.start, this.limit
//     ).subscribe(
//       (data) => {
//         this.trucks = [...this.trucks, ...data ];
//         this.start += this.limit// increment offset for next load
//       }
//     );
//   }
//   loadMore(): void {
//     this.fetchTrucks();
//   }
//    */


//   //   //get all trucks, default screen
//   // ngOnInit(): void {
//   //   // this.truckService.getTrucks().subscribe(
//   //   //   (data) => (this.trucks = data)
//   //   // )
//   // }

  
// }
