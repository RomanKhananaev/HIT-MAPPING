import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})



export class HomeComponent {
  @ViewChild('iframe') iframe!: ElementRef;
  
  data: any;
  view: any;
  x: any;
  y: any;
  z: any;
  cx: any;
  cy: any;
  cz: any;
  factor: any;

  noRoomNum = [""]; //black list that dont have room number

  database: any[] = [];
  databaseBuildings: any[] = [];
  databaseTypes: any[] = [];
  databaseRoomNum: any[] = [];

  selectedBuilding: any;
  selectedType: any;
  selectedRoom: any;
  roomObjToSearch: any;

  desc: any;
  buildings = ["building1", "building3", "building4", "building6","building7"];
  hidebuildings = ["1", "3", "6", "4", "7"];
  buildingLayerId: any[] = [];










  buildingsNumbers: any[] = [];
  buildingsRes: any;

  filterdRooms: any[] = [];

  roomTypes: any[] = [];
  roomsNumbers: any[] = [];
  roomsRes: any;

  roomNumberField = true;



  constructor(private http: HttpClient ) {

  }


  ngOnInit() {
    
    this.http.get<any>("api/Values/getData").subscribe();

    this.http.get("assets/map/data/index/database.json").subscribe((data: any) => {
      let counter = 0;
      console.log("data: ", data);
      this.data = data;
      for (let item of data.layers) {
        console.log("layer: ", item);
        if (item.properties.type != 'dem') {
          if (!this.buildings.includes(item.properties.name)) {
            for (let item2 of item.data.blocks[0].features) {
              //console.log("Item2: ", item2);
              let x = item2.geom.centroids[0][0];
              let y = item2.geom.centroids[0][1];
              let id = item2.prop[0];
              let room = item2.prop[1];
              let desc = item2.prop[2];
              let building = item2.prop[3];
              if (building == null) {
                console.log("error: ", item);
              }
              let floor = item2.prop[4];
              let type = item2.prop[5];
              let direction = item2.prop[6];
              let row = {
                "x": x,
                "y": y,
                "id": id,
                "room": room,
                "desc": desc,
                "building": building,
                "floor": floor,
                "type": type,
                "direction": direction,
              }
              this.database.push(row);
              counter++;
            }

            //console.log("Item: ", item);
          }
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


    
    this.view = "https://localhost:44487/assets/map/index.html#cx=3870698.346&cy=3765004.293&cz=237.379&tx=3870931.904&ty=3765209.380&tz=2.000";
    
    
  }

  getTypes(e: any) {
    this.desc = "";
    this.databaseTypes = [];
    this.databaseRoomNum = [];
    this.selectedBuilding = e.value;
    for (let item of this.database) {
      if (item.building == this.selectedBuilding) {
        if (!this.databaseTypes.includes(item.type)) {
          this.databaseTypes.push(item.type);
        }
      }

    }
  

  }

  debug(e: any) {
    console.log(">> Debug: ", e);
  }

  selectType(e: any) {
    this.desc = "";
    this.databaseRoomNum = [];
    this.selectedType = e.value;
    //console.log(this.selectedType);
    for (let item of this.database) {
      if (item.building == this.selectedBuilding && item.type == this.selectedType) {
        console.log("item: ", item);
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


  showAll() {
    for (let layer of this.data.layers) {
        this.iframe.nativeElement.contentWindow.app.scene.mapLayers[layer.id].visible = true;
    }
  }

  hideBulding(building: string) {
    this.showAll();
    for (let layer of this.data.layers) {
      if (layer.properties.name == building) {
        this.iframe.nativeElement.contentWindow.app.scene.mapLayers[layer.id].visible = false;
      }
    }

  }

  search() {
    console.log("We search: ", this.roomObjToSearch);
    this.factor = 0;

    this.x = this.roomObjToSearch.x;
    this.y = this.roomObjToSearch.y;

   

    if (this.roomObjToSearch.direction == "s") {
      this.cy = this.y + 30 - this.factor;
      this.cx = this.x;
    }
    else if (this.roomObjToSearch.direction == "n") {
      this.cy = this.y - 30 - this.factor;
      this.cx = this.x;
    }
    else if (this.roomObjToSearch.direction == "w") {
      this.cy = this.y;
      this.cx = this.x + 30 - this.factor;
    }
    else if (this.roomObjToSearch.direction == "e") {
      this.cy = this.y;
      this.cx = this.x - 30 - this.factor;
    }
    
    if (this.roomObjToSearch.floor == "1") {
      //console.log("Floor 1")
      this.z = 2 + this.factor;
      this.cz = 2 + this.factor;

    }
    else if (this.roomObjToSearch.floor == "-1") {
      this.z = -2 + this.factor;
      this.cz = -2 + this.factor;
      //console.log("Floor 2")
    }
    else if (this.roomObjToSearch.floor == "2") {
      this.z = 5 + this.factor;
      this.cz = 5 + this.factor;
      //console.log("Floor 2")
    }
    else if (this.roomObjToSearch.floor == "3") {
      this.z = 8 + this.factor;
      this.cz = 8 + this.factor;
      //console.log("Floor 3")
    }
    else if (this.roomObjToSearch.floor == "4") {
      this.z = 11 + this.factor;
      this.cz = 11 + this.factor;
      //console.log("Floor 4")
    }
    else if (this.roomObjToSearch.floor == "5") {
      this.z = 14 + this.factor;
      this.cz = 14 + this.factor;
      //console.log("Floor 5")
    }
    else if (this.roomObjToSearch.floor == "6") {
      this.z = 17 + this.factor;
      this.cz = 17 + this.factor;
      //console.log("Floor 6")
    }
    else {

    }



    
    


    this.view = "https://localhost:44487/assets/map/index.html#cx=" + this.cx + "&cy=" + this.cy + "&cz=" + this.cz + "&tx=" + this.x + "&ty=" + this.y + "&tz=" + this.z;
    this.iframe.nativeElement.contentWindow.location.replace(this.view);
    this.iframe.nativeElement.contentWindow.location.reload(true);



    setTimeout(() => {
      if (this.hidebuildings.includes(this.roomObjToSearch.building)) {
        this.hideBulding("building" + this.roomObjToSearch.building);
      }
      
      this.click();
    }, 500);

  }

  click() {
    this.iframe.nativeElement.contentWindow.app.canvasClicked({ "button": 2, "clientX": 430, "clientY": 450 });
  }



}
