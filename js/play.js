/*jshint newcap:false, nonew:true */
/*global console, alert */
define("play", [
        "canvas",
        "resources",
        "keys",
        "events",
        "ship"
    ],function(Canvas,
            Resources,
            keys,
            Events,
            Ship) {
    "use strict";
    var last = 0;
    var Play = function(gl) {
        var play = {
            init: function() {
                console.log("glinit");                
                if(!play.light) {
                    // var radius = 50, segments = 16, rings = 16;                 
                    // var sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xCC0000 });
                    // //var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);                
                    // //var sphere = new THREE.Mesh(Resources.ship, new THREE.MeshFaceMaterial());                                
                    // var sphere = Resources.ship;
                    // gl.scene.add(sphere);
                    // play.ship = sphere;
                    // play.ship.rotation.x += Math.PI / 2;
                    // play.ship.rotation.y = Math.PI;
                    // play.ship.scale.set(5, 5, 5);

                    play.ship = Ship(gl.scene, gl.camera);


                    var pointLight = new THREE.PointLight(0xFFFFFF);

                    // set its position
                    pointLight.position.x = 0;
                    pointLight.position.y = 0;
                    pointLight.position.z = 0;

                    play.light = pointLight;
                    // add to the scene
                    gl.camera.add(pointLight); 
                    gl.camera.position.y = -200;
                    gl.camera.position.z = 100;
                    // gl.scene.remove(gl.camera);
                    // sphere.add(gl.camera);

                    var material = new THREE.MeshPhongMaterial({ color: 0xCC0000 }),
                        plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 127, 127), material);
                    plane.position.z = -30;
                    //plane.position = ;
                    gl.scene.add(plane);                
                }
            },
            run: function() {
                var now = Date.now();
                play.ship.update(now - last);
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
                        play.ship.control.jump = false;
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