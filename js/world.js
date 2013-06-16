define("world", function() {
	var planes = [];
	var obstacles = [];
	var MAXPLANES = 6;	
	var MAXOBSTACLES = 12;
	var World = function(scene, ship) {
        var texture = THREE.ImageUtils.loadTexture('../images/plate1.png');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(5, 5);                    
        var material = new THREE.MeshLambertMaterial({ map: texture });
       	for(var i = 0; i < MAXPLANES; i++) {
       		var plane = new THREE.Mesh(new THREE.PlaneGeometry(400, 400, 1, 1), material);
	        plane.position.z = -30;
	        plane.position.y = 200 + i * 400;
	        plane.receiveShadow = true;
	        scene.add(plane);
	        planes.push(plane);       		
       	}

       	for(var i = 0; i < MAXOBSTACLES; i++) {
			var cube = new THREE.Mesh( new THREE.CubeGeometry( 50, 50, 50 ), material );
			cube.position.y = 200 + i * 400;
			cube.position.x = (Math.random() * 270 | 0) - 135;
			scene.add(cube);
			obstacles.push(cube);       		
       	}

		var collide = function() {
			for(var i = 0; i < obstacles.length; i++) {
				if(obstacles[i].position.distanceTo(ship.mesh.position) < 50) {
					console.log("I collide.");
					ship.turbo = true;
					setTimeout(function() {
						ship.turbo = false;
					}, 1000);
				}
			}
		}

		var world = {
			update: function(d) {
				if(ship.mesh.position.y > planes[0].position.y + 400) {
					var plane = planes.shift();
					plane.position.y += MAXPLANES * 400;
					planes.push(plane);
				}
				collide();
				if(ship.mesh.position.y > obstacles[0].position.y + 200) {
					var obstacle = obstacles.shift();
					obstacle.position.y += 800  + MAXOBSTACLES * 400 + (Math.random() * 400 | 0);
					obstacle.position.x = (Math.random() * 270 | 0) - 135;
					obstacles.push(obstacle);
				}				
			}
		};
		return world;
	}
	return World;
});