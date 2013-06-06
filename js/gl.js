define("gl", ["three"], function() {
	var gl = {
		width: window.innerWidth,
		height: window.innerHeight,
		viewAngle: 45,
		aspect: window.innerWidth / window.innerHeight,
		near: 0.1,
		far: 10000
	}
	gl.renderer = new THREE.WebGLRenderer();
	gl.camera = new THREE.PerspectiveCamera(gl.viewAngle, gl.aspect, gl.near, gl.far);
	gl.scene = new THREE.Scene();

	gl.scene.add(gl.camera);
	gl.camera.position = {x: 0, y: -20, z: 20};
	gl.camera.lookAt({x: 0, y: 0, z: 0});
	gl.renderer.setSize(gl.width, gl.height);
	document.body.appendChild(gl.renderer.domElement);

	return gl;
});