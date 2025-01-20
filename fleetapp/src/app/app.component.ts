import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TruckComponent } from './truck/truck.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TruckListComponent } from './truck-list/truck-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    TruckComponent, 
    NavbarComponent, 
    TruckListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Fleet Management System';
}
