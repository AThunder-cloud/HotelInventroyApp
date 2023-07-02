import { Component, ViewChild, OnInit, AfterViewInit, AfterViewChecked, ViewChildren, QueryList, OnDestroy, SkipSelf } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from '../services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements AfterViewInit, AfterViewChecked {
  // implements DoCheck
  // ngDoCheck(): void {
  //   console.log("On changes")
  // } to check for any chnages dont use this not normal

  hotelName = 'Red Rooms';
  numberOfRooms = 10;
  hideRooms = true;
  selectedRoom!: RoomList;
  title = "Room List";
  roomList: RoomList[] = [];
  totalByes = 0;
  subscription !: Subscription;
  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();
  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err)=>{ 
      console.log(err);
      this.error$.next(err.message);
      return of([]);
     })
  );

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms)=>rooms.length)
  );
  // stream = new Observable<any>(observer => {
  //   observer.next('user1');
  //   observer.next('user2');
  //   observer.next('user3');
  //   observer.complete();
  //   observer.error("error");
  // }); // internal working of observable in rxjs
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 1,
    bookedRooms: 5,
  }

  constructor(@SkipSelf() private roomsService: RoomsService) {

  }
  // skipSlef is use to skip the check of provider of thr service 
  ngOnInit(): void {
    // this.roomList = this.roomsService.getRooms();

    // this.stream.subscribe({
    //   next:(value) => console.log(value),
    //   complete: ()=> console.log("This stream is completed "),
    //   error:(err)=> console.log(err),
    // }); // subscribing to the stream we created above 

    // this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // });

    // this.roomsService.getPhotos().subscribe((event)=>{
    //   switch(event.type){
    //     case HttpEventType.Sent:{
    //       console.log("request has been made !");
    //       break;
    //     }
    //     case HttpEventType.ResponseHeader:{
    //       console.log("Request Success!");
    //       break;
    //     }
    //     case HttpEventType.DownloadProgress:{
    //       this.totalByes +=event.loaded;
    //       break;
    //     }
    //     case HttpEventType.Response:{
    //       console.log(event.body);
    //       break;
    //     }
    //   }
    // })

  }

  ngAfterViewInit(): void {
    this.headerChildrenComponent.last.title = "Last Hearder Title"
  }

  ngAfterViewChecked(): void {
    this.headerComponent.title = "Header Title";
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List"
  }
  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber:String(this.roomList.length + 1),
      roomType: 'Premium',
      amenities: 'Air Conditioner, Free Wifi, TV, Pool, Personal Chef',
      price: 19999,
      photos: "C:\\project\\allimages\\Pixel Art [1920x1080].jpeg",
      checkinTime: new Date('11-Nov-2022'),
      checkoutTime: new Date('15-Nov-2022'),
      rating: 4.6,
    };
    // this.roomList.push(room);
    // this.roomList = [...this.roomList,room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
      // just binding the data in this file roomlist to the data we are getting from the api call

    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: String(3),
      roomType: 'Premium discount',
      amenities: 'Air Conditioner, Free Wifi, TV, Pool, Personal Chef',
      price: 19000,
      photos: "C:\\project\\allimages\\Pixel Art [1920x1080].jpeg",
      checkinTime: new Date('11-Nov-2022'),
      checkoutTime: new Date('15-Nov-2022'),
      rating: 4.6,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}