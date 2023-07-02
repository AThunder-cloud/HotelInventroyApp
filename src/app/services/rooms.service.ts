import { Inject, Injectable, inject } from '@angular/core';
import { RoomList } from '../rooms/rooms';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  roomList : RoomList[] = [
  ]
  // headers = new HttpHeaders({'token':'Arpit Singh','token2':'singh arpit'});
  // {headers:this.headers,} add this after the url to add the header in the request
  getRooms$ = this.http.get<RoomList[]>("/api/rooms").pipe(
    shareReplay(1)
  );

  constructor(@Inject(APP_SERVICE_CONFIG) private congif:AppConfig,
  private http:HttpClient) { 
    console.log('room service init'+  congif.apiEndpoint)
  }

  getRooms(){
    return this.http.get<RoomList[]>("/api/rooms");
  }

  addRoom(room:RoomList){
    return this.http.post<RoomList[]>("/api/rooms",room);
  }

  editRoom(room:RoomList){
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`,room);
  }

  delete(id:string){
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);

  }

  getPhotos(){
    const request = new HttpRequest(
      'GET', 
      'https://jsonplaceholder.typicode.com/photos',
    {
      reportProgress:true,
    }
    );
    return this.http.request(request);
  }
}