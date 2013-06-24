define("trail", function() {
	var PARTICLECOUNT = 50;
	var TTL = 100;
    // attributes
    var attributes = {
    	size: { type: "f", value: [] },
        alpha: { type: 'f', value: [] }
    };
    var uniforms = {
		color: { type: "c", value: new THREE.Color( 0xff0000 ) },
        texture1: { type: "t", value: THREE.ImageUtils.loadTexture("images/particle.png") }
    };	

	var Trail = function(scene, shipMesh, offset) {
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
			particle.velocity = new THREE.Vector3(0, 0, 0); 
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

		var trail = {
			emit: true,
			update: function() {
				var ppf = 5;
				if(trail.emit && pool.length > ppf) {				
					for(var i = 0; i < ppf; i++) {
						var newP = pool.shift();
						newP.active = true;
						newP.x = shipMesh.position.x + Math.random() * 2 - 1 + offset.x;
						newP.y = shipMesh.position.y - Math.random() * 10 + offset.y;
						newP.z = shipMesh.position.z + offset.z;
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
						attributes.alpha.value[i] = 1.0 - (life / TTL);
						attributes.size.value[i] = 20 - (life / TTL) * 20;						
						if(life > TTL) { 
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
		};
		return trail;
	};
	return Trail;
});