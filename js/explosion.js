define("explosion", function() {
    var attributes = {
        size: { type: "f", value: [] },
        alpha: { type: 'f', value: [] }
    };
    var uniforms = {
        color: { type: "c", value: new THREE.Color( 0xff0000 ) },
        texture1: { type: "t", value: THREE.ImageUtils.loadTexture("images/particle.png") }
    };          

    var particles = new THREE.Geometry(),
        pMaterial = new THREE.ShaderMaterial({
            attributes: attributes,
            uniforms: uniforms,
            vertexShader:   document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
            transparent: true
        });    

        for(var p = 0; p < PARTICLECOUNT; p++) {
            var particle = new THREE.Vector3(0, 0, 0);
            particle.active = false;
            particle.range = 50;
            particle.time = 0;
            particle.start = {x: 0, y: 0, z: 0};
            particles.vertices.push(particle);
        }    
    var Explosion = function(scene, position. options) {
        var particleCount = options.count || 1000;
        var explosion = {

        };
        return explosion;
    };
    return Explosion;
});