import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TruckComponent } from './truck/truck.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TruckComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Fleet Management System';
}
