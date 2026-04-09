// ===== THREE.JS - 3D SCENE =====
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

camera.position.z = 5;

// Central futuristic object - Icosahedron with wireframe
const icoGeo = new THREE.IcosahedronGeometry(1.5, 1);
const icoMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const icosahedron = new THREE.Mesh(icoGeo, icoMat);
scene.add(icosahedron);

// Inner glowing sphere
const innerGeo = new THREE.SphereGeometry(0.8, 32, 32);
const innerMat = new THREE.MeshBasicMaterial({
    color: 0x7b2ff7,
    transparent: true,
    opacity: 0.15
});
const innerSphere = new THREE.Mesh(innerGeo, innerMat);
scene.add(innerSphere);

// Outer ring
const ringGeo = new THREE.TorusGeometry(2.2, 0.02, 16, 100);
const ringMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.2
});
const torusRing = new THREE.Mesh(ringGeo, ringMat);
torusRing.rotation.x = Math.PI / 3;
scene.add(torusRing);

// Second ring
const ring2Geo = new THREE.TorusGeometry(2.8, 0.015, 16, 100);
const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0x7b2ff7,
    transparent: true,
    opacity: 0.15
});
const torusRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
torusRing2.rotation.x = -Math.PI / 4;
torusRing2.rotation.y = Math.PI / 6;
scene.add(torusRing2);

// Glowing particles
const particleCount = 2000;
const particlesGeo = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 8 + 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    if (Math.random() > 0.5) {
        colors[i3] = 0; colors[i3 + 1] = 0.94; colors[i3 + 2] = 1;
    } else {
        colors[i3] = 0.48; colors[i3 + 1] = 0.18; colors[i3 + 2] = 0.97;
    }
}

particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMat = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particlesGeo, particlesMat);
scene.add(particles);

// Floating shapes
const floatingShapes = [];
const shapeGeos = [
    new THREE.OctahedronGeometry(0.15),
    new THREE.TetrahedronGeometry(0.12),
    new THREE.BoxGeometry(0.12, 0.12, 0.12),
    new THREE.DodecahedronGeometry(0.1)
];

for (let i = 0; i < 25; i++) {
    const geo = shapeGeos[Math.floor(Math.random() * shapeGeos.length)];
    const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x00f0ff : 0x7b2ff7,
        wireframe: true,
        transparent: true,
        opacity: Math.random() * 0.3 + 0.1
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
    );
    mesh.userData = {
        speed: Math.random() * 0.005 + 0.002,
        rotSpeed: Math.random() * 0.02 + 0.005,
        floatOffset: Math.random() * Math.PI * 2
    };
    scene.add(mesh);
    floatingShapes.push(mesh);
}

// Mouse tracking for parallax
let targetMouseX = 0, targetMouseY = 0;
document.addEventListener('mousemove', e => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Animation loop
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Rotate main object
    icosahedron.rotation.x = elapsed * 0.15;
    icosahedron.rotation.y = elapsed * 0.2;

    // Pulse inner sphere
    const pulse = Math.sin(elapsed * 2) * 0.1 + 1;
    innerSphere.scale.set(pulse, pulse, pulse);
    innerSphere.material.opacity = 0.1 + Math.sin(elapsed * 3) * 0.05;

    // Rotate rings
    torusRing.rotation.z = elapsed * 0.3;
    torusRing2.rotation.z = -elapsed * 0.2;
    torusRing2.rotation.x = -Math.PI / 4 + Math.sin(elapsed * 0.5) * 0.1;

    // Rotate particles
    particles.rotation.y = elapsed * 0.03;
    particles.rotation.x = elapsed * 0.01;

    // Animate floating shapes
    floatingShapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotSpeed;
        shape.rotation.y += shape.userData.rotSpeed * 0.7;
        shape.position.y += Math.sin(elapsed * shape.userData.speed * 100 + shape.userData.floatOffset) * 0.002;
    });

    // Mouse parallax
    camera.position.x += (targetMouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-targetMouseY * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
