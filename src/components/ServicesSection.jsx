import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Wrench, ShieldCheck, Settings, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';

export default function ServicesSection({ onBookPackage }) {
  const mountRef = useRef(null);

  // Floating 3D Gears & Wrenches Three.js Canvas reacting to scroll speed
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (e) {
      console.warn('ServicesSection: WebGL not available, skipping 3D.');
      return;
    }
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x000000, 0.4);
    scene.add(ambientLight);

    const point1 = new THREE.PointLight(0x18181b, 3, 30);
    point1.position.set(10, 10, 10);
    scene.add(point1);

    const point2 = new THREE.PointLight(0x3f3f46, 2, 25);
    point2.position.set(-10, -10, 5);
    scene.add(point2);

    // Helper function to create 3D Gear mesh
    const createGearMesh = (outerRadius, innerRadius, teeth, color) => {
      const shape = new THREE.Shape();
      const toothAngle = (Math.PI * 2) / teeth;

      for (let i = 0; i < teeth; i++) {
        const angle = i * toothAngle;
        const r1 = outerRadius;
        const r2 = outerRadius * 1.18;

        if (i === 0) shape.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
        shape.lineTo(Math.cos(angle + toothAngle * 0.2) * r1, Math.sin(angle + toothAngle * 0.2) * r1);
        shape.lineTo(Math.cos(angle + toothAngle * 0.35) * r2, Math.sin(angle + toothAngle * 0.35) * r2);
        shape.lineTo(Math.cos(angle + toothAngle * 0.65) * r2, Math.sin(angle + toothAngle * 0.65) * r2);
        shape.lineTo(Math.cos(angle + toothAngle * 0.8) * r1, Math.sin(angle + toothAngle * 0.8) * r1);
      }

      const hole = new THREE.Path();
      hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
      shape.holes.push(hole);

      const extrudeSettings = {
        depth: 0.6,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.1,
        bevelThickness: 0.1,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const mat = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.8,
        roughness: 0.2,
        wireframe: false,
      });

      return new THREE.Mesh(geo, mat);
    };

    // Create a group of floating gears (Dark Gray colors for white background)
    const gearsGroup = new THREE.Group();

    const gear1 = createGearMesh(4.5, 2.0, 16, 0x18181b);
    gear1.position.set(-12, 4, -5);
    gearsGroup.add(gear1);

    const gear2 = createGearMesh(3.2, 1.2, 12, 0x27272a);
    gear2.position.set(12, -4, -4);
    gearsGroup.add(gear2);

    const gear3 = createGearMesh(2.5, 0.9, 10, 0x3f3f46);
    gear3.position.set(8, 8, -8);
    gearsGroup.add(gear3);

    const gear4 = createGearMesh(5.0, 2.2, 18, 0x52525b);
    gear4.position.set(-10, -8, -10);
    gearsGroup.add(gear4);

    scene.add(gearsGroup);

    // Scroll speed reactivity
    let lastScrollY = window.scrollY;
    let currentSpeed = 1;

    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      currentSpeed = 1 + delta * 0.08;
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      currentSpeed += (1 - currentSpeed) * 0.05;

      gear1.rotation.z += 0.005 * currentSpeed;
      gear2.rotation.z -= 0.008 * currentSpeed;
      gear3.rotation.z += 0.01 * currentSpeed;
      gear4.rotation.z -= 0.004 * currentSpeed;

      gearsGroup.rotation.y += 0.001 * currentSpeed;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      if (container && renderer && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      if (renderer) renderer.dispose();
    };
  }, []);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-black" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-black" />;
      case 'Settings': return <Settings className="w-6 h-6 text-black" />;
      case 'Zap': return <Zap className="w-6 h-6 text-black" />;
      default: return <Wrench className="w-6 h-6 text-black" />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-zinc-50/80 border-y border-zinc-200">
      
      {/* 3D Floating Gears Canvas Background */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="section-tag">
            <Wrench className="w-4 h-4 text-black" />
            <span>Lakshmi Srinivasa Workshop</span>
          </div>
          <h2 className="section-heading text-black">
            SERVICE & <span className="gradient-text">REPAIR CLINIC</span>
          </h2>
          <p className="section-subtext mx-auto">
            Certified mechanics, precision gear, and comprehensive cleaning. Background 3D gears accelerate with your scroll speed!
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES_DATA.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative glass-panel-interactive p-6 rounded-2xl flex flex-col justify-between border-zinc-200 bg-white ${
                pkg.recommended
                  ? 'border-black shadow-md ring-1 ring-black/10'
                  : ''
              }`}
            >
              {pkg.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 badge-neon bg-black text-white border-black">
                  {pkg.badge}
                </div>
              )}

              <div className="space-y-6">
                {/* Header Icon & Title */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                    {getServiceIcon(pkg.icon)}
                  </div>
                  <span className="text-xs text-zinc-500 font-medium">
                    Turnaround: <strong className="text-black">{pkg.turnaround}</strong>
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl text-black">
                    {pkg.title}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-heading font-black text-3xl text-black">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-zinc-500">/ bike service</span>
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-3 pt-2">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700">
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onBookPackage(pkg)}
                className="w-full mt-8 py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all btn-secondary"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-16 glass-panel p-6 rounded-2xl border-zinc-300 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-black text-base">
                100% Satisfaction & 30-Day Service Warranty
              </h4>
              <p className="text-zinc-600 text-xs mt-0.5">
                All spare parts installed are original certified components. If gears mis-shift within 30 days, we re-tune for free.
              </p>
            </div>
          </div>
          <button
            onClick={() => onBookPackage(null)}
            className="btn-primary py-3 px-6 text-xs whitespace-nowrap"
          >
            Custom Repair Inquiry
          </button>
        </div>

      </div>
    </section>
  );
}
