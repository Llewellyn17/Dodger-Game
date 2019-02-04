/*********************
w3school heavily added
**********************/
var myGamePiece;//intialize game piece
var FallingObject = [];
var TheScore;
function startGame() {
    myGamePiece = new player(30, 30, "blue", 230, 440);
    TheScore = new player ("30px", "consolas", "White",300, 40, "text");
    // FallingObject.push(new player(10, 10, "white", 10, 10))
    // FallingObject.push(new player(10, 10, "white", 150, 300))
    // FallingObject.push(new player(10, 10, "white", 100, 70))
    // FallingObject.push(new player(10, 10, "white", 300, 220))
    myGameArea.start();
    /**************************************************
     The in order width, height, color, x-axis,y-axis
    **************************************************/
}
// makes the canvas board in the same area as the cube
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        //the amount of time in mil-seconds before the board is continously ran. its like the board is scanning and accounting for movements during these intervals.
        this.interval = setInterval(updateGameArea, 5);
    }, //cause square to stay on the board otherwise the system runs but nothing shows causing a continuos 
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },//needed for stopping game when crashed.
    stop: function () {
        clearInterval(this.interval);
    }    
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
  }
function player(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
          } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitbottom();
        this.hitTop();
        this.hitRight();
        this.hitLeft();
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    this.hitLeft = function () {
        var leftwing = myGameArea.canvas.width - myGameArea.canvas.width
        if (this.x < leftwing) {
            this.x = leftwing;
        }
    }
    //hit the right side and stops
    this.hitRight = function () {
        var righttwing = myGameArea.canvas.width - this.width
        if (this.x > righttwing) {
            this.x = righttwing;
        }
    }
    /*******************************************************
    Your y-axis is upside down so thats why this makes sense
    ********************************************************/
    this.hitTop = function () {
        var top = myGameArea.canvas.height - myGameArea.canvas.height;
        if (this.y < top) {
            this.y = top;
        }
    }
    /****************************************************************************************************************************************************
     This makes it so when the player hits the bottom of the screen they stay in the field of play. Although Technically its actually hitting the top.
     *****************************************************************************************************************************************************/
    this.hitbottom = function () {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }

}
//Tells the board what to update
function updateGameArea() {
    var x, y;
    /*************************************************************
     Causes falling object to stop game once it connects to player
     **************************************************************/
    for (i = 0; i < FallingObject.length; i += 1) {
        if (myGamePiece.crashWith(FallingObject[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)){
        y = myGameArea.canvas.height;
        minWidth = 20;
        maxWidth = 480;
        //mutiple randoms added to give well more randomness
        width = Math.floor(Math.random()*(maxWidth - minWidth + 1)+ minWidth);
FallingObject.push(new player (10,10, "red", width, 0));
width2 = Math.floor(Math.random()*(maxWidth - minWidth + 1)+ minWidth);
FallingObject.push(new player (10,10, "blue", width2 , 0));
width3 = Math.floor(Math.random()*(maxWidth - minWidth + 1)+ minWidth);
FallingObject.push(new player (10,10, "yellow", width3 , 0));

    }

    //showing all dots
    for (i = 0; i < FallingObject.length; i++) {
        FallingObject[i].update();
        //moving white dots
        FallingObject[i].y = FallingObject[i].y + .5;
    }
    TheScore.text = "SCORE: " + myGameArea.frameNo;
    TheScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

 document.addEventListener("keydown",function(e){
    switch (event.keyCode) {
        case 37: // Left
          moveLeft();
        break;
    
        case 38: // Up
          moveUp();
        break;
    
        case 39: // Right
          moveRight();
        break;
    
        case 40: // Down
          moveDown();
        break;
      }
    }, false);
/*****************************************************
 * Stops from having continuous movement on the board 
  ****************************************************/
    document.addEventListener("keyup",function(e){
        switch (event.keyCode) {
            case 37: 
              clearMove();
            break;
        
            case 38:
              clearMove();
            break;
        
            case 39:
              clearMove();
            break;
        
            case 40: 
              clearMove();
            break;
          }
        }, false);
   
function moveUp() {
    myGamePiece.speedY -= 1;
}

function moveDown() {
    myGamePiece.speedY += 1;
}

function moveLeft() {
    myGamePiece.speedX -= 1;
}

function moveRight() {
    myGamePiece.speedX += 1;
}






//stops object from moving continously in the direction last hit. has to be linked back to html
function clearMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}