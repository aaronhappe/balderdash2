(function() {
	var appVue = new Vue({
		el: "#app",
		data: {
      i: 2,
      numPlayers: 3,
      allSent: false,
      trueDasher: false,
      falseDasher: false,
      allPlayersEntered: false,
      curPlayerCount: 1,
      initUsername: '',
      subUsernames: '',
      playersCounts: [],
      curPlayer: [],
      playersEntered: [],
      players: [],
      cardText: '',
      cards: [],
      sentAll: [],
      gameEnd: false,
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
        $.cookie("player", 1);
        if (!appVue.allPlayersEntered) {
        	vars.curPlayerRef.child('player1').set(appVue.curPlayer[0]);
        }
        $('.game-play').show();
      },
      initPlayers: function() {
	      $('.game-play').show();
	      $('.not-dasher').hide();
      	
        player = {
          playerNum: 0,
          username: this.subUsernames,
          dasher: false,
          score: 0
        };
        console.log(this.i);
        switch (this.i) {
          case 2:
            var player2 = player;
            player2.playerNum = this.i;
            this.curPlayer.push(player2);
            vars.userProfilesRef.child('player2').set(player2);
            $.cookie("player", this.i);
          if (!appVue.allPlayersEntered) {
          	vars.curPlayerRef.child('player2').set(appVue.curPlayer[0]);
          	appVue.curPlayerCount = 2;
          }
            break;
          case 3:
            var player3 = player;
            player3.playerNum = this.i;
            this.curPlayer.push(player3);
            vars.userProfilesRef.child('player3').set(player3);
          	$.cookie("player", this.i);
          	vars.curPlayerRef.child('player3').set(appVue.curPlayer[0]);
          	appVue.curPlayerCount = 3;        
            break;
          case 4:
            var player4 = player;
            player4.playerNum = this.i;
            this.curPlayer.push(player4);
            vars.userProfilesRef.child('player4').set(player4);
          	$.cookie("player", this.i);
          	vars.curPlayerRef.child('player4').set(appVue.curPlayer[0]);
          	appVue.curPlayerCount = 4;   
            break;
          case 5:
            var player5 = player;
            player5.playerNum = this.i;
            this.curPlayer.push(player5);
            vars.userProfilesRef.child('player5').set(player5);
            $.cookie("player", this.i);
          	vars.curPlayerRef.child('player5').set(appVue.curPlayer[0]);
          	appVue.curPlayerCount = 5;        
            break;
          case 6:
            var player6 = player;
            player6.playerNum = this.i;
            this.curPlayer.push(player6);
            vars.userProfilesRef.child('player6').set(player6);
            $.cookie("player", this.i);
          	vars.curPlayerRef.child('player6').set(appVue.curPlayer[0]);
          	appVue.curPlayerCount = 6;        
            break;
          case 7:
            var player7 = player;
            player7.playerNum = this.i;
            this.curPlayer.push(player7);
            vars.userProfilesRef.child('player7').set(player7);
            $.cookie("player", this.i);
          	vars.curPlayerRef.child('player7').set(appVue.curPlayer[0]);
          	appVue.curPlayerCount = 7;        
            break;
          case 8:
            var player8 = player;
            player8.playerNum = this.i;
            this.curPlayer.push(player8);
            vars.userProfilesRef.child('player8').set(player8);
            $.cookie("player", this.i);
          	vars.curPlayerRef.child('player8').set(appVue.curPlayer[0]);
          	appVue.curPlayerCount = 8;       
            break;
        }
        		// funcs.mainGamePlay();
      },
      mainGamePlay: function(curPlayer) {
        $('.input-card').hide();
        $('.waiting-div').show();
				if(appVue.numPlayers == appVue.curPlayerCount) {
	    		vars.allPlayersEnteredRef.set({allEntered: true});
	    	}
	    	appVue.allPlayersEntered = true; 
      	appVue.onCardRefChildAdded(curPlayer);
        vars.cardRef.child(curPlayer.playerNum).set({ playerNum: curPlayer.playerNum, username: curPlayer.username, dasher: curPlayer.dasher, text: appVue.cardText });
      },
			onCardRefChildAdded: function(curPlayer){
	      vars.cardRef.on("child_added", function(snapshot){
	      	var snapVal = snapshot.val();
	      	appVue.addCard(curPlayer, snapVal);
	      });
			},
      addCard: function(curPlayer, snapVal) {
	      if (appVue.sentAll.length < appVue.numPlayers) {
	        $.each(appVue.playersCounts, function(index, value){
	          if (value.playerNum == curPlayer.playerNum){
	            appVue.sentAll.push(value.playerNum);
	          }
	        });
	        if (appVue.sentAll.length == appVue.numPlayers) {
	          appVue.allSent = true;
	        }
	        	console.log(snapVal); 
	        	appVue.cards.push(snapVal);       	
	      }
      },
      showVotes: function(card){
        var userClass = card.username;  
        $('span.' + userClass).last('.votes').next('.votes').addClass(card.username).css('display', 'inline-block');
        $('span.' + userClass).siblings('span.minus').css('display', 'inline-block');
      },
      removeVotes: function(card){
        var userClass = card.username,
        minusClass = $('span.' + userClass).siblings('span.minus');

        $('span.' + userClass).last().hide().removeClass(userClass);

        //I'll figure this out later. Not essential.
        // if(!minusClass.prev('.votes')) {
        //   minusClass.hide();
        // }
      },
      createScore: function(card){

        $('.voting-container.' + card.username ).hide();

        if(card.dasher) {
          this.scoreDasherCard(card);
        } else {
          this.scorePlayersCards(card);
        }
      },
      scoreDasherCard: function(card){
        var $selectedVotes = $('span.' + card.username + ' option:selected'),
        cardUsername = card.username;
        
        $selectedVotes.each(function(){
          //allocate dashers points
          $self = $(this);
          if($self.val() == cardUsername){
            $.each(appVue.players, function( index, value){
              if (value.username == cardUsername) {
                value.score += 3;
              }
            });
          //allocate players points
          } else if ($self.val() != cardUsername) {
            $.each(appVue.players, function( index, value){
              if (value.username == $self.val()) {
                value.score += 2;
              }
            });
          }
        });       
      },
      scorePlayersCards: function(card){
          var $selectedVotes = $('span.' + card.username + ' option:selected'),
          cardUsername = card.username;
          $selectedVotes.each(function(){
            $self = $(this);
            $.each(appVue.players, function( index, value){
              if (cardUsername == value.username) {
                value.score += 1;
              }
            });
          });
      },
      endRound: function(){
        $('button.end-round').hide();
        vars.userProfilesRef.set(appVue.players);
        vars.gameEndRef.set({gameEnd: true});
        appVue.gameEnd = true;
        $('.player-cards').hide();
        $('button.restart').show();
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
    cardRef: ref.child('card'),
    gameEndRef: ref.child('gameEnd'),
    restartRoundRef: ref.child('restartRound'),
	};
	var funcs = {
		init: function(){

			$('.menu').click(function(){
				$('.menu ul').toggle().parents('div.menu').toggleClass('bg-color');
			});

			$('.restart-game').click(function(e){
				e.preventDefault();
				$('.restart-modal').show();
				$('.restart-modal button.yesRemove').click(function(){
					ref.remove();
				});
				$('.restart-modal button.noRemove').click(function(){
					$('.restart-modal').hide();
				});
			});

			$('.intro-check button').click(function() {
        $('.intro-check').hide();
        $('body').removeClass('introBG');
      });

      funcs.refreshReset();

      vars.numPlayersRef.on("value", function(snapshot) {
				funcs.dasherEntered(snapshot);
      });

      funcs.onUserProfilesRefChildAdded();
		},
		onUserProfilesRefChildAdded: function(){
	    vars.userProfilesRef.on("child_added", function(snapshot) {
	    	if (!appVue.allPlayersEntered) {
	    		console.log('called');
	    		funcs.initPlayersVue(snapshot);    		
	    	}
	    });
		},
		refreshReset: function() {
			vars.allPlayersEnteredRef.on("value", function(snapshot){
				var existsSnapA = snapshot.exists(),
				snapValA = snapshot.val();
				vars.curPlayerRef.on("value", function(snapshot){
					if (existsSnapA) {
						if (snapValA.allEntered == true && !appVue.curPlayer.length) {
							appVue.allPlayersEntered = true;

							snapshot.forEach(function(childSnapshot){
								var childSnapVal = childSnapshot.val(),
								cookieVal = $.cookie("player");
								if (cookieVal == childSnapVal.playerNum) {
									appVue.curPlayer.push(childSnapVal);
								}
							});
							funcs.mainGamePlay();
						}
					}
				});
			});
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
        $('.hold-up').hide();
        $('.intro-check').hide();
        $('body').removeClass('introBG');
      }
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
          		console.log('called');
              appVue.players.push(snapshot.val());
          	}
          });
        });
      }
		},
		mainGamePlay: function(){
			$('game-setup').hide();
			funcs.onGameEndRefChildChanged();
		},
		onGameEndRefChildChanged: function(){
      vars.gameEndRef.on('child_changed', function(snapshot){
        if (snapshot.val() == true) {
        	appVue.gameEnd = true;
          console.log('called end game');
           vars.userProfilesRef.on('value', function(snapshot){
            console.log('here? 1');
            appVue.players = [];
            var objVal = snapshot.val();
            snapshot.forEach(function(childSnapshot){
              appVue.players.push(childSnapshot.val());
            });
          });
           console.log('here? 2');
          // $('.game-play .waiting-div').show();
          $('.waiting-p').hide();
          var curPlayerNumb = appVue.curPlayer[0];
          
          $.each(appVue.players, function(index, value){
            if (value.playerNum == curPlayerNumb.playerNum) {
              curPlayerNumb.score = value.score;
            }
          }); 
          vars.gameEndRef.set({gameEnd: false});        
        }
      });
		}

	};
  funcs.init();
})();
