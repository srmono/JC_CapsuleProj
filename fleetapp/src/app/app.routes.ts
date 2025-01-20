import { Routes } from '@angular/router';
import { TruckListComponent } from './truck-list/truck-list.component';
import { TruckCreateComponent } from './truck-create/truck-create.component';
import { TruckEditComponent } from './truck-edit/truck-edit.component';
import { PagenotfoundcomponentComponent } from './pagenotfoundcomponent/pagenotfoundcomponent.component';


//redirectTo: "/dashbaord"
export const routes: Routes = [
    {path: '', component: TruckListComponent , pathMatch: 'full'},
    {path: 'create', component: TruckCreateComponent},
    {path: 'edit/:id', component: TruckEditComponent},
    {path: "**", component: PagenotfoundcomponentComponent}
];
