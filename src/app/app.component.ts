import { OnInit, AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef, Optional, Inject } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './services/logger.service';
import { localStorageToken } from './localstorage.token';
import { InitService } from './services/init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'hotelinventoryapp';
  // role = 'Users'; for switch case use 

  constructor(@Optional() private loggerService:LoggerService , 
  @Inject(localStorageToken) private localStorage:Storage,
  private initService:InitService
  ){console.log(initService.config)}
  
  // the optional decorator is used to set the service as optional so if its not found it dont raise an error
  // @ViewChild('name', {static:true}) name!:ElementRef;
  ngOnInit(){
    // this.name.nativeElement.innerText = 'Hotel red rooms'
    this.loggerService!.Log("looged")
    this.localStorage.setItem('name', 'Hotel Red Rooms');
  }
  // @ViewChild('user', {read:ViewContainerRef}) vcr!:ViewContainerRef;

  // implements AfterViewInit
  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }
  // to dynamically load a component

}



