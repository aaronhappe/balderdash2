(function() {
	var appVue = new Vue({
		el: "#app",
		data: {
      i: 2,
      numPlayers: 3,
      trueDasher: false,
      falseDasher: false,
      allPlayersEntered: false,
      initUsername: '',
      subUsernames: '',
      playersCounts: [],
      curPlayer: [],
      playersEntered: [],
      players: [],
		},
		methods: {
			numplayers: function() {
				vars.numPlayersRef.set({
					numberPlayers: appVue.numPlayers
				});
        this.initDasher();
			},
      initDasher: function() {
        var player1 = {
          playerNum: 1,
          username: appVue.initUsername,
          dasher: true,
          score: 0
        };
        appVue.curPlayer.push(player1);
        var player1Ref = vars.userProfilesRef.child('player1').set(
          player1);
          // if (!appVue.allPlayersEntered) {
          	vars.curPlayerRef.child('player1').set(appVue.curPlayer[0]);
          	$.cookie("player", 1);
          // }
        $('.game-play').show();
      },
      initPlayers: function() {
	      $('.game-play').show();
	      $('.not-dasher').hide();
      	var curPlayerCount = 1;
        player = {
          playerNum: 0,
          username: this.subUsernames,
          dasher: false,
          score: 0
        };
        switch (this.i) {
          case 2:
            var player2 = player;
            player2.playerNum = this.i;
            this.curPlayer.push(player2);
            vars.userProfilesRef.child('player2').set(player2);
          if (!appVue.allPlayersEntered) {
          	vars.curPlayerRef.child('player2').set(appVue.curPlayer[0]);
          	curPlayerCount = 2;
          	$.cookie("player", 2);
          }
            break;
          case 3:
            var player3 = player;
            player3.playerNum = this.i;
            this.curPlayer.push(player3);
            vars.userProfilesRef.child('player3').set(player3);
          if (!appVue.allPlayersEntered) {
          	vars.curPlayerRef.child('player3').set(appVue.curPlayer[0]);
          	curPlayerCount = 3;
          	$.cookie("player", 3);
          }           
            break;
          case 4:
            var player4 = player;
            player4.playerNum = this.i;
            this.curPlayer.push(player4);
            vars.userProfilesRef.child('player4').set(player4);
          if (!appVue.allPlayersEntered) {
          	vars.curPlayerRef.child('player4').set(appVue.curPlayer[0]);
          	curPlayerCount = 4;
          }    
            break;
          case 5:
            var player5 = player;
            player5.playerNum = this.i;
            this.curPlayer.push(player5);
            vars.userProfilesRef.child('player5').set(player5);
          if (!appVue.allPlayersEntered) {
          	vars.curPlayerRef.child('player5').set(appVue.curPlayer[0]);
          	curPlayerCount = 5;
          }          
            break;
          case 6:
            var player6 = player;
            player6.playerNum = this.i;
            this.curPlayer.push(player6);
            vars.userProfilesRef.child('player6').set(player6);
          if (!appVue.allPlayersEntered) {
          	vars.curPlayerRef.child('player6').set(appVue.curPlayer[0]);
          	curPlayerCount = 6;
          }          
            break;
          case 7:
            var player7 = player;
            player7.playerNum = this.i;
            this.curPlayer.push(player7);
            vars.userProfilesRef.child('player7').set(player7);
          if (!appVue.allPlayersEntered) {
          	vars.curPlayerRef.child('player7').set(appVue.curPlayer[0]);
          	curPlayerCount = 7;
          }           
            break;
          case 8:
            var player8 = player;
            player8.playerNum = this.i;
            this.curPlayer.push(player8);
            vars.userProfilesRef.child('player8').set(player8);
          if (!appVue.allPlayersEntered) {
          	vars.curPlayerRef.child('player8').set(appVue.curPlayer[0]);
          	curPlayerCount = 8;
          }          
            break;
        }
	        if(appVue.numPlayers == curPlayerCount) {
        		vars.allPlayersEnteredRef.set({allEntered: true});
        		funcs.mainGamePlay();
        		appVue.allPlayersEntered = true;
	        }
      },
      mainGamePlay: function() {

      },

		}, 

	}); 
	var ref = new Firebase("https://balderdash2.firebaseio.com/");
	var vars = {
    userProfilesRef: ref.child('usersProfiles'),
    numPlayersRef: ref.child('numPlayers'),
    playerCountsRef: ref.child('playerCounts'),
    curPlayerRef: ref.child("curPlayer"),
    allPlayersEnteredRef: ref.child("allPlayersEntered"),

	};
	var funcs = {
		init: function(){
			vars.allPlayersEnteredRef.on("value", function(snapshot){
				var existsSnapA = snapshot.exists(),
				snapValA = snapshot.val();
				vars.curPlayerRef.on("value", function(snapshot){
					if (existsSnapA) {
						if (snapValA.allEntered == true && !appVue.curPlayer.length) {
							snapshot.forEach(function(childSnapshot){
								var childSnapVal = childSnapshot.val(),
								cookieVal = $.cookie("player");
								console.log(childSnapVal.playerNum);
								console.log(cookieVal);
								if (cookieVal == childSnapshot.playerNum) {
									appVue.curPlayer.push(childSnapVal);
									console.log(childSnapVal);
								}

								if ("3" == 3) {
									console.log("omg");
								}
							});
						}
					}
				});
			});
      vars.numPlayersRef.on("value", function(snapshot) {
				funcs.dasherEntered(snapshot);
      });
      $('.intro-check button').click(function() {
        $('.intro-check').hide();
        $('body').removeClass('introBG');
      });
      funcs.onUserProfilesRefChildAdded();
		},
		dasherEntered: function(snapshot){
      var existsSnap = snapshot.exists();
      if (existsSnap) {
        var valA = snapshot.val();
        appVue.numPlayers = valA.numberPlayers;

        for (var i = 1; i <= appVue.numPlayers; i++) {
          appVue.playersCounts.push({
            playerNum: i
          });
        }
        vars.playerCountsRef.set(appVue.playersCounts);
        $('.dasher').hide();
        $('.not-dasher').show();
        $('.intro-check').hide();
        $('body').removeClass('introBG');
      }
		},
		onUserProfilesRefChildAdded: function(){
	    vars.userProfilesRef.on("child_added", function(snapshot) {
	    	if (!appVue.allPlayersEntered) {
	    		funcs.initPlayersVue(snapshot);    		
	    	}
	    });
		},
		initPlayersVue: function(snapshot){
      var playersEntered = snapshot.val();
      if (appVue.playersEntered.length < appVue.numPlayers){
        appVue.playersEntered.push(playersEntered.playerNum);   
      }

      if (appVue.playersEntered.length == appVue.numPlayers) {
        $.each(appVue.playersCounts, function(index, value) {
          index = index + 1;
          vars.userProfilesRef.child('player' + index).on("value", function(snapshot) {
          	if (!appVue.allPlayersEntered) {
              appVue.players.push(snapshot.val());
          	}
          });
        });
      }
		},
		mainGamePlay: function(){

		},

	};
  funcs.init();
})();
