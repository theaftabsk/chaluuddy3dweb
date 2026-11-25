import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe as GlobeIcon, MapPin, ArrowRight, Send, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FloatingDestination {
  id: string;
  name: string;
  country: string;
  image: string;
  lat: number;
  lng: number;
}

const DESTINATIONS_LEFT: FloatingDestination[] = [
  {
    id: 'himalayas',
    name: 'Himalayas',
    country: 'Nepal',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    lat: 28.5983,
    lng: 83.931
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    lat: -8.4095,
    lng: 115.1889
  },
  {
    id: 'sahara',
    name: 'Sahara',
    country: 'Morocco',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    lat: 23.4162,
    lng: 25.6628
  }
];

const DESTINATIONS_RIGHT: FloatingDestination[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    lat: 48.8566,
    lng: 2.3522
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    lat: 35.6762,
    lng: 139.6503
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80',
    lat: -33.8688,
    lng: 151.2093
  }
];

export const GlobalExploreGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Viewport dimensions
    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 560;

    // Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.z = 230;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    // Group for Earth, Night Lights, Clouds, Arcs, and Ring
    const earthSystem = new THREE.Group();
    scene.add(earthSystem);

    const globeRadius = 74;

    // 1. Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const earthMap = textureLoader.load('/earth_atmos_2048.jpg');
    const earthNormal = textureLoader.load('/earth_normal_2048.jpg');
    const earthSpecular = textureLoader.load('/earth_specular_2048.jpg');
    const earthLights = textureLoader.load('/earth_lights_2048.png');
    const cloudMap = textureLoader.load('/earth_clouds_1024.png');

    earthMap.colorSpace = THREE.SRGBColorSpace;
    earthLights.colorSpace = THREE.SRGBColorSpace;

    // 2. Realistic Earth Surface with Glowing Night Lights
    const earthGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthMap,
      normalMap: earthNormal,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughness: 0.65,
      metalness: 0.1,
      emissiveMap: earthLights,
      emissive: new THREE.Color(0xffe89e),
      emissiveIntensity: 1.6
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthSystem.add(earthMesh);

    // 3. Dynamic Rotating Clouds
    const cloudGeo = new THREE.SphereGeometry(globeRadius * 1.018, 64, 64);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudMap,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthSystem.add(cloudMesh);

    // 4. Atmospheric Rayleigh Scattering Fresnel Glow
    const atmosphereGeo = new THREE.SphereGeometry(globeRadius * 1.15, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0, 0, 1.0)), 2.6);
          gl_FragColor = vec4(0.25, 0.65, 1.0, 1.0) * intensity * 2.5;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    earthSystem.add(atmosphereMesh);

    // 5. Glowing Orbital Flight Ring (Tilted 3D Orbit as seen in reference image)
    const ringCurve = new THREE.EllipseCurve(0, 0, globeRadius * 1.35, globeRadius * 1.18, 0, 2 * Math.PI, false, 0);
    const ringPoints = ringCurve.getPoints(100);
    const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints.map((p) => new THREE.Vector3(p.x, 0, p.y)));
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
      linewidth: 2
    });
    const ringMesh = new THREE.Line(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3.2;
    ringMesh.rotation.y = -Math.PI / 6;
    scene.add(ringMesh);

    // 6. Glowing Airplane Silhouette on Orbit Ring
    const planeGroup = new THREE.Group();
    // Simplified sleek airplane silhouette
    const planeShape = new THREE.Shape();
    planeShape.moveTo(0, 4);
    planeShape.lineTo(1.2, 0);
    planeShape.lineTo(6, -1);
    planeShape.lineTo(1.2, -2.5);
    planeShape.lineTo(1, -5.5);
    planeShape.lineTo(3, -6.5);
    planeShape.lineTo(3, -7.5);
    planeShape.lineTo(0.5, -7);
    planeShape.lineTo(0, -7.2);
    planeShape.lineTo(-0.5, -7);
    planeShape.lineTo(-3, -7.5);
    planeShape.lineTo(-3, -6.5);
    planeShape.lineTo(-1, -5.5);
    planeShape.lineTo(-1.2, -2.5);
    planeShape.lineTo(-6, -1);
    planeShape.lineTo(-1.2, 0);
    planeShape.closePath();

    const planeGeoExt = new THREE.ShapeGeometry(planeShape);
    const planeMatExt = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const planeMesh = new THREE.Mesh(planeGeoExt, planeMatExt);
    planeMesh.scale.set(0.7, 0.7, 0.7);
    planeGroup.add(planeMesh);
    scene.add(planeGroup);

    // Coordinate Conversion Helper (Lat/Lng to 3D Sphere Vector)
    function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    }

    // Glowing Location Pins on Earth
    const allDestinations = [...DESTINATIONS_LEFT, ...DESTINATIONS_RIGHT];
    allDestinations.forEach((dest) => {
      const pos = latLngToVector3(dest.lat, dest.lng, globeRadius + 1.2);

      const pinGeo = new THREE.SphereGeometry(1.8, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      earthSystem.add(pinMesh);

      // Cyan outer glowing ring
      const ringG = new THREE.RingGeometry(2.2, 3.6, 24);
      const ringM = new THREE.MeshBasicMaterial({
        color: 0x60a5fa,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
      });
      const ringMeshPin = new THREE.Mesh(ringG, ringM);
      ringMeshPin.position.copy(pos.clone().multiplyScalar(1.008));
      ringMeshPin.lookAt(new THREE.Vector3(0, 0, 0));
      earthSystem.add(ringMeshPin);
    });

    // Space Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(180, 100, 200);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x2563eb, 1.2);
    rimLight.position.set(-180, -60, -120);
    scene.add(rimLight);

    // Initial orientation
    earthSystem.rotation.x = 0.26;
    earthSystem.rotation.y = -1.1;

    // Interactive Drag to Rotate Earth
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let mouseVelocityX = 0;
    let mouseVelocityY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      mouseVelocityX = deltaX * 0.005;
      mouseVelocityY = deltaY * 0.005;
      earthSystem.rotation.y += mouseVelocityX;
      earthSystem.rotation.x += mouseVelocityY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    mount.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // ScrollTrigger: Rotation synchronization
    const ctxTimeline = gsap.context(() => {
      gsap.to(earthSystem.rotation, {
        y: Math.PI * 2.5,
        x: 0.18,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    });

    // Render Animation Loop
    let animId: number;
    let flightAngle = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Continuous gentle Earth rotation
      if (!isDragging) {
        earthSystem.rotation.y += 0.0018;
        mouseVelocityX *= 0.95;
        mouseVelocityY *= 0.95;
        earthSystem.rotation.y += mouseVelocityX;
        earthSystem.rotation.x += mouseVelocityY;
      }

      // Cloud drift
      cloudMesh.rotation.y += 0.0006;

      // Animate Airplane on 3D Orbit Ring
      flightAngle += 0.008;
      const rx = globeRadius * 1.35;
      const ry = globeRadius * 1.18;
      const px = Math.cos(flightAngle) * rx;
      const pz = Math.sin(flightAngle) * ry;

      // Apply ring rotation matrix to airplane position
      const planePos = new THREE.Vector3(px, 0, pz);
      planePos.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 3.2);
      planePos.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 6);
      planeGroup.position.copy(planePos);

      // Look slightly forward along the flight path
      const nextAngle = flightAngle + 0.05;
      const nx = Math.cos(nextAngle) * rx;
      const nz = Math.sin(nextAngle) * ry;
      const nextPos = new THREE.Vector3(nx, 0, nz);
      nextPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 3.2);
      nextPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 6);
      planeGroup.lookAt(nextPos);

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const newW = mount.clientWidth;
      const newH = mount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mount.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      ctxTimeline.revert();
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="global"
      ref={sectionRef}
      className="section-wrapper"
      style={{
        backgroundColor: '#070D1B',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '5rem',
        paddingBottom: '5rem'
      }}
    >
      {/* Background Starfield & Sunset Cloud Atmospheric Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 45%, rgba(30, 58, 138, 0.35) 0%, rgba(7, 13, 27, 0.95) 75%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '240px',
          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.3) 60%, rgba(7, 13, 27, 0) 100%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1360px' }}>
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div
            className="liquid-glass-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.35rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.08em',
              marginBottom: '1.25rem',
              border: '1px solid rgba(56, 189, 248, 0.65)',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
            }}
          >
            <GlobeIcon size={16} color="#38BDF8" />
            <span>GLOBAL INTERACTION</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
              textShadow: '0 4px 25px rgba(0, 0, 0, 0.65)'
            }}
          >
            One World.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7DD3FC 0%, #BAE6FD 50%, #C084FC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                position: 'relative'
              }}
            >
              Endless Adventures.
              {/* Wavy accent stroke */}
              <svg
                style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '180px',
                  height: '8px'
                }}
                viewBox="0 0 180 8"
                fill="none"
              >
                <path
                  d="M 5 4 Q 45 8, 90 4 Q 135 0, 175 4"
                  stroke="#38BDF8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              </svg>
            </span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: 'rgba(255, 255, 255, 0.92)',
              maxWidth: '680px',
              margin: '0 auto',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
            }}
          >
            Explore new places, connect with travelers, and discover the world together.
          </p>
        </div>

        {/* =========================================================================
            MAIN STAGE: 3 COLUMNS (Left 3 Cards + Center 3D Earth + Right 3 Cards)
           ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(240px, 310px) 1fr minmax(240px, 310px)',
            alignItems: 'center',
            gap: '1.5rem',
            position: 'relative'
          }}
          className="globe-stage-grid"
        >
          {/* LEFT COLUMN: 3 Destination Cards */}
          <div className="dest-cards-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', zIndex: 20 }}>
            {DESTINATIONS_LEFT.map((dest) => (
              <div
                key={dest.id}
                className="floating-dest-card"
                style={{
                  position: 'relative',
                  height: '110px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(147, 197, 253, 0.45)',
                  boxShadow: '0 0 25px rgba(56, 189, 248, 0.35), 0 15px 35px rgba(0, 0, 0, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Background Photo */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 60%, rgba(15, 23, 42, 0.1) 100%)'
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(56, 189, 248, 0.3)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#38BDF8'
                      }}
                    >
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>
                        {dest.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#BAE6FD', fontWeight: 600 }}>
                        {dest.country}
                      </div>
                    </div>
                  </div>

                  {/* Circular Arrow Button */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.22)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      transition: 'transform 0.2s ease, background-color 0.2s ease'
                    }}
                    className="card-arrow-btn"
                  >
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CENTER COLUMN: 3D Glowing Earth Viewport */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(460px, 60vh, 580px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Curved Dotted Glowing Connector Lines (Left & Right) */}
            <svg
              className="globe-connector-svg"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 15
              }}
              viewBox="0 0 600 500"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Left Connector Arcs to Globe */}
              <path d="M 0 90 C 80 90, 140 180, 200 210" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.75" />
              <path d="M 0 250 C 90 250, 130 260, 210 270" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.75" />
              <path d="M 0 410 C 90 410, 140 340, 215 310" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.75" />

              {/* Right Connector Arcs to Globe */}
              <path d="M 600 90 C 520 90, 460 180, 395 210" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.75" />
              <path d="M 600 250 C 510 250, 470 260, 390 270" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.75" />
              <path d="M 600 410 C 510 410, 460 340, 385 310" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.75" />
            </svg>

            {/* Three.js Canvas Mount */}
            <div
              ref={mountRef}
              style={{
                width: '100%',
                height: '100%',
                cursor: 'grab',
                position: 'relative',
                zIndex: 10
              }}
              title="Click and drag to rotate Earth"
            />
          </div>

          {/* RIGHT COLUMN: 3 Destination Cards */}
          <div className="dest-cards-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', zIndex: 20 }}>
            {DESTINATIONS_RIGHT.map((dest) => (
              <div
                key={dest.id}
                className="floating-dest-card"
                style={{
                  position: 'relative',
                  height: '110px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(147, 197, 253, 0.45)',
                  boxShadow: '0 0 25px rgba(56, 189, 248, 0.35), 0 15px 35px rgba(0, 0, 0, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Background Photo */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 60%, rgba(15, 23, 42, 0.1) 100%)'
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(56, 189, 248, 0.3)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#38BDF8'
                      }}
                    >
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>
                        {dest.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#BAE6FD', fontWeight: 600 }}>
                        {dest.country}
                      </div>
                    </div>
                  </div>

                  {/* Circular Arrow Button */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.22)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      transition: 'transform 0.2s ease, background-color 0.2s ease'
                    }}
                    className="card-arrow-btn"
                  >
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Liquid Glass Live Route Features Bar (Bottom) */}
        <div
          className="liquid-glass-pill live-routes-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            padding: '1.05rem 2.75rem',
            maxWidth: '680px',
            margin: '2.5rem auto 0 auto',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.55)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 600 }}>
            <Send size={18} color="#38BDF8" />
            <span>Active Flight Routes: 1,420+</span>
          </div>

          <div className="live-routes-divider" style={{ width: '1px', height: '22px', backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 600 }}>
            <Users size={18} color="#60A5FA" />
            <span>Connected Countries: 84</span>
          </div>
        </div>
      </div>

      <style>{`
        .floating-dest-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 0 35px rgba(56, 189, 248, 0.65), 0 20px 45px rgba(0, 0, 0, 0.5) !important;
          border-color: #38BDF8 !important;
        }
        .floating-dest-card:hover .card-arrow-btn {
          background-color: #38BDF8 !important;
          transform: translateX(3px);
        }
        @media (max-width: 1024px) {
          .globe-stage-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .globe-connector-svg {
            display: none !important;
          }
          .dest-cards-col {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
            gap: 1rem !important;
          }
        }
        @media (max-width: 640px) {
          .live-routes-pill {
            gap: 1rem !important;
            padding: 1rem 1.5rem !important;
            flex-direction: column !important;
          }
          .live-routes-divider {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
