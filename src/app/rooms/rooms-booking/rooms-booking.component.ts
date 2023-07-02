import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent {

  constructor(private router:ActivatedRoute){}

  ngOnInit():void{
    this.router.params.subscribe((params)=>{console.log(params)});
  }

}
