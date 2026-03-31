"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface STLViewerProps {
  modelUrl: string;
}

export default function STLViewer({ modelUrl }: STLViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting — gives the phong/metallic feel
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x0074ff, 1.2);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x002a5e, 0.8);
    rimLight.position.set(0, -5, -5);
    scene.add(rimLight);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 0.5;
    controls.maxDistance = 10;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;

    // Material — phong with accent blue
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(0x0074ff),
      specular: new THREE.Color(0x88bbff),
      shininess: 80,
      transparent: false,
    });

    let mesh: THREE.Mesh | null = null;
    let animationId: number;

    // Spinner shown during load via CSS class toggle
    container.classList.add("stl-loading");

    const loader = new STLLoader();
    loader.load(
      modelUrl,
      (geometry) => {
        container.classList.remove("stl-loading");

        geometry.computeVertexNormals();

        // Center and scale the model
        geometry.computeBoundingBox();
        const box = geometry.boundingBox!;
        const center = new THREE.Vector3();
        box.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);

        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        geometry.scale(scale, scale, scale);

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      },
      undefined,
      (error) => {
        console.error("STLViewer load error:", error);
        container.classList.remove("stl-loading");
      }
    );

    // Animation loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      controls.dispose();
      if (mesh) {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl]);

  return (
    <div ref={containerRef} className="w-full h-full relative stl-container">
      {/* Loading pulse shown via CSS when stl-loading class is present */}
      <div className="stl-spinner absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
      </div>
    </div>
  );
}
