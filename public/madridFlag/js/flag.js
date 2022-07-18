
const $section = $('#flag-section')
console.log($section)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.92 / window.innerHeight * 0.92, 0.2, 1000);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth * 1, window.innerHeight * 1);
$section.append(renderer.domElement);
console.log(renderer);
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

const loader = new THREE.TextureLoader();

const geometry = new THREE.PlaneGeometry(5, 3, 15, 9);
const material = new THREE.MeshBasicMaterial({
    map: loader.load("madridFlag/styles/escudo-madrid.png")
});



var flag = new THREE.Mesh(geometry, material);
scene.add(flag);

flag.rotation.set(-0.1, 0, 0);

camera.position.z = 5;

const clock = new THREE.Clock();

function animate() {

    const t = clock.getElapsedTime();

    flag.geometry.vertices.map(v => {
        const waveX1 = 0.5 * Math.sin(v.x * 2 + t);
        const waveX2 = 0.25 * Math.sin(v.x * 1 + t * 2);
        const waveY1 = 0.1 * Math.sin(v.y * 1 + t);
        v.z =  waveX1 + waveX2 + waveY1;

    })

    flag.geometry.verticesNeedUpdate = true;

    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


animate();


