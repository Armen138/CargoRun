define("fuel", ["resources"], function(Resources) {
	var Fuel = function(scene, position) {
	    var mesh =  new THREE.Mesh(Resources.fuel.geometry, Resources.fuel.material);
	    	mesh.rotation.x += Math.PI / 2;
	    	mesh.rotation.y = Math.PI;
	    	mesh.scale.set(5, 5, 5);	
	    	mesh.castShadow = true;
	    	mesh.position = position;//new THREE.Vector3(0, 10, 0);	
		scene.add(mesh);		
		var fuel = {
			update: function(d) {
				mesh.rotation.y += d / 500;
			}
		};
		return fuel;
	};
	return Fuel;
});