import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})



export class HomeComponent {
  @ViewChild('iframe') iframe!: ElementRef;
  

  view: any;
  x: any;
  y: any;
  cx: any;
  cy: any;
  cz: any;
  factor: any;

  noRoomNum = ["שירותים","קפיטריה","מחסן"]; //black list that dont have room number

  database: any[] = [];
  databaseBuildings: any[] = [];
  databaseTypes: any[] = [];
  databaseRoomNum: any[] = [];

  selectedBuilding: any;
  selectedType: any;
  selectedRoom: any;
  roomObjToSearch: any;

  desc: any;










  buildingsNumbers: any[] = [];
  buildingsRes: any;

  filterdRooms: any[] = [];

  roomTypes: any[] = [];
  roomsNumbers: any[] = [];
  roomsRes: any;

  roomNumberField = true;



  constructor(private http: HttpClient ) {
    //this.http.get<any>("api/Values/GetBuildings").subscribe(res => {
    //  this.buildingsRes = res;
    //  for (let i = 0; i < res.length; i++) {
    //    this.buildingsNumbers.push(res[i].number);
    //  }
    //})
  }


  ngOnInit() {
    

    this.http.get("assets/map/data/index/database.json").subscribe((data: any) => {
      let counter = 0;
      for (let item of data.layers) {
        if (item.properties.type != 'dem') {
          for (let item2 of item.data.blocks[0].features) {
            //console.log("Item2: ", item2);
            let x = item2.geom.centroids[0][0];
            let y = item2.geom.centroids[0][1];
            let id = item2.prop[0];
            let room = item2.prop[1];
            let desc = item2.prop[2];
            let building = item2.prop[3];
            let floor = item2.prop[4];
            let type = item2.prop[5];
            let row = {
              "x": x,
              "y": y,
              "id": id,
              "room": room,
              "desc": desc,
              "building": building,
              "floor": floor,
              "type": type,
            }
            this.database.push(row);
            counter++;
          }
          //console.log("Item: ", item);
          }  
      }
      //console.log("counter: ", counter);
      console.log("Database: ", this.database);

      for (let item of this.database) {
        if (!this.databaseBuildings.includes(item.building)) {
          this.databaseBuildings.push(item.building);
        }
      }
      //console.log("Database: ", data.layers);
    });


    
    this.view = "https://localhost:44487/assets/map/index.html#cx=3870963.757&cy=3765277.887&cz=199.077&tx=3870924.298&ty=3765424.363&tz=0.000";
    
    
  }

  getTypes(e: any) {
    this.desc = "";
    this.databaseTypes = [];
    this.selectedBuilding = e.value;
    for (let item of this.database) {
      if (item.building == this.selectedBuilding) {
        if (!this.databaseTypes.includes(item.type)) {
          this.databaseTypes.push(item.type);
        }
      }

    }
  

  }

  selectType(e: any) {
    this.desc = "";
    this.databaseRoomNum = [];
    this.selectedType = e.value;
    //console.log(this.selectedType);
    for (let item of this.database) {
      if (item.building == this.selectedBuilding && item.type == this.selectedType) {
        this.databaseRoomNum.push(item.room);
      }

    }
    if (this.noRoomNum.includes(this.selectedType)){
      this.roomNumberField = false
    }
    else {
      this.roomNumberField = true
    }
    //console.log("FIlterd rooms: ", this.filterdRooms);
    //console.log("Rooms: ", this.roomsNumbers);
  }


  selectRoom(e: any) {
    this.selectedRoom = e.value;
    for (let item of this.database) {
      if (item.building == this.selectedBuilding && item.type == this.selectedType && item.room == this.selectedRoom) {
        this.roomObjToSearch = item;
        this.desc = this.roomObjToSearch.desc;
      }

    }
  }

  search() {
    console.log("We search: ", this.roomObjToSearch);


    //this.x = this.roomObjToSearch.x;
    //this.y = this.roomObjToSearch.y;
    //this.factor = 0;
    //this.cz = 20 + this.factor;
    //this.cx = this.x;
    //this.cy = this.y - 20 - this.factor;

    this.x = this.roomObjToSearch.x;
    this.y = this.roomObjToSearch.y;
    this.factor = 0;
    this.cz = 20 + this.factor;
    this.cx = this.x;
    this.cy = this.y - 20 - this.factor;

    this.view = "https://localhost:44487/assets/map/index.html#cx=" + this.cx + "&cy=" + this.cy + "&cz=" + this.cz + "&tx=" + this.x + "&ty=" + this.y + "&tz=0.000";
    this.iframe.nativeElement.contentWindow.location.replace(this.view);
    this.iframe.nativeElement.contentWindow.location.reload(true);
  }



}
