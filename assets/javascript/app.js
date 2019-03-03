// Initialize Firebase
var config = {
    apiKey: "AIzaSyCEaNxmB52HVvZIjK7JXK8R-hPGL9wVLkk",
    authDomain: "multiplayer-rps-3a3e3.firebaseapp.com",
    databaseURL: "https://multiplayer-rps-3a3e3.firebaseio.com",
    projectId: "multiplayer-rps-3a3e3",
    storageBucket: "",
    messagingSenderId: "396364813584"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// --------------------------------------------------------------
// Link to Firebase Database for viewer tracking
var connectionsRef = database.ref("/connections");

// Link to Firebase Database for player information
var playerDataRef = database.ref("/playerData");

// Link to Firebase Database to set up player list
var playerListRef = database.ref("/playerListRef")

// --------------------------------------------------------------
// Initial Values
var maxNumPlayer = 2; // max number of player
var watchers = 0; // number of people who joined the game but is not playing

// --------------------------------------------------------------

// Add ourselves to presence list when online.
var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function(snap) {
    if (snap.val()) {
        var con = connectionsRef.push(true);
        con.onDisconnect().remove();
    }
}); 

// Number of watchers is the number of connections minus 2
connectionsRef.on("value", function(snapshot) {
    watchers = snapshot.numChildren() - 2

    if (watchers < 0){
        watchers = 0
    }
    $(".watchers").text(watchers);
});

// --------------------------------------------------------------

// Assign player
$("#enterInfo").on("click", function(event){
    event.preventDefault();

    myName = $("#nameSubmit").text().trim();

    if(playerList === null)

    assignPlayer(myName);
    
    $("#greetings").hide();

});

// Assign to player 1 or 2 or just watch
function assignPlayer() {
      playerListRef.transaction(function(playerList) {
      var i;

      if (playerList === null) {
        playerList = [];
      };

      var joinedGame = false;
      for(i = 0; i < maxNumPlayer; i++) {
        if (playerList[i] === myName) {
          return;
        }
        else if (!(i in playerList) && !joinedGame) {
          playerList[i] = myName;
          joinedGame = true;
          break;
        }
      };
      if (joinedGame) {
        return playerList;
      };
    }, function (success, transactionResultSnapshot) {
      var myPlayerNumber = null,
          resultPlayerList = transactionResultSnapshot
      for(var i = 0; i < maxNumPlayer; i++) {
        if (resultPlayerList[i] === myName) {
          myPlayerNumber = i;
          break;
        };
      };

      //playerListRef.child(myPlayerNumber).removeOnDisconnect();
      //playGame(myPlayerNumber, myUserId);
    });
  }













/*

function go() {
    var userId = $("#playerName");

    var gameRef = new Firebase(GAME_LOCATION);
    assignPlayerNumberAndPlayGame(userId, gameRef);
};
  
// The maximum number of players.  If there are already 
// NUM_PLAYERS assigned, users won"t be able to join the game.
var NUM_PLAYERS = 2;

// The root of your game data.
var GAME_LOCATION = "https://multiplayer-rps-3a3e3.firebaseio.com/";

// A location under GAME_LOCATION that will store the list of 
// players who have joined the game (up to MAX_PLAYERS).
var PLAYERS_LOCATION = [];

// A location under GAME_LOCATION that you will use to store data 
// for each player (their game state, etc.)
var PLAYER_DATA_LOCATION = {};


// Called after player assignment completes.
function playGame(myPlayerNumber, userId, justJoinedGame, gameRef) {
    var playerDataRef = gameRef.child(PLAYER_DATA_LOCATION).child(myPlayerNumber);

    if (justJoinedGame) {
        playerDataRef.set({userId: userId, state: "game state"});
    }
    }

    // Use transaction() to assign a player number, then call playGame().
    function assignPlayerNumberAndPlayGame(userId, gameRef) {
    var playerListRef = gameRef.child(PLAYERS_LOCATION);
    var myPlayerNumber, alreadyInGame = false;

    playerListRef.transaction(function(playerList) {
        if (playerList === null) {
            playerList = [];
        }

        for (var i = 0; i < playerList.length; i++) {
            if (playerList[i] === userId) {
                alreadyInGame = true;
                myPlayerNumber = i; 
                return;
            }
        };

        if (i < NUM_PLAYERS) {
            playerList[i] = userId;  
            myPlayerNumber = i; 
            return playerList;
        };

        myPlayerNumber = null;
    }, function (error, committed) {
        if (committed || alreadyInGame) {
        playGame(myPlayerNumber, userId, !alreadyInGame, gameRef);
        } 
    });
};

//function to determine if player has won lose, draw in this round
// Based on rock, paper, sissor, lizard, spock logic
function winLoss(myChoice, oppoChoice){
    switch(myChoice) {
    case "rock":
      switch(oppoChoice) {
            case "rock":
                return "draw";
            case "paper":
                return "lose";
            case "scissors":
                return "win";
            case "lizard":
                return "win";
            case "spock":
                return "lose";
        };
        break;
    case "paper":
        switch(oppoChoice) {
            case "rock":
                return "win";
            case "paper":
                return "draw";
            case "scissors":
                return "lose";
            case "lizard":
                return "lose";
            case "spock":
                return "win";
        };
        break;
    case "scissors":
        switch(oppoChoice) {
            case "rock":
                return "lose";
            case "paper":
                return "win";
            case "scissors":
                return "draw";
            case "lizard":
                return "win";
            case "spock":
                return "lose";
        };
        break;
    case "lizard":
        switch(oppoChoice) {
            case "rock":
                return "lose";
            case "paper":
                return "win";
            case "scissors":
                return "lose";
            case "lizard":
                return "draw";
            case "spock":
                return "win";
        };
        break;
    case "spock":
        switch(oppoChoice) {
            case "rock":
                return "win";
            case "paper":
                return "lose";
            case "scissors":
                return "win";
            case "lizard":
                return "lose";
            case "spock":
                return "draw";
        };
        break;
    };
};



*/