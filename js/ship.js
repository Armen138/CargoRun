define("ship", [
	"resources",
	"easing"], function(
		Resources,
		easing) {
	var PARTICLECOUNT = 50;
	var limits = {
		rotation: 0.7,
		strafes: 135,
		ttl: 100
	};
	var speed = {
		max: 10,
		current: 0,
		sideways: 0
	};
	var Ship = function(scene, camera) {
	    var shipMesh =  new THREE.Mesh(Resources.ship.geometry, Resources.ship.material);
	    	shipMesh.rotation.x += Math.PI / 2;
	    	shipMesh.rotation.y = Math.PI;
	    	shipMesh.scale.set(2, 2, 2);	
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
		var pool = [];

		for(var p = 0; p < PARTICLECOUNT; p++) {
		    var particle = new THREE.Vector3(0, 0, 0);
			particle.active = false;
			particle.range = 50;
			particle.time = 0;
			particle.start = {x: 0, y: 0, z: 0};
		  	particles.vertices.push(particle);
		  	pool.push(particle);
		}


		// create the particle system
		var particleSystem =
		  new THREE.ParticleSystem(
		    particles,
		    pMaterial);
		particleSystem.sortParticles = true;
		scene.add(particleSystem);


		function particleUpdate() {			
			var ppf = 5;
			if(particleSystem.emit && pool.length > ppf) {				
				for(var i = 0; i < ppf; i++) {
					var newP = pool.shift();
					newP.active = true;
					newP.x = shipMesh.position.x + Math.random() * 2 - 1;
					newP.y = shipMesh.position.y + Math.random() * 10 - 15;
					newP.z = 0;
					// newP.z = shipMesh.position.z; + Math.random() * 10;
					newP.time = Date.now();
					newP.velocity = new THREE.Vector3(0, 0, 0); 
				}				
			} 
			if(pool.length < ppf) {
				console.log("Insufficient particles in pool.");
			}
			
			for(var i = particles.vertices.length - 1; i >= 0; --i) {				
				var p = particles.vertices[i];						
				if(p.active) {
					p.add(p.velocity);
					var life = Date.now() - p.time;
					var pdist = shipMesh.position.distanceTo(p);
					attributes.alpha.value[i] = 1.0 - (life / limits.ttl);
					attributes.size.value[i] = 20 - (life / limits.ttl) * 20;						
					if(life > limits.ttl) { 
						attributes.alpha.value[i] = 0.0;
						p.active = false;
						p.x = 0;
						p.y = 0;
						p.z = 0;

						pool.push(p);
					}					
				}
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