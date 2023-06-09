import * as THREE from 'three';

window.bg = 1;

let camera, scene, renderer, material, followMouse, mouseStopTimeOut;
let mouseX = 0, mouseY = 0;
let staticX, staticY;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 2, 2000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x000000, 0.001 );

    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for ( let i = 0; i < 10000; i ++ ) {

        const x = 2000 * Math.random() - 1000;
        const y = 2000 * Math.random() - 1000;
        const z = 2000 * Math.random() - 1000;

        vertices.push( x, y, z );

    }

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    material = new THREE.PointsMaterial( { size: 2, sizeAttenuation: false, alphaTest: 0.5, transparent: true } );

    const particles = new THREE.Points( geometry, material );
    scene.add( particles );

    //
    const pxlLogosprite = new THREE.TextureLoader().load( './images/pxl_logo.png' );
    const pxlGeometry = new THREE.BufferGeometry();
    const plxLogoVectors = [];
    for ( let i = 0; i < 100; i ++ ) {

        const x = 2000 * Math.random() - 1000;
        const y = 2000 * Math.random() - 1000;
        const z = 2000 * Math.random() - 1000;

        plxLogoVectors.push( x, y, z );
    }
    
    pxlGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( plxLogoVectors, 3 ) );

    material = new THREE.PointsMaterial( { size: 30, map: pxlLogosprite, sizeAttenuation: false, alphaTest: 0.5, transparent: false } );

    const pxlLogos = new THREE.Points( pxlGeometry, material );
    scene.add( pxlLogos );

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    document.body.style.touchAction = 'none';
    document.body.addEventListener( 'pointermove', onPointerMove );

    staticMove();
    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onPointerMove( event ) {
    followMouse = true;
    if ( event.isPrimary === false ) return;

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

    clearTimeout(mouseStopTimeOut)
    mouseStopTimeOut = setTimeout(() => staticMove(), 3000)
}

function staticMove() {
    followMouse = false;
    staticX = Math.random() < 0.5 ? 1 : -1;
    staticY = Math.random() < 0.5 ? 1 : -1;
}

function animate() {
    if (window.bg != 1) return; // stop animate when bg not in use
    requestAnimationFrame( animate );
    render();
}

function render() {
    if (followMouse) {
        camera.position.x += ( mouseX - camera.position.x ) * 0.05;
        camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    } else {
        camera.position.x += 0.05 * staticX;
        camera.position.y += 0.05 * staticY;
    }
    camera.lookAt( scene.position );

    renderer.render( scene, camera );
}

