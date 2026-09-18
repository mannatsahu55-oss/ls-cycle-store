import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Wrench, ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero3D({ onOpenBooking, onShopClick }) {
  const [isModelReady, setIsModelReady] = useState(false);
  const iframeRef = useRef(null);
  const apiRef = useRef(null);
  const initialCamRef = useRef(null);
  const animFrameRef = useRef(null);

  // Initialize Sketchfab Viewer API on the user's specific Kona 3D Model (ba4ac6e4deb34b369286f62b7c559d8f)
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let isSubscribed = true;

    const initSketchfab = () => {
      if (!window.Sketchfab) {
        if (isSubscribed) setTimeout(initSketchfab, 300);
        return;
      }

      const client = new window.Sketchfab('1.12.1', iframe);
      client.init('ba4ac6e4deb34b369286f62b7c559d8f', {
        success: (api) => {
          if (!isSubscribed) return;
          apiRef.current = api;
          api.start();
          api.addEventListener('viewerready', () => {
            if (!isSubscribed) return;
            setIsModelReady(true);
            api.getCameraLookAt((err, camera) => {
              if (!err && camera && camera.position && camera.target) {
                const [x, y, z] = camera.position;
                const [tx, ty, tz] = camera.target;
                const rawRadius = Math.sqrt((x - tx) ** 2 + (y - ty) ** 2);
                const zoomFactor = 0.23; // Bigger cycle filling the hero
                const radius = rawRadius * zoomFactor;
                
                // Add 90 degrees (Math.PI / 2) to rotate initial view by 90 degrees
                const baseAngle = Math.atan2(y - ty, x - tx) + (Math.PI / 2);
                
                // Shift cycle upward and slightly rightward so it sits cleanly above the heading
                const adjustedTarget = [tx, ty, tz - 1.55];

                initialCamRef.current = {
                  radius: radius || 1.8,
                  baseAngle: baseAngle || 0,
                  target: adjustedTarget,
                  zHeight: z * zoomFactor || 0.25,
                  readyTimestamp: Date.now()
                };

                // IMMEDIATELY set the camera look at position
                const newX = adjustedTarget[0] + radius * Math.cos(baseAngle);
                const newY = adjustedTarget[1] + radius * Math.sin(baseAngle);
                api.setCameraLookAt([newX, newY, initialCamRef.current.zHeight], adjustedTarget, 0);
              }
            });
          });
        },
        error: (err) => {
          console.warn('Sketchfab Viewer API init error:', err);
        },
        autostart: 1,
        ui_controls: 0,
        ui_infos: 0,
        ui_watermark: 0,
        ui_stop: 0,
        ui_ar: 0,
        ui_help: 0,
        ui_settings: 0,
        ui_inspector: 0,
        ui_annotations: 0,
        ui_hint: 0,
        transparent: 1,
        dnt: 1
      });
    };

    initSketchfab();

    return () => {
      isSubscribed = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Continuous animation loop to rotate camera around the Sketchfab model as user scrolls!
  useEffect(() => {
    let lastScrollY = -1;

    const updateCamera = () => {
      animFrameRef.current = requestAnimationFrame(updateCamera);

      const currentScroll = window.scrollY;
      if (apiRef.current && initialCamRef.current) {
        const { radius, baseAngle, target, zHeight, readyTimestamp } = initialCamRef.current;
        // Lock camera for first 4 seconds after viewerready so Sketchfab default camera intro can never override our view
        const isInitialPhase = readyTimestamp && (Date.now() - readyTimestamp < 4000);

        if (currentScroll !== lastScrollY || isInitialPhase) {
          lastScrollY = currentScroll;
          const scrollAngle = baseAngle + currentScroll * 0.003;
          const newX = target[0] + radius * Math.cos(scrollAngle);
          const newY = target[1] + radius * Math.sin(scrollAngle);

          apiRef.current.setCameraLookAt([newX, newY, zHeight], target, 0);
        }
      }
    };

    updateCamera();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className="hero-height relative w-full overflow-hidden bg-white min-h-[650px]"
    >
      {/* Sketchfab 3D Bicycle Model Background Canvas (Full Vibrant Colors & Larger Scale) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: isModelReady ? 1 : 0.4,
          transform: 'translateY(-10%)',
        }}
      >
        <iframe
          ref={iframeRef}
          title="Kona 3D Model"
          className="w-full h-full border-0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
        />
      </div>

      {/* Subtle Bottom & Edge Vignette to keep text readable without washing out model colors */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white via-transparent to-transparent opacity-80 pointer-events-none" />

      {/* Main Hero Overlay Content */}
      <div
        className="absolute inset-0 z-[2] flex flex-col justify-end pointer-events-none"
        style={{ paddingBottom: 'clamp(48px, 8vh, 100px)' }}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-xl space-y-6">
            
            {/* Heading matching exact two-line design from reference screenshot */}
            <div className="space-y-3">
              <h1 className="font-heading font-black text-5xl sm:text-6xl xl:text-7xl tracking-tight leading-[1.05] text-black">
                LS CYCLE<br />
                <span className="gradient-text">STORE</span>
              </h1>
              <p className="font-heading font-semibold text-sm tracking-widest uppercase text-zinc-600">
                LAKSHMI SRINIVASA CYCLE STORE
              </p>
            </div>

            <p className="text-zinc-700 text-base leading-relaxed max-w-md font-normal">
              Precision engineered Kona 3D model. Scroll down to continuously rotate the cycle in full 360°.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2 pointer-events-auto">
              <a
                href="#cycles"
                onClick={onShopClick}
                className="btn-primary py-4 px-8 text-sm rounded-xl shadow-lg flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Cycles</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenBooking}
                className="btn-secondary py-4 px-8 text-sm rounded-xl flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Book a Service</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Top Right Live Indicator */}
      <div className="absolute top-24 right-6 z-[3] pointer-events-none hidden sm:block">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/90 border border-zinc-200 shadow-sm backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <div className="text-[11px] font-semibold text-zinc-800">
            {isModelReady ? 'Kona 3D Model Synchronized' : 'Loading Kona 3D Model...'}
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-1.5 pointer-events-none opacity-80">
        <span className="text-[10px] font-bold uppercase tracking-[3px] text-zinc-600">
          Scroll Down To Rotate
        </span>
        <ChevronDown className="w-4 h-4 text-black animate-bounce" />
      </div>

    </section>
  );
}
