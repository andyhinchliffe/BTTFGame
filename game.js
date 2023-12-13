const startBut = document.getElementById("startBut");
const intro = document.getElementById("intro");
const congrats = document.getElementById("congrats");
const gamearea = document.getElementById("gamearea");
const firstRoom = document.getElementById("firstRoom");

  

function displayGame() {
    intro.style.display = "none";

    gamearea.style.display = "block";
}


function displayEnd(){
    gamearea.style.display = "none";
    outro.style.display = "block";

}


// ---------------------------------
// ROOMS ---------------------------
// ---------------------------------


class Room {
    constructor(name, year) {
      this._name = name;
      this._description = "";
      this._linkedRooms = {};
      this._character = "";
      this._year = year;
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get character() {
      return this._character
    }
  
    set name(value) {
      if (value.length < 4) {
        alert("Name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        alert("description is too short.");
        return;
      }
      this._description = value;
    }
  
    set character(value) {
      this._character = value;
    }

 
    

// ---Describe Room----

describe() {
    return "Looking around the " + this._name + " you can see " + this._description;
  }


year(){

    return this._year;
}  

//   ------Link Rooms -----

linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }





// ------------------GET DETAILS ----------------
getDetails() {
    const entries = Object.entries(this._linkedRooms);
    let details = []
    for (const [direction, room] of entries) {
      let text = " The " + room._name + " is to the " + direction;
      details.push(text);
    }
    return details;
  }



//   -------Move Direction ------------
  move(direction) {
    if (direction in this._linkedRooms) {
        document.getElementById("noWay").style.display = "none"
      return this._linkedRooms[direction];
    } else {
        document.getElementById("noWay").style.display = "block"
        
      

      return this;
    }
  }

}

// ---------------------------------
// ITEMS ---------------------------
// ---------------------------------

class Item {
    constructor(name) {
      this._name = name,
        this._description = ""
    }
  
    set name(value) {
      if (value.length < 4) {
        alert("Name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        alert("Decription is too short.");
        return;
      }
      this._name = value;
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    /**
     * a method to produce friendly item description
     * 
     * @returns {string} description of the item
     * @author Neil Bizzell
     * @version 1.0
     */
    describe() {
      return "The " + this._name + " is " + this._description;
    }
  
  
  }


// ---------------------------------
// Character ---------------------------
// ---------------------------------


class Character {
    constructor(name) {
      this._name = name,
        this._description = ""
      this._conversation = ""
    }
    set name(value) {
      if (value.length < 4) {
        alert("Name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        alert("Decription is too short.");
        return;
      }
      this._description = value;
    }
  
    set conversation(value) {
      if (value.length < 4) {
        alert("conversation is too short.");
        return;
      }
      this._conversation = value;
    }
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get conversation() {
      return this._conversation;
    }
    /**
     * a method to produce friendly character description
     * 
     * @returns {string} description of the character
     * @author Neil Bizzell
     * @version 1.0
     */
    describe() {
      return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }
  
    /**
     * a method to produce friendly conversation text
     * 
     * @returns {string} the conversation text
     * @author Neil Bizzell
     * @version 1.0
     */
    converse() {
      return this._name + " says " + "'" + this._conversation + "'";
    }
  }

// ---------------------------------------------------
// CREATE ROOMS
// ---------------------------------------------------
const HVSchool = new Room("Hill Valley High School", 1955);
HVSchool.description = "a long narrow room with worktops on either side and a large bench in the middle";
const OWestHill = new Room("Old West Hill Valley", 1885);
OWestHill.description = "a large room with two sofas and a large fire place";
const FHillValley = new Room("Future Hill Valley", 2015);
FHillValley.description = "a large room with a pool table at it's centre";
const WestonSaloon = new Room("Western Saloon", 1955);
WestonSaloon.description = "a grand entrance hall with large paintings around the walls";
const AlternateFuture = new Room("Alternate Future", 2025);
AlternateFuture.description = "a grand entrance hall with large paintings around the walls";
const PastHillValley = new Room("Past Hill Valley", 1885);
PastHillValley.description = "a grand entrance hall with large paintings around the walls";
const ClockTower = new Room("Clock Tower", 1955);
ClockTower.description = "a grand entrance hall with large paintings around the walls";


// ---------------------------------------------------
// LINK ROOMS
// ---------------------------------------------------
HVSchool.linkRoom("north", FHillValley);
HVSchool.linkRoom("east", OWestHill);
// OWestHill.linkRoom("north", OWestHill);
OWestHill.linkRoom("east", HVSchool);

// FHillValley.linkRoom("east", WestonSaloon);
FHillValley.linkRoom("south", HVSchool);


WestonSaloon.linkRoom("east", AlternateFuture);
WestonSaloon.linkRoom("north", ClockTower);


WestonSaloon.linkRoom("east", AlternateFuture);
WestonSaloon.linkRoom("north", ClockTower);

AlternateFuture.linkRoom("west", WestonSaloon);
AlternateFuture.linkRoom("north", PastHillValley);

PastHillValley.linkRoom("east", ClockTower);
PastHillValley.linkRoom("south", AlternateFuture);
// ---------------------------------------------------
// LINK JS to HTML
// ---------------------------------------------------

function displayRoomInfo(room) {
    // 
     let occupantMsg = ""
    if (room.character === "") {
      occupantMsg = ""
    } else {
      occupantMsg = room.character.describe() + ". " + room.character.converse()
    }
  
    textContent = "<p>" + room.describe() +"</p>" + "<p>" +
      occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";

    
    document.getElementById("yearDisplay").innerText = room.year()
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("usertext").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
  }
// ---------------------------------
//   START GAME AND HANDLE COMMANDS
// ---------------------------------

function startGame() {
    //set and display start room
    currentRoom = HVSchool
    // console.log (currentRoom)
    displayRoomInfo(currentRoom);

// 
  
    //
  
    //handle commands
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        command = document.getElementById("usertext").value;
        congrats.innerText=""
        const directions = ["north", "south", "east", "west"]
        if (command.toLowerCase()==="hover"  && currentRoom.name==="Future Hill Valley"){
            congrats.innerText="Well done on getting past Biff"
            currentRoom = WestonSaloon
            document.getElementById("usertext").value = ""
            displayRoomInfo(currentRoom);
        }

        else if (command.toLowerCase()==="delorean" && currentRoom.name==="Clock Tower" ){
            displayEnd()
        }
        else if (directions.includes(command.toLowerCase())) {
          currentRoom = currentRoom.move(command)
          document.getElementById("usertext").value = ""
          displayRoomInfo(currentRoom);
        } else {
          document.getElementById("usertext").value = ""
          alert("that is not a valid command please try again")
          document.getElementById("noWay").display = "block"
        }
  
      }
    });
  }

  function firstRoomStart(){
    firstRoom.style.display="none";
    startGame();

  }

  startBut.addEventListener("click", displayGame);
  firstRoom.addEventListener("click", firstRoomStart)


//   --------------------------------
//   Start Game
//   ---------------------------------



  