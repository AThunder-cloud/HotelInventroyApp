import { AfterContentInit, Component, ContentChild, Host } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  // providers:[RoomsService]
})
export class ContainerComponent implements AfterContentInit {

  @ContentChild(EmployeeComponent) emp!:EmployeeComponent;

  ngAfterContentInit(): void {
    // console.log(this.emp);
    // this.emp.epName = "rick";
  }

  constructor(){}
  // @Host() private roomsSerice: RoomsService
  // @Host to only look for the provider in the container dont go to the parent  

}
