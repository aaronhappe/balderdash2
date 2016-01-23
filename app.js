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
        var cUser = appVue.initUsername;
        cUser = cUser.toLowerCase();
        cUser = cUser.replace(/[^a-z]/g, ' ');
        cUser = cUser.replace(/\s/g, '');
        cUser = cUser.trim();
        var player1 = {
          playerNum: 1,
          username: appVue.initUsername,
          classUsername: cUser + 1, 
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
        var cUser = appVue.subUsernames;
        cUser = cUser.toLowerCase();
        cUser = cUser.replace(/[^a-z]/g, ' ');
        cUser = cUser.replace(/\s/g, '');
        cUser = cUser.trim();
        player = {
          playerNum: 0,
          username: appVue.subUsernames,
          classUsername: cUser,
          dasher: false,
          score: 0
        };
        switch (this.i) {
          case 2:
            var player2 = player;
            player2.playerNum = this.i;
            player2.classUsername = cUser + 2;
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
            player3.classUsername = cUser +3;
            this.curPlayer.push(player3);
            vars.userProfilesRef.child('player3').set(player3);
            $.cookie("player", this.i);
            vars.curPlayerRef.child('player3').set(appVue.curPlayer[0]);
            appVue.curPlayerCount = 3;
            break;
          case 4:
            var player4 = player;
            player4.playerNum = this.i;
            player4.classUsername = cUser +4;
            this.curPlayer.push(player4);
            vars.userProfilesRef.child('player4').set(player4);
            $.cookie("player", this.i);
            vars.curPlayerRef.child('player4').set(appVue.curPlayer[0]);
            appVue.curPlayerCount = 4;
            break;
          case 5:
            var player5 = player;
            player5.playerNum = this.i;
            player5.classUsername = cUser +5;
            this.curPlayer.push(player5);
            vars.userProfilesRef.child('player5').set(player5);
            $.cookie("player", this.i);
            vars.curPlayerRef.child('player5').set(appVue.curPlayer[0]);
            appVue.curPlayerCount = 5;
            break;
          case 6:
            var player6 = player;
            player6.playerNum = this.i;
            player6.classUsername = cUser +6;
            this.curPlayer.push(player6);
            vars.userProfilesRef.child('player6').set(player6);
            $.cookie("player", this.i);
            vars.curPlayerRef.child('player6').set(appVue.curPlayer[0]);
            appVue.curPlayerCount = 6;
            break;
          case 7:
            var player7 = player;
            player7.playerNum = this.i;
            player7.classUsername = cUser +7;
            this.curPlayer.push(player7);
            vars.userProfilesRef.child('player7').set(player7);
            $.cookie("player", this.i);
            vars.curPlayerRef.child('player7').set(appVue.curPlayer[0]);
            appVue.curPlayerCount = 7;
            break;
          case 8:
            var player8 = player;
            player8.playerNum = this.i;
            player8.classUsername = cUser +8;
            this.curPlayer.push(player8);
            vars.userProfilesRef.child('player8').set(player8);
            $.cookie("player", this.i);
            vars.curPlayerRef.child('player8').set(appVue.curPlayer[0]);
            appVue.curPlayerCount = 8;
            break;
        }
      },
      mainGamePlay: function(curPlayer) {
        $('textarea').hide();
        $('.waiting-div').show();
        $('.waiting-p').show();
        $('.first-go').hide();
        if (!appVue.allPlayersEntered) {
          vars.cardRef.child(curPlayer.playerNum).set({
            playerNum: curPlayer.playerNum,
            username: curPlayer.username,
            classUsername: curPlayer.classUsername,
            dasher: curPlayer.dasher,
            text: appVue.cardText
          });
          appVue.onCardRefChildAdded(curPlayer);
        } else {
          vars.cardRef.child(curPlayer.playerNum).update({
            playerNum: curPlayer.playerNum,
            username: curPlayer.username,
            classUsername: curPlayer.classUsername,
            dasher: curPlayer.dasher,
            text: appVue.cardText
          });
          appVue.onCardRefChildChanged(curPlayer);
        }

      },
      onCardRefChildAdded: function(curPlayer) {
        vars.cardRef.on("child_added", function(snapshot) {
          var snapVal = snapshot.val();
          appVue.sentAll.push(snapVal.playerNum);
          appVue.addCard(curPlayer, snapVal);
        });
      },
      onCardRefChildChanged: function(curPlayer) {
        vars.cardRef.on("child_changed", function(snapshot) {
          var snapVal = snapshot.val();
          appVue.addCard(curPlayer, snapVal);
        });
      },
      addCard: function(curPlayer, snapVal) {
        if (appVue.sentAll.length == appVue.numPlayers) {
          appVue.allSent = true;
        }
        appVue.cards.push(snapVal);
      },
      showVotes: function(card) {
        var userClass = card.classUsername;
        $('span.' + userClass).last('.votes').next('.votes').addClass(
          card.classUsername).css('display', 'inline-block');
        $('span.' + userClass).siblings('span.minus').css('display',
          'inline-block');
      },
      removeVotes: function(card) {
        var userClass = card.classUsername,
          minusClass = $('span.' + userClass).siblings('span.minus');
        $('span.' + userClass).last().hide().removeClass(userClass);
        //I'll figure this out later. Not essential.
        // if(!minusClass.prev('.votes')) {
        //   minusClass.hide();
        // }
      },
      createScore: function(card) {
        $('.voting-container.' + card.classUsername).hide();
        if (card.dasher) {
          this.scoreDasherCard(card);
        } else {
          this.scorePlayersCards(card);
        }
      },
      scoreDasherCard: function(card) {
        var $selectedVotes = $('span.' + card.classUsername +
            ' option:selected'),
          cardUsername = card.username;
        $selectedVotes.each(function() {
          //allocate dashers points
          $self = $(this);
          if ($self.val() == cardUsername) {
            $.each(appVue.players, function(index, value) {
              if (value.username == cardUsername) {
                value.score += 3;
              }
            });
            //allocate players points
          } else if ($self.val() != cardUsername) {
            $.each(appVue.players, function(index, value) {
              if (value.username == $self.val()) {
                value.score += 2;
              }
            });
          }
        });
      },
      scorePlayersCards: function(card) {
        var $selectedVotes = $('span.' + card.classUsername +
            ' option:selected'),
          cardUsername = card.username;
        $selectedVotes.each(function() {
          $self = $(this);
          $.each(appVue.players, function(index, value) {
            if (cardUsername == value.username && $self.val() != cardUsername ) {
              value.score += 1;
            }
          });
        });
      },
      endRound: function() {
        if (appVue.numPlayers == appVue.playersEntered.length) {
          vars.allPlayersEnteredRef.set({
            allEntered: true
          });
        }
        $('button.end-round').hide();
        vars.gameEndRef.update({
          gameEnd: true
        });
        vars.userProfilesRef.set(appVue.players);
        $('.player-cards').hide();
        $('button.restart').css('display', 'block');
      },
      restartRound: function() {
        $('button.restart').hide();
        vars.restartRoundRef.set({
          reset: true
        });
      }
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
    sentAllRef: ref.child('sentAll'),
    gameEndRef: ref.child('gameEnd'),
    restartRoundRef: ref.child('restartRound'),
  };
  var funcs = {
    init: function() {
      vars.gameEndRef.set({
        gameEnd: false
      });
      vars.restartRoundRef.set({
        reset: false
      });
      $('.menu').click(function() {
        $('.menu ul').toggle().parents('div.menu').toggleClass(
          'bg-color');
      });
      $('.restart-game').click(function(e) {
        e.preventDefault();
        $('.restart-modal').show();
        $('.restart-modal button.yesRemove').click(function() {
          ref.remove();
        });
        $('.restart-modal button.noRemove').click(function() {
          $('.restart-modal').hide();
        });
      });
      $('.intro-check button').click(function() {
        $('.intro-check').hide();
        $('body').removeClass('introBG');
      });;
      vars.numPlayersRef.on("value", function(snapshot) {
        funcs.dasherEntered(snapshot);
      });
      funcs.onUserProfilesRefChildAdded();
      funcs.refreshReset();
      funcs.mainGamePlay();
    },
    onUserProfilesRefChildAdded: function() {
      vars.userProfilesRef.on("child_added", function(snapshot) {
        if (!appVue.allPlayersEntered) {
          funcs.initPlayersVue(snapshot);
        }
      });
    },
    refreshReset: function() {
      vars.allPlayersEnteredRef.on("value", function(snapshot) {
        var existsSnapA = snapshot.exists(),
          snapValA = snapshot.val();
        if (existsSnapA) {
          appVue.allPlayersEntered = true;
        }
        vars.curPlayerRef.on("value", function(snapshot) {
          if (existsSnapA) {
            if (snapValA.allEntered == true && !appVue.curPlayer.length) {
              appVue.allPlayersEntered = true;
              snapshot.forEach(function(childSnapshot) {
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
    dasherEntered: function(snapshot) {
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
    initPlayersVue: function(snapshot) {
      var playersEntered = snapshot.val();
      if (appVue.playersEntered.length < appVue.numPlayers) {
        appVue.playersEntered.push(playersEntered.playerNum);
      }
      if (appVue.playersEntered.length == appVue.numPlayers) {
        $.each(appVue.playersCounts, function(index, value) {
          index = index + 1;
          vars.userProfilesRef.child('player' + index).on("value",
            function(snapshot) {
              if (!appVue.allPlayersEntered) {
                appVue.players.push(snapshot.val());
              }
            });
        });
      }
    },
    mainGamePlay: function() {
      $('game-setup').hide();
      funcs.onGameEndRefChildChanged();
    },
    onGameEndRefChildChanged: function() {
      var snapValGameEnd
      vars.gameEndRef.on('value', function(snapshot) {
        snapValGameEnd = snapshot.val();
        if (snapValGameEnd.gameEnd) {
          appVue.gameEnd = true;
          $('.waiting-p').hide();
          $('.final-score').show();
        }
      });
      vars.userProfilesRef.on('value', function(snapshot) {
        if (snapValGameEnd.gameEnd) {
          appVue.players = [];
          snapshot.forEach(function(childSnapshot) {
            appVue.players.push(childSnapshot.val());
          });
        }
        // $('.waiting-p').hide();
        var curPlayerNumb = appVue.curPlayer[0];
        $.each(appVue.players, function(index, value) {
          if (value.playerNum == curPlayerNumb.playerNum) {
            curPlayerNumb.score = value.score;
          }
        });
      });
      funcs.restartRound();
    },
    restartRound: function() {
      vars.restartRoundRef.on('value', function(snapshot) {
        snapVal = snapshot.val();
        if (snapVal.reset == true) {
          appVue.sentAll = [];
          $('.game-play .dasher-card').show();
          $('.game-play .player-card').show();
          $('.game-play .first-go').show();
          $('.final-score').hide();
          $('textarea').show();
          appVue.restart = true;
          appVue.allSent = false;
          appVue.cardText = "";
          appVue.cards = [];
          appVue.sentAll = [];
          vars.cardRef.remove();
          if (appVue.restart) {
            $.each(appVue.players, function(index, value) {
              vars.userProfilesRef.child(index).update({
                score: 0
              });
              if (value.dasher) {
                vars.userProfilesRef.child(index).update({
                  dasher: false
                });
                var newDash = index,
                  dashSet = false;
                if (index + 1 >= appVue.numPlayers) {
                  newDash = 0;
                } else {
                  newDash = index + 1;
                }
                switch (newDash) {
                  case 0:
                    dashSet = true;
                    vars.userProfilesRef.child(0).update({
                      dasher: true
                    });
                    break;
                  case 1:
                    dashSet = true;
                    vars.userProfilesRef.child(1).update({
                      dasher: true
                    });
                    break;
                  case 2:
                    dashSet = true;
                    vars.userProfilesRef.child(2).update({
                      dasher: true
                    });
                    break;
                  case 3:
                    dashSet = true;
                    vars.userProfilesRef.child(3).update({
                      dasher: true
                    });
                    break;
                  case 4:
                    dashSet = true;
                    vars.userProfilesRef.child(4).update({
                      dasher: true
                    });
                    break;    
                  case 5:
                    dashSet = true;
                    vars.userProfilesRef.child(5).update({
                      dasher: true
                    });
                    break;   
                  case 6:
                    dashSet = true;
                    vars.userProfilesRef.child(6).update({
                      dasher: true
                    });
                    break;
                  case 7:
                    dashSet = true;
                    vars.userProfilesRef.child(7).update({
                      dasher: true
                    });
                    break;                   
                }
              }
              vars.userProfilesRef.on("value", function(snapshot) {
                if (dashSet) {
                  var myCurPlayer = appVue.curPlayer[0];
                  appVue.players.length = 0;
                  snapshot.forEach(function(childSnapshot) {
                    appVue.players.push(childSnapshot.val());
                  })
                  $.each(appVue.players, function(index,
                    value) {
                    if (myCurPlayer.playerNum == index +
                      1) {
                      myCurPlayer.score = 0;
                      myCurPlayer.dasher = value.dasher;
                    }
                  });
                }
              });
              dashSet = false;
            });
          }
        }
        appVue.gameEnd = false;
        vars.gameEndRef.set({
          gameEnd: false
        });
        vars.restartRoundRef.update({
          reset: false
        });
        appVue.restart = false;
      });
    },
  };
  funcs.init();
})();