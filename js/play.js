/*jshint newcap:false, nonew:true */
/*global console, alert */
define("play", [
        "canvas",
        "resources",
        "keys",
        "events",
        "ship",
        "fuel",
        "stars",
        "world"
    ],function(Canvas,
            Resources,
            keys,
            Events,
            Ship,
            Fuel,
            Stars,
            World) {
    "use strict";
    var last = 0;    
    var Play = function(gl) {        
        var play = {
            init: function() {
                console.log("glinit");                
                if(!play.light) {
                    play.ship = Ship(gl.scene, gl.camera);
                    play.world = World(gl.scene, play.ship);
                    play.fuel = [];
                    play.stars = Stars(gl.scene, play.ship);
                    for(var i = 0; i < 10; i++) {
                        play.fuel.push(Fuel(gl.scene, new THREE.Vector3(Math.random() * 250 - 125, Math.random() * 1000, 0)));    
                    }
                    
                    var pointLight = new THREE.PointLight(0xFFFFFF);//, 1.0, 1200, 120, 1);

                    // set its position
                    pointLight.position.x = 0;
                    pointLight.position.y = 0;
                    pointLight.position.z = 0;
                    // pointLight.castShadow = true;

                    play.light = pointLight;
                    // add to the scene
                    gl.camera.add(pointLight); 
                    gl.camera.position.y = -200;
                    gl.camera.position.z = 100;
              
                }
            },
            run: function() {
                var now = Date.now();
                play.world.update(now - last);
                play.stars.update();
                play.ship.update(now - last);
                for(var i = 0; i < play.fuel.length; i++) {
                    play.fuel[i].update(now - last);
                }
                gl.renderer.render(gl.scene, gl.camera);
                last = now;
            },
            clear: function(cb) {
                cb();
            },
            reset: function() {
                gl.scene.remove(play.ship);                
            },
            keydown: function(which) {
                switch(which) {
                    case keys.RIGHT:
                        play.ship.control.right = true;
                        break;
                    case keys.LEFT:
                        play.ship.control.left = true;
                        break;
                    case keys.UP:
                        play.ship.control.up = true;
                        break;
                    case keys.DOWN:
                        play.ship.control.down = true;
                        break;
                    case keys.SPACE:
                        play.ship.control.jump();
                        break;
                    default:
                        break;                        
                }
                // if(which === keys.RIGHT) {
                //     //play.ship.position.x += 10;
                //     play.ship.rotation.z += 0.1;
                // }
                // if(which === keys.LEFT) {
                //     //play.ship.position.x -= 10;
                //     play.ship.rotation.z -= 0.1;
                // }
                // if(which === keys.UP) {
                //     play.ship.position.y += 10;
                // }
                // if(which === keys.DOWN) {
                //     play.ship.position.y -= 10;
                // }
            },
            keyup: function(which) {
                switch(which) {
                    case keys.RIGHT:
                        play.ship.control.right = false;
                        break;
                    case keys.LEFT:
                        play.ship.control.left = false;
                        break;
                    case keys.UP:
                        play.ship.control.up = false;
                        break;
                    case keys.DOWN:
                        play.ship.control.down = false;
                        break;
                    case keys.SPACE:
                        //play.ship.control.jump = false;
                        break;
                    default:
                        break;                        
                }

            }
        };
        Events.attach(play);
        return play;        
    }    
    return Play;
});