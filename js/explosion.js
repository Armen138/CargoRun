define("explosion", ["events"], function(Events) {
    var PARTICLECOUNT = 500;
       

    var Explosion = function(scene, position, options) {
        var attributes = {
            size: { type: "f", value: [] },
            alpha: { type: 'f', value: [] }
        };
        var uniforms = {
            color: { type: "c", value: new THREE.Color( 0xff0000 ) },
            texture1: { type: "t", value: THREE.ImageUtils.loadTexture("images/star.png") }
        };           
        if(!position) {
            position = new THREE.Vector3(0, 0, 0);
        }
        var inactive = 0;
        var particles = new THREE.Geometry(),
            pMaterial = new THREE.ShaderMaterial({
                attributes: attributes,
                uniforms: uniforms,
                vertexShader:   document.getElementById( 'vertexshader' ).textContent,
                fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
                transparent: true
            });    

        for(var p = 0; p < PARTICLECOUNT; p++) {
            var particle = position.clone();
            particle.active = true;
            particle.range = 10;
            particle.time = 0;
            particle.start = position;
            particle.velocity = new THREE.Vector3 (Math.random() * 2 - 1,
                                                    Math.random() * 2 - 1, 
                                                    Math.random() * 2 - 1);
            particles.vertices.push(particle);
        }

            var particleSystem =
              new THREE.ParticleSystem(
                particles,
                pMaterial);
            particleSystem.sortParticles = true;    
            scene.add(particleSystem);    
        console.log("splode");
        if(!options) {
            options = {};
        }

        var explosion = {
            system: particleSystem,
            update: function() {
                if(inactive === particles.vertices.length) {
                    explosion.fire("end");
                    scene.remove(particleSystem);
                }
                for(var i = 0; i < particles.vertices.length; i++) {
                    var p = particles.vertices[i];
                    if(p.active) {                        
                        var pdist = p.start.distanceTo(p);
                        attributes.alpha.value[i] = 1.0 - (pdist / p.range);
                        attributes.size.value[i] = 20 - (pdist / p.range) * 20;
                        p.add(p.velocity);
                        if(pdist > p.range) {
                            p.active = false;
                            inactive++;
                        }                    
                    }
                }                
            }
        };
        Events.attach(explosion);
        return explosion;
    };
    return Explosion;
});