// based on: https://threejs.org/examples/#webgl_panorama_equirectangular

import * as THREE from 'three';

window.bg = 2;

let camera, scene, renderer;

let lon = 0, lat = 0, theta = 0;
const y = 82.5;
const phi = THREE.MathUtils.degToRad( 90 - lat );
const phiSin = Math.sin( phi );

init();
animate();

function init() {

    const container = document.body;

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1100 );

    scene = new THREE.Scene();

    const geometry = new THREE.SphereGeometry( 500, 60, 40 );
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale( - 1, 1, 1 );

    // https://svd360.istreetview.com/
    const texture = new THREE.TextureLoader().load( 'images/pxl.jpg' );
    const material = new THREE.MeshBasicMaterial( { map: texture } );

    const mesh = new THREE.Mesh( geometry, material );

    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    container.style.touchAction = 'none';

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    if (window.bg != 2) return; // stop animate when bg not in use
    requestAnimationFrame( animate );
    update();

}

function update() {
    lon += 0.1;

    theta = THREE.MathUtils.degToRad( lon );

    const x = 500 * phiSin * Math.cos( theta );
    const z = 500 * phiSin * Math.sin( theta );

    camera.lookAt( x, y, z );

    renderer.render( scene, camera );

}
