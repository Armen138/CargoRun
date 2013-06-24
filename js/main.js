/*jshint newcap:false, nonew:true */
/*global console */
require(["game",
        "canvas",
        "resources",
        "menu",        
        "play",
        "gl",
        "gui/modal",
        "gui/element",
        "gui/label",
        "gui/badge",        
        ],
    function(
            game,
            Canvas,
            Resources,
            Menu,
            Play,
            gl,
            Modal,
            Element,
            Label,
            Badge
            ) {
    "use strict";
     var screenSize = { width: window.innerWidth,
                     height: window.innerHeight};

    Canvas.size(screenSize);
    Canvas.clear("black");

    var highscores = JSON.parse(localStorage.getItem("highscores") || "[]") ;

    var play = Play(gl);

    Resources.on("load", function() {
        console.log("loaded");
        game.run();
    });

    Resources.load({
        "grass": "images/grass.png",
        "dirt": "images/dirt.png",
        "grid": "images/grid.png",
        "bricks": "images/bricks.png",
        "music": "audio/music.mp3",
        "boop": "audio/boop.ogg",
        "select": "audio/select.ogg",
        "ship": "3d/ship3.js",
        "fuel": "3d/fuel.js"
    });

    play.on("menu", function() {
        game.state = paused;
    });
    play.on("gameover", function(score) {
        function addScore(name, score) {            
            highscores.push({name: name, score: score});
            highscores.sort(function(a, b) {
                return b.score - a.score;
            });
            if(highscores.length > 10) {
                highscores.length = 10;
            }
            localStorage.setItem("highscores", JSON.stringify(highscores));            
        }
        game.state = winner;
        var currentName = localStorage.getItem("name") || "";

        if(highscores.length < 9 || score > highscores[highscores.length - 1].score) {
            if(navigator.isCocoonJS) {
                var onText = function(text) {
                    addScore(text, score);
                    localStorage.setItem("name", text);
                    CocoonJS.App.onTextDialogFinished.removeEventListener(onText)
                    Resources.music.stop();
                }
                CocoonJS.App.showTextDialog("new high score!", "enter your name", currentName, CocoonJS.App.KeyboardType.TEXT, "cancel", "submit");    
                CocoonJS.App.onTextDialogFinished.addEventListener(onText);
            } else {
                var name = prompt("enter your name");            
                addScore(name, score);
            }            
        }
    });
    var levels = [ "intro", "level1", "level2" ];
    var currentLevel = 0;
    var winScreen = Modal({ width: 400, height: 360 });
    winScreen.add(Label("Level Complete"));
    var retry = Label("replay", { position: {X: 40, Y: 320}, fontSize: 22});
    var cntinue = Label("continue", { position: {X: 360, Y: 320}, fontSize: 22});
    retry.on("click", function() {
        Resources.select.play();
        play.respawn();
        game.state = play;
    });
    cntinue.on("click", function() {
        console.log("continue ...");
        Resources.select.play();
        currentLevel++;
        if(currentLevel >= levels.length) {
            currentLevel = 0;
        }
        play.level = levels[currentLevel];
        play.respawn();
        game.state = play;
    });

    var badges = {
        ghost: Badge({
            position: { X: 30, Y: 80 },
            size: { width: 48, height: 48 },
            image: Resources.badge,
            title: "Ghost",
            description: "Finished level without being seen"
        }),
        pacifist: Badge({
            position: { X: 30, Y: 160 },
            size: { width: 48, height: 48 },
            image: Resources.rose,
            title: "Pacifist",
            description: "Finished level without killing anyone"
        }),
        butcher: Badge({
            position: { X: 30, Y: 240 },
            size: { width: 48, height: 48 },
            image: Resources.grimreaper,
            title: "Butcher",
            description: "Killed them all."
        })        
    };

    winScreen.add(retry);
    winScreen.add(cntinue);
    winScreen.add(badges.ghost);
    winScreen.add(badges.pacifist);
    winScreen.add(badges.butcher);
    var credits = {
        init: function() {
            credits.content = [
                "Programming",
                "Armen138",
                "Music",
                "TBD",
                "Graphics",
                "Armen138"
            ];
        },
        run: function() {
            Canvas.clear("black");
            Canvas.context.fillStyle = "white";
            Canvas.context.font = "24px GputeksRegular";
            Canvas.context.textAlign = "center";
            for(var i = 0; i < credits.content.length; i++) {
                Canvas.context.font = i % 2 === 0 ? "12px Arial" : "24px GputeksRegular";
                Canvas.context.fillText(credits.content[i], 162, i * 30 + 30);
            }
            Canvas.context.textAlign = "left";
        },
        clear: function(cb) {
            Resources.select.play();
            cb();
        },
        click: function(mouse) {
            game.state = home;
        }        
    };
    var scores = {
        init: function() {
            //no init
        },
        run: function() {
            Canvas.clear("black");
            Canvas.context.fillStyle = "white";
            Canvas.context.font = "24px GputeksRegular"
            for(var i = 0; i < highscores.length; i++) {
                Canvas.context.textAlign = "left";
                Canvas.context.fillText((i + 1), 20, i * 30 + 30);
                Canvas.context.textAlign = "center";
                Canvas.context.fillText(highscores[i].name, 162, i * 30 + 30);
                Canvas.context.textAlign = "right";
                Canvas.context.fillText(highscores[i].score, 304, i * 30 + 30);
            }
            Canvas.context.textAlign = "left";
        },
        clear: function(cb) {
            Canvas.clear("black");
            Resources.select.play();
            cb();
        },
        click: function(mouse) {
            game.state = home;
        }
    };
    var gameover = Menu(Canvas.element, [
            {
                label: "Restart",
                action: function() {
                    play.reset();
                    game.state = play;
                }
            },
            {
                label: "Menu",
                action: function() {
                    game.state = home;
                }
            }
        ], Resources.gameover);

    var winner = Menu(Canvas.element, [
            {
                label: "Restart",
                action: function() {
                    Resources.select.play();
                    play.reset();
                    game.state = play;
                }
            },
            {
                label: "Menu",
                action: function() {
                    Resources.select.play();
                    game.state = home;
                }
            },
            {
                label: "Highscores",
                action: function() {
                    Resources.select.play();
                    game.state = scores;                    
                }
            }             
        ], Resources.winner);

    var paused = Menu(Canvas.element, [
            {
                label: "Resume",
                action: function() {
                    Resources.select.play();
                    //Resources.select.play();
                    //play.getWorld().pausetime = paused.lifetime;
                    game.state = play;
                }
            },
            {
                label: "Menu",
                action: function() {
                    Resources.select.play();
                    //Resources.select.play();
                    game.state = home;
                }
            }
        ]);
    var home = Menu(Canvas.element, [
            {
                label: "Play",
                action: function() {
                    Resources.select.play();
                    play.reset();
                    game.state = play;                    
                }
            },
            {
                label: "Credits",
                action: function() {
                    Resources.select.play();
                   // Resources.select.play();
                    // document.getElementById("credits").style.display = "block";
                    //console.log("show credits");
                    game.state = credits;
                }
            },
            {
                label: "Highscores",
                action: function() {
                    Resources.select.play();
                    game.state = scores;                    
                }
            },            
        ], Resources.logo);

    window.addEventListener("blur", function() {
        if(game.state == play) {
            game.state = paused;
        }
    });


    game.paused = paused;
    game.state = home;
});
