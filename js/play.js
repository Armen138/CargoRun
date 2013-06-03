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
                var radius = 50, segments = 16, rings = 16;                 
                var sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xCC0000 });
                var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);                
                gl.scene.add(sphere);


                var pointLight = new THREE.PointLight(0xFFFFFF);

                // set its position
                pointLight.position.x = 300;
                pointLight.position.y = 300;
                pointLight.position.z = 300;

                // add to the scene
                gl.camera.add(pointLight); 


                var material = new THREE.MeshPhongMaterial({ color: 0xCC0000 }),
                    plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 127, 127));
                //plane.position = ;
                gl.scene.add(plane);                
            },
            run: function() {
                gl.renderer.render(gl.scene, gl.camera);
            },
            clear: function(cb) {
                cb();
            },
            reset: function() {

            },
            keydown: function(which) {
                if(which === keys.UP) {
                    gl.camera.position.z += 10;
                    console.log("up");
                }
            }
        };
        Events.attach(play);
        return play;        
    }    
    return Play;
});