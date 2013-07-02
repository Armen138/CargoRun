define("world", ["1gamlib/resources"], function(Resources) {
	var planes = [];
	var obstacles = [];
	var MAXPLANES = 6;
	var MAXOBSTACLES = 0;
	var World = function(scene, ship) {
        // var texture = THREE.ImageUtils.loadTexture('images/plate1.png');
        // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set(5, 5);
        // var material = new THREE.MeshLambertMaterial({ map: texture });
       	// for(var i = 0; i < MAXPLANES; i++) {
       	// 	// var plane = new THREE.Mesh(new THREE.PlaneGeometry(400, 400, 1, 1), material);
       	// 	var plane = new THREE.Mesh(new THREE.PlaneGeometry(400, 400, 1, 1), material);
	       //  plane.position.z = -30;
	       //  plane.position.y = 200 + i * 400;
	       //  plane.name = "plane";
	       //  // plane.receiveShadow = true;
	       //  scene.add(plane);
	       //  planes.push(plane);
       	// }
       	console.log(Resources.bump);
       	var wheelbox = new THREE.Mesh(Resources.wheelbox.geometry, Resources.wheelbox.material);
       	var wheel = new THREE.Mesh(Resources.wheel.geometry, Resources.wheel.material);
       	var bump = new THREE.Mesh(Resources.level.geometry, Resources.level.material);
       	var tile2 = new THREE.Mesh(Resources.station.geometry, Resources.station.material);
       	bump.position.y = 0;
       	bump.position.x = 0;
       	bump.position.z = -10;
       	bump.scale.set(17, 17, 17);
	    bump.rotation.x += Math.PI / 2;
	    bump.rotation.y = Math.PI / 2 + Math.PI;
	    bump.name = "bridge";

       	tile2.position.y = 0;
       	tile2.position.x = 0;
       	tile2.position.z = -40;
       	tile2.scale.set(170, 170, 170);
	    tile2.rotation.x += Math.PI / 2;
	    tile2.rotation.y = Math.PI / 2;// + Math.PI;
	    tile2.name = "bridge";

	    // wheel.scale.set(10, 10, 10);
	    // wheelbox.scale.set(10, 10, 10);
	    // wheel.position.y = 3000;
	    // wheelbox.position.y = 3000;
	    // wheelbox.rotation.y = Math.PI / 2;
       	// scene.add(bump);
       	scene.add(tile2);
       	// scene.add(wheel);
       	// scene.add(wheelbox);
   //     	for(var i = 0; i < MAXOBSTACLES; i++) {
			// var cube = new THREE.Mesh( new THREE.CubeGeometry( 50, 50, 50 ), material );
			// cube.position.y = 200 + i * 400;
			// cube.position.x = (Math.random() * 270 | 0) - 135;
			// scene.add(cube);
			// obstacles.push(cube);
       	// }

		// var collide = function() {
		// 	for(var i = 0; i < obstacles.length; i++) {
		// 		if(obstacles[i].position.distanceTo(ship.mesh.position) < 50) {
		// 			console.log("I collide.");
		// 			ship.turbo = true;
		// 			setTimeout(function() {
		// 				ship.turbo = false;
		// 			}, 1000);
		// 		}
		// 	}
		// }

		var world = {
			update: function(d) {
				// if(ship.mesh.position.y > planes[0].position.y + 400) {
				// 	var plane = planes.shift();
				// 	plane.position.y += MAXPLANES * 400;
				// 	// plane.position.x += 40;
				// 	planes.push(plane);
				// }
				// wheel.rotation.y += d / 1000;


				// collide();
				// if(ship.mesh.position.y > obstacles[0].position.y + 200) {
				// 	var obstacle = obstacles.shift();
				// 	obstacle.position.y += 800  + MAXOBSTACLES * 400 + (Math.random() * 400 | 0);
				// 	obstacle.position.x = (Math.random() * 270 | 0) - 135;
				// 	obstacles.push(obstacle);
				// }
			}
		};
		return world;
	}
	return World;
});