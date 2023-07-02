import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';

const routes: Routes = [
  {path:'employee', component:EmployeeComponent},
  {path:'rooms', component:RoomsComponent},
  {path:'rooms/:id', component:RoomsBookingComponent},
  {path:'',redirectTo:'/rooms',pathMatch:'full'}, // when ever a user comes to the defualt url redirect him to rooms
  {path:'**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
