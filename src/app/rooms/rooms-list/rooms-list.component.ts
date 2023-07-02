import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnChanges,OnDestroy {
  @Input() rooms: RoomList[] | null = [];
  @Input() title:string = '';
  @Output() selectedRoom = new EventEmitter<RoomList>()

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['title']){
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  selectRoom(room:RoomList){
    this.selectedRoom.emit(room);
  }

  ngOnDestroy(): void {
    console.log("ng OnDestroy is called")
  }
}
