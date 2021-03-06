/*jshint newcap:false, nonew:true */
/*global console, alert */
define("play", [
        "1gamlib/canvas",
        "1gamlib/resources",
        "1gamlib/keys",
        "1gamlib/events",
        "ship",
        "fuel",
        "stars",
        "explosion",
        "world"
    ],function(Canvas,
            Resources,
            keys,
            Events,
            Ship,
            Fuel,
            Stars,
            Explosion,
            World) {
    "use strict";
    var last = 0;
    var stats = {
        fuel: 0,
        distance: 0
    };

    var rendererStats   = new THREEx.RendererStats();
    rendererStats.domElement.style.position = 'absolute';
    rendererStats.domElement.style.left = '0px';
    rendererStats.domElement.style.bottom = '0px';
    rendererStats.domElement.style.zIndex = "99";
    // rendererStats.domElement.style.width = "110px";
    document.body.appendChild(rendererStats.domElement);

    function drawHud() {
        Canvas.clear("black");
        Canvas.context.save();
        for(var i = 0; i < stats.fuel; i++) {
            Canvas.context.drawImage(Resources.fuelicon, 10 + i * 36, 10);
        }
        Canvas.context.restore();
    }
    var Play = function(gl) {
        var play = {
            updates: [],
            init: function() {
                console.log("glinit");
                if(!play.light) {
                    play.ship = Ship(gl.scene, gl.camera);
                    play.world = World(gl.scene, play.ship);
                    play.fuel = [];
                    play.stars = Stars(gl.scene, play.ship);
                    for(var i = 0; i < 10; i++) {
                        (function() {
                            var fuel = Fuel(gl.scene,
                                        new THREE.Vector3(Math.random() * 250 - 125,
                                                        Math.random() * 1000,
                                                        0),
                                        play.ship);
                            fuel.on("pick-up", function() {
                                var exp = Explosion(play.ship.mesh,
                                                    new THREE.Vector3(0, 0, 0));
                                    exp.on("end", function() {
                                        // play.ship.mesh.remove(exp.system);
                                    });
                                // play.ship.mesh.add(exp.system);
                                stats.fuel++;
                                play.updates.push(exp);
                            });play.fuel.push(fuel);
                        }());

                    }

                    // var ambientLight = new THREE.AmbientLight(0xCCCCCC);
                    // gl.scene.add(ambientLight);
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
                    play.ship.on("death", function() {
                        alert("ship died.");
                        play.fire("gameover", play.ship.mesh.position.y | 0);
                    });
                }
            },
            run: function() {
                var now = Date.now();
                rendererStats.update(gl.renderer);
                play.world.update(now - last);
                play.stars.update();
                play.ship.update(now - last);
                for(var i = 0; i < play.fuel.length; i++) {
                    play.fuel[i].update(now - last);
                }
                for(var i = 0; i < play.updates.length; i++) {
                    play.updates[i].update(now - last);
                }
                gl.renderer.render(gl.scene, gl.camera);
                drawHud();
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
                        if(stats.fuel > 0) {
                            stats.fuel--;
                            play.ship.control.jump();
                            (function() {
                                var exp = Explosion(gl.scene,
                                                    play.ship.mesh.position.clone());
                                    exp.on("end", function() {
                                        // play.ship.mesh.remove(exp.system);
                                    });
                                // play.ship.mesh.add(exp.system);
                                play.updates.push(exp);
                            }());
                        }
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