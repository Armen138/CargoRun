/*jshint newcap:false, nonew:true */
/*global console, alert */
define("play", [
        "canvas",
        "resources",
        "keys",
        "events"
    ],function(Canvas,
            Resources,
            keys,
            Events) {
    "use strict";
    var Play = function(gl) {
        var play = {
            init: function() {
                console.log("glinit");                
                if(!play.light) {
                    var radius = 50, segments = 16, rings = 16;                 
                    var sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xCC0000 });
                    var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);                
                    gl.scene.add(sphere);
                    play.ship = sphere;

                    


                    var pointLight = new THREE.PointLight(0xFFFFFF);

                    // set its position
                    pointLight.position.x = 300;
                    pointLight.position.y = 300;
                    pointLight.position.z = 300;

                    play.light = pointLight;
                    // add to the scene
                    gl.camera.add(pointLight); 
                    gl.scene.remove(gl.camera);
                    sphere.add(gl.camera);

                    var material = new THREE.MeshPhongMaterial({ color: 0xCC0000 }),
                        plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 127, 127));
                    //plane.position = ;
                    gl.scene.add(plane);                
                }
            },
            run: function() {
                gl.renderer.render(gl.scene, gl.camera);
            },
            clear: function(cb) {
                cb();
            },
            reset: function() {
                gl.scene.remove(play.ship);                
            },
            keydown: function(which) {
                if(which === keys.RIGHT) {
                    play.ship.position.x += 10;
                }
                if(which === keys.LEFT) {
                    play.ship.position.x -= 10;
                }
                if(which === keys.UP) {
                    play.ship.position.y += 10;
                }
                if(which === keys.DOWN) {
                    play.ship.position.y -= 10;
                }
            }
        };
        Events.attach(play);
        return play;        
    }    
    return Play;
});