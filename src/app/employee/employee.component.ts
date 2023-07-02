import { Component,Self } from '@angular/core';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  // providers: [RoomsService]
})
export class EmployeeComponent {
  epName: string = 'John';

  constructor( private roomsService:RoomsService){
    // @Self() is use to only check the service provider in this perticular component dont go to parents
    
  }

}

