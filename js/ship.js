define("ship", [
	"resources",
	"easing"], function(
		Resources,
		easing) {
	var PARTICLECOUNT = 500;
	var limits = {
		rotation: 0.7,
		strafes: 135
	};
	var speed = {
		max: 5,
		current: 0,
		sideways: 0
	};
	var Ship = function(scene, camera) {
	    var shipMesh =  new THREE.Mesh(Resources.ship.geometry, Resources.ship.material);
	    	shipMesh.rotation.x += Math.PI / 2;
	    	shipMesh.rotation.y = Math.PI;
	    	shipMesh.scale.set(5, 5, 5);	
	    	shipMesh.castShadow = true;	
		scene.add(shipMesh);
    // attributes
    attributes = {
    	size: { type: "f", value: [] },
        alpha: { type: 'f', value: [] }
    };
    uniforms = {
		color: { type: "c", value: new THREE.Color( 0xff0000 ) },
        texture1: { type: "t", value: THREE.ImageUtils.loadTexture("images/particle.png") }
    };
		// create the particle variables
		var particles = new THREE.Geometry(),
		    pMaterial = new THREE.ShaderMaterial({
				attributes: attributes,
				uniforms: uniforms,
				vertexShader:   document.getElementById( 'vertexshader' ).textContent,
				fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
				transparent: true
			});


		// now create the individual particles
		for(var p = 0; p < PARTICLECOUNT; p++) {

		  // create a particle with random
		  // position values, -250 -> 250
		  	var pX = Math.random() * 1 - 0.5,
		      	pY = Math.random() * 1 - 0.5,
		      	pZ = Math.random() * 4 - 2,
		      	particle = new THREE.Vector3(pX, pY, pZ);
			particle.velocity = new THREE.Vector3(Math.random() - 0.5, -Math.random() * 5, Math.random() - 0.5);		  
			particle.range = 12;
			particle.start = {x: pX, y: pY, z: pZ};
		  	particles.vertices.push(particle);
		}

		// create the particle system
		var particleSystem =
		  new THREE.ParticleSystem(
		    particles,
		    pMaterial);
		particleSystem.sortParticles = true;
		scene.add(particleSystem);


		function particleUpdate() {
			var particle = PARTICLECOUNT;
			while(particle--) {
				var p = particles.vertices[particle];
				p.add(p.velocity);
				var pdist = p.distanceTo(p.start);
				if(pdist > p.range && particleSystem.emit) {
					p.x = shipMesh.position.x;
					p.y = shipMesh.position.y - 20;
					p.z = shipMesh.position.z;
					p.start.x = shipMesh.position.x;
					p.start.y = shipMesh.position.y - 20;
					p.start.z = shipMesh.position.z;
				}
				attributes.alpha.value[particle] = 1.0 - (pdist / p.range);
				attributes.size.value[particle] = (pdist / p.range) * 30;
			}
		}

		function limit() {
			if(shipMesh.position.x < -limits.strafes) {
				shipMesh.position.x = -limits.strafes;
			}
			if(shipMesh.position.x > limits.strafes) {
				shipMesh.position.x = limits.strafes;
			}			
			if(shipMesh.rotation.z < -limits.rotation) {
				shipMesh.rotation.z = -limits.rotation;
			}
			if(shipMesh.rotation.z > limits.rotation) {
				shipMesh.rotation.z = limits.rotation;
			}
			if(!ship.turbo && speed.current > speed.max) {
				speed.current = speed.max;
			}
			if(ship.turbo && speed.current > speed.max * 2) {
				speed.current = speed.max * 2;
			}
			if(speed.current < 0) {
				speed.current = 0;
			}
			if(speed.sideways > speed.max) {
				speed.sidways = speed.max;
			}
			if(speed.sideways < -speed.max) {
				speed.sideways = -speed.max;
			}
		}
		var ship = {
			turbo: false,
			mesh: shipMesh,
			control: {
				left: false,
				right: false,
				jump: function() {
					jumpStart = Date.now();

				}
			},
			update: function(d) {
				// if(ship.control.jump) {
				// 	shipMesh.position.z += d / 5;
				// }				
				particleUpdate();
				if(ship.control.left) {
					speed.sideways -= d / 500;
					// shipMesh.position.x -= d / 5;
					shipMesh.rotation.z -= d / 500;
				}
				if(ship.control.right) {
					speed.sideways += d / 500;
					// shipMesh.position.x += d / 5;
					shipMesh.rotation.z += d / 500;
				}
				if(ship.control.up) {
					//shipMesh.position.y += d / 5;	
					particleSystem.emit = true;
					speed.current += d / 500;					
				} else {
					particleSystem.emit = false;
					speed.current -= d / 500;
				}
				// if(ship.control.down) {
				// 	shipMesh.position.y -= d / 5;	
				// 	camera.position.y -= d / 5;
				// }				
				if(!ship.control.left && !ship.control.right && shipMesh.rotation.z !== 0) {
					if(shipMesh.rotation.z < 0) {
						shipMesh.rotation.z += d /500;
					}
					if(shipMesh.rotation.z > 0) {
						shipMesh.rotation.z -= d /500;
					}					
					if(speed.sideways < 0) {
						speed.sideways += d / 800;
					}
					if(speed.sideways > 0) {
						speed.sideways -= d / 800;
					}
				}				
				limit();		
				shipMesh.position.y += speed.current;
				shipMesh.position.x += speed.sideways;
				camera.position.y += speed.current;		

			}

		};
		window.ship = ship;
		return ship;
	};
	return Ship;
});