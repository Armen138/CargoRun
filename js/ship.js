define("ship", [
	"resources",
	"easing"], function(
		Resources,
		easing) {
	var limits = {
		rotation: 0.7,
		strafes: 135
	}
	var Ship = function(scene, camera) {
	    var shipMesh =  new THREE.Mesh(Resources.ship.geometry, Resources.ship.material);
	    	shipMesh.rotation.x += Math.PI / 2;
	    	shipMesh.rotation.y = Math.PI;
	    	shipMesh.scale.set(5, 5, 5);		
		scene.add(shipMesh);

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
		}
		var ship = {
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
				if(ship.control.left) {
					shipMesh.position.x -= d / 5;
					shipMesh.rotation.z -= d / 150;
				}
				if(ship.control.right) {
					shipMesh.position.x += d / 5;
					shipMesh.rotation.z += d / 150;
				}
				if(ship.control.up) {
					shipMesh.position.y += d / 5;	
					camera.position.y += d / 5;
				}
				if(!ship.control.left && !ship.control.right && shipMesh.rotation.z !== 0) {
					if(shipMesh.rotation.z < 0) {
						shipMesh.rotation.z += d /150;
					}
					if(shipMesh.rotation.z > 0) {
						shipMesh.rotation.z -= d /150;
					}					
				}
				limit();				
			}

		};
		window.ship = ship;
		return ship;
	};
	return Ship;
});