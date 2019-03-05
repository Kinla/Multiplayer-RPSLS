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
// Set up watcher tracking
var connectionsRef = database.ref("/connections");

// Set up player list
var playerListRef = database.ref("/playerList");

// Set up player information
var playerDataRef = database.ref("/playerData");

// Set up player queue
var queueRef = database.ref("/queue")

// Set up 

// --------------------------------------------------------------
// Initial Values
var playerList
var maxNumPlayer = 2;
var myname = "me";

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
    var watchers = 0;
    watchers = snapshot.numChildren() - 2

    if (watchers < 0){
        watchers = 0
    }
    $(".watchers").text(watchers);
});

// --------------------------------------------------------------

// Get Name
$("#enterInfo").on("click", function(event){
    event.preventDefault();

    myName = $("#playerName").val().trim();
    if (myName.length > 0){
        $("#greetings").hide();
        $("#game").show();
        setPlayer();
    }

});

//set player
playerListRef.once("value", function(snap){
    myName = $("#playerName").val().trim();
    if (snap === null){
        playerListRef.set
    }
})

// reset function
function resetGame (){
    $("#greetings").show();
    $("#game").hide();
}


/*
// Game data to update when on change in database value (any node)
database.ref().on("value", function(snapshot){
    myName = $("#playerName").val();

    //Assign player
    player0 = snapshot.child("/playerList/0").val();
    player1 = snapshot.child("/plyerList/1").val();

    var playerList = [player0, player1]
    assignPlayer(myName, playerList);

    function assignPlayer(){
        if (player0 === null){
            var me = database.ref("playerList/0").set(myName);
            me.removeOnDisconnect();
        } else if (player1 === null){
            var me = database.ref("playerList/1").set(myName);
            me.removeOnDisconnect();
        }
        
    }

console.log(playerList)


});

/*

function assignPlayer(){
    var i;
    myName = $("#playerName").val();

    for (i; i < maxNUmPlayer; i++){
        if (playerListRef.ref("/" + i) === null) {
            playerListRef
        }


    }
}

//
    /*assignPlayer(myName);
    function assignPlayer(myName) {
        console.log(myName)
        var maxNumPlayer = 2; // max number of player
        var i;  
    
        for (i = 0; i < maxNumPlayer; i++){
            if (queue[i] !== null){
                queue[i] = myName
                return i;
            }; // else you are not assigned a # = not playing
    
            playerList[i] = myName;
            playerListRef.set(playerList);
            
            return playerList
    
        };
    
    };
    queueRef.OnDisconnect().update(playerList[i] = null)
   */

        //setting set player list data and remove from queue --> updates firebase

        // determine "myPlayerNumber"

        // display player name

        // shows either waiting for opponent or waiting

        // render RPSLS buttons if both opponents are registered
        // opponent would just show "making a choice" + "???"
    
    // Play the game
    // loop this until someone's score = 3 first
        // chose your RPSLS -- > updates firebase

        // when both you and opponent have chosen

            // evaluate if you won --> updates firebase

            // display message

            // update score + round # --> updates firebase

    // Replace the game loser with the next one in queue

    // Reove the game loser + move him to back of queue

    // Remove database value when user disconnect
        //queue
        //playerList



// Assign to player 1 or 2 or just watch













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