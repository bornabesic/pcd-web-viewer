var path = null;
var filename = null;
import * as THREE from './three.js/build/three.module.js';
import { PCDLoader } from './three.js/examples/jsm/loaders/PCDLoader.js';
import { TrackballControls } from './three.js/examples/jsm/controls/TrackballControls.js';

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

var camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.01, 40);
camera.position.x = 0.4;
camera.position.z = - 2;
camera.up.set(0, 0, 1);

scene.add(camera);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new TrackballControls(camera, renderer.domElement);

controls.rotateSpeed = 2.0;
controls.zoomSpeed = 0.3;
controls.panSpeed = 0.2;

controls.staticMoving = true;

controls.minDistance = 0.3;
controls.maxDistance = 0.3 * 100;

var loader = new PCDLoader();

function clear_scene() {
    scene.remove.apply(scene, scene.children);
}
window.clear_scene = clear_scene;

function load() {
    filename = document.getElementById("filename").value;
    path = "pcd/" + filename;
    loader.load(path, function (points) {

        clear_scene();
        points.scale.multiplyScalar(0.01);
        points.geometry.center();
        scene.add(points);
        console.log(points);
        var center = points.geometry.boundingSphere.center;
        controls.target.set(center.x, center.y, center.z);
        controls.update();

        animate();

    },
        null,
        function (error) {
            alert(error.target.statusText); 1
        });
}
window.load = load;

var container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(renderer.domElement);

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('keypress', keyboard);

var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
}

function keyboard(ev) {
    if (filename == null) return;

    var points = scene.getObjectByName(filename);

    switch (ev.key || String.fromCharCode(ev.keyCode || ev.charCode)) {

        case '+':
            points.material.size *= 1.2;
            points.material.needsUpdate = true;
            break;

        case '-':
            points.material.size /= 1.2;
            points.material.needsUpdate = true;
            break;
    }

}

window.onload = function() {
    var filename = window.location.hash.substr(1).split('&'); // substr(1) to remove the `#`
    document.getElementById("filename").value = filename;
}