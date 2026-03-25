// ============================================
// Frontend Effect Playground - Effects Data
// ============================================

(function() {
    'use strict';

    // Preview initializer functions for mouse effects
    const PREVIEW_INITERS = {
        // 1. Custom Cursor
        'custom-cursor': function(container) {
            container.style.cursor = 'none';
            const cursor = document.createElement('div');
            cursor.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: var(--primary, #6750A4);
                border-radius: 50%;
                pointer-events: none;
                transition: transform 0.1s ease;
                z-index: 1000;
            `;
            container.appendChild(cursor);

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                cursor.style.left = (e.clientX - rect.left - 10) + 'px';
                cursor.style.top = (e.clientY - rect.top - 10) + 'px';
            });

            container.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.2)';
            });

            container.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(0)';
            });
        },

        // 2. Cursor Follower
        'cursor-follower': function(container) {
            const dots = [];
            const dotCount = 6;

            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('div');
                dot.style.cssText = `
                    position: absolute;
                    width: ${14 - i}px;
                    height: ${14 - i}px;
                    background: var(--primary, #6750A4);
                    border-radius: 50%;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.2s ease;
                `;
                container.appendChild(dot);
                dots.push({ element: dot, x: 0, y: 0 });
            }

            let mouseX = 0, mouseY = 0;
            let isActive = false;

            container.addEventListener('mouseenter', () => {
                isActive = true;
                dots.forEach((d, i) => d.element.style.opacity = (1 - i * 0.12).toString());
            });

            container.addEventListener('mouseleave', () => {
                isActive = false;
                dots.forEach(d => d.element.style.opacity = '0');
            });

            container.addEventListener('mousemove', (e) => {
                if (!isActive) return;
                const rect = container.getBoundingClientRect();
                mouseX = Math.max(10, Math.min(rect.width - 10, e.clientX - rect.left));
                mouseY = Math.max(10, Math.min(rect.height - 10, e.clientY - rect.top));
            });

            function animate() {
                if (isActive) {
                    let x = mouseX;
                    let y = mouseY;

                    dots.forEach((dot, index) => {
                        const dotEl = dot.element;
                        dot.x += (x - dot.x) * (0.2 - index * 0.025);
                        dot.y += (y - dot.y) * (0.2 - index * 0.025);
                        dotEl.style.left = (dot.x - (7 - index * 0.5)) + 'px';
                        dotEl.style.top = (dot.y - (7 - index * 0.5)) + 'px';
                        x = dot.x;
                        y = dot.y;
                    });
                }

                if (container.isConnected) {
                    requestAnimationFrame(animate);
                }
            }
            animate();
        },

        // 3. Magnetic Button
        'magnetic-button': function(container) {
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';

            const button = document.createElement('button');
            button.textContent = 'Hover Me';
            button.style.cssText = `
                padding: 12px 32px;
                background: linear-gradient(135deg, #6750A4, #9381FF);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s ease;
            `;
            container.appendChild(button);

            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        },

        // 4. Cursor Spotlight
        'cursor-spotlight': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;position:relative;overflow:hidden;';

            // Content that will be revealed
            const content = document.createElement('div');
            content.innerHTML = '<span style="font-size:14px;font-weight:600;color:#6750A4;">✨ SPOTLIGHT</span>';
            container.appendChild(content);

            // Dark overlay with spotlight hole
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:absolute;inset:0;background:radial-gradient(circle 80px at var(--x,50%) var(--y,50%),transparent 0%,rgba(26,26,46,0.95) 100%);pointer-events:none;transition:background 0.05s ease;';
            container.appendChild(overlay);

            // Glow ring around spotlight
            const glow = document.createElement('div');
            glow.style.cssText = 'position:absolute;width:160px;height:160px;border-radius:50%;border:2px solid rgba(103,80,164,0.5);pointer-events:none;opacity:0;transform:translate(-50%,-50%);transition:opacity 0.2s ease;';
            container.appendChild(glow);

            container.addEventListener('mouseenter', () => {
                glow.style.opacity = '1';
            });

            container.addEventListener('mouseleave', () => {
                glow.style.opacity = '0';
            });

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                overlay.style.setProperty('--x', x + 'px');
                overlay.style.setProperty('--y', y + 'px');
                glow.style.left = x + 'px';
                glow.style.top = y + 'px';
            });
        },

        // 5. Hover Tilt Card
        'hover-tilt': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:800px;padding:20px;';

            const card = document.createElement('div');
            card.style.cssText = 'width:120px;height:80px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:16px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:14px;transform-style:preserve-3d;transition:all 0.1s ease;box-shadow:0 15px 35px rgba(103,80,164,0.4);border:2px solid rgba(255,255,255,0.2);position:relative;overflow:hidden;';
            card.innerHTML = '<span style="position:relative;z-index:2;">TILT</span>';
            container.appendChild(card);

            // Shine effect overlay
            const shine = document.createElement('div');
            shine.style.cssText = 'position:absolute;width:200%;height:200%;top:-50%;left:-50%;background:radial-gradient(circle,rgba(255,255,255,0.3) 0%,transparent 50%);pointer-events:none;opacity:0;transition:opacity 0.3s ease;';
            card.appendChild(shine);

            // 3D corner indicators
            const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
            corners.forEach(corner => {
                const indicator = document.createElement('div');
                indicator.style.cssText = `position:absolute;width:8px;height:8px;border:2px solid rgba(255,255,255,0.5);transform:translateZ(15px);`;
                if (corner === 'top-left') indicator.style.cssText += 'top:8px;left:8px;';
                if (corner === 'top-right') indicator.style.cssText += 'top:8px;right:8px;';
                if (corner === 'bottom-left') indicator.style.cssText += 'bottom:8px;left:8px;';
                if (corner === 'bottom-right') indicator.style.cssText += 'bottom:8px;right:8px;';
                card.appendChild(indicator);
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 3;
                const rotateY = (centerX - x) / 3;

                card.style.transform = `perspective(800px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.1, 1.1, 1.1)`;
                card.style.boxShadow = `${rotateY * -0.5}px ${rotateX * 0.5}px 40px rgba(103,80,164,0.6), ${rotateY * -1}px ${rotateX * 1}px 60px rgba(147,129,255,0.3)`;

                // Move shine effect
                shine.style.opacity = '1';
                shine.style.transform = `translate(${x - rect.width / 2}px, ${y - rect.height / 2}px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.boxShadow = '0 15px 35px rgba(103,80,164,0.4)';
                shine.style.opacity = '0';
            });
        },

        // 6. Click Ripple
        'click-ripple': function(container) {
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';

            const button = document.createElement('button');
            button.textContent = 'Click Me';
            button.style.cssText = `
                position: relative;
                padding: 12px 32px;
                background: #6750A4;
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                overflow: hidden;
            `;
            container.appendChild(button);

            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: translate(-50%, -50%);
                    animation: ripple 0.6s ease-out forwards;
                `;

                const style = document.createElement('style');
                style.textContent = `
                    @keyframes ripple {
                        to {
                            width: 200px;
                            height: 200px;
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);

                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        },

        // 7. Cursor Trail
        'cursor-trail': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;position:relative;overflow:hidden;';

            const hint = document.createElement('div');
            hint.textContent = '🔥 Move cursor';
            hint.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#9ca3af;font-size:12px;pointer-events:none;';
            container.appendChild(hint);

            const trail = [];
            const maxTrail = 15;
            const sparkColors = ['#ff6b35', '#ff9500', '#ffcc00', '#ff3300', '#ff5e00'];

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const spark = document.createElement('div');
                const size = 3 + Math.random() * 6;
                const color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
                const offsetX = (Math.random() - 0.5) * 10;
                const offsetY = (Math.random() - 0.5) * 10;

                spark.style.cssText = `
                    position: absolute;
                    left: ${e.clientX - rect.left + offsetX}px;
                    top: ${e.clientY - rect.top + offsetY}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    pointer-events: none;
                    opacity: 1;
                    box-shadow: 0 0 ${size * 2}px ${color}, 0 0 ${size}px #ffcc00;
                `;
                container.appendChild(spark);
                trail.push({ el: spark, vy: -0.5 - Math.random() * 1.5, life: 1 });

                if (trail.length > maxTrail) {
                    const old = trail.shift();
                    old.el.remove();
                }

                const animateSpark = (index) => {
                    if (index >= trail.length) return;
                    const item = trail[index];
                    item.life -= 0.03;
                    item.vy += 0.02;

                    const currentTop = parseFloat(item.el.style.top);
                    const currentLeft = parseFloat(item.el.style.left);

                    item.el.style.top = (currentTop + item.vy) + 'px';
                    item.el.style.opacity = Math.max(0, item.life);
                    item.el.style.transform = `scale(${item.life})`;

                    if (item.life > 0 && item.el.parentNode) {
                        requestAnimationFrame(() => animateSpark(index));
                    } else {
                        item.el.remove();
                        const idx = trail.indexOf(item);
                        if (idx > -1) trail.splice(idx, 1);
                    }
                };

                requestAnimationFrame(() => animateSpark(trail.length - 1));
            });
        },

        // 8. Cursor Blend Mode
        'cursor-blend': function(container) {
            container.style.background = 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1, #96E6A1)';
            container.style.backgroundSize = '400% 400%';
            container.style.animation = 'gradient 8s ease infinite';
            container.style.position = 'relative';
            container.style.cursor = 'none';

            const style = document.createElement('style');
            style.textContent = `
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `;
            document.head.appendChild(style);

            const cursor = document.createElement('div');
            cursor.style.cssText = `
                position: absolute;
                width: 40px;
                height: 40px;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                mix-blend-mode: difference;
                transform: translate(-50%, -50%);
                z-index: 10;
                display: none;
            `;
            container.appendChild(cursor);

            container.addEventListener('mouseenter', () => {
                cursor.style.display = 'block';
            });

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                cursor.style.left = x + 'px';
                cursor.style.top = y + 'px';
            });

            container.addEventListener('mouseleave', () => {
                cursor.style.display = 'none';
            });
        },

        // 9. Glow Follow
        'glow-follow': function(container) {
            const glow = document.createElement('div');
            glow.style.cssText = `
                position: absolute;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(103, 80, 164, 0.6), transparent 70%);
                pointer-events: none;
                transition: all 0.15s ease;
                z-index: 0;
            `;
            container.appendChild(glow);

            const content = document.createElement('div');
            content.textContent = 'Glow Follow';
            content.style.cssText = `
                position: relative;
                z-index: 1;
                font-size: 14px;
                font-weight: 600;
                color: #6750A4;
            `;
            container.appendChild(content);

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                glow.style.left = (e.clientX - rect.left - 50) + 'px';
                glow.style.top = (e.clientY - rect.top - 50) + 'px';
            });
        },

        // 10. Ring Cursor
        'ring-cursor': function(container) {
            container.style.cursor = 'none';
            container.style.position = 'relative';

            const ring = document.createElement('div');
            ring.style.cssText = `
                position: absolute;
                width: 36px;
                height: 36px;
                border: 2px solid #6750A4;
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                transition: all 0.15s ease;
                z-index: 10;
                display: none;
            `;
            container.appendChild(ring);

            const dot = document.createElement('div');
            dot.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: #6750A4;
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 10;
                display: none;
            `;
            container.appendChild(dot);

            container.addEventListener('mouseenter', () => {
                ring.style.display = 'block';
                dot.style.display = 'block';
                ring.style.transform = 'translate(-50%, -50%) scale(1.3)';
            });

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                ring.style.left = x + 'px';
                ring.style.top = y + 'px';
                dot.style.left = x + 'px';
                dot.style.top = y + 'px';
            });

            container.addEventListener('mouseleave', () => {
                ring.style.display = 'none';
                dot.style.display = 'none';
            });
        },

        // 11. Parallax Mouse
        'parallax-mouse': function(container) {
            container.style.position = 'relative';
            container.style.background = 'linear-gradient(135deg, #EDE7F6, #F0EBF8)';

            const layers = ['🌟', '✨', '💫'].map((emoji, i) => {
                const el = document.createElement('div');
                el.textContent = emoji;
                el.style.cssText = `
                    position: absolute;
                    font-size: ${24 - i * 4}px;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    transition: transform 0.2s ease;
                `;
                container.appendChild(el);
                return { element: el, depth: 0.02 + i * 0.03 };
            });

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2);
                const y = (e.clientY - rect.top - rect.height / 2);

                layers.forEach(layer => {
                    layer.element.style.transform = `
                        translate(calc(-50% + ${x * layer.depth}px), calc(-50% + ${y * layer.depth}px))
                    `;
                });
            });
        },

        // 12. Text Reveal Hover
        'text-reveal': function(container) {
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
            container.style.background = '#1C1B1F';

            const wrapper = document.createElement('div');
            wrapper.style.cssText = `
                position: relative;
                overflow: hidden;
            `;

            const text = document.createElement('span');
            text.textContent = 'Reveal Me';
            text.style.cssText = `
                display: block;
                font-size: 18px;
                font-weight: 600;
                color: white;
                padding: 8px 16px;
            `;
            wrapper.appendChild(text);

            const mask = document.createElement('div');
            mask.style.cssText = `
                position: absolute;
                inset: 0;
                background: #6750A4;
                transform-origin: left;
                transition: transform 0.4s ease;
            `;
            wrapper.appendChild(mask);

            container.appendChild(wrapper);

            container.addEventListener('mouseenter', () => {
                mask.style.transform = 'scaleX(0)';
            });

            container.addEventListener('mouseleave', () => {
                mask.style.transform = 'scaleX(1)';
            });
        },

        // ============================================
        // DESIGN STYLE PREVIEW INITIALIZERS
        // ============================================

        // 1. Minimalism
        'minimalism': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#fafafa;';
            const card = document.createElement('div');
            card.style.cssText = 'background:#fff;padding:24px 32px;border:1px solid #e5e5e5;box-shadow:0 1px 3px rgba(0,0,0,0.05);';
            card.innerHTML = '<h3 style="margin:0;font-family:Inter,sans-serif;font-weight:300;font-size:18px;color:#111;">Minimal</h3>';
            container.appendChild(card);
        },

        // 2. Neumorphism
        'neumorphism': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#e0e5ec;';
            const card = document.createElement('div');
            card.style.cssText = 'background:#e0e5ec;padding:32px;border-radius:20px;box-shadow:9px 9px 16px rgba(163,177,198,0.6),-9px -9px 16px rgba(255,255,255,0.5);';
            card.innerHTML = '<span style="font-size:14px;font-weight:600;color:#4a5568;">Neumorphic</span>';
            container.appendChild(card);
        },

        // 3. Glassmorphism
        'glassmorphism': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#667eea,#764ba2);';
            const card = document.createElement('div');
            card.style.cssText = 'background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.2);border-radius:16px;padding:24px 32px;';
            card.innerHTML = '<span style="color:#fff;font-size:14px;font-weight:600;">Glass</span>';
            container.appendChild(card);
        },

        // 4. Aesthetic Minimal
        'aesthetic-minimal': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#faf9f6;padding:12px;';

            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'display:flex;flex-direction:column;gap:8px;';

            // Main card with photo-style minimal layout
            const card = document.createElement('div');
            card.style.cssText = 'background:#fff;padding:12px;border:1px solid #e8e4d9;display:flex;gap:10px;align-items:center;';

            // Circle image placeholder
            const circle = document.createElement('div');
            circle.style.cssText = 'width:32px;height:32px;background:linear-gradient(135deg,#d4c5b9,#e8d8c4);border-radius:50%;flex-shrink:0;';
            card.appendChild(circle);

            // Content
            const content = document.createElement('div');
            content.style.cssText = 'display:flex;flex-direction:column;gap:4px;';
            content.innerHTML = '<span style="font-size:11px;font-weight:500;color:#2d2d2d;font-family:"Georgia",serif;">Essence</span><span style="font-size:7px;color:#9ca3af;letter-spacing:0.5px;">PURE FORM</span>';
            card.appendChild(content);

            wrapper.appendChild(card);

            // Minimal decorative elements
            const dots = document.createElement('div');
            dots.style.cssText = 'display:flex;gap:6px;justify-content:center;';
            dots.innerHTML = '<div style="width:4px;height:4px;background:#d4c5b9;border-radius:50%;"></div><div style="width:4px;height:4px;background:#e8d8c4;border-radius:50%;"></div><div style="width:4px;height:4px;background:#d4c5b9;border-radius:50%;"></div>';
            wrapper.appendChild(dots);

            container.appendChild(wrapper);
        },

        // 5. Clean Design
        'clean-design': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#f8f9fa;padding:12px;';

            const card = document.createElement('div');
            card.style.cssText = 'background:#fff;padding:16px;border-radius:16px;box-shadow:0 2px 12px rgba(0,0,0,0.06);display:flex;flex-direction:column;gap:10px;min-width:90px;';

            // Header
            card.innerHTML = '<div style="display:flex;align-items:center;gap:8px;"><div style="width:24px;height:24px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:8px;"></div><div style="flex:1;"><div style="font-size:10px;font-weight:600;color:#1a1a2e;">Clean UI</div><div style="font-size:7px;color:#9ca3af;">Card Layout</div></div></div>';

            // Content rows
            card.innerHTML += '<div style="display:flex;gap:6px;"><div style="flex:1;height:6px;background:#f3f4f6;border-radius:3px;"></div><div style="width:20px;height:6px;background:#667eea;border-radius:3px;"></div></div>';
            card.innerHTML += '<div style="display:flex;gap:6px;"><div style="width:30px;height:6px;background:#a5b4fc;border-radius:3px;"></div><div style="flex:1;height:6px;background:#f3f4f6;border-radius:3px;"></div></div>';

            container.appendChild(card);
        },

        // 6. Cyberpunk
        'cyberpunk': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#0a0a0a;';
            const card = document.createElement('div');
            card.style.cssText = 'background:#0a0a0a;padding:24px 32px;border:2px solid #ff00ff;box-shadow:0 0 20px #ff00ff,0 0 40px #00ffff inset;';
            card.innerHTML = '<span style="font-family:monospace;font-size:14px;color:#00ffff;text-shadow:0 0 10px #00ffff;">CYBER</span>';
            container.appendChild(card);
        },

        // 7. Futurism
        'futurism': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#fff;overflow:hidden;';
            const card = document.createElement('div');
            card.style.cssText = 'position:relative;padding:24px 32px;background:#000;color:#fff;clip-path:polygon(10% 0,100% 0,100% 80%,90% 100%,0 100%,0 20%);';
            card.innerHTML = '<span style="font-size:12px;font-weight:700;letter-spacing:0.2em;">FUTURE</span><div style="position:absolute;top:0;left:0;right:0;height:2px;background:#fff;"></div>';
            container.appendChild(card);
        },

        // 8. Synthwave
        'synthwave': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a0533;';
            const card = document.createElement('div');
            card.style.cssText = 'background:linear-gradient(180deg,#ff6b9d,#c44cff,#6a00ff);padding:24px 32px;border-radius:8px;position:relative;overflow:hidden;';
            card.innerHTML = '<span style="font-size:14px;font-weight:700;color:#fff;position:relative;z-index:1;text-shadow:0 2px 10px rgba(0,0,0,0.5);">SYNTH</span><div style="position:absolute;bottom:0;left:0;right:0;height:8px;background:repeating-linear-gradient(90deg,#ff00ff 0px,#ff00ff 2px,transparent 2px,transparent 8px);"></div>';
            container.appendChild(card);
        },

        // 9. HUD/FUI
        'hud-fui': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#050a14;padding:12px;position:relative;overflow:hidden;';

            // Grid background
            const grid = document.createElement('div');
            grid.style.cssText = 'position:absolute;inset:0;background-image:linear-gradient(rgba(0,168,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,168,255,0.1) 1px,transparent 1px);background-size:20px 20px;';
            container.appendChild(grid);

            const card = document.createElement('div');
            card.style.cssText = 'position:relative;padding:12px;border:1px solid #00a8ff;background:rgba(0,168,255,0.08);display:flex;flex-direction:column;gap:8px;';

            // Header with brackets
            card.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(0,168,255,0.3);padding-bottom:6px;"><span style="font-family:monospace;font-size:8px;color:#00a8ff;letter-spacing:1px;">◆ SYSTEM ONLINE</span><div style="display:flex;gap:2px;"><span style="width:6px;height:6px;border:1px solid #00a8ff;border-radius:1px;transform:rotate(45deg);"></span><span style="font-size:7px;color:#00a8ff;font-family:monospace;">v2.4</span></div></div>';

            // Data display area
            card.innerHTML += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:4px;background:rgba(0,168,255,0.1);">';
            card.innerHTML += '<div style="text-align:center;"><div style="font-size:6px;color:#4a90a2;font-family:monospace;">CPU</div><div style="font-size:10px;color:#00d9ff;font-weight:700;font-family:monospace;" id="cpuVal">42</div></div>';
            card.innerHTML += '<div style="text-align:center;"><div style="font-size:6px;color:#4a90a2;font-family:monospace;">MEM</div><div style="font-size:10px;color:#00d9ff;font-weight:700;font-family:monospace;" id="memVal">67</div></div>';
            card.innerHTML += '<div style="text-align:center;"><div style="font-size:6px;color:#4a90a2;font-family:monospace;">NET</div><div style="font-size:10px;color:#00d9ff;font-weight:700;font-family:monospace;" id="netVal">98</div></div></div>';

            // Progress bar
            card.innerHTML += '<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:6px;color:#4a90a2;font-family:monospace;">LOAD</span><div style="flex:1;height:3px;background:rgba(0,168,255,0.2);border-radius:1px;overflow:hidden;"><div style="height:100%;width:75%;background:linear-gradient(90deg,#00a8ff,#00ff88);animation:progress 2s ease-in-out infinite;"></div></div></div>';

            // Scanning line
            card.innerHTML += '<div style="position:absolute;top:0;left:0;right:0;height:2px;background:rgba(0,217,255,0.5);animation:scan 2s linear infinite;"></div>';

            container.appendChild(card);

            // Animate values
            setInterval(() => {
                const cpu = document.getElementById('cpuVal');
                const mem = document.getElementById('memVal');
                const net = document.getElementById('netVal');
                if (cpu) cpu.textContent = Math.floor(35 + Math.random() * 30);
                if (mem) mem.textContent = Math.floor(50 + Math.random() * 40);
                if (net) net.textContent = Math.floor(85 + Math.random() * 14);
            }, 800);

            const style = document.createElement('style');
            style.textContent = `@keyframes scan { 0% { top: 0; opacity: 1; } 100% { top: 100%; opacity: 0; } } @keyframes progress { 0%, 100% { width: 60%; } 50% { width: 90%; } }`;
            container.appendChild(style);
        },

        // 10. Tech Noir
        'tech-noir': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#0a0e17;padding:12px;position:relative;overflow:hidden;';

            // Rain effect
            const rain = document.createElement('div');
            rain.style.cssText = 'position:absolute;inset:0;opacity:0.3;background:repeating-linear-gradient(180deg,transparent 0px,rgba(0,217,255,0.3) 1px,transparent 2px);background-size:100% 20px;animation:rain 0.5s linear infinite;';
            container.appendChild(rain);

            const card = document.createElement('div');
            card.style.cssText = 'background:linear-gradient(135deg,#1b263b,#0d1b2a);padding:16px 20px;border:1px solid #00d9ff;border-left:3px solid #00d9ff;position:relative;z-index:1;box-shadow:0 0 20px rgba(0,217,255,0.2);display:flex;flex-direction:column;gap:8px;';

            card.innerHTML = '<div style="display:flex;align-items:center;gap:6px;"><span style="width:8px;height:8px;background:#00d9ff;border-radius:50%;box-shadow:0 0 8px #00d9ff;"></span><span style="font-size:11px;font-weight:600;color:#00d9ff;font-family:monospace;letter-spacing:0.15em;">NOIR</span></div>';

            // Data lines
            card.innerHTML += '<div style="display:flex;gap:4px;font-family:monospace;"><span style="font-size:7px;color:#4a5568;">LOC:001</span><span style="font-size:7px;color:#00d9ff;">RUNNING</span></div>';

            // Scanline
            card.innerHTML += '<div style="position:absolute;top:0;left:0;right:0;height:1px;background:rgba(0,217,255,0.3);animation:scan 2s linear infinite;"></div>';

            container.appendChild(card);

            const style = document.createElement('style');
            style.textContent = `@keyframes rain { from { background-position: 0 0; } to { background-position: 0 20px; } } @keyframes scan { 0% { top: 0; opacity: 1; } 100% { top: 100%; opacity: 0; } }`;
            container.appendChild(style);
        },

        // 11. Glitch Art
        'glitch-art': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#111;';
            const card = document.createElement('div');
            card.style.cssText = 'padding:24px 32px;background:#fff;position:relative;';
            card.innerHTML = '<span style="font-size:16px;font-weight:900;color:#fff;position:relative;text-shadow:2px 0 #ff00ff,-2px 0 #00ffff;">GLITCH</span>';
            container.appendChild(card);
        },

        // 12. Y2K
        'y2k': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#e0f2ff;';
            const card = document.createElement('div');
            card.style.cssText = 'background:linear-gradient(180deg,#0066ff,#00ccff);padding:20px 32px;border-radius:20px;border:3px solid #fff;box-shadow:0 4px 20px rgba(0,102,255,0.3),inset 0 2px 0 rgba(255,255,255,0.3);';
            card.innerHTML = '<span style="font-size:14px;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,0.3);background:linear-gradient(180deg,#fff,#cce5ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Y2K</span>';
            container.appendChild(card);
        },

        // 13. Retro Wave
        'retro-wave': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#2d1b4e;';
            const card = document.createElement('div');
            card.style.cssText = 'background:linear-gradient(180deg,#ff6b35,#f7c59f,#efefef,#2d1b4e);padding:24px 32px;border-radius:8px;position:relative;overflow:hidden;';
            card.innerHTML = '<span style="font-size:14px;font-weight:700;color:#ff6b35;text-shadow:2px 2px 0 #2d1b4e;position:relative;z-index:1;">RETRO</span><div style="position:absolute;bottom:0;left:0;right:0;height:12px;background:repeating-linear-gradient(90deg,#ff6b35 0px,#ff6b35 4px,#f7c59f 4px,#f7c59f 8px);"></div>';
            container.appendChild(card);
        },

        // 14. 90s Aesthetic
        '90s-aesthetic': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#fff5e6;';
            const card = document.createElement('div');
            card.style.cssText = 'background:#ff6b6b;padding:20px 28px;border:4px solid #000;box-shadow:8px 8px 0 #000;';
            card.innerHTML = '<span style="font-size:14px;font-weight:900;color:#fff;font-family:"Comic Sans MS",cursive;">90s!</span>';
            container.appendChild(card);
        },

        // 15. Vaporwave
        'vaporwave': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#ff7ed9;';
            const card = document.createElement('div');
            card.style.cssText = 'background:linear-gradient(180deg,#ff7ed9,#b983ff,#72f2ff);padding:24px 32px;position:relative;';
            card.innerHTML = '<span style="font-size:16px;font-weight:700;color:#fff;position:relative;z-index:1;text-shadow:2px 2px 0 #ff00aa;">VAPOR</span><div style="position:absolute;bottom:0;left:0;right:0;height:16px;background:repeating-linear-gradient(90deg,#ff00aa 0px,transparent 4px);"></div>';
            container.appendChild(card);
        },

        // 16. Brutalism
        'brutalism': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#fff;';
            const card = document.createElement('div');
            card.style.cssText = 'background:#ff0;padding:20px 28px;border:4px solid #000;box-shadow:8px 8px 0 #000;';
            card.innerHTML = '<span style="font-size:14px;font-weight:900;color:#000;font-family:monospace;text-transform:uppercase;">BRUTAL</span>';
            container.appendChild(card);
        },

        // 17. 3D Isometric
        '3d-isometric': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#f0f0f0;';
            const card = document.createElement('div');
            card.style.cssText = 'background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:24px 32px;border-radius:8px;box-shadow:8px 8px 0 #4f46e5,-8px -8px 0 #a78bfa;';
            card.innerHTML = '<span style="font-size:12px;font-weight:700;color:#fff;letter-spacing:0.1em;">ISOMETRIC</span>';
            container.appendChild(card);
        },

        // 18. Low Poly
        'low-poly': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const card = document.createElement('div');
            card.style.cssText = 'background:conic-gradient(from 0deg at 50% 50%,#ff6b6b 0deg,#feca57 60deg,#48dbfb 120deg,#ff9ff3 180deg,#54a0ff 240deg,#5f27cd 300deg,#ff6b6b 360deg);padding:28px 36px;clip-path:polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%);';
            card.innerHTML = '<span style="font-size:11px;font-weight:700;color:#fff;position:relative;z-index:1;">POLY</span>';
            container.appendChild(card);
        },

        // 19. Organic 3D
        'organic-3d': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#f0f9ff;';
            const card = document.createElement('div');
            card.style.cssText = 'background:linear-gradient(135deg,#a78bfa,#f472b6);padding:28px 36px;border-radius:60% 40% 50% 50% / 50% 60% 40% 50%;box-shadow:0 20px 40px rgba(167,139,250,0.3);';
            card.innerHTML = '<span style="font-size:13px;font-weight:600;color:#fff;">Organic</span>';
            container.appendChild(card);
        },

        // 20. Liquid Design
        'liquid-design': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#e0e7ff;';
            const blob = document.createElement('div');
            blob.style.cssText = 'width:100px;height:100px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:60% 40% 30% 70% / 60% 30% 70% 40%;animation:blob 8s ease-in-out infinite;';
            blob.innerHTML = '<style>@keyframes blob{0%,100%{border-radius:60% 40% 30% 70% / 60% 30% 70% 40%;}50%{border-radius:30% 60% 70% 40% / 50% 60% 30% 60%;}}</style><span style="display:flex;align-items:center;justify-content:center;height:100%;font-size:12px;font-weight:600;color:#fff;">Liquid</span>';
            container.appendChild(blob);
        },

        // 21. Morphism
        'morphism': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#e8eaf6;';
            const card = document.createElement('div');
            card.style.cssText = 'background:linear-gradient(145deg,#ffffff,#d1d5db);padding:24px 32px;border-radius:20px;box-shadow:20px 20px 60px #bebebe,-20px -20px 60px #ffffff;';
            card.innerHTML = '<span style="font-size:13px;font-weight:600;color:#6b7280;">Morphism</span>';
            container.appendChild(card);
        },

        // 22. Maximalism
        'maximalism': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#fff;';
            const card = document.createElement('div');
            card.style.cssText = 'background:#ff6b6b;padding:16px;border:3px solid #feca57;position:relative;box-shadow:4px 4px 0 #48dbfb,8px 8px 0 #ff9ff3;';
            card.innerHTML = '<span style="font-size:18px;font-weight:900;color:#fff;font-family:"Impact",sans-serif;-webkit-text-stroke:1px #000;">MAX!</span><div style="position:absolute;top:-4px;right:-4px;background:#00ff87;padding:2px 6px;font-size:8px;font-weight:700;color:#000;transform:rotate(15deg);">NEW</div>';
            container.appendChild(card);
        },

        // 23. Surrealism
        'surrealism': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#f5f0ff;';
            const card = document.createElement('div');
            card.style.cssText = 'background:#fff;padding:20px 28px;border-radius:50% 50% 0 50%;position:relative;box-shadow:0 20px 40px rgba(107,99,246,0.2);';
            card.innerHTML = '<span style="font-size:14px;font-weight:600;color:#6750A4;position:relative;">Surreal<div style="position:absolute;top:-8px;right:-8px;width:16px;height:16px;background:#feca57;border-radius:50%;opacity:0.8;"></div></span>';
            container.appendChild(card);
        },

        // 24. Abstract Geometric
        'abstract-geo': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#fff;';
            const card = document.createElement('div');
            card.style.cssText = 'position:relative;width:120px;height:80px;';
            card.innerHTML = '<div style="position:absolute;top:10px;left:10px;width:40px;height:40px;background:#ff6b6b;border-radius:8px;transform:rotate(15deg);"></div><div style="position:absolute;bottom:10px;right:10px;width:50px;height:50px;background:#48dbfb;border-radius:50%;"></div><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:10px;font-weight:700;color:#1a1a2e;z-index:1;">ABSTRACT</div>';
            container.appendChild(card);
        },

        // 25. Gradient Mesh
        'gradient-mesh': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;';
            const card = document.createElement('div');
            card.style.cssText = 'width:100%;height:100%;background:radial-gradient(at 40% 20%, #f472b6 0px, transparent 50%), radial-gradient(at 80% 0%, #a78bfa 0px, transparent 50%), radial-gradient(at 0% 50%, #34d399 0px, transparent 50%), radial-gradient(at 80% 50%, #fbbf24 0px, transparent 50%), radial-gradient(at 0% 100%, #60a5fa 0px, transparent 50%);';
            card.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;height:100%;font-size:14px;font-weight:700;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,0.3);">Mesh</span>';
            container.appendChild(card);
        },

        // 26. Typography Focus - Multi-line text with highlight
        'typography-focus': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#fff;overflow:hidden;padding:10px;';

            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'text-align:center;font-family:Georgia,serif;';

            // Multiple lines of text
            const lines = [
                { text: 'Beautiful', size: 14, weight: 400, color: '#9CA3AF' },
                { text: 'Typography', size: 18, weight: 700, color: '#6750A4' },
                { text: 'Design Matters', size: 12, weight: 400, color: '#9CA3AF' }
            ];

            lines.forEach((line, lineIndex) => {
                const lineDiv = document.createElement('div');
                lineDiv.style.cssText = 'margin: 3px 0;position:relative;';

                const words = line.text.split(' ');
                words.forEach((word, wordIndex) => {
                    const span = document.createElement('span');
                    span.style.cssText = `font-size:${line.size}px;font-weight:${line.weight};color:${line.color};margin:0 3px;transition:all 0.4s ease;display:inline-block;opacity:0.7;`;
                    span.textContent = word;
                    lineDiv.appendChild(span);
                });

                wrapper.appendChild(lineDiv);
            });

            container.appendChild(wrapper);

            // Animate words being highlighted
            let wordIndex = 0;
            const allWords = wrapper.querySelectorAll('span');
            
            const highlightWord = (index) => {
                allWords.forEach((w, i) => {
                    if (i === index) {
                        w.style.color = '#EADDFF';
                        w.style.textShadow = '0 0 15px #9381FF, 0 0 30px #6750A4';
                        w.style.transform = 'scale(1.15)';
                        w.style.opacity = '1';
                    } else {
                        w.style.color = i < index ? '#6750A4' : '#9CA3AF';
                        w.style.textShadow = 'none';
                        w.style.transform = 'scale(1)';
                        w.style.opacity = i < index ? '0.9' : '0.7';
                    }
                });
            };

            // Initial animation sequence
            const initialAnim = () => {
                let i = 0;
                const anim = () => {
                    if (i < allWords.length) {
                        highlightWord(i);
                        i++;
                        setTimeout(anim, 300);
                    } else {
                        // Final pulse on main word
                        setTimeout(() => {
                            highlightWord(1);
                            setTimeout(() => {
                                // Start loop
                                wordIndex = 0;
                                loopAnimation();
                            }, 1000);
                        }, 500);
                    }
                };
                anim();
            };

            const loopAnimation = () => {
                highlightWord(wordIndex);
                wordIndex = (wordIndex + 1) % allWords.length;
            };

            setTimeout(initialAnim, 300);
            setInterval(loopAnimation, 800);
        },

        // 27. Biophilic Design
        'biophilic': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#f0fdf4;';
            const card = document.createElement('div');
            card.style.cssText = 'background:#fff;padding:20px 28px;border-radius:20px;border:1px solid #86efac;box-shadow:0 10px 30px rgba(134,239,172,0.2);';
            card.innerHTML = '<span style="font-size:14px;font-weight:600;color:#166534;">🌿 Biophilic</span>';
            container.appendChild(card);
        },

        // 28. Soft Gradient
        'soft-gradient': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;';
            const card = document.createElement('div');
            card.style.cssText = 'width:100%;height:100%;background:linear-gradient(135deg,#fce7f3,#ddd6fe,#c7d2fe);';
            card.innerHTML = '<span style="font-size:14px;font-weight:600;color:#6b21a8;">Soft Gradient</span>';
            container.appendChild(card);
        },

        // 29. Pastel Aesthetic
        'pastel-aesthetic': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#fff5f5;';
            const card = document.createElement('div');
            card.style.cssText = 'display:flex;gap:8px;padding:20px;';
            card.innerHTML = '<div style="width:32px;height:32px;background:#ffb3ba;border-radius:50%;"></div><div style="width:32px;height:32px;background:#baffc9;border-radius:50%;"></div><div style="width:32px;height:32px;background:#bae1ff;border-radius:50%;"></div>';
            container.appendChild(card);
        },

        // 30. Bauhaus
        'bauhaus': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#f5f5f5;';
            const card = document.createElement('div');
            card.style.cssText = 'background:#fff;padding:24px;border:3px solid #000;display:flex;gap:8px;align-items:center;';
            card.innerHTML = '<div style="width:24px;height:24px;background:#e63946;border-radius:50%;"></div><div style="width:24px;height:24px;background:#457b9d;"></div><div style="width:0;height:0;border-left:14px solid transparent;border-right:14px solid transparent;border-bottom:24px solid #e9c46a;"></div>';
            container.appendChild(card);
        },

        // 31. Swiss Style
        'swiss-style': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#fff;';
            const card = document.createElement('div');
            card.style.cssText = 'position:relative;padding:24px 32px;border:2px solid #000;';
            card.innerHTML = '<span style="font-size:24px;font-weight:700;color:#000;letter-spacing:-0.02em;">SWISS</span><div style="position:absolute;top:8px;left:8px;width:6px;height:6px;background:#e63946;"></div>';
            container.appendChild(card);
        },

        // 32. New Vintage
        'new-vintage': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#f5e6d3;';
            const card = document.createElement('div');
            card.style.cssText = 'background:#d4a574;padding:20px 28px;position:relative;';
            card.innerHTML = '<span style="font-size:14px;font-weight:600;color:#fff;position:relative;z-index:1;">Vintage</span><div style="position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.1\'/%3E%3C/svg%3E");opacity:0.3;"></div>';
            container.appendChild(card);
        },

        // 33. Urban Modern
        'urban-modern': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a1a;padding:12px;';

            const card = document.createElement('div');
            card.style.cssText = 'background:#2d2d2d;padding:16px;border-left:4px solid #ff6b35;display:flex;flex-direction:column;gap:10px;position:relative;overflow:hidden;';

            // City skyline silhouette
            card.innerHTML = '<div style="position:absolute;bottom:0;left:0;right:0;height:20px;opacity:0.2;background:linear-gradient(to top,#000 0%,transparent 100%);"></div>';
            card.innerHTML += '<div style="position:absolute;bottom:0;left:0;right:0;display:flex;justify-content:space-around;align-items:flex-end;opacity:0.3;"><div style="width:6px;height:12px;background:#3a3a3a;"></div><div style="width:8px;height:18px;background:#3a3a3a;"></div><div style="width:5px;height:8px;background:#3a3a3a;"></div><div style="width:10px;height:14px;background:#3a3a3a;"></div><div style="width:6px;height:10px;background:#3a3a3a;"></div></div>';

            // Header
            card.innerHTML += '<div style="display:flex;align-items:center;justify-content:space-between;position:relative;z-index:1;"><span style="font-size:12px;font-weight:700;color:#fff;letter-spacing:0.1em;text-transform:uppercase;">URBAN</span><span style="font-size:16px;">🏙️</span></div>';

            // Tags
            card.innerHTML += '<div style="display:flex;gap:4px;position:relative;z-index:1;"><span style="font-size:6px;background:#ff6b35;color:#fff;padding:2px 5px;border-radius:2px;">MODERN</span><span style="font-size:6px;background:#3a3a3a;color:#999;padding:2px 5px;border-radius:2px;">STYLE</span></div>';

            container.appendChild(card);
        },

        // 34. Dynamic Layout
        'dynamic-layout': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#f8fafc;padding:12px;';

            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:8px;';

            // Create different sized cards
            const cards = [
                { content: '📊', span: '1/1', row: '1/2', color: '#6366f1' },
                { content: '📝', span: '2/3', row: '1/2', color: '#8b5cf6' },
                { content: '🎨', span: '1/1', row: '2/3', color: '#a78bfa' },
                { content: '⚡', span: '1/1', row: '2/3', color: '#f472b6', big: true },
                { content: '🔧', span: '1/1', row: '1/2', color: '#06b6d4' }
            ];

            cards.forEach((card, i) => {
                const div = document.createElement('div');
                const isWide = card.span === '2/3';
                const isTall = card.row === '1/3';
                div.style.cssText = `grid-column:${card.span};grid-row:${card.row};background:${card.color};border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:${card.big ? 18 : 14}px;color:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.1);transition:all 0.3s ease;opacity:0;animation:fadeIn 0.3s ease ${i * 0.1}s forwards;`;
                div.textContent = card.content;
                wrapper.appendChild(div);

                // Hover effect
                div.addEventListener('mouseenter', () => {
                    div.style.transform = 'scale(1.05)';
                    div.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                });
                div.addEventListener('mouseleave', () => {
                    div.style.transform = 'scale(1)';
                    div.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                });
            });

            container.appendChild(wrapper);

            const style = document.createElement('style');
            style.textContent = '@keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }';
            container.appendChild(style);
        },

        // ============================================
        // TEXT EFFECTS PREVIEW INITIALIZERS
        // ============================================

        // 1. Typewriter
        'typewriter': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;font-family:monospace;';
            const text = document.createElement('span');
            text.style.cssText = 'font-size:16px;color:#00ff9f;';
            container.appendChild(text);

            const fullText = 'Typing...';
            let index = 0;

            function type() {
                if (index < fullText.length) {
                    text.textContent = fullText.substring(0, index + 1) + '▋';
                    index++;
                    setTimeout(type, 100);
                } else {
                    setTimeout(() => {
                        text.textContent = fullText;
                        index = 0;
                        setTimeout(type, 2000);
                    }, 1000);
                }
            }
            type();
        },

        // 2. Glitch Text
        'glitch-text': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#000;';
            const text = document.createElement('div');
            text.style.cssText = 'font-size:20px;font-weight:900;color:#fff;position:relative;';
            text.innerHTML = '<span style="position:relative;">GLITCH</span>';
            container.appendChild(text);

            const span = text.querySelector('span');
            setInterval(() => {
                const offset1 = Math.random() * 4 - 2;
                const offset2 = Math.random() * 4 - 2;
                span.style.textShadow = `${offset1}px 0 #ff00ff, ${offset2}px 0 #00ffff`;
                setTimeout(() => {
                    span.style.textShadow = 'none';
                }, 50);
            }, 200);
        },

        // 3. Gradient Text
        'gradient-text': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#0a0a0f;';
            const text = document.createElement('span');
            text.style.cssText = 'font-size:24px;font-weight:800;background:linear-gradient(135deg,#667eea,#764ba2,#f093fb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;';
            text.textContent = 'Gradient';
            container.appendChild(text);

            let hue = 0;
            setInterval(() => {
                hue = (hue + 2) % 360;
                text.style.background = `linear-gradient(135deg,hsl(${hue},80%,60%),hsl(${(hue + 60)},80%,60%),hsl(${(hue + 120)},80%,60%))`;
                text.style.webkitBackgroundClip = 'text';
            }, 50);
        },

        // 4. Text Morph
        'text-morph': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#f0f0f0;';
            const text = document.createElement('span');
            text.style.cssText = 'font-size:18px;font-weight:700;color:#6750A4;display:inline-block;transition:all 0.5s cubic-bezier(0.68,-0.55,0.265,1.55);';
            text.textContent = 'Hello';
            container.appendChild(text);

            const words = ['Hello', 'World', 'Morph', 'Text!'];
            let index = 0;

            setInterval(() => {
                text.style.transform = 'scale(0) rotate(-180deg)';
                setTimeout(() => {
                    index = (index + 1) % words.length;
                    text.textContent = words[index];
                    text.style.transform = 'scale(1) rotate(0deg)';
                }, 250);
            }, 3000);
        },

        // 5. Split Reveal
        'split-reveal': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';

            const card = document.createElement('div');
            card.style.cssText = 'position:relative;padding:16px 24px;background:#2d2d3a;border-radius:12px;overflow:hidden;cursor:pointer;';
            container.appendChild(card);

            // Hidden text underneath (revealed on hover)
            const revealedText = document.createElement('span');
            revealedText.textContent = 'REVEALED!';
            revealedText.style.cssText = 'font-size:16px;font-weight:700;color:#00ff9f;letter-spacing:1px;';
            card.appendChild(revealedText);

            // Cover panels
            const cover = document.createElement('div');
            cover.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;transition:transform 0.5s cubic-bezier(0.86,0,0.07,1);';
            card.appendChild(cover);

            // Top cover
            const topCover = document.createElement('div');
            topCover.style.cssText = 'flex:1;background:linear-gradient(180deg, #6750A4, #9381FF);';
            cover.appendChild(topCover);

            // Middle line
            const line = document.createElement('div');
            line.style.cssText = 'height:2px;background:#EADDFF;';
            cover.appendChild(line);

            // Bottom cover
            const bottomCover = document.createElement('div');
            bottomCover.style.cssText = 'flex:1;background:linear-gradient(0deg, #9381FF, #6750A4);';
            cover.appendChild(bottomCover);

            // Initial state text
            const coverText = document.createElement('span');
            coverText.textContent = 'HOVER TO REVEAL';
            coverText.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:12px;font-weight:600;color:#fff;letter-spacing:1px;white-space:nowrap;';
            cover.appendChild(coverText);

            container.addEventListener('mouseenter', () => {
                cover.style.transform = 'translateY(-100%)';
                coverText.style.opacity = '0';
            });

            container.addEventListener('mouseleave', () => {
                cover.style.transform = 'translateY(0)';
                coverText.style.opacity = '1';
            });
        },

        // 6. Neon Text
        'neon-text': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const text = document.createElement('span');
            text.style.cssText = 'font-size:22px;font-weight:700;color:#fff;text-shadow:0 0 5px #fff,0 0 10px #fff,0 0 20px #0ff,0 0 40px #0ff,0 0 80px #0ff;animation:neon-pulse 1.5s ease-in-out infinite alternate;';
            text.textContent = 'NEON';
            container.appendChild(text);

            const style = document.createElement('style');
            style.textContent = '@keyframes neon-pulse{from{text-shadow:0 0 5px #fff,0 0 10px #fff,0 0 20px #0ff,0 0 40px #0ff,0 0 80px #0ff;}to{text-shadow:0 0 10px #fff,0 0 20px #fff,0 0 30px #0ff,0 0 40px #0ff,0 0 50px #0ff,0 0 80px #0ff;}}';
            document.head.appendChild(style);
        },

        // 7. 3D Text
        '3d-text': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#667eea,#764ba2);';
            const text = document.createElement('span');
            text.style.cssText = 'font-size:28px;font-weight:900;color:#fff;text-shadow:1px 1px 0 #ccc,2px 2px 0 #ccc,3px 3px 0 #ccc,4px 4px 0 #ccc,5px 5px 0 #ccc,6px 6px 0 #555;';
            text.textContent = '3D TEXT';
            container.appendChild(text);
        },

        // 8. Wave Text
        'wave-text': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1C1B1F;';
            const wrapper = document.createElement('span');
            wrapper.textContent = 'WAVE';
            wrapper.style.cssText = 'font-size:20px;font-weight:700;color:#fff;';
            container.appendChild(wrapper);

            const text = wrapper.textContent;
            wrapper.innerHTML = '';
            const letters = text.split('');
            letters.forEach((letter, i) => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.style.display = 'inline-block';
                span.style.animation = `wave 1s ease-in-out infinite`;
                span.style.animationDelay = `${i * 0.15}s`;
                wrapper.appendChild(span);
            });

            const style = document.createElement('style');
            style.textContent = '@keyframes wave{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}';
            document.head.appendChild(style);
        },

        // 9. Scramble Text
        'scramble-text': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#000;font-family:monospace;';
            const text = document.createElement('span');
            text.style.cssText = 'font-size:16px;color:#00ff9f;';
            container.appendChild(text);

            const targetText = 'SCRAMBLE';
            const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

            function scramble() {
                let iterations = 0;
                const interval = setInterval(() => {
                    text.textContent = targetText.split('').map((char, i) => {
                        if (i < iterations) return targetText[i];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join('');
                    iterations++;
                    if (iterations > targetText.length) {
                        clearInterval(interval);
                        setTimeout(scramble, 3000);
                    }
                }, 50);
            }
            scramble();
        },

        // 10. Counting Up
        'text-shatter': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const text = document.createElement('div');
            text.style.cssText = 'position:relative;font-size:18px;font-weight:700;color:#fff;cursor:pointer;display:inline-block;';
            text.textContent = 'SHATTER';

            const word = text.textContent;
            text.innerHTML = '';
            word.split('').forEach((letter, i) => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.style.cssText = 'display:inline-block;transition:transform 0.3s cubic-bezier(0.68,-0.55,0.265,1.55),opacity 0.3s ease;';
                text.appendChild(span);
            });
            container.appendChild(text);

            const spans = text.querySelectorAll('span');

            text.addEventListener('mouseenter', () => {
                spans.forEach((span, i) => {
                    const tx = (Math.random() - 0.5) * 80;
                    const ty = (Math.random() - 0.5) * 80;
                    const rot = (Math.random() - 0.5) * 180;
                    span.style.transform = `translate(${tx}px,${ty}px) rotate(${rot}deg)`;
                    span.style.opacity = '0';
                });
            });

            text.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    spans.forEach(span => {
                        span.style.transform = 'translate(0,0) rotate(0deg)';
                        span.style.opacity = '1';
                    });
                }, 100);
            });
        },

        // 11. Stroke Draw
        'stroke-draw': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#fff;';
            container.innerHTML = `<svg width="120" height="40" viewBox="0 0 120 40"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="none" stroke="#6750A4" stroke-width="1" stroke-dasharray="200" stroke-dashoffset="200" font-size="18" font-weight="600" style="animation:draw 2s ease forwards;">DRAW</text></svg><style>@keyframes draw{to{stroke-dashoffset:0;}}</style>`;
        },

        // 12. Variable Font
        'variable-font': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#f5f5f0;';
            const text = document.createElement('span');
            text.textContent = 'Variable';
            text.style.cssText = 'font-size:24px;font-weight:400;font-family:system-ui,-apple-system,sans-serif;font-variation-settings:"wght" 100,"wdth" 75;transition:all 0.5s ease;';
            container.appendChild(text);

            let time = 0;
            setInterval(() => {
                time += 0.05;
                const wght = 400 + Math.sin(time) * 300;
                const wdth = 75 + Math.cos(time) * 25;
                text.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}`;
            }, 50);
        },

        // ============================================
        // TRANSITIONS PREVIEW INITIALIZERS
        // ============================================

        // 1. Fade In/Out
        'fade': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const box = document.createElement('div');
            box.style.cssText = 'width:80px;height:80px;background:#6750A4;border-radius:12px;opacity:0;transition:opacity 0.4s ease;cursor:pointer;';
            box.textContent = 'Fade';
            box.style.cssText += 'display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => {
                box.style.opacity = '1';
            });
            container.addEventListener('mouseleave', () => {
                box.style.opacity = '0';
            });
        },

        // 2. Slide Up
        'slide-up': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const box = document.createElement('div');
            box.style.cssText = 'width:80px;height:80px;background:#feca57;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#1a1a2e;transform:translateY(60px);transition:transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275);cursor:pointer;';
            box.textContent = 'Slide';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => {
                box.style.transform = 'translateY(0)';
            });
            container.addEventListener('mouseleave', () => {
                box.style.transform = 'translateY(60px)';
            });
        },

        // 3. Scale Pop
        'scale-pop': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const box = document.createElement('div');
            box.style.cssText = 'width:70px;height:70px;background:#10b981;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transform:scale(0);transition:transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275);cursor:pointer;';
            box.textContent = 'Pop';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => {
                box.style.transform = 'scale(1)';
            });
            container.addEventListener('mouseleave', () => {
                box.style.transform = 'scale(0)';
            });
        },

        // 4. Flip X
        'flip-x': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:200px;';
            const inner = document.createElement('div');
            inner.style.cssText = 'width:70px;height:70px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transition:transform 0.6s;transform-style:preserve-3d;cursor:pointer;';
            inner.textContent = 'Flip';
            container.appendChild(inner);

            container.addEventListener('mouseenter', () => {
                inner.style.transform = 'rotateX(180deg)';
            });
            container.addEventListener('mouseleave', () => {
                inner.style.transform = 'rotateX(0deg)';
            });
        },

        // 5. Blur In
        'blur-in': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const box = document.createElement('div');
            box.style.cssText = 'width:80px;height:80px;background:#f472b6;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;filter:blur(10px);transition:filter 0.4s ease;cursor:pointer;';
            box.textContent = 'Blur';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => {
                box.style.filter = 'blur(0px)';
            });
            container.addEventListener('mouseleave', () => {
                box.style.filter = 'blur(10px)';
            });
        },

        // 6. Stagger List
        'stagger': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;background:#1a1a2e;padding:12px;';
            const items = [1,2,3,4].map(i => {
                const item = document.createElement('div');
                item.style.cssText = `width:12px;height:12px;background:#6750A4;border-radius:4px;opacity:0;transform:translateY(10px);transition:all 0.3s ease;transition-delay:${i * 0.05}s;`;
                container.appendChild(item);
                return item;
            });

            container.addEventListener('mouseenter', () => {
                items.forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
            });
            container.addEventListener('mouseleave', () => {
                items.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                });
            });
        },

        // 7. Elastic Bounce
        'elastic': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const box = document.createElement('div');
            box.style.cssText = 'width:70px;height:70px;background:#06b6d4;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transform:scale(0);cursor:pointer;';
            box.textContent = 'Bounce';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => {
                box.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                box.style.transform = 'scale(1.2)';
            });
            container.addEventListener('mouseleave', () => {
                box.style.transition = 'transform 0.3s ease';
                box.style.transform = 'scale(0)';
            });
        },

        // 8. Clip Reveal
        'clip-reveal': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';

            // The revealed content (underneath)
            const revealed = document.createElement('div');
            revealed.style.cssText = 'position:absolute;width:90px;height:50px;background:#10b981;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;';
            revealed.textContent = 'REVEALED!';
            container.appendChild(revealed);

            // The cover overlay (on top)
            const cover = document.createElement('div');
            cover.style.cssText = 'position:absolute;width:90px;height:50px;background:#6750A4;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;clip-path:circle(0% at 50% 50%);transition:clip-path 0.4s ease;cursor:pointer;';
            cover.textContent = 'HOVER ME';
            container.appendChild(cover);

            container.addEventListener('mouseenter', () => {
                cover.style.clipPath = 'circle(100px at 50% 50%)';
            });
            container.addEventListener('mouseleave', () => {
                cover.style.clipPath = 'circle(0% at 50% 50%)';
            });
        },

        // 9. Rotate In
        'rotate-in': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const box = document.createElement('div');
            box.style.cssText = 'width:70px;height:70px;background:#8b5cf6;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transform:rotate(-180deg) scale(0);transition:transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);cursor:pointer;';
            box.textContent = 'Spin';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => {
                box.style.transform = 'rotate(0deg) scale(1)';
            });
            container.addEventListener('mouseleave', () => {
                box.style.transform = 'rotate(-180deg) scale(0)';
            });
        },

        // 10. Shape Morph
        'shape-morph': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const shape = document.createElement('div');
            shape.style.cssText = 'width:60px;height:60px;background:#f59e0b;border-radius:12px;transition:all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);cursor:pointer;';
            container.appendChild(shape);

            container.addEventListener('mouseenter', () => {
                shape.style.borderRadius = '50%';
                shape.style.transform = 'scale(1.2) rotate(45deg)';
            });
            container.addEventListener('mouseleave', () => {
                shape.style.borderRadius = '12px';
                shape.style.transform = 'scale(1) rotate(0deg)';
            });
        },

        // ============================================
        // PAGE TRANSITIONS PREVIEW INITIALIZERS
        // ============================================

        // 1. Swipe Left/Right
        'swipe-page': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;';
            const page1 = document.createElement('div');
            page1.style.cssText = 'position:absolute;width:100%;height:100%;background:#6750A4;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transition:transform 0.4s ease;cursor:pointer;';
            page1.textContent = 'Page 1 →';
            container.appendChild(page1);

            const page2 = document.createElement('div');
            page2.style.cssText = 'position:absolute;width:100%;height:100%;background:#9381FF;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transform:translateX(100%);transition:transform 0.4s ease;left:0;top:0;';
            page2.textContent = '← Page 2';
            container.appendChild(page2);

            let currentPage = 1;
            container.addEventListener('click', () => {
                if (currentPage === 1) {
                    page1.style.transform = 'translateX(-100%)';
                    page2.style.transform = 'translateX(0)';
                    currentPage = 2;
                } else {
                    page1.style.transform = 'translateX(0)';
                    page2.style.transform = 'translateX(100%)';
                    currentPage = 1;
                }
            });
        },

        // 2. Slide Over
        'slide-over': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;';
            const base = document.createElement('div');
            base.style.cssText = 'width:70px;height:70px;background:#6750A4;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;';
            base.textContent = 'Base';
            container.appendChild(base);

            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:absolute;width:100%;height:100%;background:rgba(103,80,164,0.95);transform:translateY(100%);transition:transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;cursor:pointer;';
            overlay.textContent = 'Slide Over';
            container.appendChild(overlay);

            container.addEventListener('mouseenter', () => {
                overlay.style.transform = 'translateY(0)';
            });
            container.addEventListener('mouseleave', () => {
                overlay.style.transform = 'translateY(100%)';
            });
        },

        // 3. Zoom In/Out
        'zoom-page': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;';
            const bg = document.createElement('div');
            bg.style.cssText = 'position:absolute;width:100%;height:100%;background:#6750A4;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transition:transform 0.5s ease;cursor:pointer;';
            bg.textContent = 'Zoom';
            container.appendChild(bg);

            const content = document.createElement('div');
            content.style.cssText = 'position:absolute;width:60px;height:60px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#6750A4;transform:scale(0);transition:transform 0.5s cubic-bezier(0.175,0.885,0.32,1.275);';
            content.textContent = 'Detail';
            container.appendChild(content);

            container.addEventListener('click', () => {
                const isZoomed = bg.style.transform === 'scale(1.5)';
                if (isZoomed) {
                    bg.style.transform = 'scale(1)';
                    content.style.transform = 'scale(0)';
                } else {
                    bg.style.transform = 'scale(1.5)';
                    content.style.transform = 'scale(1)';
                }
            });
        },

        // 4. Flip Page
        'flip-page': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:500px;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:80px;height:60px;transform-style:preserve-3d;transition:transform 0.8s;cursor:pointer;';
            container.appendChild(wrapper);

            const front = document.createElement('div');
            front.style.cssText = 'position:absolute;width:100%;height:100%;background:#6750A4;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;backface-visibility:hidden;';
            front.textContent = 'Front';
            wrapper.appendChild(front);

            const back = document.createElement('div');
            back.style.cssText = 'position:absolute;width:100%;height:100%;background:#9381FF;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;backface-visibility:hidden;transform:rotateY(180deg);';
            back.textContent = 'Back';
            wrapper.appendChild(back);

            container.addEventListener('click', () => {
                const isFlipped = wrapper.style.transform === 'rotateY(180deg)';
                wrapper.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
            });
        },

        // 5. Dissolve/Fade Through
        'dissolve': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;position:relative;';
            const scene = document.createElement('div');
            scene.style.cssText = 'position:relative;width:80px;height:60px;cursor:pointer;';
            container.appendChild(scene);

            const page1 = document.createElement('div');
            page1.style.cssText = 'position:absolute;width:100%;height:100%;background:#6750A4;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;opacity:1;transition:opacity 0.3s ease;';
            page1.textContent = 'Page 1';
            scene.appendChild(page1);

            const page2 = document.createElement('div');
            page2.style.cssText = 'position:absolute;width:100%;height:100%;background:#10b981;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;opacity:0;transition:opacity 0.3s ease;';
            page2.textContent = 'Page 2';
            scene.appendChild(page2);

            let current = 1;
            scene.addEventListener('click', () => {
                if (current === 1) {
                    page1.style.opacity = '0';
                    page2.style.opacity = '1';
                    current = 2;
                } else {
                    page1.style.opacity = '1';
                    page2.style.opacity = '0';
                    current = 1;
                }
            });
        },

        // 6. Shared Element
        'shared-element': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;gap:12px;';
            const item = document.createElement('div');
            item.style.cssText = 'width:30px;height:30px;background:#6750A4;border-radius:6px;transition:all 0.5s cubic-bezier(0.175,0.885,0.32,1.275);cursor:pointer;';
            container.appendChild(item);

            const text = document.createElement('span');
            text.style.cssText = 'font-size:11px;font-weight:600;color:#9381FF;';
            text.textContent = 'Click';
            container.appendChild(text);

            let expanded = false;
            container.addEventListener('click', () => {
                expanded = !expanded;
                if (expanded) {
                    item.style.width = '70px';
                    item.style.height = '50px';
                    item.style.borderRadius = '12px';
                    item.style.background = '#9381FF';
                    text.textContent = 'Expanded';
                } else {
                    item.style.width = '30px';
                    item.style.height = '30px';
                    item.style.borderRadius = '6px';
                    item.style.background = '#6750A4';
                    text.textContent = 'Click';
                }
            });
        },

        // 7. Curved Slide
        'curved-slide': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;perspective:200px;';
            const slider = document.createElement('div');
            slider.style.cssText = 'position:relative;width:70px;height:50px;background:#6750A4;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff;transition:all 0.5s cubic-bezier(0.68,-0.55,0.265,1.55);cursor:pointer;transform-style:preserve-3d;';
            slider.textContent = 'Curve';
            container.appendChild(slider);

            container.addEventListener('mouseenter', () => {
                slider.style.transform = 'translateX(20px) rotateY(-15deg) scale(1.1)';
                slider.style.background = '#9381FF';
            });
            container.addEventListener('mouseleave', () => {
                slider.style.transform = 'translateX(0) rotateY(0) scale(1)';
                slider.style.background = '#6750A4';
            });
        },

        // 8. Perspective Zoom
        'perspective-zoom': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:300px;';
            const card = document.createElement('div');
            card.style.cssText = 'width:70px;height:50px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff;transition:all 0.4s ease;cursor:pointer;transform:translateZ(0);';
            card.textContent = '3D Zoom';
            container.appendChild(card);

            container.addEventListener('mouseenter', () => {
                card.style.transform = 'translateZ(40px) scale(1.2)';
                card.style.boxShadow = '0 25px 50px rgba(103,80,164,0.5)';
            });
            container.addEventListener('mouseleave', () => {
                card.style.transform = 'translateZ(0) scale(1)';
                card.style.boxShadow = 'none';
            });
        },

        // ============================================
        // BACKGROUNDS PREVIEW INITIALIZERS
        // ============================================

        // 1. Linear Gradient
        'linear-gradient-bg': function(container) {
            container.style.cssText = 'background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);';
        },

        // 2. Radial Gradient
        'radial-gradient-bg': function(container) {
            container.style.cssText = 'background:radial-gradient(circle at 30% 30%,#f472b6,#6750A4,#1a1a2e);';
        },

        // 3. Conic Gradient
        'conic-gradient-bg': function(container) {
            container.style.cssText = 'background:conic-gradient(from 0deg at 50% 50%,#ff6b6b,#feca57,#48dbfb,#ff9ff3,#ff6b6b);';
        },

        // 4. Mesh Gradient
        'mesh-gradient-bg': function(container) {
            container.style.cssText = 'background:radial-gradient(at 40% 20%,#f472b6 0px,transparent 50%),radial-gradient(at 80% 0%,#a78bfa 0px,transparent 50%),radial-gradient(at 0% 50%,#34d399 0px,transparent 50%),radial-gradient(at 80% 50%,#fbbf24 0px,transparent 50%),radial-gradient(at 0% 100%,#60a5fa 0px,transparent 50%);background-color:#1a1a2e;';
        },

        // 5. Animated Gradient
        'animated-gradient-bg': function(container) {
            container.style.cssText = 'background:linear-gradient(-45deg,#ee7752,#e73c7e,#23a6d5,#23d5ab);background-size:400% 400%;animation:gradientBG 3s ease infinite;';
            const style = document.createElement('style');
            style.textContent = '@keyframes gradientBG{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}';
            document.head.appendChild(style);
        },

        // 6. Grid Pattern
        'grid-pattern-bg': function(container) {
            container.style.cssText = 'background-color:#EADDFF;background-image:linear-gradient(rgba(103,80,164,0.4) 2px,transparent 2px),linear-gradient(90deg,rgba(103,80,164,0.4) 2px,transparent 2px);background-size:24px 24px;';
        },

        // 7. Dot Pattern
        'dot-pattern-bg': function(container) {
            container.style.cssText = 'background-color:#EADDFF;background-image:radial-gradient(circle,#6750A4 3px,transparent 3px);background-size:16px 16px;';
        },

        // 8. Noise Texture
        'noise-texture-bg': function(container) {
            container.style.cssText = 'background:linear-gradient(135deg,#EADDFF,#9381FF);position:relative;';
            const noise = document.createElement('div');
            noise.style.cssText = 'position:absolute;inset:0;opacity:0.4;background-image:url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E");mix-blend-mode:overlay;';
            container.appendChild(noise);
        },

        // 9. Geometric Shapes
        'geometric-shapes-bg': function(container) {
            container.style.cssText = 'background:#1a1a2e;position:relative;overflow:hidden;';
            const shapes = [
                { w: 60, h: 60, bg: 'rgba(103,80,164,0.3)', top: '20%', left: '10%', rotate: 45 },
                { w: 40, h: 40, bg: 'rgba(147,129,255,0.3)', top: '60%', left: '70%', rotate: 0, circle: true },
                { w: 30, h: 30, bg: 'rgba(234,221,255,0.3)', top: '30%', left: '60%', rotate: 30 }
            ];
            shapes.forEach(s => {
                const shape = document.createElement('div');
                shape.style.cssText = `position:absolute;width:${s.w}px;height:${s.h}px;background:${s.bg};top:${s.top};left:${s.left};transform:rotate(${s.rotate}deg);${s.circle ? 'border-radius:50%;' : ''}`;
                container.appendChild(shape);
            });
        },

        // 10. Gradient Orbs
        'gradient-orbs-bg': function(container) {
            container.style.cssText = 'background:#0f0f1a;position:relative;overflow:hidden;';
            const orbs = [
                { x: '20%', y: '30%', size: 80, color: 'rgba(103,80,164,0.6)' },
                { x: '70%', y: '60%', size: 100, color: 'rgba(147,129,255,0.5)' },
                { x: '40%', y: '70%', size: 60, color: 'rgba(234,221,255,0.4)' }
            ];
            orbs.forEach(o => {
                const orb = document.createElement('div');
                orb.style.cssText = `position:absolute;left:${o.x};top:${o.y};width:${o.size}px;height:${o.size}px;border-radius:50%;background:radial-gradient(circle,${o.color},transparent 70%);transform:translate(-50%,-50%);`;
                container.appendChild(orb);
            });
        },

        // ============================================
        // BACKGROUND EFFECTS PREVIEW INITIALIZERS
        // ============================================

        // 1. Floating Particles
        'floating-particles': function(container) {
            container.style.cssText = 'background:#0f0f1a;position:relative;overflow:hidden;';
            const canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:absolute;inset:0;';
            container.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;

            const particles = [];
            for (let i = 0; i < 30; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 2 + 1,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'rgba(103,80,164,0.6)';
                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                });
                if (container.isConnected) requestAnimationFrame(animate);
            }
            animate();
        },

        // 2. Starfield
        'starfield': function(container) {
            container.style.cssText = 'background:#000;position:relative;overflow:hidden;';
            const canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:absolute;inset:0;';
            container.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;

            const stars = [];
            for (let i = 0; i < 100; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    z: Math.random() * 2,
                    size: Math.random() * 1.5
                });
            }

            function animate() {
                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                stars.forEach(s => {
                    s.z += 0.02;
                    if (s.z > 2) s.z = 0;
                    const sx = (s.x - canvas.width / 2) * (3 - s.z) + canvas.width / 2;
                    const sy = (s.y - canvas.height / 2) * (3 - s.z) + canvas.height / 2;
                    const alpha = (2 - s.z) / 2;
                    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                    ctx.beginPath();
                    ctx.arc(sx, sy, s.size * (3 - s.z), 0, Math.PI * 2);
                    ctx.fill();
                });
                if (container.isConnected) requestAnimationFrame(animate);
            }
            animate();
        },

        // 3. Animated Waves
        'animated-waves': function(container) {
            container.style.cssText = 'background:linear-gradient(180deg,#1a1a2e,#6750A4);position:relative;overflow:hidden;';
            const canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:absolute;inset:0;bottom:0;';
            container.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;

            let time = 0;
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    ctx.moveTo(0, canvas.height);
                    for (let x = 0; x <= canvas.width; x += 5) {
                        const y = canvas.height - 30 - i * 15 + Math.sin(x * 0.02 + time + i) * 15;
                        ctx.lineTo(x, y);
                    }
                    ctx.lineTo(canvas.width, canvas.height);
                    ctx.fillStyle = `rgba(147,129,255,${0.3 - i * 0.1})`;
                    ctx.fill();
                }
                time += 0.03;
                if (container.isConnected) requestAnimationFrame(animate);
            }
            animate();
        },

        // 4. Gradient Wave
        'gradient-wave': function(container) {
            container.style.cssText = 'background:#1a1a2e;position:relative;overflow:hidden;';
            const wave = document.createElement('div');
            wave.style.cssText = 'position:absolute;inset:-50%;width:200%;height:200%;background:conic-gradient(from 0deg,#6750A4,#9381FF,#EADDFF,#6750A4);animation:waveRotate 8s linear infinite;opacity:0.3;';
            container.appendChild(wave);
            const style = document.createElement('style');
            style.textContent = '@keyframes waveRotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}';
            document.head.appendChild(style);
        },

        // 5. Aurora Borealis
        'aurora': function(container) {
            container.style.cssText = 'background:#0a0a1a;position:relative;overflow:hidden;';
            const canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:absolute;inset:0;';
            container.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;

            let time = 0;
            function animate() {
                ctx.fillStyle = 'rgba(10,10,26,0.1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < 5; i++) {
                    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                    gradient.addColorStop(0, `hsla(${120 + i * 20 + Math.sin(time) * 30},70%,50%,0)`);
                    gradient.addColorStop(0.5, `hsla(${140 + i * 20 + Math.sin(time) * 30},70%,50%,0.3)`);
                    gradient.addColorStop(1, `hsla(${160 + i * 20 + Math.sin(time) * 30},70%,50%,0)`);
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.moveTo(0, canvas.height / 2 + Math.sin(time + i) * 30);
                    for (let x = 0; x <= canvas.width; x += 10) {
                        const y = canvas.height / 2 + Math.sin(x * 0.01 + time + i) * 40 + Math.sin(time * 2 + i) * 20;
                        ctx.lineTo(x, y);
                    }
                    ctx.lineTo(canvas.width, canvas.height);
                    ctx.lineTo(0, canvas.height);
                    ctx.fill();
                }
                time += 0.02;
                if (container.isConnected) requestAnimationFrame(animate);
            }
            animate();
        },

        // 6. Plasma Effect
        'plasma': function(container) {
            container.style.cssText = 'background:#000;position:relative;';
            const canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:absolute;inset:0;';
            container.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            canvas.width = 80;
            canvas.height = 60;
            canvas.style.width = '100%';
            canvas.style.height = '100%';

            let time = 0;
            function animate() {
                const imageData = ctx.createImageData(80, 60);
                for (let y = 0; y < 60; y++) {
                    for (let x = 0; x < 80; x++) {
                        const v1 = Math.sin(x * 0.1 + time);
                        const v2 = Math.sin(y * 0.1 + time);
                        const v3 = Math.sin((x + y) * 0.1 + time);
                        const v4 = Math.sin(Math.sqrt(x * x + y * y) * 0.1 + time);
                        const v = (v1 + v2 + v3 + v4) / 4;
                        const i = (y * 80 + x) * 4;
                        imageData.data[i] = Math.sin(v * Math.PI) * 127 + 128;
                        imageData.data[i + 1] = Math.sin(v * Math.PI + 2) * 127 + 128;
                        imageData.data[i + 2] = Math.sin(v * Math.PI + 4) * 127 + 128;
                        imageData.data[i + 3] = 255;
                    }
                }
                ctx.putImageData(imageData, 0, 0);
                time += 0.05;
                if (container.isConnected) requestAnimationFrame(animate);
            }
            animate();
        },

        // 7. Rain Effect
        'rain': function(container) {
            container.style.cssText = 'background:#1a1a2e;position:relative;overflow:hidden;';
            const canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:absolute;inset:0;';
            container.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;

            const drops = [];
            for (let i = 0; i < 50; i++) {
                drops.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, l: Math.random() * 20 + 10, s: Math.random() * 5 + 5 });
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = 'rgba(103,80,164,0.5)';
                ctx.lineWidth = 1;
                drops.forEach(d => {
                    ctx.beginPath();
                    ctx.moveTo(d.x, d.y);
                    ctx.lineTo(d.x, d.y + d.l);
                    ctx.stroke();
                    d.y += d.s;
                    if (d.y > canvas.height) {
                        d.y = -d.l;
                        d.x = Math.random() * canvas.width;
                    }
                });
                if (container.isConnected) requestAnimationFrame(animate);
            }
            animate();
        },

        // 8. Snow Effect
        'snow': function(container) {
            container.style.cssText = 'background:#1a1a2e;position:relative;overflow:hidden;';
            const canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:absolute;inset:0;';
            container.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;

            const flakes = [];
            for (let i = 0; i < 40; i++) {
                flakes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 2 + 1, s: Math.random() * 1 + 0.5, w: Math.random() * 0.02 });
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#fff';
                flakes.forEach(f => {
                    ctx.beginPath();
                    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                    ctx.fill();
                    f.y += f.s;
                    f.x += Math.sin(f.y * f.w) * 0.5;
                    if (f.y > canvas.height) {
                        f.y = -5;
                        f.x = Math.random() * canvas.width;
                    }
                });
                if (container.isConnected) requestAnimationFrame(animate);
            }
            animate();
        },

        // 9. Confetti
        'confetti': function(container) {
            container.style.cssText = 'background:#1a1a2e;position:relative;overflow:hidden;';
            const pieces = [];
            const colors = ['#6750A4', '#9381FF', '#EADDFF', '#10b981', '#f472b6'];
            for (let i = 0; i < 30; i++) {
                const p = document.createElement('div');
                p.style.cssText = `position:absolute;width:8px;height:8px;background:${colors[Math.floor(Math.random() * colors.length)]};left:${Math.random() * 100}%;top:${Math.random() * 100}%;transform:rotate(${Math.random() * 360}deg);`;
                container.appendChild(p);
                pieces.push({ el: p, x: parseFloat(p.style.left), y: parseFloat(p.style.top), s: Math.random() * 2 + 1, r: Math.random() * 2 - 1, rot: 0 });
            }

            function animate() {
                pieces.forEach(p => {
                    p.y += p.s;
                    p.rot += p.r;
                    p.el.style.top = p.y + '%';
                    p.el.style.transform = `rotate(${p.rot}deg)`;
                    if (p.y > 100) {
                        p.y = -5;
                        p.x = Math.random() * 100;
                        p.el.style.left = p.x + '%';
                    }
                });
                if (container.isConnected) requestAnimationFrame(animate);
            }
            animate();
        },

        // 10. Spotlight Follow
        'spotlight-follow': function(container) {
            container.style.cssText = 'background:#1a1a2e;position:relative;overflow:hidden;';
            const text = document.createElement('span');
            text.textContent = 'Move mouse';
            text.style.cssText = 'position:relative;z-index:1;font-size:14px;font-weight:600;color:#fff;';
            container.appendChild(text);

            const spotlight = document.createElement('div');
            spotlight.style.cssText = 'position:absolute;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(103,80,164,0.8),transparent 70%);pointer-events:none;transition:all 0.1s ease;';
            container.appendChild(spotlight);

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                spotlight.style.left = (e.clientX - rect.left - 60) + 'px';
                spotlight.style.top = (e.clientY - rect.top - 60) + 'px';
            });
        },

        // ============================================
        // 3D EFFECTS PREVIEW INITIALIZERS
        // ============================================

        // 1. Rotating Cube
        'rotating-cube': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:600px;';
            const cube = document.createElement('div');
            cube.style.cssText = 'position:relative;width:50px;height:50px;transform-style:preserve-3d;animation:rotateCube 6s infinite linear;';
            container.appendChild(cube);

            const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
            const colors = ['#6750A4', '#9381FF', '#EADDFF', '#B794F6', '#10b981', '#f472b6'];
            const transforms = [
                'translateZ(25px)', 'rotateY(180deg) translateZ(25px)',
                'rotateY(90deg) translateZ(25px)', 'rotateY(-90deg) translateZ(25px)',
                'rotateX(90deg) translateZ(25px)', 'rotateX(-90deg) translateZ(25px)'
            ];

            faces.forEach((face, i) => {
                const div = document.createElement('div');
                div.style.cssText = `position:absolute;width:50px;height:50px;background:${colors[i]};border:1px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:600;color:#fff;transform:${transforms[i]};`;
                div.textContent = face.charAt(0).toUpperCase();
                cube.appendChild(div);
            });

            const style = document.createElement('style');
            style.textContent = '@keyframes rotateCube{from{transform:rotateX(0deg) rotateY(0deg);}to{transform:rotateX(360deg) rotateY(360deg);}}';
            document.head.appendChild(style);
        },

        // 2. 3D Card Flip
        '3d-card-flip': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:400px;';
            const flipper = document.createElement('div');
            flipper.style.cssText = 'position:relative;width:80px;height:60px;transform-style:preserve-3d;transition:transform 0.6s;cursor:pointer;';
            container.appendChild(flipper);

            const front = document.createElement('div');
            front.style.cssText = 'position:absolute;width:100%;height:100%;background:#6750A4;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;backface-visibility:hidden;';
            front.textContent = 'Front';
            flipper.appendChild(front);

            const back = document.createElement('div');
            back.style.cssText = 'position:absolute;width:100%;height:100%;background:#9381FF;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;backface-visibility:hidden;transform:rotateY(180deg);';
            back.textContent = 'Back';
            flipper.appendChild(back);

            container.addEventListener('mouseenter', () => {
                flipper.style.transform = 'rotateY(180deg)';
            });
            container.addEventListener('mouseleave', () => {
                flipper.style.transform = 'rotateY(0deg)';
            });
        },

        // 3. Perspective Tilt
        'perspective-tilt': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:500px;';
            const card = document.createElement('div');
            card.style.cssText = 'width:80px;height:60px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transform-style:preserve-3d;transition:transform 0.3s ease;box-shadow:0 10px 30px rgba(103,80,164,0.3);';
            card.textContent = 'Tilt Me';
            card.innerHTML += '<div style="position:absolute;bottom:5px;right:5px;width:8px;height:8px;background:rgba(255,255,255,0.5);border-radius:50%;transform:translateZ(20px);"></div>';
            container.appendChild(card);

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                card.style.transform = `rotateY(${x / 5}deg) rotateX(${-y / 5}deg)`;
            });
            container.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateY(0deg) rotateX(0deg)';
            });
        },

        // 4. 3D Carousel
        '3d-carousel': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:800px;';
            const carousel = document.createElement('div');
            carousel.style.cssText = 'position:relative;width:40px;height:40px;transform-style:preserve-3d;animation:carouselRotate 8s infinite linear;';
            container.appendChild(carousel);

            for (let i = 0; i < 4; i++) {
                const item = document.createElement('div');
                item.style.cssText = `position:absolute;width:40px;height:40px;background:${['#6750A4', '#9381FF', '#EADDFF', '#B794F6'][i]};border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;transform:rotateY(${i * 90}deg) translateZ(50px);backface-visibility:hidden;`;
                item.textContent = i + 1;
                carousel.appendChild(item);
            }

            const style = document.createElement('style');
            style.textContent = '@keyframes carouselRotate{from{transform:rotateY(0deg);}to{transform:rotateY(360deg);}}';
            document.head.appendChild(style);
        },

        // 5. Isometric View
        'isometric-view': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const iso = document.createElement('div');
            iso.style.cssText = 'position:relative;width:60px;height:60px;transform:rotateX(60deg) rotateZ(-45deg);transform-style:preserve-3d;transition:transform 0.5s ease;cursor:pointer;';
            container.appendChild(iso);

            const top = document.createElement('div');
            top.style.cssText = 'position:absolute;width:60px;height:60px;background:#6750A4;transform:translateZ(30px);border:1px solid rgba(255,255,255,0.3);';
            iso.appendChild(top);

            const left = document.createElement('div');
            left.style.cssText = 'position:absolute;width:60px;height:30px;background:#553f91;transform:rotateX(-90deg) translateZ(30px) translateY(15px);border:1px solid rgba(255,255,255,0.3);';
            iso.appendChild(left);

            const right = document.createElement('div');
            right.style.cssText = 'position:absolute;width:60px;height:30px;background:#9381FF;transform:rotateY(90deg) translateZ(30px) translateY(15px);border:1px solid rgba(255,255,255,0.3);';
            iso.appendChild(right);

            container.addEventListener('mouseenter', () => {
                iso.style.transform = 'rotateX(45deg) rotateZ(-30deg) scale(1.1)';
            });
            container.addEventListener('mouseleave', () => {
                iso.style.transform = 'rotateX(60deg) rotateZ(-45deg) scale(1)';
            });
        },

        // 6. Parallax Layers
        'parallax-layers': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:400px;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:70px;height:70px;transform-style:preserve-3d;';
            container.appendChild(wrapper);

            const layers = [
                { z: 0, color: '#6750A4', scale: 1 },
                { z: 20, color: '#9381FF', scale: 1.1 },
                { z: 40, color: '#EADDFF', scale: 1.2 }
            ];

            layers.forEach(l => {
                const layer = document.createElement('div');
                layer.style.cssText = `position:absolute;width:50px;height:50px;left:10px;top:10px;background:${l.color};border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#1a1a2e;transform:translateZ(${l.z}px);`;
                layer.textContent = l.z;
                wrapper.appendChild(layer);
            });

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 10;
                const y = (e.clientY - rect.top - rect.height / 2) / 10;
                wrapper.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
            });
            container.addEventListener('mouseleave', () => {
                wrapper.style.transform = 'rotateY(0deg) rotateX(0deg)';
            });
        },

        // 7. 3D Button Press
        '3d-button-press': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:300px;';
            const btn = document.createElement('button');
            btn.style.cssText = 'position:relative;padding:12px 24px;background:#6750A4;border:none;border-radius:8px;font-size:12px;font-weight:600;color:#fff;cursor:pointer;transform-style:preserve-3d;transform:translateZ(0);transition:transform 0.2s;box-shadow:0 4px 0 #4a3670,0 8px 0 #3a2858;';
            btn.textContent = 'PRESS';
            container.appendChild(btn);

            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'translateZ(0) translateY(4px)';
                btn.style.boxShadow = '0 0 0 #4a3670,0 4px 0 #3a2858';
            });
            btn.addEventListener('mouseup', () => {
                btn.style.transform = 'translateZ(0) translateY(0)';
                btn.style.boxShadow = '0 4px 0 #4a3670,0 8px 0 #3a2858';
            });
        },

        // 8. Floating Elements
        'floating-elements': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:500px;';
            const floater = document.createElement('div');
            floater.style.cssText = 'position:relative;width:50px;height:50px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff;animation:float 3s ease-in-out infinite;box-shadow:0 20px 40px rgba(103,80,164,0.4);';
            floater.textContent = '↑';
            container.appendChild(floater);

            const style = document.createElement('style');
            style.textContent = '@keyframes float{0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-20px) rotate(5deg);}}';
            document.head.appendChild(style);
        },

        // 9. Glass Cube
        'glass-cube': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:600px;';
            const cube = document.createElement('div');
            cube.style.cssText = 'position:relative;width:45px;height:45px;transform-style:preserve-3d;animation:glassRotate 8s infinite linear;';
            container.appendChild(cube);

            const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
            const transforms = [
                'translateZ(22.5px)', 'rotateY(180deg) translateZ(22.5px)',
                'rotateY(90deg) translateZ(22.5px)', 'rotateY(-90deg) translateZ(22.5px)',
                'rotateX(90deg) translateZ(22.5px)', 'rotateX(-90deg) translateZ(22.5px)'
            ];

            faces.forEach((face, i) => {
                const div = document.createElement('div');
                div.style.cssText = `position:absolute;width:45px;height:45px;background:rgba(147,129,255,0.25);border:1px solid rgba(147,129,255,0.5);backdrop-filter:blur(2px);transform:${transforms[i]};`;
                cube.appendChild(div);
            });

            const style = document.createElement('style');
            style.textContent = '@keyframes glassRotate{from{transform:rotateX(-20deg) rotateY(0deg);}to{transform:rotateX(-20deg) rotateY(360deg);}}';
            document.head.appendChild(style);
        },

        // 10. 3D Stack
        '3d-stack': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:400px;';
            const stack = document.createElement('div');
            stack.style.cssText = 'position:relative;width:70px;height:50px;transform-style:preserve-3d;transition:transform 0.5s ease;';
            container.appendChild(stack);

            for (let i = 0; i < 4; i++) {
                const card = document.createElement('div');
                card.style.cssText = `position:absolute;width:70px;height:50px;background:${['#6750A4', '#9381FF', '#EADDFF', '#B794F6'][i]};border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:${i > 1 ? '#1a1a2e' : '#fff'};transform:translateZ(${i * 8}px);border:1px solid rgba(255,255,255,0.3);`;
                card.textContent = i + 1;
                stack.appendChild(card);
            }

            container.addEventListener('mouseenter', () => {
                stack.style.transform = 'rotateY(30deg) rotateX(10deg)';
            });
            container.addEventListener('mouseleave', () => {
                stack.style.transform = 'rotateY(0deg) rotateX(0deg)';
            });
        },

        // ============================================
        // 3D TRANSFORMS PREVIEW INITIALIZERS
        // ============================================

        // 1. Rotate Y/X
        'rotate-3d': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:400px;';
            const box = document.createElement('div');
            box.style.cssText = 'width:60px;height:60px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transform-style:preserve-3d;transition:transform 0.5s ease;cursor:pointer;';
            box.textContent = '3D';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => {
                box.style.transform = 'rotateY(180deg) rotateX(45deg)';
            });
            container.addEventListener('mouseleave', () => {
                box.style.transform = 'rotateY(0deg) rotateX(0deg)';
            });
        },

        // 2. Scale 3D
        'scale-3d': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:400px;';
            const box = document.createElement('div');
            box.style.cssText = 'width:50px;height:50px;background:#10b981;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transform-style:preserve-3d;transition:transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275);cursor:pointer;';
            box.textContent = '↑';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => {
                box.style.transform = 'scale3d(1.5, 1.5, 1.5)';
            });
            container.addEventListener('mouseleave', () => {
                box.style.transform = 'scale3d(1, 1, 1)';
            });
        },

        // 3. Translate Z
        'translate-z': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:200px;position:relative;overflow:hidden;';

            // Add depth grid/floor for reference
            const grid = document.createElement('div');
            grid.style.cssText = 'position:absolute;width:200%;height:200%;background:repeating-linear-gradient(90deg,transparent 0px,transparent 19px,rgba(103,80,164,0.1) 19px,rgba(103,80,164,0.1) 20px),repeating-linear-gradient(0deg,transparent 0px,transparent 19px,rgba(103,80,164,0.1) 19px,rgba(103,80,164,0.1) 20px);left:-50%;top:-50%;transform:rotateX(60deg) translateZ(-50px);pointer-events:none;';
            container.appendChild(grid);

            // Depth markers
            for (let i = 0; i < 3; i++) {
                const marker = document.createElement('div');
                marker.style.cssText = `position:absolute;width:40px;height:40px;border:2px dashed rgba(103,80,164,0.3);border-radius:8px;left:50%;top:50%;transform:translate(-50%,-50%) translateZ(${30 * i}px);pointer-events:none;`;
                container.appendChild(marker);
            }

            const box = document.createElement('div');
            box.style.cssText = 'width:60px;height:60px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transform-style:preserve-3d;transition:transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275);box-shadow:0 0 40px rgba(103,80,164,0.6);border:2px solid rgba(255,255,255,0.2);';
            box.textContent = 'Z';
            box.innerHTML = '<span style="position:relative;z-index:1;">Z</span><div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.3),transparent);border-radius:10px;"></div>';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => {
                box.style.transform = 'translateZ(80px) scale(1.4)';
                box.style.boxShadow = '0 20px 60px rgba(103,80,164,0.8),0 0 80px rgba(147,129,255,0.4)';
            });
            container.addEventListener('mouseleave', () => {
                box.style.transform = 'translateZ(0) scale(1)';
                box.style.boxShadow = '0 0 40px rgba(103,80,164,0.6)';
            });
        },

        // 4. Skew 3D
        'skew-3d': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:400px;';
            const box = document.createElement('div');
            box.style.cssText = 'width:60px;height:60px;background:#fbbf24;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#1a1a2e;transform-style:preserve-3d;transition:transform 0.4s ease;cursor:pointer;';
            box.textContent = 'Skew';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => {
                box.style.transform = 'skewY(15deg) skewX(10deg)';
            });
            container.addEventListener('mouseleave', () => {
                box.style.transform = 'skewY(0deg) skewX(0deg)';
            });
        },

        // 5. Matrix Transform
        'matrix-3d': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:300px;position:relative;overflow:hidden;';

            // Add 3D grid for depth reference
            const grid = document.createElement('div');
            grid.style.cssText = 'position:absolute;width:150%;height:150%;left:-25%;top:-25%;background:repeating-conic-gradient(from 0deg,rgba(103,80,164,0.05) 0deg 90deg,transparent 90deg 180deg);transform:rotateX(75deg) translateZ(-50px);pointer-events:none;';
            container.appendChild(grid);

            const box = document.createElement('div');
            box.style.cssText = 'width:60px;height:60px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff;transform-style:preserve-3d;transition:transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275);cursor:pointer;box-shadow:0 10px 30px rgba(103,80,164,0.4);border:2px solid rgba(255,255,255,0.2);';
            box.innerHTML = '<span style="position:relative;z-index:1;">3D</span><div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.2),transparent);border-radius:10px;"></div>';
            container.appendChild(box);

            // Add floating elements at different Z depths
            const floater1 = document.createElement('div');
            floater1.style.cssText = 'position:absolute;width:15px;height:15px;background:rgba(147,129,255,0.6);border-radius:4px;left:20%;top:20%;transform:translateZ(-30px);opacity:0.7;';
            container.appendChild(floater1);

            const floater2 = document.createElement('div');
            floater2.style.cssText = 'position:absolute;width:12px;height:12px;background:rgba(183,148,246,0.6);border-radius:50%;right:20%;bottom:25%;transform:translateZ(40px);opacity:0.7;';
            container.appendChild(floater2);

            container.addEventListener('mouseenter', () => {
                // Complex 3D transformation with perspective
                box.style.transform = 'perspective(300px) rotateX(25deg) rotateY(-15deg) rotateZ(5deg) scale3d(1.3, 1.3, 1.3) translateZ(30px)';
                box.style.boxShadow = '20px 20px 40px rgba(103,80,164,0.6),-10px -10px 30px rgba(147,129,255,0.4)';
                floater1.style.transform = 'translateZ(-20px) rotateZ(45deg) scale(1.2)';
                floater2.style.transform = 'translateZ(60px) rotateZ(-30deg) scale(1.3)';
            });
            container.addEventListener('mouseleave', () => {
                box.style.transform = 'perspective(300px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1, 1, 1) translateZ(0)';
                box.style.boxShadow = '0 10px 30px rgba(103,80,164,0.4)';
                floater1.style.transform = 'translateZ(-30px)';
                floater2.style.transform = 'translateZ(40px)';
            });
        },

        // 6. Transform Origin
        'transform-origin': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const box = document.createElement('div');
            box.style.cssText = 'width:70px;height:50px;background:#06b6d4;border-radius:12px 12px 0 12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transform-origin:bottom right;transition:transform 0.4s ease;cursor:pointer;';
            box.textContent = 'Origin';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => {
                box.style.transform = 'rotate(-45deg) scale(1.1)';
            });
            container.addEventListener('mouseleave', () => {
                box.style.transform = 'rotate(0deg) scale(1)';
            });
        },

        // 7. Chain Transforms
        'chain-transforms': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:250px;position:relative;overflow:hidden;';

            // Add depth lines for reference
            const depthLines = document.createElement('div');
            depthLines.style.cssText = 'position:absolute;width:100%;height:100%;pointer-events:none;';
            depthLines.innerHTML = '<div style="position:absolute;left:10%;top:0;height:100%;width:1px;background:linear-gradient(to bottom,transparent,rgba(103,80,164,0.2),transparent);transform:translateZ(10px);"></div><div style="position:absolute;left:20%;top:0;height:100%;width:1px;background:linear-gradient(to bottom,transparent,rgba(103,80,164,0.2),transparent);transform:translateZ(30px);"></div><div style="position:absolute;left:30%;top:0;height:100%;width:1px;background:linear-gradient(to bottom,transparent,rgba(103,80,164,0.2),transparent);transform:translateZ(50px);"></div>';
            container.appendChild(depthLines);

            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:60px;height:60px;transform-style:preserve-3d;transition:transform 0.5s ease;';
            container.appendChild(wrapper);

            const box1 = document.createElement('div');
            box1.style.cssText = 'position:absolute;width:50px;height:50px;background:#6750A4;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transform:translateZ(0);border:2px solid rgba(255,255,255,0.2);box-shadow:0 0 20px rgba(103,80,164,0.4);';
            box1.textContent = '1';
            wrapper.appendChild(box1);

            const box2 = document.createElement('div');
            box2.style.cssText = 'position:absolute;width:50px;height:50px;background:rgba(147,129,255,0.9);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transform:translateZ(30px);border:2px solid rgba(255,255,255,0.3);box-shadow:0 0 30px rgba(147,129,255,0.5);';
            box2.textContent = '2';
            wrapper.appendChild(box2);

            const box3 = document.createElement('div');
            box3.style.cssText = 'position:absolute;width:50px;height:50px;background:rgba(234,221,255,0.95);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#1a1a2e;transform:translateZ(60px);border:2px solid rgba(255,255,255,0.4);box-shadow:0 0 40px rgba(234,221,255,0.6);';
            box3.textContent = '3';
            wrapper.appendChild(box3);

            container.addEventListener('mouseenter', () => {
                box1.style.transform = 'translateZ(15px) rotateY(20deg)';
                box2.style.transform = 'translateZ(45px) rotateY(40deg)';
                box3.style.transform = 'translateZ(75px) rotateY(60deg)';
                wrapper.style.transform = 'rotateX(15deg) rotateY(10deg)';
            });
            container.addEventListener('mouseleave', () => {
                box1.style.transform = 'translateZ(0) rotateY(0deg)';
                box2.style.transform = 'translateZ(30px) rotateY(0deg)';
                box3.style.transform = 'translateZ(60px) rotateY(0deg)';
                wrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
            });
        },

        // 8. Perspective Origin
        'perspective-origin': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'perspective:200px;perspective-origin:left center;transition:perspective-origin 0.5s ease;';
            container.appendChild(wrapper);

            const box = document.createElement('div');
            box.style.cssText = 'width:50px;height:50px;background:#ef4444;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transform:rotateY(-30deg);margin:0 auto;transition:transform 0.5s ease;';
            box.textContent = 'PO';
            wrapper.appendChild(box);

            container.addEventListener('mouseenter', () => {
                wrapper.style.perspectiveOrigin = 'right center';
                box.style.transform = 'rotateY(30deg)';
            });
            container.addEventListener('mouseleave', () => {
                wrapper.style.perspectiveOrigin = 'left center';
                box.style.transform = 'rotateY(-30deg)';
            });
        },

        // 9. Backface Visibility
        'backface-visibility': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:400px;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:60px;height:60px;transform-style:preserve-3d;transition:transform 0.6s ease;cursor:pointer;';
            container.appendChild(wrapper);

            const front = document.createElement('div');
            front.style.cssText = 'position:absolute;width:60px;height:60px;background:#6750A4;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;backface-visibility:hidden;';
            front.textContent = 'Front';
            wrapper.appendChild(front);

            const back = document.createElement('div');
            back.style.cssText = 'position:absolute;width:60px;height:60px;background:#10b981;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;backface-visibility:hidden;transform:rotateY(180deg);';
            back.textContent = 'Back';
            wrapper.appendChild(back);

            container.addEventListener('mouseenter', () => {
                wrapper.style.transform = 'rotateY(180deg)';
            });
            container.addEventListener('mouseleave', () => {
                wrapper.style.transform = 'rotateY(0deg)';
            });
        },

        // 10. Transform Combinations
        'transform-combo': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:500px;';
            const box = document.createElement('div');
            box.style.cssText = 'width:60px;height:60px;background:linear-gradient(135deg,#f472b6,#fbbf24);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:#fff;transform-style:preserve-3d;transition:transform 0.5s cubic-bezier(0.175,0.885,0.32,1.275);cursor:pointer;box-shadow:0 15px 40px rgba(244,114,182,0.4);';
            box.textContent = '★';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => {
                // Combine multiple transforms
                box.style.transform = 'perspective(200px) rotateX(30deg) rotateY(45deg) scale3d(1.4, 1.4, 1.4) translateZ(40px)';
            });
            container.addEventListener('mouseleave', () => {
                box.style.transform = 'perspective(200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)';
            });
        },

        // ============================================
        // DATA VISUALIZATION PREVIEW INITIALIZERS
        // ============================================

        // 1. Bar Chart
        'bar-chart': function(container) {
            container.style.cssText = 'display:flex;align-items:flex-end;justify-content:center;gap:8px;padding:16px;background:#1a1a2e;';
            const bars = [40, 70, 50, 90, 60];
            bars.forEach((h, i) => {
                const bar = document.createElement('div');
                bar.style.cssText = `width:12px;height:0;background:linear-gradient(to top,#6750A4,#9381FF);border-radius:4px 4px 0 0;transition:height 0.5s cubic-bezier(0.175,0.885,0.32,1.275);`;
                container.appendChild(bar);
                setTimeout(() => bar.style.height = h + '%', 50 + i * 100);
            });
        },

        // 2. Line Chart
        'line-chart': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 100 60');
            svg.style.cssText = 'width:100px;height:60px;';
            container.appendChild(svg);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            const points = '0,50 20,35 40,45 60,20 80,40 100,25';
            line.setAttribute('points', points);
            line.setAttribute('fill', 'none');
            line.setAttribute('stroke', '#9381FF');
            line.setAttribute('stroke-width', '2');
            line.setAttribute('stroke-linecap', 'round');
            line.setAttribute('stroke-linejoin', 'round');
            line.style.cssText = 'stroke-dasharray:200;stroke-dashoffset:200;transition:stroke-dashoffset 1s ease;';
            svg.appendChild(line);

            // Draw animation
            setTimeout(() => line.style.strokeDashoffset = '0', 100);

            // Add dots
            const dotPoints = points.split(' ');
            dotPoints.forEach(p => {
                const [x, y] = p.split(',');
                const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                dot.setAttribute('cx', x);
                dot.setAttribute('cy', y);
                dot.setAttribute('r', '3');
                dot.setAttribute('fill', '#6750A4');
                dot.style.cssText = 'opacity:0;transition:opacity 0.3s ease;';
                svg.appendChild(dot);
                setTimeout(() => dot.style.opacity = '1', 800 + parseInt(x) * 10);
            });
        },

        // 3. Pie Chart
        'pie-chart': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 100 100');
            svg.style.cssText = 'width:70px;height:70px;';
            container.appendChild(svg);

            const data = [35, 25, 20, 20];
            const colors = ['#6750A4', '#9381FF', '#EADDFF', '#B794F6'];
            let currentAngle = 0;

            data.forEach((value, i) => {
                const sliceAngle = (value / 100) * 360;
                const largeArcFlag = sliceAngle > 180 ? 1 : 0;
                const x1 = 50 + 40 * Math.cos((currentAngle - 90) * Math.PI / 180);
                const y1 = 50 + 40 * Math.sin((currentAngle - 90) * Math.PI / 180);
                const x2 = 50 + 40 * Math.cos((currentAngle + sliceAngle - 90) * Math.PI / 180);
                const y2 = 50 + 40 * Math.sin((currentAngle + sliceAngle - 90) * Math.PI / 180);

                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`);
                path.setAttribute('fill', colors[i]);
                path.setAttribute('stroke', '#1a1a2e');
                path.setAttribute('stroke-width', '1');
                path.style.cssText = `opacity:0;transform-origin:center;transform:scale(0.8);transition:all 0.3s ease ${i * 0.1}s;`;
                svg.appendChild(path);

                setTimeout(() => {
                    path.style.opacity = '1';
                    path.style.transform = 'scale(1)';
                }, 100);

                currentAngle += sliceAngle;
            });
        },

        // 4. Donut Chart - Animated score ring
        'donut-chart': function(container) {
            container.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:#1a1a2e;padding:10px;';

            // Chart container
            const chartWrapper = document.createElement('div');
            chartWrapper.style.cssText = 'position:relative;width:70px;height:70px;';
            container.appendChild(chartWrapper);

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 100 100');
            svg.style.cssText = 'width:100%;height:100%;transform:rotate(-90deg);';
            chartWrapper.appendChild(svg);

            // Track background
            const track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            track.setAttribute('cx', '50');
            track.setAttribute('cy', '50');
            track.setAttribute('r', '42');
            track.setAttribute('fill', 'none');
            track.setAttribute('stroke', '#2d2d4a');
            track.setAttribute('stroke-width', '12');
            svg.appendChild(track);

            // Progress circle with gradient
            const progress = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            progress.setAttribute('cx', '50');
            progress.setAttribute('cy', '50');
            progress.setAttribute('r', '42');
            progress.setAttribute('fill', 'none');
            progress.setAttribute('stroke', 'url(#gradient)');
            progress.setAttribute('stroke-width', '12');
            progress.setAttribute('stroke-linecap', 'round');
            
            const circumference = 2 * Math.PI * 42;
            progress.style.cssText = `stroke-dasharray:${circumference};stroke-dashoffset:${circumference};transform-origin:center;transition:stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1);`;
            svg.appendChild(progress);

            // Gradient definition
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            defs.innerHTML = '<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6750A4"/><stop offset="100%" stop-color="#EADDFF"/></linearGradient>';
            svg.appendChild(defs);

            // Center score display
            const scoreDisplay = document.createElement('div');
            scoreDisplay.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;';
            
            const scoreNum = document.createElement('span');
            scoreNum.style.cssText = 'font-size:22px;font-weight:900;color:#fff;display:block;line-height:1;';
            scoreNum.textContent = '0';
            scoreDisplay.appendChild(scoreNum);
            
            const scoreLabel = document.createElement('span');
            scoreLabel.style.cssText = 'font-size:8px;color:#9CA3AF;font-weight:600;letter-spacing:0.5px;';
            scoreLabel.textContent = 'SCORE';
            scoreDisplay.appendChild(scoreLabel);
            
            chartWrapper.appendChild(scoreDisplay);

            // Stats row below
            const statsRow = document.createElement('div');
            statsRow.style.cssText = 'display:flex;gap:12px;';
            
            const stat1 = document.createElement('div');
            stat1.style.cssText = 'text-align:center;';
            stat1.innerHTML = '<div style="font-size:12px;font-weight:700;color:#6750A4;">A</div><div style="font-size:7px;color:#9CA3AF;">Done</div>';
            
            const stat2 = document.createElement('div');
            stat2.style.cssText = 'text-align:center;';
            stat2.innerHTML = '<div style="font-size:12px;font-weight:700;color:#9381FF;">B</div><div style="font-size:7px;color:#9CA3AF;">Left</div>';
            
            statsRow.appendChild(stat1);
            statsRow.appendChild(stat2);
            container.appendChild(statsRow);

            // Animate to 85%
            const targetValue = 85;
            const targetOffset = circumference * (1 - targetValue / 100);
            
            let currentValue = 0;
            const animateScore = () => {
                if (currentValue <= targetValue) {
                    scoreNum.textContent = currentValue;
                    currentValue++;
                    setTimeout(animateScore, 15);
                }
            };

            setTimeout(() => {
                progress.style.strokeDashoffset = String(targetOffset);
                animateScore();
            }, 200);

            // Pulse effect on complete
            setTimeout(() => {
                scoreDisplay.style.transform = 'translate(-50%,-50%) scale(1.15)';
                scoreDisplay.style.transition = 'transform 0.3s ease';
                setTimeout(() => {
                    scoreDisplay.style.transform = 'translate(-50%,-50%) scale(1)';
                }, 300);
            }, 1800);

            // Loop animation
            setInterval(() => {
                currentValue = 0;
                scoreNum.textContent = '0';
                progress.style.strokeDashoffset = String(circumference);
                setTimeout(() => {
                    progress.style.strokeDashoffset = String(targetOffset);
                    animateScore();
                }, 300);
            }, 4000);
        },

        // 5. Progress Ring
        'progress-ring': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 100 100');
            svg.style.cssText = 'width:60px;height:60px;';
            container.appendChild(svg);

            const bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            bg.setAttribute('cx', '50');
            bg.setAttribute('cy', '50');
            bg.setAttribute('r', '40');
            bg.setAttribute('fill', 'none');
            bg.setAttribute('stroke', '#2d2d3a');
            bg.setAttribute('stroke-width', '8');
            svg.appendChild(bg);

            const progress = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            progress.setAttribute('cx', '50');
            progress.setAttribute('cy', '50');
            progress.setAttribute('r', '40');
            progress.setAttribute('fill', 'none');
            progress.setAttribute('stroke', '#10b981');
            progress.setAttribute('stroke-width', '8');
            progress.setAttribute('stroke-linecap', 'round');
            progress.style.cssText = 'stroke-dasharray:251;stroke-dashoffset:251;transform:rotate(-90deg);transform-origin:center;transition:stroke-dashoffset 1.5s ease;';
            svg.appendChild(progress);

            const percent = document.createElement('span');
            percent.textContent = '0%';
            percent.style.cssText = 'position:absolute;font-size:12px;font-weight:600;color:#fff;';
            container.appendChild(percent);

            setTimeout(() => {
                progress.style.strokeDashoffset = '63'; // 75%
                let current = 0;
                const animate = () => {
                    if (current <= 75) {
                        percent.textContent = current + '%';
                        current++;
                        requestAnimationFrame(animate);
                    }
                };
                animate();
            }, 100);
        },

        // 6. Stats Cards
        'stats-cards': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;background:#1a1a2e;';
            const stats = [
                { val: '2.5K', label: 'Users', color: '#6750A4' },
                { val: '87%', label: 'Growth', color: '#10b981' },
                { val: '1.2M', label: 'Views', color: '#f472b6' }
            ];
            stats.forEach((s, i) => {
                const card = document.createElement('div');
                card.style.cssText = `background:#2d2d3a;border-radius:8px;padding:8px 12px;text-align:center;opacity:0;transform:translateY(10px);transition:all 0.3s ease ${i * 0.1}s;`;
                card.innerHTML = `<div style="font-size:14px;font-weight:700;color:${s.color};">${s.val}</div><div style="font-size:9px;color:#9ca3af;">${s.label}</div>`;
                container.appendChild(card);
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50 + i * 100);
            });
        },

        // 7. Gauge Meter
        'gauge-meter': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 120 60');
            svg.style.cssText = 'width:100px;height:60px;';
            container.appendChild(svg);

            // Background arc
            const bgArc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            bgArc.setAttribute('d', 'M 20 50 A 30 30 0 0 1 100 50');
            bgArc.setAttribute('fill', 'none');
            bgArc.setAttribute('stroke', '#2d2d3a');
            bgArc.setAttribute('stroke-width', '8');
            svg.appendChild(bgArc);

            // Value arc
            const valArc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            valArc.setAttribute('d', 'M 20 50 A 30 30 0 0 1 100 50');
            valArc.setAttribute('fill', 'none');
            valArc.setAttribute('stroke', '#fbbf24');
            valArc.setAttribute('stroke-width', '8');
            valArc.setAttribute('stroke-linecap', 'round');
            valArc.style.cssText = 'stroke-dasharray:94;stroke-dashoffset:94;transition:stroke-dashoffset 1s ease;';
            svg.appendChild(valArc);

            // Needle
            const needle = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            needle.setAttribute('x1', '60');
            needle.setAttribute('y1', '50');
            needle.setAttribute('x2', '60');
            needle.setAttribute('y2', '25');
            needle.setAttribute('stroke', '#ef4444');
            needle.setAttribute('stroke-width', '2');
            needle.style.cssText = 'transform-origin:60px 50px;transition:transform 1s cubic-bezier(0.175,0.885,0.32,1.275);';
            svg.appendChild(needle);

            setTimeout(() => {
                valArc.style.strokeDashoffset = '25';
                needle.style.transform = 'rotate(45deg)';
            }, 100);
        },

        // 8. Heatmap Grid
        'heatmap': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const grid = document.createElement('div');
            grid.style.cssText = 'display:grid;grid-template-columns:repeat(5,1fr);gap:2px;';
            container.appendChild(grid);

            const values = [0.2, 0.5, 0.8, 0.4, 0.7, 0.6, 0.9, 0.3, 0.8, 0.5, 0.4, 0.7, 0.6, 0.2, 0.9, 0.5, 0.8, 0.4, 0.7, 0.3, 0.6, 0.8, 0.5, 0.4];
            const getColor = (v) => {
                if (v < 0.4) return 'rgba(103,80,164,0.4)';
                if (v < 0.6) return 'rgba(147,129,255,0.6)';
                return 'rgba(234,221,255,0.8)';
            };

            values.forEach((v, i) => {
                const cell = document.createElement('div');
                cell.style.cssText = `width:10px;height:10px;border-radius:2px;background:${getColor(v)};opacity:0;transition:opacity 0.3s ease ${i * 0.02}s;`;
                grid.appendChild(cell);
                setTimeout(() => cell.style.opacity = '1', 100 + i * 20);
            });
        },

        // ============================================
        // CHARTS & COUNTERS PREVIEW INITIALIZERS
        // ============================================

        // 1. Counter Up
        'counter-up': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const counter = document.createElement('span');
            counter.style.cssText = 'font-size:28px;font-weight:900;color:#10b981;font-family:monospace;';
            counter.textContent = '0';
            container.appendChild(counter);

            const target = 2024;
            let current = 0;
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            const stepTime = duration / steps;

            const count = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(count);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, stepTime);
        },

        // 2. Circular Counter
        'circular-counter': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 100 100');
            svg.style.cssText = 'width:60px;height:60px;';
            container.appendChild(svg);

            const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            bgCircle.setAttribute('cx', '50');
            bgCircle.setAttribute('cy', '50');
            bgCircle.setAttribute('r', '40');
            bgCircle.setAttribute('fill', 'none');
            bgCircle.setAttribute('stroke', '#2d2d3a');
            bgCircle.setAttribute('stroke-width', '8');
            svg.appendChild(bgCircle);

            const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            progressCircle.setAttribute('cx', '50');
            progressCircle.setAttribute('cy', '50');
            progressCircle.setAttribute('r', '40');
            progressCircle.setAttribute('fill', 'none');
            progressCircle.setAttribute('stroke', '#6750A4');
            progressCircle.setAttribute('stroke-width', '8');
            progressCircle.style.cssText = 'transform:rotate(-90deg);transform-origin:center;transition:stroke-dashoffset 2s ease;';
            svg.appendChild(progressCircle);

            const text = document.createElement('span');
            text.style.cssText = 'position:absolute;font-size:16px;font-weight:700;color:#fff;';
            text.textContent = '0%';
            container.appendChild(text);

            const target = 75;
            const circumference = 2 * Math.PI * 40;
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = circumference;

            setTimeout(() => {
                const offset = circumference - (circumference * target / 100);
                progressCircle.style.strokeDashoffset = offset;

                let current = 0;
                const animate = () => {
                    if (current <= target) {
                        text.textContent = current + '%';
                        current++;
                        requestAnimationFrame(animate);
                    }
                };
                animate();
            }, 100);
        },

        // 3. Progress Bar
        'progress-bar': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:0 12px;';
            const bar = document.createElement('div');
            bar.style.cssText = 'width:80px;height:8px;background:#2d2d3a;border-radius:4px;overflow:hidden;';
            container.appendChild(bar);

            const fill = document.createElement('div');
            fill.style.cssText = 'height:100%;background:linear-gradient(90deg,#6750A4,#9381FF);border-radius:4px;width:0;transition:width 1.5s cubic-bezier(0.4,0,0.2,1);';
            bar.appendChild(fill);

            setTimeout(() => fill.style.width = '75%', 200);
        },

        // 4. Loading Bar
        'loading-bar': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:0 12px;';
            const bar = document.createElement('div');
            bar.style.cssText = 'width:80px;height:6px;background:#2d2d3a;border-radius:3px;overflow:hidden;';
            container.appendChild(bar);

            const fill = document.createElement('div');
            fill.style.cssText = 'height:100%;background:linear-gradient(90deg,#fbbf24,#f472b6);width:30px;border-radius:3px;animation:loadingSlide 1.5s ease-in-out infinite;';
            bar.appendChild(fill);

            const style = document.createElement('style');
            style.textContent = '@keyframes loadingSlide{0%{transform:translateX(0);}50%{transform:translateX(50px);}100%{transform:translateX(0);}}';
            document.head.appendChild(style);
        },

        // 5. Score Display
        'score-display': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'background:linear-gradient(135deg,#2d2d3a,#1a1a2e);border:2px solid #6750A4;border-radius:12px;padding:12px 20px;display:flex;align-items:center;gap:8px;';
            container.appendChild(wrapper);

            const star = document.createElement('span');
            star.textContent = '★';
            star.style.cssText = 'font-size:20px;color:#fbbf24;';
            wrapper.appendChild(star);

            const score = document.createElement('span');
            score.style.cssText = 'font-size:24px;font-weight:900;color:#fff;font-family:monospace;';
            score.textContent = '0';
            wrapper.appendChild(score);

            let current = 0;
            const target = 98;
            const interval = setInterval(() => {
                if (current >= target) {
                    clearInterval(interval);
                    return;
                }
                current += Math.floor(Math.random() * 5) + 1;
                score.textContent = Math.min(current, target);
            }, 50);
        },

        // 6. Countdown Timer
        'countdown-timer': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const timer = document.createElement('div');
            timer.style.cssText = 'display:flex;gap:4px;font-size:20px;font-weight:700;color:#fff;font-family:monospace;';
            container.appendChild(timer);

            const hours = document.createElement('span');
            hours.textContent = '00';
            timer.appendChild(hours);

            const colon1 = document.createElement('span');
            colon1.textContent = ':';
            timer.appendChild(colon1);

            const mins = document.createElement('span');
            mins.textContent = '00';
            timer.appendChild(mins);

            const colon2 = document.createElement('span');
            colon2.textContent = ':';
            timer.appendChild(colon2);

            const secs = document.createElement('span');
            secs.textContent = '00';
            timer.appendChild(secs);

            let totalSeconds = 60 * 60; // 1 hour
            const update = () => {
                const h = Math.floor(totalSeconds / 3600);
                const m = Math.floor((totalSeconds % 3600) / 60);
                const s = totalSeconds % 60;
                hours.textContent = String(h).padStart(2, '0');
                mins.textContent = String(m).padStart(2, '0');
                secs.textContent = String(s).padStart(2, '0');
                if (totalSeconds > 0) {
                    totalSeconds--;
                    setTimeout(update, 1000);
                }
            };
            update();
        },

        // 7. Animated Number - Stats Counter
        'animated-number': function(container) {
            container.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:#1a1a2e;padding:10px;';

            // Main counter display
            const counterBox = document.createElement('div');
            counterBox.style.cssText = 'background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;padding:12px 20px;box-shadow:0 8px 24px rgba(103,80,164,0.4);display:flex;align-items:center;gap:8px;min-width:80px;justify-content:center;';

            const prefix = document.createElement('span');
            prefix.style.cssText = 'font-size:14px;color:#EADDFF;font-weight:600;';
            prefix.textContent = '📊';
            counterBox.appendChild(prefix);

            const number = document.createElement('span');
            number.style.cssText = 'font-size:28px;font-weight:900;color:#fff;font-family:"Courier New",monospace;min-width:50px;text-align:center;';
            number.textContent = '0';
            counterBox.appendChild(number);

            const suffix = document.createElement('span');
            suffix.style.cssText = 'font-size:12px;color:#EADDFF;font-weight:600;';
            suffix.textContent = '%';
            counterBox.appendChild(suffix);

            container.appendChild(counterBox);

            // Progress bar below
            const progressBar = document.createElement('div');
            progressBar.style.cssText = 'width:90px;height:6px;background:#2d2d4a;border-radius:3px;overflow:hidden;';
            const progressFill = document.createElement('div');
            progressFill.style.cssText = 'height:100%;width:0%;background:linear-gradient(90deg,#9381FF,#EADDFF);border-radius:3px;transition:width 0.1s linear;';
            progressBar.appendChild(progressFill);
            container.appendChild(progressBar);

            // Label
            const label = document.createElement('span');
            label.style.cssText = 'font-size:9px;color:#9CA3AF;font-weight:500;';
            label.textContent = 'Loading...';
            container.appendChild(label);

            // Animate counter with easing
            let value = 0;
            const target = 100;
            const duration = 2000;
            const startTime = Date.now();

            const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutCubic(progress);
                
                value = Math.floor(easedProgress * target);
                number.textContent = value;
                progressFill.style.width = value + '%';

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    label.textContent = '✓ Complete!';
                    // Pulse animation when complete
                    number.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        number.style.transform = 'scale(1)';
                    }, 200);
                }
            };

            // Start animation after short delay
            setTimeout(animate, 300);

            // Loop the animation
            setInterval(() => {
                const resetAnimation = () => {
                    value = 0;
                    number.textContent = '0';
                    progressFill.style.width = '0%';
                    label.textContent = 'Loading...';
                    const startTime2 = Date.now();
                    
                    const animate2 = () => {
                        const elapsed = Date.now() - startTime2;
                        const progress2 = Math.min(elapsed / duration, 1);
                        const easedProgress2 = easeOutCubic(progress2);
                        
                        value = Math.floor(easedProgress2 * target);
                        number.textContent = value;
                        progressFill.style.width = value + '%';

                        if (progress2 < 1) {
                            requestAnimationFrame(animate2);
                        } else {
                            label.textContent = '✓ Complete!';
                            number.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                number.style.transform = 'scale(1)';
                            }, 200);
                        }
                    };
                    animate2();
                };
                resetAnimation();
            }, 4000);
        },

        // 8. Percentage Circle
        'percentage-circle': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 100 100');
            svg.style.cssText = 'width:50px;height:50px;';
            container.appendChild(svg);

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '50');
            circle.setAttribute('cy', '50');
            circle.setAttribute('r', '40');
            circle.setAttribute('fill', 'none');
            circle.setAttribute('stroke', '#2d2d3a');
            circle.setAttribute('stroke-width', '10');
            svg.appendChild(circle);

            const progress = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            progress.setAttribute('cx', '50');
            progress.setAttribute('cy', '50');
            progress.setAttribute('r', '40');
            progress.setAttribute('fill', 'none');
            progress.setAttribute('stroke', '#10b981');
            progress.setAttribute('stroke-width', '10');
            progress.style.cssText = 'transform:rotate(-90deg);transform-origin:center;transition:stroke-dashoffset 1.5s ease;';
            svg.appendChild(progress);

            const pct = document.createElement('span');
            pct.textContent = '0';
            pct.style.cssText = 'position:absolute;font-size:12px;font-weight:600;color:#fff;';
            container.appendChild(pct);

            const target = 80;
            const circumference = 2 * Math.PI * 40;
            progress.style.strokeDasharray = circumference;
            progress.style.strokeDashoffset = circumference;

            setTimeout(() => {
                progress.style.strokeDashoffset = circumference - (circumference * target / 100);
                let current = 0;
                const animate = () => {
                    if (current <= target) {
                        pct.textContent = current + '%';
                        current++;
                        setTimeout(animate, 15);
                    }
                };
                animate();
            }, 100);
        },

        // ============================================
        // IMAGE EFFECTS PREVIEW INITIALIZERS
        // ============================================

        // 1. Image Zoom
        'image-zoom': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;border-radius:12px;cursor:zoom-in;';
            const img = document.createElement('img');
            img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='60'%3E%3Crect fill='%236750A4' width='80' height='60'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='14'%3EZoom%3C/text%3E%3C/svg%3E";
            img.style.cssText = 'width:80px;height:60px;object-fit:cover;transition:transform 0.4s ease;';
            container.appendChild(img);

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 10;
                const y = (e.clientY - rect.top - rect.height / 2) / 10;
                img.style.transform = `scale(1.5) translate(${x}px, ${y}px)`;
            });

            container.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1) translate(0, 0)';
            });
        },

        // 2. Image Filter
        'image-filter': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const img = document.createElement('img');
            img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='50'%3E%3Crect fill='%2310b981' width='70' height='50'/%3E%3Ccircle cx='35' cy='25' r='15' fill='%23fbbf24'/%3E%3C/svg%3E";
            img.style.cssText = 'width:70px;height:50px;border-radius:8px;transition:filter 0.4s ease;cursor:pointer;';
            container.appendChild(img);

            container.addEventListener('mouseenter', () => {
                img.style.filter = 'hue-rotate(90deg) saturate(1.5) brightness(1.2)';
            });
            container.addEventListener('mouseleave', () => {
                img.style.filter = 'none';
            });
        },

        // 3. Grayscale to Color
        'grayscale-to-color': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const img = document.createElement('img');
            img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%236750A4'/%3E%3Cstop offset='100%25' stop-color='%239381FF'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='60' height='60' rx='8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='12'%3EHover%3C/text%3E%3C/svg%3E";
            img.style.cssText = 'width:60px;height:60px;border-radius:8px;filter:grayscale(100%);transition:filter 0.5s ease;cursor:pointer;';
            container.appendChild(img);

            container.addEventListener('mouseenter', () => {
                img.style.filter = 'grayscale(0%)';
            });
            container.addEventListener('mouseleave', () => {
                img.style.filter = 'grayscale(100%)';
            });
        },

        // 4. Image Blur In
        'image-blur-in': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;border-radius:8px;overflow:hidden;';
            const img = document.createElement('img');
            img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='50'%3E%3Crect fill='%23f472b6' width='70' height='50' rx='8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='12'%3EFocus%3C/text%3E%3C/svg%3E";
            img.style.cssText = 'width:70px;height:50px;filter:blur(8px);transition:filter 0.5s ease;cursor:pointer;';
            container.appendChild(img);

            container.addEventListener('mouseenter', () => {
                img.style.filter = 'blur(0)';
            });
            container.addEventListener('mouseleave', () => {
                img.style.filter = 'blur(8px)';
            });
        },

        // 5. Image Reveal
        'image-reveal': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;border-radius:8px;overflow:hidden;cursor:pointer;';
            const img = document.createElement('img');
            img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='50'%3E%3Crect fill='%23EADDFF' width='70' height='50' rx='8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236750A4' font-size='12'%3EReveal!%3C/text%3E%3C/svg%3E";
            img.style.cssText = 'width:70px;height:50px;clip-path:circle(0% at 50% 50%);transition:clip-path 0.6s ease;';
            container.appendChild(img);

            container.addEventListener('mouseenter', () => {
                img.style.clipPath = 'circle(100% at 50% 50%)';
            });
            container.addEventListener('mouseleave', () => {
                img.style.clipPath = 'circle(0% at 50% 50%)';
            });
        },

        // 6. Image Parallax
        'image-parallax': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;border-radius:8px;';
            const img = document.createElement('img');
            img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='60'%3E%3Cdefs%3E%3ClinearGradient id='p' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%236750A4'/%3E%3Cstop offset='100%25' stop-color='%239381FF'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23p)' width='100' height='60'/%3E%3Ccircle cx='20' cy='30' r='10' fill='%23fbbf24' opacity='0.6'/%3E%3C/svg%3E";
            img.style.cssText = 'width:90px;height:60px;transition:transform 0.3s ease;';
            container.appendChild(img);

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 5;
                img.style.transform = `translateX(${x}px)`;
            });
            container.addEventListener('mouseleave', () => {
                img.style.transform = 'translateX(0)';
            });
        },

        // 7. Image Comparison Slider
        'image-compare': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';

            // Wrapper for the comparison slider
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:90px;height:60px;background:#1a1a2e;border-radius:8px;overflow:hidden;cursor:col-resize;';

            // "After" layer (green gradient - background)
            const afterDiv = document.createElement('div');
            afterDiv.style.cssText = 'position:absolute;inset:0;background:linear-gradient(135deg,#10b981,#059669);display:flex;align-items:center;justify-content:center;';
            afterDiv.innerHTML = '<span style="color:white;font-size:10px;font-weight:600;opacity:0.9;">NEW</span>';
            wrapper.appendChild(afterDiv);

            // "Before" layer (purple gradient - clipped)
            const beforeWrapper = document.createElement('div');
            beforeWrapper.style.cssText = 'position:absolute;top:0;left:0;height:100%;width:50%;overflow:hidden;z-index:2;transition:width 0.05s ease-out;';
            const beforeDiv = document.createElement('div');
            beforeDiv.style.cssText = 'position:absolute;width:90px;height:60px;background:linear-gradient(135deg,#6750A4,#9381FF);display:flex;align-items:center;justify-content:center;';
            beforeDiv.innerHTML = '<span style="color:white;font-size:10px;font-weight:600;opacity:0.9;">OLD</span>';
            beforeWrapper.appendChild(beforeDiv);
            wrapper.appendChild(beforeWrapper);

            // Slider handle
            const slider = document.createElement('div');
            slider.style.cssText = 'position:absolute;top:0;bottom:0;left:50%;width:3px;background:#fff;z-index:3;box-shadow:0 0 8px rgba(0,0,0,0.4);pointer-events:none;';
            const handle = document.createElement('div');
            handle.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:14px;height:14px;background:#fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);';
            slider.appendChild(handle);
            wrapper.appendChild(slider);

            container.appendChild(wrapper);

            wrapper.addEventListener('mousemove', (e) => {
                const rect = wrapper.getBoundingClientRect();
                let x = ((e.clientX - rect.left) / rect.width) * 100;
                x = Math.max(5, Math.min(95, x));
                beforeWrapper.style.width = x + '%';
                slider.style.left = x + '%';
            });
        },

        // 8. Image Gallery
        'image-gallery': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:6px;background:#1a1a2e;padding:8px;';
            const colors = ['#6750A4', '#9381FF', '#EADDFF', '#10b981', '#f472b6', '#fbbf24'];
            colors.forEach((c, i) => {
                const img = document.createElement('div');
                img.style.cssText = `width:16px;height:16px;background:${c};border-radius:4px;cursor:pointer;transition:transform 0.2s ease;opacity:0;animation:fadeIn 0.3s ease ${i * 0.1}s forwards;`;
                container.appendChild(img);

                img.addEventListener('mouseenter', () => {
                    img.style.transform = 'scale(1.3)';
                });
                img.addEventListener('mouseleave', () => {
                    img.style.transform = 'scale(1)';
                });
            });
        },

        // 9. Lightbox
        'lightbox': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;position:relative;overflow:hidden;';
            const thumb = document.createElement('div');
            thumb.style.cssText = 'width:60px;height:40px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;color:#fff;transition:all 0.3s ease;box-shadow:0 2px 8px rgba(103,80,164,0.3);';
            thumb.textContent = '🖼️';
            container.appendChild(thumb);

            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:all 0.3s ease;z-index:10;';
            const modal = document.createElement('div');
            modal.style.cssText = 'width:90px;height:60px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff;transform:scale(0.8);transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);box-shadow:0 10px 40px rgba(103,80,164,0.5);';
            modal.textContent = 'Lightbox';
            overlay.appendChild(modal);
            container.appendChild(overlay);

            thumb.addEventListener('click', () => {
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
                modal.style.transform = 'scale(1)';
            });

            overlay.addEventListener('click', () => {
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
                modal.style.transform = 'scale(0.8)';
            });

            thumb.addEventListener('mouseenter', () => {
                thumb.style.transform = 'scale(1.1)';
                thumb.style.boxShadow = '0 4px 12px rgba(103,80,164,0.5)';
            });
            thumb.addEventListener('mouseleave', () => {
                thumb.style.transform = 'scale(1)';
                thumb.style.boxShadow = '0 2px 8px rgba(103,80,164,0.3)';
            });
        },

        // 10. Image Hover Effect - Magnetic Glow Card
        'image-hover-effect': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';

            const card = document.createElement('div');
            card.style.cssText = 'width:70px;height:50px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;position:relative;overflow:hidden;transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);cursor:pointer;box-shadow:0 4px 15px rgba(103,80,164,0.3);';
            card.innerHTML = '<span style="position:relative;z-index:2;pointer-events:none;">HOVER</span>';

            // Shine effect overlay
            const shine = document.createElement('div');
            shine.style.cssText = 'position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent 40%,rgba(255,255,255,0.3) 50%,transparent 60%);transform:translateX(-100%) skewX(-15deg);transition:transform 0.6s ease;pointer-events:none;';
            card.appendChild(shine);

            // Glow ring
            const glow = document.createElement('div');
            glow.style.cssText = 'position:absolute;inset:-3px;border-radius:14px;background:linear-gradient(135deg,#9381FF,#EADDFF,#9381FF);z-index:-1;opacity:0;transition:opacity 0.3s ease;';
            card.appendChild(glow);

            container.appendChild(card);

            container.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.15) translateY(-4px)';
                card.style.boxShadow = '0 12px 30px rgba(103,80,164,0.6)';
                shine.style.transform = 'translateX(100%) skewX(-15deg)';
                glow.style.opacity = '1';
                card.innerHTML = '<span style="position:relative;z-index:2;pointer-events:none;">✨ NICE</span>';
                card.appendChild(shine);
                card.appendChild(glow);
            });

            container.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1) translateY(0)';
                card.style.boxShadow = '0 4px 15px rgba(103,80,164,0.3)';
                shine.style.transform = 'translateX(-100%) skewX(-15deg)';
                glow.style.opacity = '0';
                card.innerHTML = '<span style="position:relative;z-index:2;pointer-events:none;">HOVER</span>';
                card.appendChild(shine);
                card.appendChild(glow);
            });

            // Auto demo - simulate hover every 3.5 seconds
            let isHovering = false;
            setInterval(() => {
                if (!isHovering) {
                    isHovering = true;
                    card.style.transform = 'scale(1.15) translateY(-4px)';
                    card.style.boxShadow = '0 12px 30px rgba(103,80,164,0.6)';
                    shine.style.transform = 'translateX(100%) skewX(-15deg)';
                    glow.style.opacity = '1';
                    card.innerHTML = '<span style="position:relative;z-index:2;pointer-events:none;">✨ NICE</span>';
                    card.appendChild(shine);
                    card.appendChild(glow);

                    setTimeout(() => {
                        card.style.transform = 'scale(1) translateY(0)';
                        card.style.boxShadow = '0 4px 15px rgba(103,80,164,0.3)';
                        shine.style.transform = 'translateX(-100%) skewX(-15deg)';
                        glow.style.opacity = '0';
                        card.innerHTML = '<span style="position:relative;z-index:2;pointer-events:none;">HOVER</span>';
                        card.appendChild(shine);
                        card.appendChild(glow);
                        isHovering = false;
                    }, 1500);
                }
            }, 3500);
        },


        // ============================================
        // SCROLLING EFFECTS PREVIEW INITIALIZERS
        // ============================================

        // 1. Scroll Progress Bar
        'scroll-progress': function(container) {
            container.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:#1a1a2e;padding:12px;';
            const bar = document.createElement('div');
            bar.style.cssText = 'width:80px;height:4px;background:#EADDFF;border-radius:2px;overflow:hidden;';
            container.appendChild(bar);

            const fill = document.createElement('div');
            fill.style.cssText = 'height:100%;background:linear-gradient(90deg,#6750A4,#9381FF);width:0%;transition:width 0.1s linear;';
            bar.appendChild(fill);

            const label = document.createElement('span');
            label.style.cssText = 'font-size:10px;color:#9381FF;font-family:monospace;';
            label.textContent = '0%';
            container.appendChild(label);

            let progress = 0;
            const animate = () => {
                if (progress < 100) {
                    progress += 2;
                    fill.style.width = progress + '%';
                    label.textContent = progress + '%';
                    setTimeout(animate, 50);
                }
            };
            setTimeout(animate, 500);
        },

        // 2. Parallax Scroll
        'parallax-scroll': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;position:relative;';
            
            // Background layer (slow)
            const bgLayer = document.createElement('div');
            bgLayer.style.cssText = 'position:absolute;width:120%;height:120%;background:radial-gradient(circle at 30% 30%,#2d2d4a 0%,#1a1a2e 70%);border-radius:50%;left:-10%;top:-10%;opacity:0.6;';
            container.appendChild(bgLayer);
            
            // Middle layer (medium speed)
            const midLayer = document.createElement('div');
            midLayer.style.cssText = 'position:absolute;width:60px;height:60px;border:2px solid rgba(103,80,164,0.3);border-radius:50%;left:10px;top:10px;';
            container.appendChild(midLayer);
            
            const midLayer2 = document.createElement('div');
            midLayer2.style.cssText = 'position:absolute;width:40px;height:40px;border:2px solid rgba(147,129,255,0.4);border-radius:50%;right:15px;bottom:15px;';
            container.appendChild(midLayer2);
            
            // Foreground layer (fast) - main text
            const text = document.createElement('span');
            text.style.cssText = 'font-size:14px;font-weight:700;color:#fff;position:relative;z-index:10;text-shadow:0 2px 10px rgba(103,80,164,0.8);';
            text.textContent = 'Parallax';
            container.appendChild(text);
            
            // Small particles that move at different speeds
            const particles = [];
            for (let i = 0; i < 5; i++) {
                const p = document.createElement('div');
                const size = 4 + Math.random() * 6;
                p.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:rgba(103,80,164,${0.3 + Math.random() * 0.4});border-radius:50%;`;
                p.style.left = (10 + Math.random() * 80) + 'px';
                p.style.top = (10 + Math.random() * 40) + 'px';
                container.appendChild(p);
                particles.push({ el: p, speed: 0.5 + Math.random() * 1.5, offset: Math.random() * Math.PI * 2 });
            }
            
            // Animate parallax effect
            let time = 0;
            const animate = () => {
                time += 0.02;
                
                // Background moves slowly
                bgLayer.style.transform = `translate(${Math.sin(time) * 15}px, ${Math.cos(time * 0.7) * 10}px)`;
                
                // Middle layer moves at medium speed
                midLayer.style.transform = `translate(${Math.sin(time * 1.3) * 25}px, ${Math.cos(time) * 20}px)`;
                midLayer2.style.transform = `translate(${Math.cos(time * 1.1) * 30}px, ${Math.sin(time * 0.8) * 25}px)`;
                
                // Text moves faster (main parallax effect)
                text.style.transform = `translate(${Math.sin(time * 1.5) * 20}px, ${Math.cos(time * 1.2) * 15}px)`;
                
                // Particles move at different speeds
                particles.forEach(p => {
                    p.el.style.transform = `translate(${Math.sin(time * p.speed + p.offset) * 20}px, ${Math.cos(time * p.speed * 0.8 + p.offset) * 15}px)`;
                });
                
                requestAnimationFrame(animate);
            };
            animate();
        },

        // 3. Scroll Spy
        'scroll-spy': function(container) {
            container.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:#1a1a2e;padding:12px;';
            const items = ['Section 1', 'Section 2', 'Section 3'];
            const spyContainer = document.createElement('div');
            spyContainer.style.cssText = 'display:flex;gap:8px;';
            container.appendChild(spyContainer);

            items.forEach((item, i) => {
                const dot = document.createElement('div');
                dot.style.cssText = `width:24px;height:24px;border-radius:50%;background:${i === 0 ? '#6750A4' : '#EADDFF'};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:${i === 0 ? '#fff' : '#6750A4'};transition:all 0.3s ease;`;
                dot.textContent = i + 1;
                spyContainer.appendChild(dot);
            });

            let active = 0;
            setInterval(() => {
                active = (active + 1) % 3;
                spyContainer.querySelectorAll('div').forEach((dot, i) => {
                    dot.style.background = i === active ? '#6750A4' : '#EADDFF';
                    dot.style.color = i === active ? '#fff' : '#6750A4';
                });
            }, 1500);
        },

        // 4. Scroll Reveal
        'scroll-reveal': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;background:#1a1a2e;padding:10px;';
            
            // Create multiple items for staggered reveal effect
            const items = [];
            const colors = ['#6750A4', '#9381FF', '#EADDFF', '#10b981'];
            const labels = ['A', 'B', 'C', 'D'];
            
            colors.forEach((color, i) => {
                const item = document.createElement('div');
                item.style.cssText = `width:22px;height:22px;background:linear-gradient(135deg,${color},${color}dd);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;opacity:0;transform:translateY(25px) scale(0.8);transition:all 0.5s cubic-bezier(0.34,1.56,0.64,1);box-shadow:0 4px 12px ${color}40;`;
                item.textContent = labels[i];
                container.appendChild(item);
                items.push(item);
            });
            
            // Staggered animation
            items.forEach((item, i) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0) scale(1)';
                }, 200 + i * 150);
            });
        },

        // 5. Sticky Header
        'sticky-header': function(container) {
            container.style.cssText = 'display:flex;flex-direction:column;align-items:center;background:#1a1a2e;overflow:hidden;padding:8px;';

            // Viewport container showing scroll behavior
            const viewport = document.createElement('div');
            viewport.style.cssText = 'width:100px;height:80px;background:#0f0f1a;border-radius:8px;position:relative;overflow:hidden;border:2px solid #2d2d4a;';
            container.appendChild(viewport);

            // Sticky header (fixed at top of viewport)
            const header = document.createElement('div');
            header.style.cssText = 'position:absolute;top:0;left:0;right:0;height:24px;background:linear-gradient(135deg,#6750A4,#9381FF);display:flex;align-items:center;justify-content:center;gap:4px;font-size:9px;font-weight:700;color:#fff;z-index:10;box-shadow:0 4px 12px rgba(103,80,164,0.8);border-bottom:2px solid #9381FF;';
            header.innerHTML = '<span>📌</span><span>STICKY HEADER</span>';
            viewport.appendChild(header);

            // Scrollable content that moves behind the header
            const scrollContent = document.createElement('div');
            scrollContent.style.cssText = 'position:absolute;top:24px;left:0;right:0;bottom:0;overflow:hidden;';

            // Content sections that scroll
            const sections = document.createElement('div');
            sections.style.cssText = 'display:flex;flex-direction:column;gap:4px;padding:8px;transition:transform 0.5s ease;';

            const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#ff9ff3', '#54a0ff'];
            const labels = ['Section 1', 'Section 2', 'Section 3', 'Section 4', 'Section 5', 'Section 6'];

            colors.forEach((color, i) => {
                const section = document.createElement('div');
                section.style.cssText = `height:20px;background:${color};border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:700;color:#fff;flex-shrink:0;box-shadow:0 2px 4px rgba(0,0,0,0.2);`;
                section.textContent = labels[i];
                sections.appendChild(section);
            });
            scrollContent.appendChild(sections);
            viewport.appendChild(scrollContent);

            // Scroll indicator bar on right
            const scrollBar = document.createElement('div');
            scrollBar.style.cssText = 'position:absolute;right:4px;top:28px;bottom:4px;width:4px;background:#2d2d4a;border-radius:2px;overflow:hidden;';
            const scrollThumb = document.createElement('div');
            scrollThumb.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:25%;background:#6750A4;border-radius:2px;transition:top 0.5s ease;';
            scrollBar.appendChild(scrollThumb);
            viewport.appendChild(scrollBar);

            // Animate scrolling content
            let scrollY = 0;
            let scrollingDown = true;
            const maxScroll = 60; // Total scrollable distance

            setInterval(() => {
                if (scrollingDown) {
                    scrollY += 10;
                    if (scrollY >= maxScroll) scrollingDown = false;
                } else {
                    scrollY -= 10;
                    if (scrollY <= 0) scrollingDown = true;
                }
                sections.style.transform = `translateY(-${scrollY}px)`;
                scrollThumb.style.top = `${(scrollY / maxScroll) * 75}%`;

                // Highlight header when content moves (emphasize it's stuck)
                if (scrollY > 5 && scrollY < maxScroll - 5) {
                    header.style.background = 'linear-gradient(135deg,#7c6bc0,#a895ff)';
                    header.innerHTML = '<span style="animation:bounce 0.3s ease;">📌</span><span>LOCKED!</span>';
                } else {
                    header.style.background = 'linear-gradient(135deg,#6750A4,#9381FF)';
                    header.innerHTML = '<span>📌</span><span>STICKY HEADER</span>';
                }
            }, 1200);

            // Add bounce animation
            const style = document.createElement('style');
            style.textContent = `@keyframes bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }`;
            container.appendChild(style);
        },

        // 6. Scroll Snap
        'scroll-snap': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'display:flex;gap:4px;width:120px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;';
            wrapper.innerHTML = '<div style="scroll-snap-align:start;flex:0 0 35px;height:50px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff;">1</div><div style="scroll-snap-align:start;flex:0 0 35px;height:50px;background:linear-gradient(135deg,#9381FF,#B794F6);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff;">2</div><div style="scroll-snap-align:start;flex:0 0 35px;height:50px;background:linear-gradient(135deg,#B794F6,#EADDFF);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#6750A4;">3</div>';
            container.appendChild(wrapper);

            let scrollPos = 0;
            setInterval(() => {
                scrollPos = (scrollPos + 1) % 3;
                wrapper.scrollTo({ left: scrollPos * 39, behavior: 'smooth' });
            }, 2000);
        },

        // 7. Horizontal Scroll
        'horizontal-scroll': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;';
            const track = document.createElement('div');
            track.style.cssText = 'display:flex;gap:6px;animation:hScroll 8s linear infinite;';
            track.innerHTML = '<div style="flex:0 0 25px;height:40px;background:#6750A4;border-radius:6px;"></div><div style="flex:0 0 25px;height:40px;background:#9381FF;border-radius:6px;"></div><div style="flex:0 0 25px;height:40px;background:#B794F6;border-radius:6px;"></div><div style="flex:0 0 25px;height:40px;background:#EADDFF;border-radius:6px;"></div><div style="flex:0 0 25px;height:40px;background:#6750A4;border-radius:6px;"></div><div style="flex:0 0 25px;height:40px;background:#9381FF;border-radius:6px;"></div>';
            container.appendChild(track);

            const style = document.createElement('style');
            style.textContent = `@keyframes hScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-124px); } }`;
            container.appendChild(style);
        },

        // 8. Scroll Trigger
        'scroll-trigger': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:12px;background:#1a1a2e;padding:12px;overflow:hidden;';

            // Scroll indicator on left
            const scrollTrack = document.createElement('div');
            scrollTrack.style.cssText = 'width:8px;height:60px;background:#2d2d4a;border-radius:4px;position:relative;overflow:hidden;';
            const scrollBar = document.createElement('div');
            scrollBar.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:30%;background:#6750A4;border-radius:4px;transition:top 0.3s ease;';
            scrollTrack.appendChild(scrollBar);
            container.appendChild(scrollTrack);

            // Trigger zones with items
            const zones = document.createElement('div');
            zones.style.cssText = 'display:flex;flex-direction:column;gap:8px;';

            const items = [];
            for (let i = 0; i < 3; i++) {
                const item = document.createElement('div');
                item.style.cssText = `width:45px;height:16px;background:#2d2d4a;border:2px dashed #49454F;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:8px;color:#9CA3AF;font-weight:600;transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);`;
                item.textContent = ['A', 'B', 'C'][i];
                zones.appendChild(item);
                items.push(item);
            }
            container.appendChild(zones);

            // Animate scroll bar and trigger items sequentially
            let currentStep = 0;
            const steps = [10, 40, 70]; // Scroll bar positions

            const triggerItem = (index) => {
                const item = items[index];
                item.style.background = 'linear-gradient(135deg,#6750A4,#9381FF)';
                item.style.borderStyle = 'solid';
                item.style.borderColor = '#9381FF';
                item.style.color = '#fff';
                item.style.transform = 'scale(1.1)';
                item.textContent = ['✓', '✓', '✓'][index];
            };

            const resetItem = (index) => {
                const item = items[index];
                item.style.background = '#2d2d4a';
                item.style.borderStyle = 'dashed';
                item.style.borderColor = '#49454F';
                item.style.color = '#9CA3AF';
                item.style.transform = 'scale(1)';
                item.textContent = ['A', 'B', 'C'][index];
            };

            // Loop through triggers
            const animate = () => {
                resetItem(currentStep);
                currentStep = (currentStep + 1) % 3;
                scrollBar.style.top = steps[currentStep] + '%';
                triggerItem(currentStep);
            };

            // Initial trigger
            setTimeout(() => triggerItem(0), 300);
            setInterval(animate, 1500);
        },

        // 9. Smooth Scroll
        'smooth-scroll': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;';
            const dots = document.createElement('div');
            dots.style.cssText = 'display:flex;gap:8px;align-items:center;';
            container.appendChild(dots);

            for (let i = 0; i < 4; i++) {
                const dot = document.createElement('div');
                dot.style.cssText = `width:${8 + i * 2}px;height:8px;background:#6750A4;border-radius:4px;transition:all 0.3s ease;`;
                dots.appendChild(dot);
            }

            let index = 0;
            setInterval(() => {
                dots.querySelectorAll('div').forEach((dot, i) => {
                    dot.style.background = i === index ? '#9381FF' : '#6750A4';
                    dot.style.width = `${8 + (i === index ? 4 : 0)}px`;
                });
                index = (index + 1) % 4;
            }, 800);
        },

        // 10. Scroll Indicator
        'scroll-indicator': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const indicator = document.createElement('div');
            indicator.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px;';
            const arrow = document.createElement('div');
            arrow.style.cssText = 'width:8px;height:8px;border-right:2px solid #6750A4;border-bottom:2px solid #6750A4;transform:rotate(45deg);animation:bounce 1.5s infinite;';
            indicator.appendChild(arrow);
            const label = document.createElement('span');
            label.style.cssText = 'font-size:8px;color:#6750A4;';
            label.textContent = 'Scroll';
            indicator.appendChild(label);
            container.appendChild(indicator);

            const style = document.createElement('style');
            style.textContent = `@keyframes bounce { 0%, 100% { transform:rotate(45deg) translateY(0); } 50% { transform:rotate(45deg) translateY(6px); } }`;
            container.appendChild(style);
        },

        // ============================================
        // LOADING STATES PREVIEW INITIALIZERS
        // ============================================

        // 1. Spinner
        'spinner': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const spinner = document.createElement('div');
            spinner.style.cssText = 'width:30px;height:30px;border:3px solid #EADDFF;border-top-color:#6750A4;border-radius:50%;animation:spin 0.8s linear infinite;';
            container.appendChild(spinner);

            const style = document.createElement('style');
            style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
            container.appendChild(style);
        },

        // 2. Pulse Loader
        'pulse-loader': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const pulse = document.createElement('div');
            pulse.style.cssText = 'width:24px;height:24px;background:#6750A4;border-radius:50%;animation:pulse 1.2s ease-in-out infinite;';
            container.appendChild(pulse);

            const style = document.createElement('style');
            style.textContent = `@keyframes pulse { 0%, 100% { transform:scale(0.8); opacity:0.5; } 50% { transform:scale(1.2); opacity:1; } }`;
            container.appendChild(style);
        },

        // 3. Dot Loader
        'dot-loader': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:6px;background:#1a1a2e;';
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('div');
                dot.style.cssText = `width:8px;height:8px;background:#6750A4;border-radius:50%;animation:dotBounce 1.4s ease-in-out infinite;animation-delay:${i * 0.16}s;`;
                container.appendChild(dot);
            }

            const style = document.createElement('style');
            style.textContent = `@keyframes dotBounce { 0%, 80%, 100% { transform:scale(0.6); opacity:0.5; } 40% { transform:scale(1); opacity:1; } }`;
            container.appendChild(style);
        },

        // 4. Skeleton Screen
        'skeleton-screen': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:16px;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'display:flex;flex-direction:column;gap:8px;width:80px;';

            const header = document.createElement('div');
            header.style.cssText = 'width:50px;height:12px;background:linear-gradient(90deg,#2d2d4a,#3d3d5a,#2d2d4a);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:4px;';
            wrapper.appendChild(header);

            const line = document.createElement('div');
            line.style.cssText = 'width:80px;height:8px;background:linear-gradient(90deg,#2d2d4a,#3d3d5a,#2d2d4a);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:4px;animation-delay:0.2s;';
            wrapper.appendChild(line);

            const line2 = document.createElement('div');
            line2.style.cssText = 'width:60px;height:8px;background:linear-gradient(90deg,#2d2d4a,#3d3d5a,#2d2d4a);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:4px;animation-delay:0.4s;';
            wrapper.appendChild(line2);

            container.appendChild(wrapper);

            const style = document.createElement('style');
            style.textContent = `@keyframes shimmer { 0% { background-position:200% 0; } 100% { background-position:-200% 0; } }`;
            container.appendChild(style);
        },

        // 5. Shimmer
        'shimmer': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const box = document.createElement('div');
            box.style.cssText = 'width:70px;height:40px;background:#2d2d4a;border-radius:8px;position:relative;overflow:hidden;';
            container.appendChild(box);

            const shimmer = document.createElement('div');
            shimmer.style.cssText = 'position:absolute;top:0;left:-100%;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);animation:shimmerSlide 1.5s infinite;';
            box.appendChild(shimmer);

            const style = document.createElement('style');
            style.textContent = `@keyframes shimmerSlide { 0% { left:-50%; } 100% { left:150%; } }`;
            container.appendChild(style);
        },

        // 6. Progress Dots
        'progress-dots': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:4px;background:#1a1a2e;';
            for (let i = 0; i < 5; i++) {
                const dot = document.createElement('div');
                dot.style.cssText = `width:6px;height:6px;background:${i === 0 ? '#6750A4' : '#EADDFF'};border-radius:50%;transition:background 0.3s ease;`;
                container.appendChild(dot);
            }

            let active = 0;
            setInterval(() => {
                container.querySelectorAll('div').forEach((dot, i) => {
                    dot.style.background = i === active ? '#6750A4' : '#EADDFF';
                });
                active = (active + 1) % 5;
            }, 400);
        },

        // 7. Bounce Loader
        'bounce-loader': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:4px;background:#1a1a2e;';
            for (let i = 0; i < 3; i++) {
                const ball = document.createElement('div');
                ball.style.cssText = `width:10px;height:10px;background:#6750A4;border-radius:50%;animation:bounce 0.6s ease-in-out infinite;animation-delay:${i * 0.1}s;`;
                container.appendChild(ball);
            }

            const style = document.createElement('style');
            style.textContent = `@keyframes bounce { 0%, 100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }`;
            container.appendChild(style);
        },

        // 8. Bar Loader
        'bar-loader': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'display:flex;flex-direction:column;gap:4px;';
            container.appendChild(wrapper);

            for (let i = 0; i < 4; i++) {
                const bar = document.createElement('div');
                bar.style.cssText = `width:40px;height:4px;background:#6750A4;border-radius:2px;animation:barStretch 1s ease-in-out infinite;animation-delay:${i * 0.1}s;transform-origin:left center;`;
                wrapper.appendChild(bar);
            }

            const style = document.createElement('style');
            style.textContent = `@keyframes barStretch { 0%, 100% { transform:scaleX(0.4); } 50% { transform:scaleX(1); } }`;
            container.appendChild(style);
        },

        // 9. Circular Progress
        'circular-progress': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 36 36');
            svg.style.cssText = 'width:36px;height:36px;transform:rotate(-90deg);';

            const bg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            bg.setAttribute('d', 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831');
            bg.style.cssText = 'fill:none;stroke:#2d2d4a;stroke-width:3;';
            svg.appendChild(bg);

            const progress = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            progress.setAttribute('d', 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831');
            progress.style.cssText = 'fill:none;stroke:#6750A4;stroke-width:3;stroke-dasharray:75,100;animation:circularProgress 2s ease-in-out infinite;';
            svg.appendChild(progress);

            container.appendChild(svg);

            const style = document.createElement('style');
            style.textContent = `@keyframes circularProgress { 0% { stroke-dasharray:0,100; } 50% { stroke-dasharray:75,100; } 100% { stroke-dasharray:0,100; } }`;
            container.appendChild(style);
        },

        // 10. Typing Indicator
        'typing-indicator': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:12px;';
            const bubble = document.createElement('div');
            bubble.style.cssText = 'display:flex;gap:4px;padding:10px 14px;background:#2d2d4a;border-radius:12px;border-bottom-left-radius:4px;';
            container.appendChild(bubble);

            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('div');
                dot.style.cssText = `width:6px;height:6px;background:#6750A4;border-radius:50%;animation:typingBounce 1.4s ease-in-out infinite;animation-delay:${i * 0.2}s;`;
                bubble.appendChild(dot);
            }

            const style = document.createElement('style');
            style.textContent = `@keyframes typingBounce { 0%, 60%, 100% { transform:translateY(0); } 30% { transform:translateY(-6px); } }`;
            container.appendChild(style);
        },

        // 11. Wave Loader
        'wave-loader': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:3px;background:#1a1a2e;';
            for (let i = 0; i < 5; i++) {
                const bar = document.createElement('div');
                bar.style.cssText = `width:4px;height:20px;background:#6750A4;border-radius:2px;animation:wave 1.2s ease-in-out infinite;animation-delay:${i * 0.1}s;`;
                container.appendChild(bar);
            }

            const style = document.createElement('style');
            style.textContent = `@keyframes wave { 0%, 100% { transform:scaleY(0.4); } 50% { transform:scaleY(1); } }`;
            container.appendChild(style);
        },

        // 12. Infinity Loader
        'infinity-loader': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 50 20');
            svg.style.cssText = 'width:50px;height:20px;';

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M25,10 C25,10 20,5 15,5 C10,5 5,10 5,15 C5,20 10,20 15,15 C20,10 25,10 25,10 C25,10 30,5 35,5 C40,5 45,10 45,15 C45,20 40,20 35,15 C30,10 25,10 25,10');
            path.style.cssText = 'fill:none;stroke:#6750A4;stroke-width:3;stroke-linecap:round;animation:infinitySpin 2s linear infinite;';
            svg.appendChild(path);

            container.appendChild(svg);

            const style = document.createElement('style');
            style.textContent = `@keyframes infinitySpin { 0% { stroke-dasharray:0,50; stroke-dashoffset:0; } 50% { stroke-dasharray:25,50; stroke-dashoffset:-25; } 100% { stroke-dasharray:0,50; stroke-dashoffset:-50; } }`;
            container.appendChild(style);
        },

        // ============================================
        // SVG ANIMATION PREVIEW INITIALIZERS
        // ============================================

        // 1. SVG Draw
        'svg-draw': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 50 30');
            svg.style.cssText = 'width:50px;height:30px;';

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M5,15 L15,5 L25,25 L35,5 L45,15');
            path.style.cssText = 'fill:none;stroke:#6750A4;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:60;stroke-dashoffset:60;animation:svgDraw 2s ease-in-out forwards;';
            svg.appendChild(path);
            container.appendChild(svg);

            const style = document.createElement('style');
            style.textContent = `@keyframes svgDraw { to { stroke-dashoffset: 0; } }`;
            container.appendChild(style);
        },

        // 2. SVG Morph
        'svg-morph': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 50 50');
            svg.style.cssText = 'width:50px;height:50px;';

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M25,5 L45,25 L25,45 L5,25 Z');
            path.style.cssText = 'fill:#6750A4;transition:d 0.5s ease;';
            svg.appendChild(path);
            container.appendChild(svg);

            let toggle = false;
            setInterval(() => {
                toggle = !toggle;
                path.setAttribute('d', toggle ? 'M25,5 Q45,25 25,45 Q5,25 25,5' : 'M25,5 L45,25 L25,45 L5,25 Z');
            }, 1000);
        },

        // 3. SVG Path Animation
        'svg-path-animation': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 60 40');
            svg.style.cssText = 'width:60px;height:40px;';

            const wave = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            wave.style.cssText = 'fill:none;stroke:#9381FF;stroke-width:2;';
            svg.appendChild(wave);
            container.appendChild(svg);

            let offset = 0;
            const animate = () => {
                offset += 0.05;
                let d = 'M0,20 ';
                for (let x = 0; x <= 60; x += 5) {
                    const y = 20 + Math.sin(x * 0.2 + offset) * 8;
                    d += `L${x},${y} `;
                }
                wave.setAttribute('d', d);
                requestAnimationFrame(animate);
            };
            animate();
        },

        // 4. SVG Stroke Dash
        'svg-stroke-dash': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 50 50');
            svg.style.cssText = 'width:50px;height:50px;';

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '25');
            circle.setAttribute('cy', '25');
            circle.setAttribute('r', '20');
            circle.style.cssText = 'fill:none;stroke:#6750A4;stroke-width:3;stroke-dasharray:10,5;animation:strokeDash 1s linear infinite;';
            svg.appendChild(circle);
            container.appendChild(svg);

            const style = document.createElement('style');
            style.textContent = `@keyframes strokeDash { to { stroke-dashoffset: -30; } }`;
            container.appendChild(style);
        },

        // 5. SVG Icon Animation
        'svg-icon-anim': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.style.cssText = 'width:36px;height:36px;';

            const heart = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            heart.setAttribute('d', 'M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z');
            heart.style.cssText = 'fill:#EADDFF;transition:all 0.3s ease;transform-origin:center center;';
            svg.appendChild(heart);
            container.appendChild(svg);

            setInterval(() => {
                const scale = heart.style.transform === 'scale(1.1)' ? 'scale(1)' : 'scale(1.1)';
                const fill = scale === 'scale(1.1)' ? '#6750A4' : '#EADDFF';
                heart.style.transform = scale;
                heart.style.fill = fill;
            }, 800);
        },

        // 6. SVG Shape Shift
        'svg-shape-shift': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 60 60');
            svg.style.cssText = 'width:60px;height:60px;';

            const shape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            shape.setAttribute('points', '30,5 55,20 55,50 5,50 5,20');
            shape.style.cssText = 'fill:#6750A4;transition:all 0.5s ease;';
            svg.appendChild(shape);
            container.appendChild(svg);

            const shapes = [
                '30,5 55,20 55,50 5,50 5,20',
                '30,5 50,30 30,55 10,30',
                '5,30 30,5 55,30 30,55',
                '30,5 55,5 55,55 5,55 5,5'
            ];
            let index = 0;
            setInterval(() => {
                index = (index + 1) % shapes.length;
                shape.setAttribute('points', shapes[index]);
            }, 1200);
        },

        // 7. SVG Fill Animation
        'svg-fill-anim': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 50 50');
            svg.style.cssText = 'width:50px;height:50px;';

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '25');
            circle.setAttribute('cy', '25');
            circle.setAttribute('r', '20');
            circle.style.cssText = 'fill:none;stroke:#6750A4;stroke-width:40;stroke-dasharray:126;stroke-dashoffset:126;animation:fillAnim 2s ease-in-out forwards;';
            svg.appendChild(circle);
            container.appendChild(svg);

            const style = document.createElement('style');
            style.textContent = `@keyframes fillAnim { to { stroke-dashoffset: 0; } }`;
            container.appendChild(style);
        },

        // 8. SVG Line Draw
        'svg-line-draw': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 40 40');
            svg.style.cssText = 'width:40px;height:40px;';

            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.style.cssText = 'stroke:#6750A4;stroke-width:2;fill:none;stroke-linecap:round;';

            const lines = ['M8,8 L32,32', 'M32,8 L8,32', 'M8,20 L32,20', 'M20,8 L20,32'];
            lines.forEach((d, i) => {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', d);
                path.style.cssText = `stroke-dasharray:35;stroke-dashoffset:35;animation:lineDraw 0.5s ease forwards ${i * 0.15}s;`;
                g.appendChild(path);
            });
            svg.appendChild(g);
            container.appendChild(svg);

            const style = document.createElement('style');
            style.textContent = `@keyframes lineDraw { to { stroke-dashoffset: 0; } }`;
            container.appendChild(style);
        },

        // 9. SVG Rotate
        'svg-rotate': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 50 50');
            svg.style.cssText = 'width:50px;height:50px;';

            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.style.cssText = 'transform-origin:25px 25px;animation:rotateSvg 3s linear infinite;';
            svg.appendChild(group);

            const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect1.setAttribute('x', '20');
            rect1.setAttribute('y', '5');
            rect1.setAttribute('width', '10');
            rect1.setAttribute('height', '40');
            rect1.setAttribute('rx', '2');
            rect1.style.cssText = 'fill:#6750A4;';
            group.appendChild(rect1);

            const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect2.setAttribute('x', '5');
            rect2.setAttribute('y', '20');
            rect2.setAttribute('width', '40');
            rect2.setAttribute('height', '10');
            rect2.setAttribute('rx', '2');
            rect2.style.cssText = 'fill:#9381FF;';
            group.appendChild(rect2);

            container.appendChild(svg);

            const style = document.createElement('style');
            style.textContent = `@keyframes rotateSvg { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
            container.appendChild(style);
        },

        // 10. SVG Bounce
        'svg-bounce': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 50 50');
            svg.style.cssText = 'width:50px;height:50px;';

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '25');
            circle.setAttribute('cy', '25');
            circle.setAttribute('r', '15');
            circle.style.cssText = 'fill:#6750A4;animation:bounceSvg 0.6s ease-in-out infinite;transform-origin:bottom center;';
            svg.appendChild(circle);
            container.appendChild(svg);

            const style = document.createElement('style');
            style.textContent = `@keyframes bounceSvg { 0%, 100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(-10px) scaleY(1.1); } }`;
            container.appendChild(style);
        },

        // ============================================
        // MICRO INTERACTIONS PREVIEW INITIALIZERS
        // ============================================

        // 1. Button Ripple
        'button-ripple': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'position:relative;width:70px;height:40px;background:#6750A4;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff;cursor:pointer;overflow:hidden;';
            btn.textContent = 'Click';
            container.appendChild(btn);

            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                ripple.style.cssText = 'position:absolute;width:10px;height:10px;background:rgba(255,255,255,0.5);border-radius:50%;transform:scale(0);animation:ripple 0.6s linear;pointer-events:none;';
                const rect = btn.getBoundingClientRect();
                ripple.style.left = (e.clientX - rect.left - 5) + 'px';
                ripple.style.top = (e.clientY - rect.top - 5) + 'px';
                btn.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });

            const style = document.createElement('style');
            style.textContent = `@keyframes ripple { to { transform: scale(20); opacity: 0; } }`;
            container.appendChild(style);
        },

        // 2. Checkbox Animation
        'checkbox-anim': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:24px;height:24px;cursor:pointer;';

            const checkbox = document.createElement('div');
            checkbox.style.cssText = 'width:24px;height:24px;border:2px solid #6750A4;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;';
            wrapper.appendChild(checkbox);

            const check = document.createElement('div');
            check.style.cssText = 'width:12px;height:12px;border-bottom:2px solid #fff;border-right:2px solid #fff;transform:rotate(45deg) scale(0);transition:transform 0.2s ease;';
            checkbox.appendChild(check);

            container.appendChild(wrapper);

            let checked = false;
            wrapper.addEventListener('click', () => {
                checked = !checked;
                if (checked) {
                    checkbox.style.background = '#6750A4';
                    check.style.transform = 'rotate(45deg) scale(1)';
                } else {
                    checkbox.style.background = 'transparent';
                    check.style.transform = 'rotate(45deg) scale(0)';
                }
            });
        },

        // 3. Radio Animation
        'radio-anim': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:24px;height:24px;cursor:pointer;';

            const outer = document.createElement('div');
            outer.style.cssText = 'width:24px;height:24px;border:2px solid #6750A4;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;';
            wrapper.appendChild(outer);

            const inner = document.createElement('div');
            inner.style.cssText = 'width:10px;height:10px;background:#6750A4;border-radius:50%;transform:scale(0);transition:transform 0.2s ease;';
            outer.appendChild(inner);

            container.appendChild(wrapper);

            let checked = false;
            wrapper.addEventListener('click', () => {
                checked = !checked;
                inner.style.transform = checked ? 'scale(1)' : 'scale(0)';
                if (checked) outer.style.borderColor = '#9381FF';
                else outer.style.borderColor = '#6750A4';
            });
        },

        // 4. Toggle Switch
        'toggle-switch': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const toggle = document.createElement('div');
            toggle.style.cssText = 'position:relative;width:44px;height:24px;background:#2d2d4a;border-radius:12px;cursor:pointer;transition:background 0.3s ease;';
            container.appendChild(toggle);

            const knob = document.createElement('div');
            knob.style.cssText = 'position:absolute;top:2px;left:2px;width:20px;height:20px;background:#fff;border-radius:50%;transition:transform 0.3s cubic-bezier(0.4,0,0.2,1);box-shadow:0 2px 4px rgba(0,0,0,0.2);';
            toggle.appendChild(knob);

            let on = false;
            toggle.addEventListener('click', () => {
                on = !on;
                if (on) {
                    toggle.style.background = '#6750A4';
                    knob.style.transform = 'translateX(20px)';
                } else {
                    toggle.style.background = '#2d2d4a';
                    knob.style.transform = 'translateX(0)';
                }
            });
        },

        // 5. Input Focus
        'input-focus': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;';
            container.appendChild(wrapper);

            const input = document.createElement('input');
            input.style.cssText = 'width:80px;height:36px;padding:8px 12px;border:2px solid #EADDFF;border-radius:8px;background:transparent;color:#fff;font-size:11px;outline:none;transition:border-color 0.3s ease;';
            input.placeholder = 'Focus me';
            wrapper.appendChild(input);

            const line = document.createElement('div');
            line.style.cssText = 'position:absolute;bottom:0;left:0;height:2px;background:#6750A4;transform:scaleX(0);transform-origin:left;transition:transform 0.3s ease;';
            wrapper.appendChild(line);

            input.addEventListener('focus', () => {
                input.style.borderColor = '#6750A4';
                line.style.transform = 'scaleX(1)';
            });
            input.addEventListener('blur', () => {
                input.style.borderColor = '#EADDFF';
                line.style.transform = 'scaleX(0)';
            });
        },

        // 6. Hover Lift
        'hover-lift': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const card = document.createElement('div');
            card.style.cssText = 'width:60px;height:40px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff;cursor:pointer;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);box-shadow:0 4px 12px rgba(103,80,164,0.2);';
            card.textContent = 'Hover';
            container.appendChild(card);

            container.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px) scale(1.02)';
                card.style.boxShadow = '0 8px 20px rgba(103,80,164,0.4)';
            });
            container.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 4px 12px rgba(103,80,164,0.2)';
            });
        },

        // 7. Click Shrink
        'click-shrink': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'width:60px;height:40px;background:#6750A4;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff;cursor:pointer;transition:transform 0.1s ease;';
            btn.textContent = 'Click';
            container.appendChild(btn);

            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'scale(0.95)';
            });
            btn.addEventListener('mouseup', () => {
                btn.style.transform = 'scale(1)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
            });
        },

        // 8. Like Button
        'like-button': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'display:flex;align-items:center;gap:6px;padding:8px 12px;background:#2d2d4a;border-radius:20px;cursor:pointer;transition:all 0.3s ease;';
            container.appendChild(btn);

            const heart = document.createElement('span');
            heart.style.cssText = 'font-size:16px;transition:transform 0.3s cubic-bezier(0.175,0.885,0.32,1.275);';
            heart.textContent = '♡';
            btn.appendChild(heart);

            const count = document.createElement('span');
            count.style.cssText = 'font-size:12px;color:#fff;font-weight:600;';
            count.textContent = '0';
            btn.appendChild(count);

            let liked = false;
            let num = 0;
            btn.addEventListener('click', () => {
                liked = !liked;
                num = liked ? num + 1 : num - 1;
                heart.textContent = liked ? '♥' : '♡';
                heart.style.transform = liked ? 'scale(1.2)' : 'scale(1)';
                heart.style.color = liked ? '#ef4444' : '#fff';
                count.textContent = num;
            });
        },

        // 9. Star Rating
        'star-rating': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'display:flex;gap:4px;';
            container.appendChild(wrapper);

            const stars = [];
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('span');
                star.style.cssText = 'font-size:18px;color:#EADDFF;cursor:pointer;transition:all 0.2s ease;';
                star.textContent = '☆';
                wrapper.appendChild(star);
                stars.push(star);
            }

            stars.forEach((star, index) => {
                star.addEventListener('mouseenter', () => {
                    stars.forEach((s, i) => {
                        s.textContent = i <= index ? '★' : '☆';
                        s.style.color = i <= index ? '#fbbf24' : '#EADDFF';
                    });
                });
                star.addEventListener('click', () => {
                    stars.forEach((s, i) => {
                        s.textContent = i <= index ? '★' : '☆';
                        s.style.color = i <= index ? '#fbbf24' : '#EADDFF';
                    });
                });
            });

            wrapper.addEventListener('mouseleave', () => {
                // Reset to 0 on leave
                stars.forEach(s => {
                    s.textContent = '☆';
                    s.style.color = '#EADDFF';
                });
            });
        },

        // 10. Quantity Spinner
        'quantity-spinner': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;gap:4px;';
            const btnMinus = document.createElement('button');
            btnMinus.style.cssText = 'width:24px;height:24px;border:none;background:#2d2d4a;color:#fff;border-radius:4px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;';
            btnMinus.textContent = '−';
            container.appendChild(btnMinus);

            const value = document.createElement('span');
            value.style.cssText = 'width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:600;';
            value.textContent = '1';
            container.appendChild(value);

            const btnPlus = document.createElement('button');
            btnPlus.style.cssText = 'width:24px;height:24px;border:none;background:#6750A4;color:#fff;border-radius:4px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;';
            btnPlus.textContent = '+';
            container.appendChild(btnPlus);

            let num = 1;
            btnMinus.addEventListener('click', () => {
                if (num > 1) {
                    num--;
                    value.textContent = num;
                    value.style.transform = 'scale(0.9)';
                    setTimeout(() => value.style.transform = 'scale(1)', 100);
                }
            });
            btnPlus.addEventListener('click', () => {
                num++;
                value.textContent = num;
                value.style.transform = 'scale(1.1)';
                setTimeout(() => value.style.transform = 'scale(1)', 100);
            });
        },

        // 11. Dropdown Animation
        'dropdown-anim': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;';
            container.appendChild(wrapper);

            const trigger = document.createElement('div');
            trigger.style.cssText = 'padding:8px 16px;background:#6750A4;color:#fff;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;';
            trigger.innerHTML = 'Menu ▼';
            wrapper.appendChild(trigger);

            const menu = document.createElement('div');
            menu.style.cssText = 'position:absolute;top:100%;left:0;margin-top:4px;min-width:80px;background:#2d2d4a;border-radius:6px;padding:4px;opacity:0;transform:translateY(-8px);pointer-events:none;transition:all 0.2s ease;';
            menu.innerHTML = '<div style="padding:6px 10px;color:#fff;font-size:10px;border-radius:4px;cursor:pointer;">Item 1</div><div style="padding:6px 10px;color:#fff;font-size:10px;border-radius:4px;cursor:pointer;">Item 2</div>';
            wrapper.appendChild(menu);

            let open = false;
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                open = !open;
                if (open) {
                    menu.style.opacity = '1';
                    menu.style.transform = 'translateY(0)';
                    menu.style.pointerEvents = 'auto';
                } else {
                    menu.style.opacity = '0';
                    menu.style.transform = 'translateY(-8px)';
                    menu.style.pointerEvents = 'none';
                }
            });

            document.addEventListener('click', () => {
                if (open) {
                    open = false;
                    menu.style.opacity = '0';
                    menu.style.transform = 'translateY(-8px)';
                    menu.style.pointerEvents = 'none';
                }
            });
        },

        // 12. Tab Indicator
        'tab-indicator': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;display:flex;gap:4px;padding:4px;background:#2d2d4a;border-radius:8px;';
            container.appendChild(wrapper);

            const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
            const tabElements = [];

            tabs.forEach((text, i) => {
                const tab = document.createElement('div');
                tab.style.cssText = 'padding:6px 10px;color:#9381FF;font-size:9px;font-weight:600;border-radius:6px;cursor:pointer;transition:color 0.3s ease;z-index:1;';
                tab.textContent = text;
                wrapper.appendChild(tab);
                tabElements.push(tab);
            });

            const indicator = document.createElement('div');
            indicator.style.cssText = 'position:absolute;height:calc(100% - 8px);background:#6750A4;border-radius:6px;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);';
            wrapper.insertBefore(indicator, tabElements[0]);

            function moveIndicator(index) {
                const tab = tabElements[index];
                indicator.style.width = tab.offsetWidth + 'px';
                indicator.style.transform = `translateX(${index * (tab.offsetWidth + 4) + 4}px)`;
            }

            setTimeout(() => moveIndicator(0), 0);

            tabElements.forEach((tab, i) => {
                tab.addEventListener('click', () => {
                    tabElements.forEach(t => t.style.color = '#9381FF');
                    tab.style.color = '#fff';
                    moveIndicator(i);
                });
            });
        },

        // ============================================
        // LAYOUT PATTERNS PREVIEW INITIALIZERS
        // ============================================

        // 1. Masonry Grid
        'masonry-grid': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:10px;';

            const grid = document.createElement('div');
            grid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:5px;width:100px;';

            // Create masonry-like items with varying heights (shorter for preview)
            const items = [
                {h: 28, c: '#6750A4'}, {h: 16, c: '#9381FF'}, {h: 36, c: '#EADDFF'},
                {h: 22, c: '#B794F6'}, {h: 30, c: '#10b981'}, {h: 18, c: '#6750A4'},
                {h: 26, c: '#9381FF'}, {h: 14, c: '#EADDFF'}, {h: 20, c: '#B794F6'}
            ];

            items.forEach((item, i) => {
                const div = document.createElement('div');
                div.style.cssText = `background:${item.c};border-radius:4px;height:${item.h}px;width:100%;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:600;color:#fff;opacity:0;animation:masonryFade 0.4s ease ${i * 0.06}s forwards;box-shadow:0 2px 4px rgba(0,0,0,0.2);`;
                div.textContent = i + 1;
                grid.appendChild(div);
            });

            container.appendChild(grid);

            // Add animation keyframes
            const style = document.createElement('style');
            style.textContent = `@keyframes masonryFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`;
            container.appendChild(style);
        },

        // 2. Bento Layout
        'bento-layout': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:8px;';
            const grid = document.createElement('div');
            grid.style.cssText = 'display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(3,1fr);gap:4px;width:80px;height:60px;';
            
            const cells = [
                {col: '1/3', row: '1/2', color: '#6750A4'}, // Large wide
                {col: '3/4', row: '1/2', color: '#9381FF'},
                {col: '4/5', row: '1/3', color: '#EADDFF', label: '🔥'}, // Tall
                {col: '1/2', row: '2/3', color: '#B794F6'},
                {col: '2/3', row: '2/4', color: '#10b981', label: '✓'}, // Tall
                {col: '3/5', row: '2/3', color: '#6750A4'},
                {col: '1/3', row: '3/4', color: '#9381FF'},
                {col: '3/4', row: '3/4', color: '#EADDFF'},
                {col: '4/5', row: '3/4', color: '#B794F6', label: '⭐'}
            ];
            
            cells.forEach((cell, i) => {
                const div = document.createElement('div');
                div.style.cssText = `grid-column:${cell.col};grid-row:${cell.row};background:${cell.color};border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:600;box-shadow:0 2px 4px rgba(0,0,0,0.2);`;
                if (cell.label) div.textContent = cell.label;
                grid.appendChild(div);
            });
            
            container.appendChild(grid);
        },

        // 3. Card Grid
        'card-grid': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:8px;';
            const grid = document.createElement('div');
            grid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:6px;';
            
            const icons = ['🎨', '📊', '🚀', '💡', '⚡', '🔮'];
            const colors = ['#6750A4', '#9381FF', '#EADDFF', '#B794F6', '#10b981', '#feca57'];
            
            icons.forEach((icon, i) => {
                const card = document.createElement('div');
                card.style.cssText = `background:linear-gradient(135deg,${colors[i]},${colors[(i+1)%6]});border-radius:8px;height:32px;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 3px 6px rgba(0,0,0,0.2);transition:transform 0.2s ease;cursor:pointer;`;
                card.textContent = icon;
                grid.appendChild(card);
                
                // Add hover effect
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'scale(1.08)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'scale(1)';
                });
            });
            
            container.appendChild(grid);
        },

        // 4. Split View
        'split-view': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const split = document.createElement('div');
            split.style.cssText = 'display:flex;width:80px;height:50px;border-radius:8px;overflow:hidden;';
            split.innerHTML = '<div style="flex:1;background:#6750A4;"></div><div style="flex:1;background:#9381FF;"></div>';
            container.appendChild(split);
        },

        // 5. Stacked Cards
        'stacked-cards': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const stack = document.createElement('div');
            stack.style.cssText = 'position:relative;width:50px;height:36px;';
            [0, 2, 4].forEach((offset, i) => {
                const card = document.createElement('div');
                card.style.cssText = `position:absolute;top:${offset}px;left:${offset}px;width:50px;height:36px;background:linear-gradient(135deg,#${['6750A4','9381FF','B794F6'][i]},#${['9381FF','B794F6','EADDFF'][i]});border-radius:8px;z-index:${3-i};`;
                stack.appendChild(card);
            });
            container.appendChild(stack);
        },

        // 6. Overlapping Grid
        'overlapping-grid': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const grid = document.createElement('div');
            grid.style.cssText = 'display:flex;gap:-8px;';
            for (let i = 0; i < 4; i++) {
                const item = document.createElement('div');
                item.style.cssText = `width:28px;height:28px;background:#${['6750A4','9381FF','B794F6','EADDFF'][i]};border-radius:50%;margin-left:-8px;border:2px solid #1a1a2e;`;
                grid.appendChild(item);
            }
            container.appendChild(grid);
        },

        // 7. Featured Layout
        'featured-layout': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const layout = document.createElement('div');
            layout.style.cssText = 'display:grid;grid-template-columns:2fr 1fr;gap:4px;width:70px;height:50px;';
            layout.innerHTML = '<div style="grid-row:span 2;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:8px 0 0 8px;"></div><div style="background:#B794F6;border-radius:0 8px 0 0;"></div><div style="background:#EADDFF;border-radius:0 0 8px 0;"></div>';
            container.appendChild(layout);
        },

        // 8. Staggered Grid
        'staggered-grid': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:8px;';
            const grid = document.createElement('div');
            grid.style.cssText = 'display:grid;grid-template-columns:repeat(4,1fr);gap:4px;align-items:start;width:100px;';

            // Staggered items with varying heights
            const itemsData = [
                {h: 18}, {h: 28}, {h: 22}, {h: 16},
                {h: 20}, {h: 18}, {h: 24}, {h: 20},
                {h: 16}, {h: 22}, {h: 18}, {h: 26}
            ];

            const colors = ['#6750A4', '#9381FF', '#EADDFF', '#B794F6'];

            itemsData.forEach((item, i) => {
                const div = document.createElement('div');
                const colorIndex = Math.floor(i / 3) % 4;
                div.style.cssText = `background:${colors[colorIndex]};border-radius:4px;height:${item.h}px;opacity:0;animation:staggerFade 0.4s ease ${i * 0.06}s forwards;box-shadow:0 2px 4px rgba(0,0,0,0.15);`;
                grid.appendChild(div);
            });

            // Add keyframes animation
            const style = document.createElement('style');
            style.textContent = `@keyframes staggerFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`;
            container.appendChild(style);
            container.appendChild(grid);
        },

        // ============================================
        // FILTER EFFECTS PREVIEW INITIALIZERS
        // ============================================

        // 1. Blur Filter
        'blur-filter': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;background:#1a1a2e;padding:8px;';

            // Original (no blur)
            const original = document.createElement('div');
            original.style.cssText = 'width:40px;height:40px;background:linear-gradient(135deg,#ff6b6b,#feca57);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff;';
            original.innerHTML = '<span>Original</span>';
            container.appendChild(original);

            // Blurred version
            const blurred = document.createElement('div');
            blurred.style.cssText = 'width:40px;height:40px;background:linear-gradient(135deg,#ff6b6b,#feca57);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff;filter:blur(0px);transition:filter 0.6s ease;';
            blurred.innerHTML = '<span>Blurred</span>';
            container.appendChild(blurred);

            // Toggle blur effect
            let isBlurred = false;
            setInterval(() => {
                isBlurred = !isBlurred;
                blurred.style.filter = isBlurred ? 'blur(6px)' : 'blur(0px)';
            }, 1200);
        },

        // 2. Brightness Filter
        'brightness-filter': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const box = document.createElement('div');
            box.style.cssText = 'width:50px;height:36px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:8px;filter:brightness(1);transition:filter 0.5s ease;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff;';
            box.textContent = 'Bright';
            container.appendChild(box);

            let bright = true;
            setInterval(() => {
                bright = !bright;
                box.style.filter = `brightness(${bright ? 1.5 : 0.7})`;
            }, 1500);
        },

        // 3. Contrast Filter
        'contrast-filter': function(container) {
            container.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:#1a1a2e;padding:10px;';

            // Colorful test image with text - shows contrast effect clearly
            const createCard = (contrast, label) => {
                const wrapper = document.createElement('div');
                wrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px;';

                const card = document.createElement('div');
                card.style.cssText = `width:80px;height:40px;background:linear-gradient(135deg,#ff6b6b,#ffd93d,#6750A4);border-radius:8px;display:flex;align-items:center;justify-content:center;filter:contrast(${contrast});transition:filter 0.4s ease;`;
                card.innerHTML = `<span style="font-size:14px;font-weight:800;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,0.5);">Abc</span>`;

                const labelEl = document.createElement('span');
                labelEl.style.cssText = 'font-size:9px;font-weight:600;color:#9381FF;';
                labelEl.textContent = label;

                wrapper.appendChild(card);
                wrapper.appendChild(labelEl);
                return { wrapper, card, labelEl };
            };

            const low = createCard(0.3, 'LOW 30%');
            const high = createCard(2.5, 'HIGH 250%');

            container.appendChild(low.wrapper);
            container.appendChild(high.wrapper);

            // Animated slider showing contrast transition
            const slider = document.createElement('div');
            slider.style.cssText = 'width:80px;height:6px;background:#2d2d4a;border-radius:3px;position:relative;overflow:hidden;';
            const fill = document.createElement('div');
            fill.style.cssText = 'position:absolute;left:0;top:0;height:100%;width:50%;background:linear-gradient(90deg,#6750A4,#9381FF);border-radius:3px;transition:width 0.3s ease;';
            slider.appendChild(fill);
            container.appendChild(slider);

            const sliderLabel = document.createElement('span');
            sliderLabel.style.cssText = 'font-size:8px;color:#9CA3AF;';
            sliderLabel.textContent = 'CONTRAST LEVEL';
            container.appendChild(sliderLabel);

            // Animate contrast values
            let increasing = true;
            setInterval(() => {
                if (increasing) {
                    low.card.style.filter = 'contrast(0.3)';
                    high.card.style.filter = 'contrast(2.5)';
                    fill.style.width = '80%';
                    sliderLabel.textContent = 'MAX CONTRAST ▲';
                } else {
                    low.card.style.filter = 'contrast(0.6)';
                    high.card.style.filter = 'contrast(1.5)';
                    fill.style.width = '40%';
                    sliderLabel.textContent = 'MIN CONTRAST ▼';
                }
                increasing = !increasing;
            }, 1200);
        },

        // 4. Saturate Filter
        'saturate-filter': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const box = document.createElement('div');
            box.style.cssText = 'width:50px;height:36px;background:linear-gradient(135deg,#ff6b6b,#ffd93d);border-radius:8px;filter:saturate(1);transition:filter 0.5s ease;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff;';
            box.textContent = 'Color';
            container.appendChild(box);

            let sat = 0;
            setInterval(() => {
                sat = sat === 0 ? 2 : 0;
                box.style.filter = `saturate(${sat})`;
            }, 1500);
        },

        // 5. Hue Rotate Filter
        'hue-rotate-filter': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const box = document.createElement('div');
            box.style.cssText = 'width:50px;height:36px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff;';
            box.textContent = 'Hue';
            container.appendChild(box);

            let hue = 0;
            setInterval(() => {
                hue = (hue + 30) % 360;
                box.style.filter = `hue-rotate(${hue}deg)`;
            }, 500);
        },

        // 6. Invert Filter
        'invert-filter': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const box = document.createElement('div');
            box.style.cssText = 'width:50px;height:36px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:8px;filter:invert(0);transition:filter 0.3s ease;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff;';
            box.textContent = 'Invert';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => { box.style.filter = 'invert(1)'; });
            container.addEventListener('mouseleave', () => { box.style.filter = 'invert(0)'; });
        },

        // 7. Sepia Filter (Retro/Vintage)
        'sepia-filter': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:10px;background:#1a1a2e;padding:8px;';

            // Colorful photo - original
            const original = document.createElement('div');
            original.style.cssText = 'width:42px;height:42px;background:linear-gradient(135deg,#00d9ff,#00ff88);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff;position:relative;overflow:hidden;';
            original.innerHTML = '<span style="text-shadow:0 1px 2px rgba(0,0,0,0.3);">Original</span>';
            container.appendChild(original);

            // Vintage sepia version
            const sepia = document.createElement('div');
            sepia.style.cssText = 'width:42px;height:42px;background:linear-gradient(135deg,#00d9ff,#00ff88);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff;filter:sepia(0);transition:filter 0.8s ease;position:relative;overflow:hidden;';
            sepia.innerHTML = '<span style="text-shadow:0 1px 2px rgba(0,0,0,0.3);">Vintage</span>';
            container.appendChild(sepia);

            // Animate between original and sepia
            let isSepia = false;
            setInterval(() => {
                isSepia = !isSepia;
                sepia.style.filter = isSepia ? 'sepia(0.9) contrast(1.1) saturate(0.8)' : 'sepia(0)';
            }, 1500);
        },

        // 8. Grayscale Filter
        'grayscale-filter': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const box = document.createElement('div');
            box.style.cssText = 'width:50px;height:36px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:8px;filter:grayscale(0);transition:filter 0.5s ease;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff;';
            box.textContent = 'Gray';
            container.appendChild(box);

            container.addEventListener('mouseenter', () => { box.style.filter = 'grayscale(1)'; });
            container.addEventListener('mouseleave', () => { box.style.filter = 'grayscale(0)'; });
        },

        // ============================================
        // BUTTON ANIMATIONS PREVIEW INITIALIZERS
        // ============================================

        // 1. Glow Button
        'glow-button': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'padding:10px 20px;background:#6750A4;color:#fff;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.3s ease;border:2px solid transparent;';
            btn.textContent = 'Glow';
            container.appendChild(btn);

            container.addEventListener('mouseenter', () => {
                btn.style.boxShadow = '0 0 20px rgba(103,80,164,0.6),0 0 40px rgba(103,80,164,0.4)';
                btn.style.borderColor = '#9381FF';
            });
            container.addEventListener('mouseleave', () => {
                btn.style.boxShadow = 'none';
                btn.style.borderColor = 'transparent';
            });
        },

        // 2. Slide Button
        'slide-button': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'position:relative;width:70px;height:40px;background:#6750A4;color:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;cursor:pointer;overflow:hidden;';
            btn.innerHTML = '<span style="position:relative;z-index:1;">Slide</span><div style="position:absolute;top:0;left:0;width:100%;height:100%;background:#9381FF;transform:translateX(-100%);transition:transform 0.3s ease;"></div>';
            container.appendChild(btn);

            container.addEventListener('mouseenter', () => {
                btn.querySelector('div').style.transform = 'translateX(0)';
            });
            container.addEventListener('mouseleave', () => {
                btn.querySelector('div').style.transform = 'translateX(-100%)';
            });
        },

        // 3. Fill Button
        'fill-button': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'position:relative;padding:10px 20px;color:#6750A4;border:2px solid #6750A4;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;overflow:hidden;';
            btn.innerHTML = '<span style="position:relative;z-index:1;">Fill</span><div style="position:absolute;top:0;left:0;width:100%;height:100%;background:#6750A4;transform:scaleX(0);transform-origin:left;transition:transform 0.3s ease;"></div>';
            container.appendChild(btn);

            const fill = btn.querySelector('div');
            container.addEventListener('mouseenter', () => {
                fill.style.transform = 'scaleX(1)';
                btn.querySelector('span').style.color = '#fff';
            });
            container.addEventListener('mouseleave', () => {
                fill.style.transform = 'scaleX(0)';
                btn.querySelector('span').style.color = '#6750A4';
            });
        },

        // 4. Border Button
        'border-button': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'position:relative;padding:10px 20px;color:#fff;font-size:11px;font-weight:600;cursor:pointer;';
            btn.innerHTML = '<svg style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:visible;"><rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#6750A4" stroke-width="2" stroke-dasharray="150" stroke-dashoffset="150"><animate attributeName="stroke-dashoffset" from="150" to="0" dur="0.4s" fill="freeze" begin="indefinite"/></rect></svg><span style="position:relative;z-index:1;">Border</span>';
            container.appendChild(btn);

            container.addEventListener('mouseenter', () => {
                btn.querySelector('animate').beginElement();
                btn.querySelector('rect').setAttribute('stroke', '#9381FF');
            });
        },

        // 5. Ripple Button
        'ripple-button': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'position:relative;padding:10px 20px;background:#6750A4;color:#fff;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;overflow:hidden;';
            btn.innerHTML = '<span style="position:relative;z-index:1;">Ripple</span>';
            container.appendChild(btn);

            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                ripple.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.5);transform:scale(0);animation:rippleBtn 0.6s linear;pointer-events:none;';
                const rect = btn.getBoundingClientRect();
                ripple.style.left = (e.clientX - rect.left - 5) + 'px';
                ripple.style.top = (e.clientY - rect.top - 5) + 'px';
                ripple.style.width = '10px';
                ripple.style.height = '10px';
                btn.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
            const style = document.createElement('style');
            style.textContent = `@keyframes rippleBtn { to { transform: scale(25); opacity: 0; } }`;
            container.appendChild(style);
        },

        // 6. Bounce Button
        'bounce-button': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'padding:10px 20px;background:#6750A4;color:#fff;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;';
            btn.textContent = 'Bounce';
            container.appendChild(btn);

            container.addEventListener('mouseenter', () => {
                btn.style.animation = 'bounceBtn 0.5s ease';
            });
            container.addEventListener('animationend', () => {
                btn.style.animation = '';
            });
            const style = document.createElement('style');
            style.textContent = `@keyframes bounceBtn { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }`;
            container.appendChild(style);
        },

        // 7. Flip Button
        'flip-button': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;perspective:200px;';
            const btn = document.createElement('div');
            btn.style.cssText = 'position:relative;width:70px;height:40px;transform-style:preserve-3d;transition:transform 0.6s;';
            btn.innerHTML = '<div style="position:absolute;width:100%;height:100%;backface-visibility:hidden;background:#6750A4;color:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;">Front</div><div style="position:absolute;width:100%;height:100%;backface-visibility:hidden;background:#9381FF;color:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;transform:rotateY(180deg);">Back</div>';
            container.appendChild(btn);

            let flipped = false;
            container.addEventListener('click', () => {
                flipped = !flipped;
                btn.style.transform = `rotateY(${flipped ? 180 : 0}deg)`;
            });
        },

        // 8. Rotate Arrow
        'rotate-arrow': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'padding:10px 16px;background:#6750A4;color:#fff;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;';
            btn.innerHTML = '<span>Menu</span><span style="transition:transform 0.3s ease;display:inline-block;">▼</span>';
            container.appendChild(btn);

            container.addEventListener('mouseenter', () => {
                btn.querySelector('span:last-child').style.transform = 'rotate(180deg)';
            });
            container.addEventListener('mouseleave', () => {
                btn.querySelector('span:last-child').style.transform = 'rotate(0deg)';
            });
        },

        // 9. Shrink Grow
        'shrink-grow': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'padding:10px 20px;background:#6750A4;color:#fff;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;transition:transform 0.2s ease;';
            btn.textContent = 'Click';
            container.appendChild(btn);

            btn.addEventListener('mousedown', () => { btn.style.transform = 'scale(0.9)'; });
            btn.addEventListener('mouseup', () => { btn.style.transform = 'scale(1.05)'; });
            btn.addEventListener('mouseleave', () => { btn.style.transform = 'scale(1)'; });
        },

        // 10. Shake Button
        'shake-button': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'padding:10px 20px;background:#6750A4;color:#fff;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;';
            btn.textContent = 'Shake';
            container.appendChild(btn);

            container.addEventListener('mouseenter', () => {
                btn.style.animation = 'shakeBtn 0.5s ease';
            });
            container.addEventListener('animationend', () => {
                btn.style.animation = '';
            });
            const style = document.createElement('style');
            style.textContent = `@keyframes shakeBtn { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }`;
            container.appendChild(style);
        },

        // 11. Pulse Button
        'pulse-button': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'padding:10px 20px;background:#6750A4;color:#fff;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;';
            btn.textContent = 'Pulse';
            container.appendChild(btn);

            container.addEventListener('mouseenter', () => {
                btn.style.animation = 'pulseBtn 1s ease infinite';
            });
            container.addEventListener('mouseleave', () => {
                btn.style.animation = '';
            });
            const style = document.createElement('style');
            style.textContent = `@keyframes pulseBtn { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(103,80,164,0.7); } 50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(103,80,164,0); } }`;
            container.appendChild(style);
        },

        // 12. Sweep Button
        'sweep-button': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const btn = document.createElement('div');
            btn.style.cssText = 'position:relative;width:70px;height:40px;background:#6750A4;color:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;cursor:pointer;overflow:hidden;';
            btn.innerHTML = '<span style="position:relative;z-index:1;">Sweep</span><div style="position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent,rgba(255,255,255,0.3),transparent);transform:translateX(-100%) translateY(-50%) rotate(45deg);transition:transform 0.6s ease;"></div>';
            container.appendChild(btn);

            container.addEventListener('mouseenter', () => {
                btn.querySelector('div').style.transform = 'translateX(200%) translateY(-50%) rotate(45deg)';
            });
            container.addEventListener('mouseleave', () => {
                btn.querySelector('div').style.transform = 'translateX(-100%) translateY(-50%) rotate(45deg)';
            });
        },

        // ========== CARD EFFECTS ==========

        // 1. Card Hover
        'card-hover': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:16px;overflow:hidden;';

            const card = document.createElement('div');
            card.style.cssText = 'position:relative;width:100px;height:65px;background:linear-gradient(135deg,#1e1e3f,#2d2d5a);border-radius:16px;overflow:hidden;cursor:pointer;';

            // Shine effect layer
            const shine = document.createElement('div');
            shine.style.cssText = 'position:absolute;inset:-50%;width:200%;height:200%;background:radial-gradient(circle at var(--x,50%) var(--y,50%),rgba(255,255,255,0.3) 0%,transparent 50%);opacity:0;transition:opacity 0.3s ease;pointer-events:none;';
            card.appendChild(shine);

            // Card content
            const content = document.createElement('div');
            content.style.cssText = 'position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:6px;';
            content.innerHTML = '<span style="font-size:24px;">✨</span><span style="font-size:10px;font-weight:600;color:#fff;letter-spacing:1px;">SPOTLIGHT</span>';
            card.appendChild(content);

            // Border glow
            const border = document.createElement('div');
            border.style.cssText = 'position:absolute;inset:0;border-radius:16px;padding:2px;background:linear-gradient(135deg,#6750A4,#9381FF,#EADDFF);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0.3;transition:opacity 0.3s ease;';
            card.appendChild(border);

            container.appendChild(card);

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                shine.style.setProperty('--x', x + '%');
                shine.style.setProperty('--y', y + '%');
                shine.style.opacity = '1';
                border.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
                shine.style.opacity = '0';
                border.style.opacity = '0.3';
            });
        },

        // 2. Card Flip
        'card-flip': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:90px;height:60px;perspective:500px;';

            const inner = document.createElement('div');
            inner.style.cssText = 'position:relative;width:100%;height:100%;transition:transform 0.6s;transform-style:preserve-3d;';

            const front = document.createElement('div');
            front.style.cssText = 'position:absolute;width:100%;height:100%;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;backface-visibility:hidden;';
            front.textContent = 'FRONT';

            const back = document.createElement('div');
            back.style.cssText = 'position:absolute;width:100%;height:100%;background:linear-gradient(135deg,#9381FF,#6750A4);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;backface-visibility:hidden;transform:rotateY(180deg);';
            back.textContent = 'BACK';

            inner.appendChild(front);
            inner.appendChild(back);
            wrapper.appendChild(inner);
            container.appendChild(wrapper);

            container.addEventListener('mouseenter', () => {
                inner.style.transform = 'rotateY(180deg)';
            });

            container.addEventListener('mouseleave', () => {
                inner.style.transform = 'rotateY(0deg)';
            });
        },

        // 3. Card Expand
        'card-expand': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const card = document.createElement('div');
            card.style.cssText = 'width:70px;height:50px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);overflow:hidden;';
            card.innerHTML = '<span style="color:#fff;font-size:11px;font-weight:600;transition:opacity 0.2s;">EXPAND</span>';
            container.appendChild(card);

            container.addEventListener('mouseenter', () => {
                card.style.width = '110px';
                card.style.height = '70px';
            });

            container.addEventListener('mouseleave', () => {
                card.style.width = '70px';
                card.style.height = '50px';
            });
        },

        // 4. Card Stack
        'card-stack': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:90px;height:60px;';

            for (let i = 2; i >= 0; i--) {
                const card = document.createElement('div');
                card.style.cssText = `position:absolute;width:90px;height:60px;background:linear-gradient(135deg,hsl(${260 + i * 15},50%,${60 + i * 10}%),hsl(${270 + i * 15},50%,${65 + i * 10}%));border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;transition:all 0.3s ease;top:${i * 4}px;left:${i * 4}px;box-shadow:0 ${2 + i * 2}px ${5 + i * 3}px rgba(0,0,0,0.2);`;
                card.textContent = i === 0 ? 'TOP' : '';
                wrapper.appendChild(card);
            }

            container.appendChild(wrapper);

            container.addEventListener('mouseenter', () => {
                const cards = wrapper.querySelectorAll('div');
                cards.forEach((card, i) => {
                    card.style.transform = `translateY(${(2 - i) * 15}px) translateX(${(2 - i) * 8}px)`;
                });
            });

            container.addEventListener('mouseleave', () => {
                const cards = wrapper.querySelectorAll('div');
                cards.forEach(card => {
                    card.style.transform = 'translateY(0) translateX(0)';
                });
            });
        },

        // 5. Card Reveal
        'card-reveal': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const card = document.createElement('div');
            card.style.cssText = 'position:relative;width:90px;height:60px;background:#6750A4;border-radius:12px;overflow:hidden;';

            const cover = document.createElement('div');
            cover.style.cssText = 'position:absolute;width:100%;height:100%;background:linear-gradient(135deg,#9381FF,#B794F6);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;transition:transform 0.4s ease;z-index:2;';
            cover.textContent = 'HOVER';
            card.appendChild(cover);

            const reveal = document.createElement('div');
            reveal.style.cssText = 'position:absolute;width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;';
            reveal.textContent = 'REVEALED!';
            card.appendChild(reveal);

            container.appendChild(card);

            container.addEventListener('mouseenter', () => {
                cover.style.transform = 'translateY(-100%)';
            });

            container.addEventListener('mouseleave', () => {
                cover.style.transform = 'translateY(0)';
            });
        },

        // 6. Card Tilt
        'card-tilt': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const card = document.createElement('div');
            card.style.cssText = 'width:90px;height:60px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;transition:transform 0.1s ease;transform-style:preserve-3d;box-shadow:0 10px 30px rgba(103,80,164,0.3);';
            card.textContent = 'TILT';
            container.appendChild(card);

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 5;
                const rotateY = (centerX - x) / 5;
                card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            container.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
            });
        },

        // 7. Card Lift
        'card-lift': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const card = document.createElement('div');
            card.style.cssText = 'width:90px;height:60px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;transition:all 0.3s ease;';
            card.textContent = 'LIFT';
            container.appendChild(card);

            container.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-12px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(103,80,164,0.4)';
            });

            container.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = 'none';
            });
        },

        // 8. Card Spotlight
        'card-spotlight': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const card = document.createElement('div');
            card.style.cssText = 'position:relative;width:90px;height:60px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;overflow:hidden;';
            card.textContent = 'SPOTLIGHT';
            container.appendChild(card);

            const spotlight = document.createElement('div');
            spotlight.style.cssText = 'position:absolute;width:100px;height:100px;background:radial-gradient(circle,rgba(255,255,255,0.3) 0%,transparent 70%);pointer-events:none;opacity:0;transition:opacity 0.3s ease;';
            card.appendChild(spotlight);

            container.addEventListener('mouseenter', () => {
                spotlight.style.opacity = '1';
            });

            container.addEventListener('mouseleave', () => {
                spotlight.style.opacity = '0';
            });

            container.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - 50;
                const y = e.clientY - rect.top - 50;
                spotlight.style.transform = `translate(${x}px, ${y}px)`;
            });
        },

        // 9. Card Morph
        'card-morph': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const card = document.createElement('div');
            card.style.cssText = 'width:90px;height:60px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;transition:all 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);';
            card.textContent = 'MORPH';
            container.appendChild(card);

            container.addEventListener('mouseenter', () => {
                card.style.borderRadius = '30px 5px 30px 5px';
                card.style.transform = 'scale(1.1) rotate(3deg)';
                card.style.background = 'linear-gradient(135deg,#9381FF,#6750A4)';
            });

            container.addEventListener('mouseleave', () => {
                card.style.borderRadius = '12px';
                card.style.transform = 'scale(1) rotate(0deg)';
                card.style.background = 'linear-gradient(135deg,#6750A4,#9381FF)';
            });
        },

        // 10. Card Glare
        'card-glare': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const card = document.createElement('div');
            card.style.cssText = 'position:relative;width:90px;height:60px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;overflow:hidden;';
            card.textContent = 'GLARE';
            container.appendChild(card);

            const glare = document.createElement('div');
            glare.style.cssText = 'position:absolute;width:200%;height:200%;top:-50%;left:-50%;background:linear-gradient(45deg,transparent 40%,rgba(255,255,255,0.4) 50%,transparent 60%);transform:translateX(-100%) translateY(-50%) rotate(45deg);transition:transform 0.6s ease;pointer-events:none;';
            card.appendChild(glare);

            container.addEventListener('mouseenter', () => {
                glare.style.transform = 'translateX(100%) translateY(-50%) rotate(45deg)';
            });

            container.addEventListener('mouseleave', () => {
                glare.style.transform = 'translateX(-100%) translateY(-50%) rotate(45deg)';
            });
        },

        // ========== PARALLAX EFFECTS ==========

        // 1. Multi-Layer Parallax
        'multi-layer-parallax': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,#1a1a4e 0%,#2a1a3e 50%,#4a2a2e 100%);overflow:hidden;position:relative;';

            // Create layered scene with geometric shapes
            const layers = [
                {
                    depth: 1,
                    content: '<svg viewBox="0 0 100 60" preserveAspectRatio="none"><path d="M0 60 L100 60 L100 40 L70 25 L40 40 L0 25 Z" fill="#6750A4" opacity="0.3"/></svg>',
                    style: 'width:150%;height:40%;bottom:-10px;left:-25%;'
                },
                {
                    depth: 2,
                    content: '<svg viewBox="0 0 100 60" preserveAspectRatio="none"><path d="M0 60 L100 60 L100 30 L60 15 L30 35 L0 20 Z" fill="#9381FF" opacity="0.4"/></svg>',
                    style: 'width:150%;height:50%;bottom:0;left:-25%;'
                },
                {
                    depth: 3,
                    content: '<svg viewBox="0 0 100 60" preserveAspectRatio="none"><path d="M0 60 L100 60 L100 25 L65 10 L35 30 L0 15 Z" fill="#B794F6" opacity="0.5"/></svg>',
                    style: 'width:150%;height:60%;bottom:5px;left:-25%;'
                },
                {
                    depth: 4,
                    elements: [
                        { left: '15%', bottom: '35%', size: '20px', content: '🌙' },
                        { left: '75%', bottom: '55%', size: '12px', content: '⭐' },
                        { left: '45%', bottom: '65%', size: '8px', content: '✨' },
                        { left: '85%', bottom: '40%', size: '10px', content: '💫' }
                    ]
                }
            ];

            const layerElements = [];

            // Create SVG landscape layers
            layers.forEach(layer => {
                if (layer.content) {
                    const div = document.createElement('div');
                    div.style.cssText = `position:absolute;${layer.style}transition:transform 0.1s ease;pointer-events:none;`;
                    div.innerHTML = layer.content;
                    div.dataset.depth = layer.depth;
                    container.appendChild(div);
                    layerElements.push(div);
                }
                if (layer.elements) {
                    layer.elements.forEach(el => {
                        const div = document.createElement('div');
                        div.style.cssText = `position:absolute;left:${el.left};bottom:${el.bottom};font-size:${el.size};transition:transform 0.1s ease;pointer-events:none;`;
                        div.textContent = el.content;
                        div.dataset.depth = layer.depth;
                        container.appendChild(div);
                        layerElements.push(div);
                    });
                }
            });

            // Add label
            const label = document.createElement('div');
            label.textContent = 'PARALLAX';
            label.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:12px;font-weight:700;color:#fff;letter-spacing:3px;opacity:0.3;pointer-events:none;';
            container.appendChild(label);

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 25;
                const y = (e.clientY - rect.top - rect.height / 2) / 25;

                layerElements.forEach(el => {
                    const depth = parseFloat(el.dataset.depth);
                    el.style.transform = `translateX(${x * depth * 3}px) translateY(${y * depth * 2}px)`;
                });
            });

            container.addEventListener('mouseleave', () => {
                layerElements.forEach(el => {
                    el.style.transform = 'translate(0, 0)';
                });
            });
        },

        // 2. Mouse Parallax
        'mouse-parallax': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;position:relative;';

            const bg = document.createElement('div');
            bg.style.cssText = 'position:absolute;width:120%;height:120%;background:radial-gradient(circle,#9381FF 0%,#1a1a2e 70%);left:-10%;top:-10%;transition:transform 0.1s ease;';
            container.appendChild(bg);

            const fg = document.createElement('div');
            fg.style.cssText = 'position:absolute;width:50px;height:50px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 0 20px rgba(147,129,255,0.5);transition:transform 0.15s ease;';
            fg.textContent = '🖱️';
            container.appendChild(fg);

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 15;
                const y = (e.clientY - rect.top - rect.height / 2) / 15;
                bg.style.transform = `translate(${-x}px, ${-y}px)`;
                fg.style.transform = `translate(${x * 2}px, ${y * 2}px)`;
            });
        },

        // 3. Scroll Parallax
        'scroll-parallax': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;position:relative;';

            const scrollArea = document.createElement('div');
            scrollArea.style.cssText = 'position:absolute;width:100%;height:200%;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;';
            scrollArea.innerHTML = '<div style="height:200%;display:flex;flex-direction:column;gap:20px;padding:20px;"><div style="height:60px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;">Layer 1</div><div style="height:60px;background:linear-gradient(135deg,#9381FF,#B794F6);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;">Layer 2</div><div style="height:60px;background:linear-gradient(135deg,#B794F6,#6750A4);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;">Layer 3</div></div>';
            container.appendChild(scrollArea);

            scrollArea.addEventListener('scroll', () => {
                const scrollPos = scrollArea.scrollTop;
                const layers = scrollArea.querySelectorAll('div > div');
                layers.forEach((layer, i) => {
                    layer.style.transform = `translateY(${scrollPos * (0.3 + i * 0.2)}px)`;
                });
            });
        },

        // 4. Tilt Parallax
        'tilt-parallax': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#0f0f23;overflow:hidden;position:relative;';

            // Create layered depth parallax effect
            const layers = [
                { emoji: '🌙', size: 24, depth: 30, x: 20, y: 15 },
                { emoji: '⭐', size: 10, depth: 20, x: 70, y: 25 },
                { emoji: '⭐', size: 8, depth: 25, x: 35, y: 45 },
                { emoji: '🌟', size: 14, depth: 15, x: 80, y: 55 },
                { emoji: '✨', size: 12, depth: 10, x: 50, y: 35 }
            ];

            const elements = [];
            layers.forEach((layer, i) => {
                const el = document.createElement('div');
                el.style.cssText = `position:absolute;font-size:${layer.size}px;left:${layer.x}px;top:${layer.y}px;transition:transform 0.15s ease-out;will-change:transform;`;
                el.textContent = layer.emoji;
                container.appendChild(el);
                elements.push({ el, depth: layer.depth });
            });

            // Center text
            const text = document.createElement('div');
            text.style.cssText = 'position:absolute;font-size:11px;font-weight:700;color:#9381FF;letter-spacing:1px;text-transform:center;';
            text.textContent = 'DEPTH';
            text.style.left = '50%';
            text.style.top = '50%';
            text.style.transform = 'translate(-50%, -50%)';
            container.appendChild(text);
            elements.push({ el: text, depth: 5 });

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                elements.forEach(item => {
                    const moveX = (mouseX - centerX) * (item.depth / 100);
                    const moveY = (mouseY - centerY) * (item.depth / 100);
                    item.el.style.transform = `translate(${moveX}px, ${moveY}px)${item.el === text ? ' translate(-50%, -50%)' : ''}`;
                });
            });

            container.addEventListener('mouseleave', () => {
                elements.forEach(item => {
                    item.el.style.transform = item.el === text ? 'translate(-50%, -50%)' : 'translate(0, 0)';
                });
            });
        },

        // 5. Depth Parallax
        'depth-parallax': function(container) {
            container.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0a0a1e;padding:8px;gap:6px;';

            // Create three depth layers stacked
            const layers = [
                { name: 'BACK', z: -60, color: '#2a2a4e', scale: 0.7, blur: 2, emoji: '🏔️' },
                { name: 'MID', z: 0, color: '#4a4a7e', scale: 0.85, blur: 1, emoji: '🌲' },
                { name: 'FRONT', z: 60, color: '#6750A4', scale: 1, blur: 0, emoji: '🏠' }
            ];

            const layerEls = [];

            layers.forEach((layer, i) => {
                const layerWrapper = document.createElement('div');
                layerWrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:2px;width:70px;';

                const card = document.createElement('div');
                card.style.cssText = `width:70px;height:28px;background:${layer.color};border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:${12 + i * 4}px;position:relative;overflow:hidden;box-shadow:0 ${4 + i * 2}px ${8 + i * 4}px rgba(0,0,0,${0.3 + i * 0.1});transition:all 0.3s ease;`;
                card.innerHTML = `<span style="filter:blur(${layer.blur}px);">${layer.emoji}</span>`;

                const label = document.createElement('span');
                label.style.cssText = `font-size:7px;font-weight:700;color:${layer.color};letter-spacing:1px;`;
                label.textContent = layer.name;

                layerWrapper.appendChild(card);
                layerWrapper.appendChild(label);
                container.appendChild(layerWrapper);
                layerEls.push({ card, z: layer.z, scale: layer.scale, baseY: 0 });
            });

            // Depth indicator with animated lines
            const indicator = document.createElement('div');
            indicator.style.cssText = 'display:flex;align-items:center;gap:8px;margin-top:4px;';

            const lines = document.createElement('div');
            lines.style.cssText = 'display:flex;flex-direction:column;gap:2px;';
            lines.innerHTML = '<div style="width:30px;height:2px;background:#2a2a4e;border-radius:1px;"></div><div style="width:40px;height:2px;background:#4a4a7e;border-radius:1px;"></div><div style="width:50px;height:2px;background:#6750A4;border-radius:1px;"></div>';
            indicator.appendChild(lines);

            const depthText = document.createElement('span');
            depthText.style.cssText = 'font-size:8px;font-weight:600;color:#9381FF;';
            depthText.textContent = 'DEPTH LEVELS';
            indicator.appendChild(depthText);

            container.appendChild(indicator);

            // Animate parallax - wave motion showing different depths
            let time = 0;
            const animate = () => {
                time += 0.03;

                layerEls.forEach((item, i) => {
                    const offset = Math.sin(time + i * 0.8) * 8;
                    const scaleBoost = 1 + Math.sin(time * 1.5 + i) * 0.05;
                    item.card.style.transform = `translateY(${offset}px) scale(${item.scale * scaleBoost})`;
                });

                requestAnimationFrame(animate);
            };
            animate();

            // Mouse interaction adds extra parallax
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const y = (e.clientY - rect.top - rect.height / 2) / 10;

                layerEls.forEach((item, i) => {
                    const depthFactor = (i - 1) * 0.5;
                    const offset = y * depthFactor * 2;
                    item.card.style.transform = `translateY(${offset}px) scale(${item.scale})`;
                });
            });

            container.addEventListener('mouseleave', () => {
                // Animation will take over
            });
        },

        // 6. Perspective Parallax
        'perspective-parallax': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;perspective:1000px;';

            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:110px;height:80px;transform-style:preserve-3d;transition:transform 0.2s ease;';
            container.appendChild(wrapper);

            for (let i = 0; i < 4; i++) {
                const plane = document.createElement('div');
                plane.style.cssText = `position:absolute;width:110px;height:80px;background:linear-gradient(135deg,hsl(${260 + i * 15},60%,${50 + i * 10}%),hsl(${270 + i * 15},60%,${55 + i * 10}%));border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:600;border:1px solid rgba(255,255,255,0.2);`;
                plane.style.transform = `translateZ(${i * 30}px)`;
                plane.textContent = `P${i + 1}`;
                wrapper.appendChild(plane);
            }

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 10;
                const y = (e.clientY - rect.top - rect.height / 2) / 10;
                wrapper.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
            });
        },

        // 7. Floating Parallax
        'floating-parallax': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;overflow:hidden;position:relative;';

            const elements = [];
            const colors = ['#6750A4', '#9381FF', '#B794F6'];

            for (let i = 0; i < 6; i++) {
                const el = document.createElement('div');
                const size = 15 + Math.random() * 20;
                const left = 10 + Math.random() * 70;
                const top = 10 + Math.random() * 60;
                const speed = 0.5 + Math.random() * 1;
                el.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:${colors[i % 3]};border-radius:50%;left:${left}%;top:${top}%;transition:transform 0.1s ease;opacity:0.7;`;
                container.appendChild(el);
                elements.push({ el, speed, baseX: left, baseY: top });
            }

            const center = document.createElement('div');
            center.style.cssText = 'position:relative;width:50px;height:35px;background:linear-gradient(135deg,#fff,#EADDFF);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#6750A4;font-size:12px;font-weight:600;z-index:10;box-shadow:0 5px 20px rgba(103,80,164,0.4);transition:transform 0.15s ease;';
            center.textContent = 'FLOAT';
            container.appendChild(center);

            let floatOffset = 0;
            const animate = () => {
                floatOffset += 0.02;
                center.style.transform = `translateY(${Math.sin(floatOffset) * 5}px)`;
                elements.forEach((item, i) => {
                    const offset = Math.sin(floatOffset * item.speed + i) * 8;
                    item.el.style.transform = `translateY(${offset}px)`;
                });
                if (container.isConnected) requestAnimationFrame(animate);
            };
            animate();

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 15;
                const y = (e.clientY - rect.top - rect.height / 2) / 15;
                center.style.transform = `translate(${x * 2}px, ${y * 2}px)`;
                elements.forEach((item, i) => {
                    item.el.style.transform = `translate(${x * (3 - i * 0.3)}px, ${y * (3 - i * 0.3)}px)`;
                });
            });
        },

        // 8. Zoom Parallax
        'zoom-parallax': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#0a0a1e;overflow:hidden;position:relative;';

            // Background layer - moves slowly
            const bg = document.createElement('div');
            bg.style.cssText = 'position:absolute;width:200%;height:200%;background:radial-gradient(ellipse at 50% 50%,#4a3a8e 0%,#1a1a3e 50%,#0a0a1e 100%);left:-50%;top:-50%;';
            container.appendChild(bg);

            // Middle layer - circles
            const mid = document.createElement('div');
            mid.style.cssText = 'position:absolute;width:100%;height:100%;display:flex;align-items:center;justify-content:center;';
            for (let i = 0; i < 5; i++) {
                const circle = document.createElement('div');
                circle.style.cssText = `position:absolute;width:${60 + i * 30}px;height:${60 + i * 30}px;border:2px solid rgba(103,80,164,${0.3 - i * 0.05});border-radius:50%;`;
                mid.appendChild(circle);
            }
            container.appendChild(mid);

            // Foreground - main card
            const fg = document.createElement('div');
            fg.style.cssText = 'position:relative;width:70px;height:50px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;box-shadow:0 8px 32px rgba(103,80,164,0.6);z-index:10;';
            fg.innerHTML = '<span style="display:flex;flex-direction:column;align-items:center;gap:2px;"><span style="font-size:16px;">🔍</span><span>ZOOM</span></span>';
            container.appendChild(fg);

            // Zoom level indicator
            const indicator = document.createElement('div');
            indicator.style.cssText = 'position:absolute;bottom:8px;right:8px;font-size:8px;font-weight:600;color:#9381FF;background:rgba(103,80,164,0.3);padding:2px 6px;border-radius:4px;';
            indicator.textContent = '1.0x';
            container.appendChild(indicator);

            // Animated zoom effect
            let zoomLevel = 1;
            let zoomingIn = true;
            let angle = 0;

            const animate = () => {
                // Oscillate zoom level
                if (zoomingIn) {
                    zoomLevel += 0.005;
                    if (zoomLevel >= 1.4) zoomingIn = false;
                } else {
                    zoomLevel -= 0.005;
                    if (zoomLevel <= 0.8) zoomingIn = true;
                }

                // Rotate angle for orbital movement
                angle += 0.02;

                // Apply parallax transforms
                const bgScale = 1 + (zoomLevel - 1) * 0.3;
                const bgMove = (zoomLevel - 1) * 50;
                bg.style.transform = `translate(${Math.cos(angle) * bgMove}px, ${Math.sin(angle) * bgMove}px) scale(${bgScale})`;

                const midScale = 1 + (zoomLevel - 1) * 0.6;
                mid.style.transform = `scale(${midScale})`;

                fg.style.transform = `scale(${zoomLevel})`;

                // Update indicator
                indicator.textContent = zoomLevel.toFixed(1) + 'x';

                requestAnimationFrame(animate);
            };
            animate();

            // Mouse interaction adds to the effect
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
                const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
                bg.style.transform = `translate(${x * 40}px, ${y * 40}px) scale(${1 + Math.abs(x) * 0.3})`;
                fg.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(${1 + Math.abs(x) * 0.2})`;
            });
        },

        // ========== FORM EFFECTS ==========

        // 1. Input Underline
        'input-underline': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:120px;';

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Type...';
            input.style.cssText = 'width:100%;padding:10px;background:transparent;border:none;border-bottom:2px solid #49454F;color:#fff;font-size:12px;outline:none;transition:border-color 0.3s ease;';
            wrapper.appendChild(input);

            const underline = document.createElement('div');
            underline.style.cssText = 'position:absolute;bottom:0;left:0;width:0;height:2px;background:linear-gradient(90deg,#6750A4,#9381FF);transition:width 0.3s ease;';
            wrapper.appendChild(underline);

            container.appendChild(wrapper);

            input.addEventListener('focus', () => {
                input.style.borderBottomColor = 'transparent';
                underline.style.width = '100%';
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    underline.style.width = '0';
                    input.style.borderBottomColor = '#49454F';
                }
            });
        },

        // 2. Input Float Label
        'input-float': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:120px;';

            const input = document.createElement('input');
            input.type = 'text';
            input.style.cssText = 'width:100%;padding:12px 8px 4px;background:transparent;border:1px solid #49454F;border-radius:6px;color:#fff;font-size:12px;outline:none;transition:border-color 0.3s ease;';
            wrapper.appendChild(input);

            const label = document.createElement('label');
            label.textContent = 'Name';
            label.style.cssText = 'position:absolute;left:10px;top:10px;color:#9ca3af;font-size:12px;pointer-events:none;transition:all 0.3s ease;';
            wrapper.appendChild(label);

            container.appendChild(wrapper);

            input.addEventListener('focus', () => {
                input.style.borderColor = '#6750A4';
                label.style.top = '-8px';
                label.style.left = '8px';
                label.style.fontSize = '10px';
                label.style.color = '#6750A4';
                label.style.background = '#1a1a2e';
                label.style.padding = '0 4px';
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.style.borderColor = '#49454F';
                    label.style.top = '10px';
                    label.style.left = '10px';
                    label.style.fontSize = '12px';
                    label.style.color = '#9ca3af';
                    label.style.padding = '0';
                }
            });
        },

        // 3. Input Icon
        'input-icon': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:130px;';

            const icon = document.createElement('span');
            icon.textContent = '🔍';
            icon.style.cssText = 'position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:14px;transition:all 0.3s ease;';
            wrapper.appendChild(icon);

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Search...';
            input.style.cssText = 'width:100%;padding:10px 10px 10px 35px;background:transparent;border:2px solid #49454F;border-radius:8px;color:#fff;font-size:12px;outline:none;transition:all 0.3s ease;';
            wrapper.appendChild(input);

            container.appendChild(wrapper);

            input.addEventListener('focus', () => {
                input.style.borderColor = '#6750A4';
                input.style.paddingLeft = '40px';
                icon.style.transform = 'translateY(-50%) scale(1.2)';
            });

            input.addEventListener('blur', () => {
                input.style.borderColor = '#49454F';
                input.style.paddingLeft = '35px';
                icon.style.transform = 'translateY(-50%) scale(1)';
            });
        },

        // 4. Input Shake
        'input-shake': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Type and enter...';
            input.style.cssText = 'width:140px;padding:10px;background:transparent;border:2px solid #49454F;border-radius:8px;color:#fff;font-size:12px;outline:none;transition:border-color 0.3s ease;';
            container.appendChild(input);

            input.addEventListener('focus', () => {
                input.style.borderColor = '#6750A4';
            });

            input.addEventListener('blur', () => {
                input.style.borderColor = '#49454F';
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !input.value) {
                    input.style.animation = 'shake 0.5s ease';
                    input.style.borderColor = '#ef4444';
                    setTimeout(() => {
                        input.style.animation = '';
                        input.style.borderColor = '#49454F';
                    }, 500);
                }
            });

            const style = document.createElement('style');
            style.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }`;
            document.head.appendChild(style);
        },

        // 5. Button Fill
        'button-fill': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const btn = document.createElement('button');
            btn.style.cssText = 'position:relative;width:90px;height:40px;background:transparent;border:2px solid #6750A4;border-radius:8px;color:#6750A4;font-size:12px;font-weight:600;cursor:pointer;overflow:hidden;transition:color 0.3s ease;';
            btn.textContent = 'SUBMIT';
            container.appendChild(btn);

            const fill = document.createElement('span');
            fill.style.cssText = 'position:absolute;width:100%;height:100%;background:#6750A4;left:0;top:100%;transition:top 0.3s ease;';
            btn.insertBefore(fill, btn.firstChild);

            btn.addEventListener('mouseenter', () => {
                fill.style.top = '0';
                btn.style.color = '#fff';
            });

            btn.addEventListener('mouseleave', () => {
                fill.style.top = '100%';
                btn.style.color = '#6750A4';
            });
        },

        // 6. Checkbox Slide
        'checkbox-slide': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const label = document.createElement('label');
            label.style.cssText = 'position:relative;display:inline-block;width:44px;height:24px;cursor:pointer;';

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.style.cssText = 'opacity:0;width:0;height:0;';
            label.appendChild(input);

            const slider = document.createElement('span');
            slider.style.cssText = 'position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#49454F;transition:0.3s;border-radius:24px;';
            label.appendChild(slider);

            const circle = document.createElement('span');
            circle.style.cssText = 'position:absolute;content:"";height:18px;width:18px;left:3px;bottom:3px;background:#fff;transition:0.3s;border-radius:50%;';
            slider.appendChild(circle);

            container.appendChild(label);

            input.addEventListener('change', () => {
                if (input.checked) {
                    slider.style.background = '#6750A4';
                    circle.style.transform = 'translateX(20px)';
                } else {
                    slider.style.background = '#49454F';
                    circle.style.transform = 'translateX(0)';
                }
            });
        },

        // 7. Toggle Slide
        'toggle-slide': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'display:flex;align-items:center;gap:8px;';

            const offLabel = document.createElement('span');
            offLabel.textContent = 'OFF';
            offLabel.style.cssText = 'font-size:10px;color:#9ca3af;transition:color 0.3s;';
            wrapper.appendChild(offLabel);

            const toggle = document.createElement('div');
            toggle.style.cssText = 'position:relative;width:48px;height:24px;background:#49454F;border-radius:12px;cursor:pointer;transition:background 0.3s ease;';
            wrapper.appendChild(toggle);

            const knob = document.createElement('div');
            knob.style.cssText = 'position:absolute;width:20px;height:20px;background:#fff;border-radius:50%;top:2px;left:2px;transition:transform 0.3s ease;box-shadow:0 2px 4px rgba(0,0,0,0.2);';
            toggle.appendChild(knob);

            const onLabel = document.createElement('span');
            onLabel.textContent = 'ON';
            onLabel.style.cssText = 'font-size:10px;color:#9ca3af;transition:color 0.3s;';
            wrapper.appendChild(onLabel);

            container.appendChild(wrapper);

            let isOn = false;
            toggle.addEventListener('click', () => {
                isOn = !isOn;
                if (isOn) {
                    toggle.style.background = '#6750A4';
                    knob.style.transform = 'translateX(24px)';
                    onLabel.style.color = '#6750A4';
                    offLabel.style.color = '#9ca3af';
                } else {
                    toggle.style.background = '#49454F';
                    knob.style.transform = 'translateX(0)';
                    onLabel.style.color = '#9ca3af';
                    offLabel.style.color = '#9ca3af';
                }
            });
        },

        // 8. Radio Pulse
        'radio-pulse': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;gap:12px;';
            const options = ['A', 'B', 'C'];

            options.forEach((opt, i) => {
                const label = document.createElement('label');
                label.style.cssText = 'position:relative;display:flex;align-items:center;gap:6px;cursor:pointer;';

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'radio-group';
                input.style.cssText = 'appearance:none;width:16px;height:16px;border:2px solid #49454F;border-radius:50%;outline:none;cursor:pointer;transition:all 0.3s ease;';
                label.appendChild(input);

                const span = document.createElement('span');
                span.textContent = opt;
                span.style.cssText = 'font-size:12px;color:#9ca3af;transition:color 0.3s;';
                label.appendChild(span);

                container.appendChild(label);

                input.addEventListener('change', () => {
                    document.querySelectorAll('input[type="radio"]').forEach(r => {
                        r.style.borderColor = '#49454F';
                        r.style.background = 'transparent';
                        r.style.boxShadow = 'none';
                    });
                    input.style.borderColor = '#6750A4';
                    input.style.background = 'radial-gradient(circle,#6750A4 40%,transparent 40%)';
                    input.style.boxShadow = '0 0 0 3px rgba(103,80,164,0.2)';
                    span.style.color = '#6750A4';
                });
            });
        },

        // 9. Select Arrow
        'select-arrow': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:100px;';

            const select = document.createElement('select');
            select.style.cssText = 'width:100%;padding:10px 30px 10px 10px;background:transparent;border:2px solid #49454F;border-radius:8px;color:#fff;font-size:12px;appearance:none;cursor:pointer;outline:none;transition:border-color 0.3s ease;';
            ['Option 1', 'Option 2', 'Option 3'].forEach(opt => {
                const option = document.createElement('option');
                option.textContent = opt;
                option.style.background = '#1a1a2e';
                select.appendChild(option);
            });
            wrapper.appendChild(select);

            const arrow = document.createElement('span');
            arrow.innerHTML = '▼';
            arrow.style.cssText = 'position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:8px;color:#9ca3af;pointer-events:none;transition:all 0.3s ease;';
            wrapper.appendChild(arrow);

            container.appendChild(wrapper);

            select.addEventListener('focus', () => {
                select.style.borderColor = '#6750A4';
                arrow.style.color = '#6750A4';
                arrow.style.transform = 'translateY(-50%) rotate(180deg)';
            });

            select.addEventListener('blur', () => {
                select.style.borderColor = '#49454F';
                arrow.style.color = '#9ca3af';
                arrow.style.transform = 'translateY(-50%) rotate(0deg)';
            });
        },

        // 10. File Drop
        'file-drop': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;padding:20px;';
            const dropZone = document.createElement('div');
            dropZone.style.cssText = 'width:120px;height:80px;border:2px dashed #49454F;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;transition:all 0.3s ease;cursor:pointer;';
            dropZone.innerHTML = '<span style="font-size:18px;">📁</span><span style="font-size:10px;color:#9ca3af;">Drop files</span>';
            container.appendChild(dropZone);

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.style.borderColor = '#6750A4';
                dropZone.style.background = 'rgba(103,80,164,0.1)';
            });

            dropZone.addEventListener('dragleave', () => {
                dropZone.style.borderColor = '#49454F';
                dropZone.style.background = 'transparent';
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.style.borderColor = '#10b981';
                dropZone.style.background = 'rgba(16,185,129,0.1)';
                dropZone.innerHTML = '<span style="font-size:18px;">✓</span><span style="font-size:10px;color:#10b981;">Dropped!</span>';
                setTimeout(() => {
                    dropZone.style.borderColor = '#49454F';
                    dropZone.style.background = 'transparent';
                    dropZone.innerHTML = '<span style="font-size:18px;">📁</span><span style="font-size:10px;color:#9ca3af;">Drop files</span>';
                }, 1500);
            });

            dropZone.addEventListener('click', () => {
                dropZone.style.borderColor = '#6750A4';
                setTimeout(() => dropZone.style.borderColor = '#49454F', 300);
            });
        },

        // ========== GLITCH EFFECTS ==========

        // 1. Text Glitch
        'text-glitch': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const text = document.createElement('div');
            text.style.cssText = 'position:relative;font-size:18px;font-weight:700;color:#fff;letter-spacing:2px;';
            text.textContent = 'GLITCH';
            container.appendChild(text);

            let glitchInterval;
            const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

            container.addEventListener('mouseenter', () => {
                glitchInterval = setInterval(() => {
                    const original = 'GLITCH';
                    let result = '';
                    for (let i = 0; i < original.length; i++) {
                        if (Math.random() > 0.7) {
                            result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                        } else {
                            result += original[i];
                        }
                    }
                    text.textContent = result;
                    text.style.textShadow = `${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px #f0f, ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px #0ff`;
                }, 100);
            });

            container.addEventListener('mouseleave', () => {
                clearInterval(glitchInterval);
                text.textContent = 'GLITCH';
                text.style.textShadow = 'none';
            });
        },

        // 2. Image Glitch
        'image-glitch': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:60px;height:60px;';

            const box = document.createElement('div');
            box.style.cssText = 'width:100%;height:100%;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;';
            box.textContent = '🖼️';
            wrapper.appendChild(box);
            container.appendChild(wrapper);

            const layers = [];
            for (let i = 0; i < 3; i++) {
                const layer = document.createElement('div');
                layer.style.cssText = `position:absolute;width:100%;height:100%;background:linear-gradient(135deg,#${i === 0 ? 'f0f' : i === 1 ? '0ff' : 'ff0'},#${i === 0 ? 'f0f' : i === 1 ? '0ff' : 'ff0'});border-radius:8px;opacity:0;mix-blend-mode:screen;`;
                wrapper.appendChild(layer);
                layers.push(layer);
            }

            container.addEventListener('mouseenter', () => {
                const glitch = setInterval(() => {
                    layers.forEach((layer, i) => {
                        if (Math.random() > 0.6) {
                            layer.style.opacity = '0.7';
                            layer.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 6 - 3}px)`;
                            layer.style.clipPath = `polygon(${Math.random() * 30}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%)`;
                        } else {
                            layer.style.opacity = '0';
                            layer.style.transform = 'none';
                            layer.style.clipPath = 'none';
                        }
                    });
                }, 80);
                wrapper.dataset.glitch = glitch;
            });

            container.addEventListener('mouseleave', () => {
                clearInterval(wrapper.dataset.glitch);
                layers.forEach(layer => {
                    layer.style.opacity = '0';
                    layer.style.transform = 'none';
                    layer.style.clipPath = 'none';
                });
            });
        },

        // 3. RGB Split
        'rgb-split': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:70px;height:40px;';

            const text = document.createElement('div');
            text.style.cssText = 'position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff;letter-spacing:2px;';
            text.textContent = 'RGB';
            wrapper.appendChild(text);
            container.appendChild(wrapper);

            ['red', 'cyan', 'blue'].forEach((color, i) => {
                const clone = document.createElement('div');
                clone.textContent = 'RGB';
                clone.style.cssText = `position:absolute;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;letter-spacing:2px;mix-blend-mode:screen;opacity:0;transition:opacity 0.1s ease;color:${color === 'red' ? '#ff0000' : color === 'cyan' ? '#00ffff' : '#0000ff'};`;
                wrapper.appendChild(clone);
                container.addEventListener('mouseenter', () => {
                    clone.style.opacity = '0.8';
                    const offset = (i + 1) * 3;
                    clone.style.transform = `translate(${offset}px, 0)`;
                });
                container.addEventListener('mouseleave', () => {
                    clone.style.opacity = '0';
                    clone.style.transform = 'translate(0, 0)';
                });
            });
        },

        // 4. Scan Lines
        'scan-lines': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;position:relative;overflow:hidden;';

            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:absolute;width:100%;height:100%;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.3) 2px,rgba(0,0,0,0.3) 4px);pointer-events:none;opacity:0;transition:opacity 0.3s ease;';
            container.appendChild(overlay);

            const text = document.createElement('div');
            text.style.cssText = 'position:relative;font-size:18px;font-weight:700;color:#fff;letter-spacing:2px;';
            text.textContent = 'SCAN';
            container.appendChild(text);

            container.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
                text.style.textShadow = '0 0 10px rgba(255,255,255,0.5)';
            });

            container.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
                text.style.textShadow = 'none';
            });
        },

        // 5. Digital Noise
        'digital-noise': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;position:relative;overflow:hidden;';

            const canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0;transition:opacity 0.2s ease;pointer-events:none;';
            canvas.width = 200;
            canvas.height = 150;
            container.appendChild(canvas);

            const text = document.createElement('div');
            text.style.cssText = 'position:relative;font-size:16px;font-weight:700;color:#fff;letter-spacing:2px;';
            text.textContent = 'NOISE';
            container.appendChild(text);

            const ctx = canvas.getContext('2d');
            let animationId;

            container.addEventListener('mouseenter', () => {
                canvas.style.opacity = '0.3';
                const animate = () => {
                    for (let i = 0; i < 1000; i++) {
                        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
                        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
                    }
                    animationId = requestAnimationFrame(animate);
                };
                animate();
            });

            container.addEventListener('mouseleave', () => {
                canvas.style.opacity = '0';
                cancelAnimationFrame(animationId);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            });
        },

        // 6. Chromatic Aberration
        'chromatic-aberration': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;';
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:relative;width:70px;height:40px;';

            const text = document.createElement('div');
            text.style.cssText = 'position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;letter-spacing:1px;';
            text.textContent = 'ABERR';
            wrapper.appendChild(text);
            container.appendChild(wrapper);

            const channels = [
                { color: '#ff0000', offsetX: -4, offsetY: 0 },
                { color: '#00ff00', offsetX: 0, offsetY: 0 },
                { color: '#0000ff', offsetX: 4, offsetY: 0 }
            ];

            channels.forEach((chan, i) => {
                const clone = document.createElement('div');
                clone.textContent = 'ABERR';
                clone.style.cssText = `position:absolute;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;letter-spacing:1px;opacity:0;transition:all 0.1s ease;color:${chan.color};mix-blend-mode:screen;`;
                wrapper.appendChild(clone);

                container.addEventListener('mouseenter', () => {
                    clone.style.opacity = '0.7';
                    clone.style.transform = `translate(${chan.offsetX}px, ${chan.offsetY}px)`;
                });

                container.addEventListener('mouseleave', () => {
                    clone.style.opacity = '0';
                    clone.style.transform = 'translate(0, 0)';
                });
            });
        },

        // 7. VHS Effect
        'vhs-effect': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;position:relative;overflow:hidden;';

            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:absolute;width:100%;height:100%;background:linear-gradient(transparent 50%,rgba(255,255,255,0.05) 50%);background-size:100% 4px;pointer-events:none;opacity:0;transition:opacity 0.3s ease;';
            container.appendChild(overlay);

            const text = document.createElement('div');
            text.style.cssText = 'position:relative;font-size:18px;font-weight:700;color:#fff;letter-spacing:3px;font-family:monospace;';
            text.textContent = 'VHS';
            container.appendChild(text);

            const tracking = document.createElement('div');
            tracking.style.cssText = 'position:absolute;left:0;width:3px;height:100%;background:rgba(255,255,255,0.3);opacity:0;transition:opacity 0.3s ease;';
            container.appendChild(tracking);

            let trackingPos = 0;
            container.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
                tracking.style.opacity = '1';
                const animate = () => {
                    trackingPos = (trackingPos + 2) % 100;
                    tracking.style.left = trackingPos + '%';
                    if (container.matches(':hover')) {
                        requestAnimationFrame(animate);
                    }
                };
                animate();
                text.style.animation = 'vhs-wobble 0.1s infinite';
            });

            container.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
                tracking.style.opacity = '0';
                text.style.animation = 'none';
            });

            const style = document.createElement('style');
            style.textContent = `@keyframes vhs-wobble { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-1px)} 75%{transform:translateX(1px)} }`;
            document.head.appendChild(style);
        },

        // 8. Cyber Glitch
        'cyber-glitch': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#000;position:relative;overflow:hidden;';

            const grid = document.createElement('div');
            grid.style.cssText = 'position:absolute;width:100%;height:100%;background-image:linear-gradient(rgba(0,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,0.1) 1px,transparent 1px);background-size:20px 20px;opacity:0.5;';
            container.appendChild(grid);

            const text = document.createElement('div');
            text.style.cssText = 'position:relative;font-size:20px;font-weight:700;color:#0ff;letter-spacing:4px;text-shadow:0 0 10px #0ff,0 0 20px #0ff;font-family:monospace;';
            text.textContent = 'CYBER';
            container.appendChild(text);

            container.addEventListener('mouseenter', () => {
                const glitch = () => {
                    if (!container.matches(':hover')) return;
                    text.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)`;
                    text.style.color = Math.random() > 0.5 ? '#0ff' : '#f0f';
                    text.style.textShadow = `${Math.random() * 6 - 3}px ${Math.random() * 6 - 3}px ${Math.random() > 0.5 ? '#0ff' : '#f0f'}, ${Math.random() * 6 - 3}px ${Math.random() * 6 - 3}px #fff`;
                    setTimeout(glitch, 100);
                };
                glitch();
            });

            container.addEventListener('mouseleave', () => {
                text.style.transform = 'none';
                text.style.color = '#0ff';
                text.style.textShadow = '0 0 10px #0ff,0 0 20px #0ff';
            });
        },

        // ========== PARTICLE EFFECTS ==========

        // 1. Snow Particles
        'snow-particles': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a3e;position:relative;overflow:hidden;';
            const text = document.createElement('div');
            text.style.cssText = 'position:relative;font-size:14px;font-weight:700;color:#fff;';
            text.textContent = '❄️ SNOW';
            container.appendChild(text);

            const particles = [];
            for (let i = 0; i < 30; i++) {
                const snow = document.createElement('div');
                const size = 2 + Math.random() * 4;
                snow.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:#fff;border-radius:50%;opacity:${0.3 + Math.random() * 0.5};left:${Math.random() * 100}%;top:-10px;`;
                container.appendChild(snow);
                particles.push({ el: snow, y: -10, speed: 0.5 + Math.random() * 1.5, wobble: Math.random() * Math.PI * 2 });
            }

            let animationId;
            const animate = () => {
                particles.forEach(p => {
                    p.y += p.speed;
                    p.wobble += 0.02;
                    const wobbleX = Math.sin(p.wobble) * 20;
                    p.el.style.transform = `translate(${wobbleX}px, ${p.y}px)`;
                    if (p.y > 180) {
                        p.y = -10;
                        p.el.style.left = Math.random() * 100 + '%';
                    }
                });
                if (container.isConnected) {
                    animationId = requestAnimationFrame(animate);
                }
            };
            animate();

            container.addEventListener('disconnect', () => cancelAnimationFrame(animationId));
        },

        // 2. Fire Particles
        'fire-particles': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a1a;position:relative;overflow:hidden;';
            const fireArea = document.createElement('div');
            fireArea.style.cssText = 'position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:60px;height:80px;';
            container.appendChild(fireArea);

            const particles = [];
            const colors = ['#ff4500', '#ff6347', '#ffa500', '#ffcc00'];

            for (let i = 0; i < 25; i++) {
                const particle = document.createElement('div');
                const size = 4 + Math.random() * 8;
                particle.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:50%;bottom:0;left:${20 + Math.random() * 20}px;opacity:0;`;
                fireArea.appendChild(particle);
                particles.push({ el: particle, y: 0, speed: 1 + Math.random() * 2, opacity: 0.8 + Math.random() * 0.2 });
            }

            let animationId;
            const animate = () => {
                particles.forEach(p => {
                    p.y -= p.speed;
                    p.el.style.transform = `translateY(${p.y}px)`;
                    p.el.style.opacity = Math.max(0, 1 - Math.abs(p.y) / 80);
                    if (p.y < -80) {
                        p.y = 0;
                    }
                });
                if (container.isConnected) {
                    animationId = requestAnimationFrame(animate);
                }
            };
            animate();
        },

        // 3. Spark Particles
        'spark-particles': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a1a;position:relative;overflow:hidden;';
            const center = document.createElement('div');
            center.style.cssText = 'position:relative;width:30px;height:30px;background:#ffcc00;border-radius:50%;box-shadow:0 0 30px #ffcc00;cursor:pointer;';
            container.appendChild(center);

            let animationId;
            center.addEventListener('mouseenter', () => {
                const createSpark = () => {
                    if (!center.matches(':hover')) return;
                    const spark = document.createElement('div');
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 30 + Math.random() * 50;
                    const size = 2 + Math.random() * 3;
                    spark.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:#ffcc00;border-radius:50%;left:50%;top:50%;transform:translate(-50%,-50%);`;
                    center.appendChild(spark);

                    let progress = 0;
                    const animate = () => {
                        progress += 0.02;
                        const x = Math.cos(angle) * distance * progress;
                        const y = Math.sin(angle) * distance * progress;
                        spark.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
                        spark.style.opacity = 1 - progress;
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            spark.remove();
                        }
                    };
                    animate();
                    setTimeout(createSpark, 30);
                };
                createSpark();
            });
        },

        // 4. Bubble Particles
        'bubble-particles': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#0a2a3a;position:relative;overflow:hidden;';
            const text = document.createElement('div');
            text.style.cssText = 'position:relative;font-size:14px;font-weight:700;color:#fff;';
            text.textContent = '🫧 BUBBLES';
            container.appendChild(text);

            const particles = [];
            for (let i = 0; i < 20; i++) {
                const bubble = document.createElement('div');
                const size = 5 + Math.random() * 15;
                bubble.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,0.8),rgba(100,200,255,0.3));border-radius:50%;border:1px solid rgba(255,255,255,0.3);left:${Math.random() * 100}%;bottom:-20px;`;
                container.appendChild(bubble);
                particles.push({ el: bubble, y: -20, speed: 0.3 + Math.random() * 0.8, wobble: Math.random() * Math.PI * 2 });
            }

            let animationId;
            const animate = () => {
                particles.forEach(p => {
                    p.y += p.speed;
                    p.wobble += 0.015;
                    const wobbleX = Math.sin(p.wobble) * 10;
                    p.el.style.transform = `translate(${wobbleX}px, ${-p.y}px)`;
                    if (p.y > 200) {
                        p.y = -20;
                        p.el.style.left = Math.random() * 100 + '%';
                    }
                });
                if (container.isConnected) {
                    animationId = requestAnimationFrame(animate);
                }
            };
            animate();
        },

        // 5. Star Particles
        'star-particles': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#0a0a2e;position:relative;overflow:hidden;';
            const text = document.createElement('div');
            text.style.cssText = 'position:relative;font-size:14px;font-weight:700;color:#fff;';
            text.textContent = '⭐ STARS';
            container.appendChild(text);

            const particles = [];
            for (let i = 0; i < 40; i++) {
                const star = document.createElement('div');
                const size = 1 + Math.random() * 2;
                star.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:#fff;border-radius:50%;left:${Math.random() * 100}%;top:${Math.random() * 100}%;opacity:${0.2 + Math.random() * 0.6};`;
                container.appendChild(star);
                particles.push({ el: star, twinkle: Math.random() * Math.PI * 2, speed: 0.02 + Math.random() * 0.03 });
            }

            let animationId;
            const animate = () => {
                particles.forEach(p => {
                    p.twinkle += p.speed;
                    p.el.style.opacity = 0.2 + Math.sin(p.twinkle) * 0.4;
                });
                if (container.isConnected) {
                    animationId = requestAnimationFrame(animate);
                }
            };
            animate();
        },

        // 6. Dust Particles
        'dust-particles': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#2a2520;position:relative;overflow:hidden;';
            const text = document.createElement('div');
            text.style.cssText = 'position:relative;font-size:14px;font-weight:700;color:#fff;';
            text.textContent = '✨ DUST';
            container.appendChild(text);

            const particles = [];
            for (let i = 0; i < 25; i++) {
                const dust = document.createElement('div');
                const size = 2 + Math.random() * 4;
                dust.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:rgba(255,220,150,0.6);border-radius:50%;left:${Math.random() * 100}%;top:${Math.random() * 100}%;`;
                container.appendChild(dust);
                particles.push({ el: dust, x: parseFloat(dust.style.left), y: parseFloat(dust.style.top), floatX: (Math.random() - 0.5) * 0.3, floatY: (Math.random() - 0.5) * 0.3 });
            }

            let animationId;
            const animate = () => {
                particles.forEach(p => {
                    p.x += p.floatX;
                    p.y += p.floatY;
                    p.el.style.left = p.x + '%';
                    p.el.style.top = p.y + '%';
                    if (p.x < 0 || p.x > 100) p.floatX *= -1;
                    if (p.y < 0 || p.y > 100) p.floatY *= -1;
                });
                if (container.isConnected) {
                    animationId = requestAnimationFrame(animate);
                }
            };
            animate();
        },

        // 7. Rain Particles
        'rain-particles': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;position:relative;overflow:hidden;';
            const text = document.createElement('div');
            text.style.cssText = 'position:relative;font-size:14px;font-weight:700;color:#fff;';
            text.textContent = '🌧️ RAIN';
            container.appendChild(text);

            const particles = [];
            for (let i = 0; i < 30; i++) {
                const drop = document.createElement('div');
                const height = 10 + Math.random() * 15;
                drop.style.cssText = `position:absolute;width:1px;height:${height}px;background:linear-gradient(transparent,rgba(100,150,255,0.6));left:${Math.random() * 100}%;top:-20px;`;
                container.appendChild(drop);
                particles.push({ el: drop, y: -20 - Math.random() * 180, speed: 3 + Math.random() * 4 });
            }

            let animationId;
            const animate = () => {
                particles.forEach(p => {
                    p.y += p.speed;
                    p.el.style.transform = `translateY(${p.y}px)`;
                    if (p.y > 180) {
                        p.y = -20;
                        p.el.style.left = Math.random() * 100 + '%';
                    }
                });
                if (container.isConnected) {
                    animationId = requestAnimationFrame(animate);
                }
            };
            animate();
        },

        // 8. Confetti Particles
        'confetti-particles': function(container) {
            container.style.cssText = 'display:flex;align-items:center;justify-content:center;background:#1a1a2e;position:relative;overflow:hidden;';
            const btn = document.createElement('div');
            btn.style.cssText = 'position:relative;width:70px;height:40px;background:linear-gradient(135deg,#6750A4,#9381FF);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;cursor:pointer;';
            btn.textContent = 'CLICK!';
            container.appendChild(btn);

            const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];

            btn.addEventListener('click', () => {
                for (let i = 0; i < 50; i++) {
                    const confetti = document.createElement('div');
                    const size = 5 + Math.random() * 8;
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    const isRect = Math.random() > 0.5;
                    confetti.style.cssText = `position:absolute;width:${size}px;height:${isRect ? size : size * 1.5}px;background:${color};left:50%;top:50%;${isRect ? '' : 'border-radius:50%'};`;
                    container.appendChild(confetti);

                    const angle = Math.random() * Math.PI * 2;
                    const velocity = 2 + Math.random() * 6;
                    const vx = Math.cos(angle) * velocity;
                    const vy = Math.sin(angle) * velocity - 2;
                    const rotation = Math.random() * 360;

                    let x = 0, y = 0, rot = rotation, opacity = 1;
                    const animate = () => {
                        x += vx;
                        y += vy + 0.2;
                        rot += 5;
                        opacity -= 0.015;
                        confetti.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rot}deg)`;
                        confetti.style.opacity = opacity;
                        if (opacity > 0) {
                            requestAnimationFrame(animate);
                        } else {
                            confetti.remove();
                        }
                    };
                    requestAnimationFrame(animate);
                }
            });
        }
    };

    // Mouse Effects Data
    const MOUSE_EFFECTS = [
        {
            id: 'custom-cursor',
            name: 'Custom Cursor',
            nameZh: '自定义光标',
            description: 'Replace default cursor with a custom purple dot',
            previewId: 'custom-cursor',
            prompt: 'Create a custom cursor effect that replaces the default mouse pointer with a custom-styled element. Hide the default cursor using cursor: none and make the custom cursor follow the mouse movement with smooth transitions.',
            code: `// Custom Cursor Effect
const container = document.querySelector('.container');
container.style.cursor = 'none';

const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = \`
    position: fixed;
    width: 20px;
    height: 20px;
    background: #6750A4;
    border-radius: 50%;
    pointer-events: none;
    transition: transform 0.1s ease;
    z-index: 9999;
\`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Optional: Add hover effect
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});`
        },
        {
            id: 'cursor-follower',
            name: 'Cursor Follower',
            nameZh: '光标跟随器',
            description: 'Lagging dots trail behind cursor with spring delay',
            previewId: 'cursor-follower',
            prompt: 'Create a cursor follower effect with multiple dots that trail behind the mouse cursor. Each dot should follow the previous one with a delay/spring effect, creating a smooth trailing animation.',
            code: `// Cursor Follower Effect
const dots = [];
const dotCount = 8;

for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'follower-dot';
    dot.style.cssText = \`
        position: fixed;
        width: \${16 - i * 1.5}px;
        height: \${16 - i * 1.5}px;
        background: #6750A4;
        border-radius: 50%;
        opacity: \${1 - i * 0.1};
        pointer-events: none;
        z-index: 9998;
    \`;
    document.body.appendChild(dot);
    dots.push({ element: dot, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    let x = mouseX, y = mouseY;

    dots.forEach((dot, index) => {
        const easing = 0.15 - index * 0.015;
        dot.x += (x - dot.x) * easing;
        dot.y += (y - dot.y) * easing;
        dot.element.style.left = dot.x + 'px';
        dot.element.style.top = dot.y + 'px';
        x = dot.x;
        y = dot.y;
    });

    requestAnimationFrame(animate);
}
animate();`
        },
        {
            id: 'magnetic-button',
            name: 'Magnetic Button',
            nameZh: '磁性按钮',
            description: 'Button is attracted to cursor on hover',
            previewId: 'magnetic-button',
            prompt: 'Create a magnetic button effect where the button moves towards the cursor when hovering. Calculate the distance from cursor to button center and translate the button based on that distance.',
            code: `// Magnetic Button Effect
const button = document.querySelector('.magnetic-button');

button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Move button towards cursor
    button.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
});

button.addEventListener('mouseleave', () => {
    // Reset position
    button.style.transform = 'translate(0, 0)';
});`
        },
        {
            id: 'cursor-spotlight',
            name: 'Cursor Spotlight',
            nameZh: '光标聚光灯',
            description: 'Dark overlay with reveal hole following cursor',
            previewId: 'cursor-spotlight',
            prompt: 'Create a spotlight effect where the cursor reveals content through a dark overlay. Use mix-blend-mode or a radial-gradient mask to create the hole effect.',
            code: `// Cursor Spotlight Effect
const container = document.querySelector('.spotlight-container');

// Create dark overlay
const overlay = document.createElement('div');
overlay.className = 'spotlight-overlay';
overlay.style.cssText = \`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    pointer-events: none;
    z-index: 1;
\`;
document.body.appendChild(overlay);

// Create spotlight mask
const spotlight = document.createElement('div');
spotlight.className = 'spotlight';
spotlight.style.cssText = \`
    position: fixed;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle, transparent 30%, rgba(0,0,0,0.9) 70%);
    pointer-events: none;
    mix-blend-mode: multiply;
    z-index: 2;
    transform: translate(-50%, -50%);
\`;
document.body.appendChild(spotlight);

document.addEventListener('mousemove', (e) => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
});`
        },
        {
            id: 'hover-tilt',
            name: 'Hover Tilt Card',
            nameZh: '悬停倾斜卡片',
            description: 'Card tilts based on mouse position using CSS 3D transform',
            previewId: 'hover-tilt',
            prompt: 'Create a 3D tilt effect on card hover. Calculate mouse position relative to card center and apply rotateX and rotateY transforms based on cursor position.',
            code: `// Hover Tilt Card Effect
const card = document.querySelector('.tilt-card');
card.style.perspective = '500px';

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = \`perspective(500px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
});

card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
});`
        },
        {
            id: 'click-ripple',
            name: 'Click Ripple',
            nameZh: '点击涟漪',
            description: 'Material Design ripple effect on click',
            previewId: 'click-ripple',
            prompt: 'Create a Material Design ripple effect that expands from the click position. Use CSS animation to scale up a circle from the click coordinates.',
            code: `// Click Ripple Effect (Material Design)
const button = document.querySelector('.ripple-button');

button.addEventListener('click', function(e) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const circle = document.createElement('span');
    circle.style.cssText = \`
        position: absolute;
        left: \${x}px;
        top: \${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out forwards;
    \`;

    button.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
});

// Add CSS keyframes
const style = document.createElement('style');
style.textContent = \`
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
\`;
document.head.appendChild(style);`
        },
        {
            id: 'cursor-trail',
            name: 'Cursor Trail',
            nameZh: '光标轨迹',
            description: 'Fading dots trail behind cursor movement',
            previewId: 'cursor-trail',
            prompt: 'Create a cursor trail effect where dots appear and fade out as the cursor moves. Create new dots on mousemove and animate their opacity/scale down before removing.',
            code: `// Cursor Trail Effect
const trail = [];
const maxTrail = 15;

document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.cssText = \`
        position: fixed;
        left: \${e.clientX - 4}px;
        top: \${e.clientY - 4}px;
        width: 8px;
        height: 8px;
        background: #9381FF;
        border-radius: 50%;
        pointer-events: none;
        opacity: 1;
        transition: all 0.5s ease;
        z-index: 9997;
    \`;
    document.body.appendChild(dot);
    trail.push(dot);

    // Limit trail length
    if (trail.length > maxTrail) {
        const old = trail.shift();
        old.remove();
    }

    // Fade out and remove
    setTimeout(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
    }, 50);

    setTimeout(() => dot.remove(), 600);
});`
        },
        {
            id: 'cursor-blend',
            name: 'Cursor Blend Mode',
            nameZh: '混合模式光标',
            description: 'Cursor with mix-blend-mode difference on colorful gradient',
            previewId: 'cursor-blend',
            prompt: 'Create a cursor effect using mix-blend-mode: difference on a colorful gradient background. The cursor should invert the colors underneath it.',
            code: `// Cursor Blend Mode Effect
const cursor = document.createElement('div');
cursor.className = 'blend-cursor';
cursor.style.cssText = \`
    position: fixed;
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    pointer-events: none;
    mix-blend-mode: difference;
    transform: translate(-50%, -50%);
    z-index: 9999;
    transition: transform 0.1s ease;
\`;
document.body.appendChild(cursor);

// Colorful gradient background
document.body.style.background = 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1)';
document.body.style.backgroundSize = '400% 400%';

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Hover effect
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});`
        },
        {
            id: 'glow-follow',
            name: 'Glow Follow',
            nameZh: '光晕跟随',
            description: 'Radial gradient glow orb follows cursor',
            previewId: 'glow-follow',
            prompt: 'Create a glow effect that follows the cursor. Use a radial-gradient that creates a soft glowing orb effect behind the cursor.',
            code: `// Glow Follow Effect
const glow = document.createElement('div');
glow.className = 'cursor-glow';
glow.style.cssText = \`
    position: fixed;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(103, 80, 164, 0.4), transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 0;
    transition: all 0.15s ease;
\`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// Optional: Add glow boost on hover
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        glow.style.width = '200px';
        glow.style.height = '200px';
    });
    el.addEventListener('mouseleave', () => {
        glow.style.width = '150px';
        glow.style.height = '150px';
    });
});`
        },
        {
            id: 'ring-cursor',
            name: 'Ring Cursor',
            nameZh: '环形光标',
            description: 'Hollow ring with inner dot follows cursor',
            previewId: 'ring-cursor',
            prompt: 'Create a custom cursor with a hollow ring and an inner dot. The ring should scale up when hovering over interactive elements.',
            code: `// Ring Cursor Effect
const ring = document.createElement('div');
ring.className = 'cursor-ring';
ring.style.cssText = \`
    position: fixed;
    width: 40px;
    height: 40px;
    border: 2px solid #6750A4;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: transform 0.2s ease, border-color 0.2s;
    z-index: 9999;
\`;
document.body.appendChild(ring);

const dot = document.createElement('div');
dot.className = 'cursor-dot';
dot.style.cssText = \`
    position: fixed;
    width: 6px;
    height: 6px;
    background: #6750A4;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
\`;
document.body.appendChild(dot);

document.addEventListener('mousemove', (e) => {
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
});

// Hover effects
document.querySelectorAll('a, button, .interactive').forEach(el => {
    el.addEventListener('mouseenter', () => {
        ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
        ring.style.borderColor = '#9381FF';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.borderColor = '#6750A4';
    });
});`
        },
        {
            id: 'parallax-mouse',
            name: 'Parallax Mouse',
            nameZh: '鼠标视差',
            description: 'Multiple emoji layers move at different speeds',
            previewId: 'parallax-mouse',
            prompt: 'Create a parallax effect with multiple layers that move at different speeds based on mouse position. Use depth factors to create the 3D effect.',
            code: `// Parallax Mouse Effect
const container = document.querySelector('.parallax-container');
const layers = [
    { element: document.querySelector('.layer-1'), depth: 0.02 },
    { element: document.querySelector('.layer-2'), depth: 0.05 },
    { element: document.querySelector('.layer-3'), depth: 0.08 }
];

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2);

    layers.forEach(layer => {
        const moveX = x * layer.depth;
        const moveY = y * layer.depth;
        layer.element.style.transform = \`translate(\${moveX}px, \${moveY}px)\`;
    });
});`
        },
        {
            id: 'text-reveal',
            name: 'Text Reveal Hover',
            nameZh: '文字悬停揭示',
            description: 'Mask slides away to reveal text on hover',
            previewId: 'text-reveal',
            prompt: 'Create a text reveal effect where a masked overlay slides away on hover using CSS transforms. Use scaleX with transform-origin for the wipe effect.',
            code: `// Text Reveal Hover Effect
const revealContainer = document.querySelector('.text-reveal');

// Structure needed:
// <div class="text-reveal">
//   <span>Revealed Text</span>
//   <div class="mask"></div>
// </div>

const mask = revealContainer.querySelector('.mask');

revealContainer.addEventListener('mouseenter', () => {
    mask.style.transform = 'scaleX(0)';
});

revealContainer.addEventListener('mouseleave', () => {
    mask.style.transform = 'scaleX(1)';
});

// CSS:
// .mask {
//     position: absolute;
//     inset: 0;
//     background: #6750A4;
//     transform-origin: left;
//     transition: transform 0.4s ease;
// }`
        }
    ];

    // ============================================
    // DESIGN STYLE EFFECTS DATA
    // ============================================
    const DESIGN_STYLE_EFFECTS = [
        {
            id: 'minimalism',
            name: 'Minimalism',
            nameZh: '极简主义',
            description: 'Clean layout with generous whitespace, thin dividers, mono fonts',
            previewId: 'minimalism',
            prompt: 'Create a minimalist UI design with generous white space, clean sans-serif typography, and a monochromatic color scheme. Focus on essential elements with subtle shadows and borders.',
            code: `/* Minimalism Design Style */
.minimal-card {
    background: #ffffff;
    padding: 48px 60px;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    max-width: 400px;
}

.minimal-card h2 {
    font-family: 'Inter', -apple-system, sans-serif;
    font-weight: 300;
    font-size: 24px;
    color: #111;
    margin: 0;
}`
        },
        {
            id: 'neumorphism',
            name: 'Neumorphism',
            nameZh: '新拟态/软UI',
            description: 'Soft inset/raised shapes with dual shadow effect',
            previewId: 'neumorphism',
            prompt: 'Design a neumorphic UI element with soft, realistic shadows that create depth. Use light and shadow to make elements appear to extrude from the surface. Background color should be similar to element color.',
            code: `/* Neumorphism Design Style */
.neumorphic-bg {
    background: #e0e5ec;
}

.neumorphic-card {
    background: #e0e5ec;
    padding: 32px;
    border-radius: 20px;
    /* Raised effect */
    box-shadow:
        9px 9px 16px rgba(163, 177, 198, 0.6),
        -9px -9px 16px rgba(255, 255, 255, 0.5);
}

.neumorphic-inset {
    /* Inset/depressed effect */
    box-shadow:
        inset 6px 6px 10px rgba(163, 177, 198, 0.6),
        inset -6px -6px 10px rgba(255, 255, 255, 0.5);
}`
        },
        {
            id: 'glassmorphism',
            name: 'Glassmorphism',
            nameZh: '玻璃拟态',
            description: 'Frosted glass card with backdrop blur effect',
            previewId: 'glassmorphism',
            prompt: 'Create a glassmorphic design with semi-transparent backgrounds, backdrop blur effects, and subtle white borders. Use a colorful gradient background to showcase the glass effect.',
            code: `/* Glassmorphism Design Style */
.glassmorphism-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 400px;
}

.glass-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 32px;
    color: white;
}`
        },
        {
            id: 'cyberpunk',
            name: 'Cyberpunk',
            nameZh: '赛博朋克',
            description: 'Neon pink/cyan on dark with scanlines and glitch',
            previewId: 'cyberpunk',
            prompt: 'Design a cyberpunk themed UI with neon pink, cyan colors against dark backgrounds. Include glitch effects, scanlines, and terminal-style typography. Think Blade Runner 2049 meets Tron.',
            code: `/* Cyberpunk Design Style */
.cyberpunk-container {
    background: #0a0a0a;
    position: relative;
}

.cyberpunk-card {
    background: #0a0a0a;
    border: 2px solid #ff00ff;
    box-shadow:
        0 0 20px #ff00ff,
        0 0 40px #00ffff inset;
    padding: 24px 32px;
    position: relative;
}

.cyberpunk-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 255, 0.03) 2px,
        rgba(0, 255, 255, 0.03) 4px
    );
    pointer-events: none;
}

.cyberpunk-text {
    font-family: 'Courier New', monospace;
    color: #00ffff;
    text-shadow: 0 0 10px #00ffff;
}`
        },
        {
            id: 'synthwave',
            name: 'Synthwave',
            nameZh: '合成波',
            description: 'Purple/pink gradient with grid horizon and retro glow',
            previewId: 'synthwave',
            prompt: 'Create a synthwave/vaporwave aesthetic with purple/pink gradients, grid floor patterns, and retro 80s glow effects. Think Miami Vice meets Tron soundtrack aesthetics.',
            code: `/* Synthwave Design Style */
.synthwave-bg {
    background: linear-gradient(
        180deg,
        #ff6b9d 0%,
        #c44cff 50%,
        #6a00ff 100%
    );
    position: relative;
    overflow: hidden;
}

.synthwave-card {
    background: linear-gradient(180deg, #ff6b9d, #c44cff, #6a00ff);
    padding: 24px 32px;
    border-radius: 8px;
    position: relative;
    box-shadow: 0 4px 20px rgba(198, 76, 255, 0.4);
}

.synthwave-grid {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 12px;
    background: repeating-linear-gradient(
        90deg,
        #ff00ff 0px,
        #ff00ff 2px,
        transparent 2px,
        transparent 8px
    );
}`
        },
        {
            id: 'brutalism',
            name: 'Brutalism',
            nameZh: '粗野主义',
            description: 'Raw borders, asymmetric layout, bold colors',
            previewId: 'brutalism',
            prompt: 'Create a brutalist web design with raw borders, asymmetric layouts, bold primary colors, and mono typography. Reject subtlety - make everything bold and intentionally raw.',
            code: `/* Brutalism Design Style */
.brutalist-card {
    background: #ffff00;
    padding: 24px 32px;
    border: 4px solid #000;
    box-shadow: 8px 8px 0 #000;
    font-family: 'Courier New', monospace;
    font-weight: 700;
    text-transform: uppercase;
}

.brutalist-btn {
    background: #fff;
    border: 3px solid #000;
    padding: 12px 24px;
    font-weight: 900;
    box-shadow: 4px 4px 0 #000;
    transition: none;
}

.brutalist-btn:active {
    box-shadow: 2px 2px 0 #000;
    transform: translate(2px, 2px);
}`
        },
        {
            id: 'y2k',
            name: 'Y2K',
            nameZh: '千禧年风格',
            description: 'Chrome text, blue gradients, pixel sparkles',
            previewId: 'y2k',
            prompt: 'Design a Y2K aesthetic with chrome text effects, blue gradients, pixel sparkles, and bubbly shapes. Think early 2000s web design meets MTV graphics.',
            code: `/* Y2K Design Style */
.y2k-bg {
    background: #e0f2ff;
}

.y2k-card {
    background: linear-gradient(180deg, #0066ff, #00ccff);
    padding: 24px 32px;
    border-radius: 20px;
    border: 3px solid #fff;
    box-shadow:
        0 4px 20px rgba(0, 102, 255, 0.3),
        inset 0 2px 0 rgba(255, 255, 255, 0.3);
}

.y2k-text {
    font-weight: 700;
    background: linear-gradient(180deg, #fff, #cce5ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}`
        },
        {
            id: 'glassmorphism-2',
            name: 'Advanced Glassmorphism',
            nameZh: '高级玻璃拟态',
            description: 'Multiple layered glass panels with depth',
            previewId: 'glassmorphism',
            prompt: 'Create advanced glassmorphism with multiple layered glass panels, varying blur levels, and subtle colorful gradients showing through.',
            code: `/* Advanced Glassmorphism */
.glass-layer-1 {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-layer-2 {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.25);
}

.glass-accent {
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.4),
        rgba(255, 255, 255, 0.1)
    );
}`
        },
        {
            id: 'liquid-design',
            name: 'Liquid Design',
            nameZh: '液态设计',
            description: 'Blob morphing shapes with organic animations',
            previewId: 'liquid-design',
            prompt: 'Create liquid design elements with morphing blob shapes using border-radius animation. Use gradient colors and smooth transitions for organic feel.',
            code: `/* Liquid Design - Morphing Blob */
@keyframes blob-morph {
    0%, 100% {
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }
    25% {
        border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    }
    50% {
        border-radius: 50% 60% 30% 70% / 30% 40% 70% 60%;
    }
    75% {
        border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%;
    }
}

.liquid-blob {
    background: linear-gradient(135deg, #667eea, #764ba2);
    animation: blob-morph 8s ease-in-out infinite;
    box-shadow: 0 20px 40px rgba(103, 80, 164, 0.3);
}`
        },
        {
            id: 'gradient-mesh-2',
            name: 'Gradient Mesh',
            nameZh: '渐变网格',
            description: 'Multi-point color mesh with organic blending',
            previewId: 'gradient-mesh',
            prompt: 'Create a gradient mesh background with multiple color points that blend organically. Use radial-gradients positioned at different locations with smooth transitions.',
            code: `/* Gradient Mesh Background */
.gradient-mesh {
    background:
        radial-gradient(at 40% 20%, #f472b6 0px, transparent 50%),
        radial-gradient(at 80% 0%, #a78bfa 0px, transparent 50%),
        radial-gradient(at 0% 50%, #34d399 0px, transparent 50%),
        radial-gradient(at 80% 50%, #fbbf24 0px, transparent 50%),
        radial-gradient(at 0% 100%, #60a5fa 0px, transparent 50%),
        radial-gradient(at 80% 100%, #f472b6 0px, transparent 50%);
    background-size: 100% 100%;
    min-height: 100vh;
}

/* Animated version */
.gradient-mesh-animated {
    animation: mesh-shift 10s ease infinite;
}

@keyframes mesh-shift {
    0%, 100% { background-position: 0% 0%, 100% 0%, 0% 100%, 100% 50%, 0% 100%, 100% 100%; }
    50% { background-position: 100% 0%, 0% 50%, 100% 100%, 0% 0%, 100% 50%, 0% 0%; }
}`
        },
        {
            id: 'bauhaus',
            name: 'Bauhaus',
            nameZh: '包豪斯',
            description: 'Primary geometric shapes with bold colors',
            previewId: 'bauhaus',
            prompt: 'Create a Bauhaus-inspired design using primary shapes (circles, squares, triangles) and primary colors (red, blue, yellow) with black borders. Focus on geometric purity and functional minimalism.',
            code: `/* Bauhaus Design Style */
.bauhaus-card {
    background: #fff;
    border: 3px solid #000;
    padding: 32px;
    display: flex;
    gap: 16px;
    align-items: center;
}

.bauhaus-circle {
    width: 48px;
    height: 48px;
    background: #e63946;
    border-radius: 50%;
    border: 2px solid #000;
}

.bauhaus-square {
    width: 48px;
    height: 48px;
    background: #457b9d;
    border: 2px solid #000;
}

.bauhaus-triangle {
    width: 0;
    height: 0;
    border-left: 28px solid transparent;
    border-right: 28px solid transparent;
    border-bottom: 48px solid #e9c46a;
    filter: drop-shadow(0 0 0 2px #000);
}`
        },
        {
            id: 'swiss-style',
            name: 'Swiss Style',
            nameZh: '瑞士国际主义',
            description: 'Grid-based, Helvetica-like typography, ruled lines',
            previewId: 'swiss-style',
            prompt: 'Create a Swiss International Style design with grid-based layouts, Helvetica-feel typography, strong horizontal rules, and asymmetric balance. Think Müller-Brockmann posters.',
            code: `/* Swiss/International Typographic Style */
.swiss-container {
    background: #fff;
    border: 2px solid #000;
    position: relative;
}

.swiss-title {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #000;
}

.swiss-accent {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #e63946;
}

.swiss-rule {
    height: 3px;
    background: #000;
    margin: 16px 0;
}`
        },
        {
            id: 'low-poly',
            name: 'Low Poly',
            nameZh: '低多边形',
            description: 'Triangulated mesh with flat shading',
            previewId: 'low-poly',
            prompt: 'Create a low poly aesthetic with triangular patterns, faceted shapes, and vibrant gradient fills. Use CSS clip-path to create geometric polygon shapes.',
            code: `/* Low Poly Design Style */
.low-poly-bg {
    background:
        conic-gradient(
            from 0deg at 50% 50%,
            #ff6b6b 0deg,
            #feca57 60deg,
            #48dbfb 120deg,
            #ff9ff3 180deg,
            #54a0ff 240deg,
            #5f27cd 300deg,
            #ff6b6b 360deg
        );
}

.low-poly-shape {
    clip-path: polygon(
        50% 0%,
        100% 38%,
        82% 100%,
        18% 100%,
        0% 38%
    );
}

.low-poly-art {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
}

.low-poly-art div {
    aspect-ratio: 1;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}`
        },
        {
            id: 'organic-3d',
            name: 'Organic 3D',
            nameZh: '有机3D',
            description: 'Blob morphing with soft shadows',
            previewId: 'organic-3d',
            prompt: 'Create organic 3D elements with morphing blob shapes, soft shadows, and gradient backgrounds. Use border-radius animation and layered shadows for depth.',
            code: `/* Organic 3D Design */
.organic-blob {
    background: linear-gradient(135deg, #a78bfa, #f472b6);
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 50%;
    padding: 32px;
    box-shadow:
        0 20px 40px rgba(167, 139, 250, 0.3),
        inset 0 -10px 20px rgba(0, 0, 0, 0.1),
        inset 0 10px 20px rgba(255, 255, 255, 0.2);
    animation: organic-morph 8s ease-in-out infinite;
}

@keyframes organic-morph {
    0%, 100% {
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 50%;
    }
    50% {
        border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    }
}`
        },
        {
            id: 'aesthetic-minimal',
            name: 'Aesthetic Minimal',
            nameZh: '美学极简',
            description: 'Generous whitespace, serif + sans pairing',
            previewId: 'aesthetic-minimal',
            prompt: 'Create aesthetic minimal design with generous whitespace, elegant serif and sans-serif font pairing, and muted color palette. Focus on typography as the main visual element.',
            code: `/* Aesthetic Minimal Design */
.aesthetic-minimal {
    background: #f5f5f0;
    padding: 48px 60px;
    font-family: 'Georgia', serif;
}

.aesthetic-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 400;
    font-size: 32px;
    color: #1a1a1a;
    letter-spacing: 0.05em;
    margin: 0;
}

.aesthetic-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #888;
    margin-top: 16px;
}`
        },
        {
            id: 'clean-design',
            name: 'Clean Design',
            nameZh: '干净设计',
            description: 'Grid-aligned, flat color blocks',
            previewId: 'clean-design',
            prompt: 'Create a clean design with grid-aligned layouts, flat color blocks, consistent spacing, and subtle shadows. Use a limited color palette with plenty of breathing room.',
            code: `/* Clean Design Style */
.clean-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 24px;
    background: #f8f9fa;
}

.clean-card {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.clean-color-block {
    width: 100%;
    height: 80px;
    border-radius: 8px;
}

/* Color palette */
.color-1 { background: #6366f1; }
.color-2 { background: #a5b4fc; }
.color-3 { background: #c7d2fe; }`
        },
        {
            id: '3d-isometric',
            name: '3D Isometric',
            nameZh: '等距3D',
            description: 'Isometric grid with flat shading',
            previewId: '3d-isometric',
            prompt: 'Create isometric 3D elements with flat shading and consistent 30-degree angles. Use layered shadows to create depth without gradients.',
            code: `/* Isometric 3D Design */
.isometric-container {
    perspective: 1000px;
}

.isometric-card {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    padding: 32px;
    border-radius: 8px;
    /* Isometric shadow stack */
    box-shadow:
        8px 8px 0 #4f46e5,
        -8px -8px 0 #a78bfa;
    transform: rotateX(60deg) rotateZ(-45deg);
    transform-origin: center;
}

.isometric-top {
    background: #a78bfa;
    box-shadow:
        8px 8px 0 #8b5cf6,
        -8px -8px 0 #c4b5fd;
}`
        },
        {
            id: 'vaporwave',
            name: 'Vaporwave',
            nameZh: '蒸汽波',
            description: 'Pink/purple tones, grid floor, retro 80s',
            previewId: 'vaporwave',
            prompt: 'Create vaporwave aesthetics with pink and purple color schemes, retro computer grid floors, classic statues, and 80s nostalgia. Think Windows 95 meets Miami Vice.',
            code: `/* Vaporwave Design Style */
.vaporwave-bg {
    background: linear-gradient(180deg, #ff7ed9, #b983ff, #72f2ff);
    position: relative;
}

.vaporwave-grid {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 24px;
    background:
        repeating-linear-gradient(
            90deg,
            #ff00aa 0px,
            #ff00aa 3px,
            transparent 3px,
            transparent 10px
        ),
        repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 10px,
            rgba(255, 0, 170, 0.3) 10px,
            rgba(255, 0, 170, 0.3) 12px
        );
}

.vaporwave-sun {
    background: linear-gradient(180deg, #ffeb3b, #ff6b35);
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}`
        },
        {
            id: 'pastel-aesthetic',
            name: 'Pastel Aesthetic',
            nameZh: '马卡龙美学',
            description: 'Candy colors, rounded UI elements',
            previewId: 'pastel-aesthetic',
            prompt: 'Create pastel aesthetic design with candy colors, rounded UI elements, soft shadows, and cute iconography. Use colors like pink, mint, lavender, and baby blue.',
            code: `/* Pastel Aesthetic Design */
.pastel-bg {
    background: #fff5f5;
}

.pastel-card {
    background: #fff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.pastel-colors {
    display: flex;
    gap: 12px;
}

.pastel-dot {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.pastel-pink { background: #ffb3ba; }
.pastel-mint { background: #baffc9; }
.pastel-blue { background: #bae1ff; }
.pastel-yellow { background: #ffffba; }
.pastel-lavender { background: #e0bbe4; }`
        },
        {
            id: 'biophilic',
            name: 'Biophilic Design',
            nameZh: '亲自然设计',
            description: 'Leaf/organic shapes, earthy palette',
            previewId: 'biophilic',
            prompt: 'Create biophilic design with organic shapes, leaf patterns, natural earthy color palette, and plant-inspired motifs. Bring nature into the digital interface.',
            code: `/* Biophilic Design Style */
.biophilic-bg {
    background: #f0fdf4;
}

.biophilic-card {
    background: #fff;
    padding: 28px 36px;
    border-radius: 20px;
    border: 1px solid #86efac;
    box-shadow: 0 10px 30px rgba(134, 239, 172, 0.2);
}

.leaf-accent {
    position: absolute;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #22c55e, #86efac);
    border-radius: 0 70% 0 70%;
}

.earth-colors {
    --forest: #166534;
    --sage: #84cc16;
    --sand: #fef3c7;
    --clay: #d6a574;
}`
        },
        {
            id: 'maximalism',
            name: 'Maximalism',
            nameZh: '极繁主义',
            description: 'Dense overlapping elements, high contrast',
            previewId: 'maximalism',
            prompt: 'Create maximalist design with dense overlapping elements, bold colors, high contrast, mixed typography, and layered visual elements. More is more - reject minimalism.',
            code: `/* Maximalism Design Style */
.maximalist-card {
    background: #ff6b6b;
    padding: 20px;
    border: 3px solid #feca57;
    position: relative;
    box-shadow:
        4px 4px 0 #48dbfb,
        8px 8px 0 #ff9ff3,
        12px 12px 0 #000;
}

.maximalist-text {
    font-size: 32px;
    font-weight: 900;
    font-family: 'Impact', sans-serif;
    color: #fff;
    -webkit-text-stroke: 2px #000;
}

.maximalist-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #00ff87;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 700;
    color: #000;
    transform: rotate(15deg);
    box-shadow: 2px 2px 0 #000;
}`
        },
        {
            id: 'hud-fui',
            name: 'HUD / FUI',
            nameZh: '全息界面设计',
            description: 'Targeting reticle, blinking data readouts',
            previewId: 'hud-fui',
            prompt: 'Create futuristic HUD (Heads-Up Display) or FUI (Fictional User Interface) design with targeting reticles, data readouts, blinking indicators, and tech-inspired borders.',
            code: `/* HUD/FUI Design Style */
.hud-container {
    background: #0a1628;
    position: relative;
}

.hud-card {
    background: rgba(0, 168, 255, 0.05);
    border: 1px solid #00a8ff;
    padding: 24px 32px;
    position: relative;
}

.hud-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1px solid #00a8ff;
}

.hud-corner.tl { top: 8px; left: 8px; border-right: none; border-bottom: none; }
.hud-corner.tr { top: 8px; right: 8px; border-left: none; border-bottom: none; }
.hud-corner.bl { bottom: 8px; left: 8px; border-right: none; border-top: none; }
.hud-corner.br { bottom: 8px; right: 8px; border-left: none; border-top: none; }

.hud-text {
    font-family: 'Courier New', monospace;
    color: #00a8ff;
    letter-spacing: 0.1em;
}

@keyframes hud-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}`
        },
        {
            id: 'typography-focus',
            name: 'Typography Focus',
            nameZh: '文字主导型',
            description: 'Giant type, variable font animation',
            previewId: 'typography-focus',
            prompt: 'Create typography-focused design with giant type as the main visual element, variable font animations, and creative text treatments. Let the text be the hero.',
            code: `/* Typography Focus Design */
.typo-hero {
    font-size: clamp(48px, 15vw, 180px);
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #667eea 30%, #764ba2 70%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

@keyframes text-wave {
    0%, 100% {
        font-weight: 100;
        font-stretch: 50%;
    }
    50% {
        font-weight: 900;
        font-stretch: 200%;
    }
}

.variable-text {
    font-variation-settings:
        'wght' 100,
        'wdth' 50;
    animation: text-wave 3s ease-in-out infinite;
}`
        },
        {
            id: 'tech-noir',
            name: 'Tech Noir',
            nameZh: '科技暗黑',
            description: 'Dark bg, cool-blue accents, circuit traces',
            previewId: 'tech-noir',
            prompt: 'Create tech noir aesthetic with dark backgrounds, cool blue accents, circuit trace patterns, and a Blade Runner-inspired mood. Think high-tech dystopian future.',
            code: `/* Tech Noir Design Style */
.tech-noir-bg {
    background: #0d1b2a;
}

.tech-noir-card {
    background: linear-gradient(135deg, #1b263b, #415a77);
    padding: 24px 32px;
    border-left: 4px solid #00d9ff;
    box-shadow: 0 20px 40px rgba(0, 219, 255, 0.15);
}

.tech-noir-accent {
    color: #00d9ff;
    text-shadow: 0 0 20px rgba(0, 219, 255, 0.5);
}

.circuit-pattern {
    background-image:
        linear-gradient(90deg, transparent 95%, rgba(0, 219, 255, 0.1) 95%),
        linear-gradient(0deg, transparent 95%, rgba(0, 219, 255, 0.1) 95%);
    background-size: 20px 20px;
}`
        },
        {
            id: 'retro-wave',
            name: 'Retro Wave',
            nameZh: '复古浪潮',
            description: '80s cassette aesthetic, bold stripes',
            previewId: 'retro-wave',
            prompt: 'Create retro wave design with 80s cassette tape aesthetics, bold diagonal stripes, sunset gradients, and nostalgic color schemes.',
            code: `/* Retro Wave Design */
.retrowave-bg {
    background: linear-gradient(180deg, #2d1b4e, #1a0533);
}

.retrowave-card {
    background: linear-gradient(180deg, #ff6b35, #f7c59f, #efefef);
    padding: 24px 32px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}

.retrowave-lines {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 12px;
    background:
        repeating-linear-gradient(
            90deg,
            #ff6b35 0px,
            #ff6b35 4px,
            #f7c59f 4px,
            #f7c59f 8px
        );
}

.sun {
    background: linear-gradient(180deg, #ffeb3b, #ff6b35);
    clip-path: circle(30% at 50% 0%);
}`
        },
        {
            id: 'abstract-geo',
            name: 'Abstract Geometric',
            nameZh: '抽象几何',
            description: 'Rotating/overlapping shapes',
            previewId: 'abstract-geo',
            prompt: 'Create abstract geometric compositions with rotating shapes, overlapping forms, and vibrant color palettes. Use CSS transforms and blend modes for creative effects.',
            code: `/* Abstract Geometric Design */
.abstract-container {
    position: relative;
    width: 200px;
    height: 200px;
}

.abstract-shape {
    position: absolute;
    transition: transform 0.5s ease;
}

.shape-1 {
    background: #ff6b6b;
    width: 60px;
    height: 60px;
    border-radius: 8px;
    transform: rotate(15deg);
}

.shape-2 {
    background: #48dbfb;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    bottom: 10px;
    right: 10px;
}

.shape-3 {
    background: linear-gradient(135deg, #feca57, #ff6b6b);
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
}

/* Hover animation */
.abstract-container:hover .shape-1 {
    transform: rotate(45deg) scale(1.1);
}`
        },
        {
            id: 'wabi-sabi',
            name: 'Wabi-Sabi',
            nameZh: '侘寂风',
            description: 'Textured paper, imperfect strokes',
            previewId: 'biophilic',
            prompt: 'Create wabi-sabi aesthetic with textured paper backgrounds, imperfect hand-drawn strokes, muted earthy colors, and asymmetrical layouts. Embrace imperfection and transience.',
            code: `/* Wabi-Sabi Design Style */
.wabi-sabi-bg {
    background: #f5f0e8;
    background-image:
        url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.08'/%3E%3C/svg%3E");
}

.wabi-sabi-card {
    background: transparent;
    border: 1px solid #d4c4a8;
    padding: 32px;
    border-radius: 2px;
    box-shadow: 2px 2px 0 #d4c4a8;
}

.wabi-sabi-text {
    font-family: 'Brush Script MT', cursive;
    color: #6b5c4a;
}

.imperfect-line {
    stroke-width: 2;
    stroke: #6b5c4a;
    stroke-dasharray: 100;
    stroke-dashoffset: 10;
}`
        },
        {
            id: 'urban-modern',
            name: 'Urban Modern',
            nameZh: '都市现代',
            description: 'Dark concrete, stark contrast',
            previewId: 'urban-modern',
            prompt: 'Create urban modern design with dark concrete backgrounds, stark high contrast, bold typography, and industrial-inspired elements. Think modern city architecture meets web design.',
            code: `/* Urban Modern Design Style */
.urban-bg {
    background: #2c2c2c;
    background-image:
        linear-gradient(45deg, #333 25%, transparent 25%),
        linear-gradient(-45deg, #333 25%, transparent 25%);
    background-size: 4px 4px;
}

.urban-card {
    background: #3a3a3a;
    padding: 32px 40px;
    border-left: 4px solid #00d9ff;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.urban-accent {
    color: #00d9ff;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
}

.urban-text {
    color: #e0e0e0;
    font-weight: 300;
}`
        },
        {
            id: 'dynamic-layout',
            name: 'Dynamic Layout',
            nameZh: '动态版式',
            description: 'CSS grid morph animation',
            previewId: 'dynamic-layout',
            prompt: 'Create dynamic layout with CSS grid morph animations, responsive elements that rearrange themselves, and smooth transitions between layout states.',
            code: `/* Dynamic Layout Design */
.dynamic-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.dynamic-item {
    aspect-ratio: 1;
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.dynamic-item:hover {
    transform: scale(1.05);
    z-index: 2;
}

/* Layout states */
.dynamic-grid.expanded {
    grid-template-columns: repeat(2, 1fr);
}

.dynamic-grid.compact {
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}

/* Morph animation */
@keyframes layout-morph {
    0%, 100% {
        border-radius: 12px;
        transform: rotate(0deg);
    }
    50% {
        border-radius: 50%;
        transform: rotate(5deg);
    }
}`
        }
    ];

    // ============================================
    // TEXT EFFECTS DATA
    // ============================================
    const TEXT_EFFECTS = [
        {
            id: 'typewriter',
            name: 'Typewriter',
            nameZh: '打字机效果',
            description: 'Character-by-character reveal with blinking cursor',
            previewId: 'typewriter',
            prompt: 'Create a typewriter effect where text appears one character at a time with a blinking cursor at the end. Use monospace font and control typing speed.',
            code: `// Typewriter Text Effect
const textElement = document.querySelector('.typewriter-text');
const fullText = 'Hello, World!';
let index = 0;

function typeWriter() {
    if (index < fullText.length) {
        textElement.textContent = fullText.substring(0, index + 1) + '▋';
        index++;
        setTimeout(typeWriter, 100);
    } else {
        setTimeout(() => {
            textElement.textContent = '';
            index = 0;
            typeWriter();
        }, 2000);
    }
}
typeWriter();`
        },
        {
            id: 'glitch-text',
            name: 'Glitch Text',
            nameZh: '故障文字',
            description: 'RGB split with translate offset animation',
            previewId: 'glitch-text',
            prompt: 'Create a glitch text effect with RGB color channel split and random position offsets.',
            code: `// Glitch Text Effect
.glitch-text {
    position: relative;
}
.glitch-text::before,
.glitch-text::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
}
.glitch-text::before {
    left: 2px;
    text-shadow: -1px 0 #ff00ff;
    animation: glitch-anim-1 2s infinite linear alternate-reverse;
}
.glitch-text::after {
    left: -2px;
    text-shadow: -1px 0 #00ffff;
    animation: glitch-anim-2 3s infinite linear alternate-reverse;
}`
        },
        {
            id: 'gradient-text',
            name: 'Gradient Text',
            nameZh: '渐变文字',
            description: 'Animated background-clip gradient fill',
            previewId: 'gradient-text',
            prompt: 'Create gradient text effect with animated flowing colors.',
            code: `.gradient-text {
    background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-flow 3s ease infinite;
}`
        },
        {
            id: 'text-morph',
            name: 'Text Morph',
            nameZh: '文字形变',
            description: 'FLIP tween transition between words',
            previewId: 'text-morph',
            prompt: 'Create text morph effect that smoothly transitions between words.',
            code: `// Text Morph with FLIP animation
function morphText(element, newText) {
    const first = element.getBoundingClientRect();
    element.textContent = newText;
    const last = element.getBoundingClientRect();
    const invertX = first.left - last.left;
    const invertY = first.top - last.top;
    element.style.transform = \`translate(\${invertX}px,\${invertY}px)\`;
    element.offsetHeight;
    element.style.transform = '';
}`
        },
        {
            id: 'split-reveal',
            name: 'Split Reveal',
            nameZh: '分割揭示',
            description: 'Words slide in from bottom on hover',
            previewId: 'split-reveal',
            prompt: 'Create split reveal effect where two halves slide away on hover.',
            code: `.split-reveal::before,
.split-reveal::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 50%;
    background: #6750A4;
    transition: transform 0.4s ease;
}
.split-reveal:hover::before { transform: translateY(-100%); }
.split-reveal:hover::after { transform: translateY(100%); }`
        },
        {
            id: 'neon-text',
            name: 'Neon Text',
            nameZh: '霓虹文字',
            description: 'Pulsing text-shadow glow effect',
            previewId: 'neon-text',
            prompt: 'Create realistic neon sign text with layered text-shadow glow.',
            code: `.neon-text {
    color: #fff;
    text-shadow:
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 20px #ff00ff,
        0 0 40px #ff00ff;
    animation: neon-pulse 2s ease-in-out infinite alternate;
}`
        },
        {
            id: '3d-text',
            name: '3D Text',
            nameZh: '3D文字',
            description: 'CSS text-shadow stacking for depth',
            previewId: '3d-text',
            prompt: 'Create 3D text using layered text-shadow to build depth.',
            code: `.text-3d {
    text-shadow:
        0 1px 0 #ccc,
        0 2px 0 #ccc,
        0 3px 0 #ccc,
        0 4px 0 #ccc,
        0 5px 0 #ccc;
}`
        },
        {
            id: 'wave-text',
            name: 'Wave Text',
            nameZh: '波浪文字',
            description: 'Letters animate with sinusoidal delay',
            previewId: 'wave-text',
            prompt: 'Create wave text with individual letter animations with staggered delays.',
            code: `@keyframes wave {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}
.wave-text span {
    display: inline-block;
    animation: wave 1.5s ease-in-out infinite;
}`
        },
        {
            id: 'scramble-text',
            name: 'Scramble Text',
            nameZh: '乱码文字',
            description: 'Random char scramble resolves to final word',
            previewId: 'scramble-text',
            prompt: 'Create scramble text effect with random characters cycling before resolving.',
            code: `function scrambleText(element, target) {
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let iterations = 0;
    const interval = setInterval(() => {
        element.textContent = target.split('').map((char, i) => {
            if (i < iterations) return char;
            return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        if (++iterations > target.length) clearInterval(interval);
    }, 30);
}`
        },
        {
            id: 'text-shatter',
            name: 'Text Shatter',
            nameZh: '文字碎裂',
            description: 'Letters explode and reassemble on hover',
            previewId: 'text-shatter',
            prompt: 'Create a text shatter effect where letters explode outward and reassemble on hover.',
            code: `.shatter-text {
    display: inline-block;
}
.shatter-text span {
    display: inline-block;
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55),
                opacity 0.3s ease;
}
.shatter-text:hover span {
    animation: shatter 0.5s ease forwards;
}
@keyframes shatter {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    50% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; }
    51% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; }
    100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
}

/* JavaScript to set random explosion directions */
document.querySelectorAll('.shatter-text').forEach(text => {
    const letters = text.textContent.split('');
    text.innerHTML = letters.map((letter, i) => {
        const tx = (Math.random() - 0.5) * 100 + 'px';
        const ty = (Math.random() - 0.5) * 100 + 'px';
        const rot = (Math.random() - 0.5) * 360 + 'deg';
        return '<span style="--tx:' + tx + ';--ty:' + ty + ';--rot:' + rot + ';">' + letter + '</span>';
    }).join('');
});`
        },
        {
            id: 'stroke-draw',
            name: 'Stroke Draw',
            nameZh: '描边绘制',
            description: 'SVG stroke-dashoffset reveal animation',
            previewId: 'stroke-draw',
            prompt: 'Create SVG stroke draw animation using stroke-dasharray and stroke-dashoffset.',
            code: `<svg width="200" height="60" viewBox="0 0 200 60">
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          fill="none" stroke="#6750A4" stroke-width="2"
          stroke-dasharray="300" stroke-dashoffset="300"
          style="animation: draw 2s ease forwards;">
        DRAW
    </text>
</svg>
<style>@keyframes draw { to { stroke-dashoffset: 0; } }</style>`
        },
        {
            id: 'variable-font',
            name: 'Variable Font',
            nameZh: '可变字体',
            description: 'CSS font-weight/width oscillation',
            previewId: 'variable-font',
            prompt: 'Create variable font animation using font-variation-settings.',
            code: `.variable-text {
    font-variation-settings: "wght" 400, "wdth" 100;
    animation: variable-morph 4s ease-in-out infinite;
}
@keyframes variable-morph {
    0%, 100% { font-variation-settings: "wght" 400, "wdth" 100; }
    50% { font-variation-settings: "wght" 700, "wdth" 125; }
}`
        }
    ];

    // ============================================
    // TRANSITIONS EFFECTS DATA
    // ============================================
    const TRANSITIONS = [
        {
            id: 'fade',
            name: 'Fade In/Out',
            nameZh: '淡入淡出',
            description: 'Classic opacity transition for smooth appearance',
            previewId: 'fade',
            prompt: 'Create a smooth fade in/out transition using CSS opacity. Add transition timing functions for natural feeling fades.',
            code: `.fade-element {
    opacity: 0;
    transition: opacity 0.4s ease;
}

.fade-element.visible {
    opacity: 1;
}

/* JavaScript toggle */
element.classList.toggle('visible');`
        },
        {
            id: 'slide-up',
            name: 'Slide Up',
            nameZh: '上滑进入',
            description: 'Element slides up from below with easing',
            previewId: 'slide-up',
            prompt: 'Create slide up transition where element moves from below viewport. Use cubic-bezier for bounce effect.',
            code: `.slide-up {
    transform: translateY(60px);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slide-up.visible {
    transform: translateY(0);
    opacity: 1;
}`
        },
        {
            id: 'scale-pop',
            name: 'Scale Pop',
            nameZh: '缩放弹出',
            description: 'Bouncy scale from 0 to 1 with overshoot',
            previewId: 'scale-pop',
            prompt: 'Create scale pop animation with elastic bounce effect using cubic-bezier easing.',
            code: `.scale-pop {
    transform: scale(0);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.scale-pop.visible {
    transform: scale(1);
}

/* Optional hover scale */
.scale-pop:hover {
    transform: scale(1.05);
}`
        },
        {
            id: 'flip-x',
            name: 'Flip X',
            nameZh: 'X轴翻转',
            description: '3D rotation flip on horizontal axis',
            previewId: 'flip-x',
            prompt: 'Create 3D flip animation using rotateX transform. Add perspective to parent for depth.',
            code: `.flip-container {
    perspective: 200px;
}

.flip-element {
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.flip-element.flipped {
    transform: rotateX(180deg);
}

/* Flip Y variant */
.flip-element.flipped-y {
    transform: rotateY(180deg);
}`
        },
        {
            id: 'blur-in',
            name: 'Blur In',
            nameZh: '模糊进入',
            description: 'Combines blur filter with opacity fade',
            previewId: 'blur-in',
            prompt: 'Create blur transition combining CSS filter blur with opacity for dreamy entrance.',
            code: `.blur-in {
    filter: blur(10px);
    opacity: 0;
    transition: all 0.4s ease;
}

.blur-in.visible {
    filter: blur(0);
    opacity: 1;
}

/* Staggered blur for lists */
.blur-in:nth-child(1) { transition-delay: 0.05s; }
.blur-in:nth-child(2) { transition-delay: 0.1s; }
.blur-in:nth-child(3) { transition-delay: 0.15s; }`
        },
        {
            id: 'stagger',
            name: 'Stagger List',
            nameZh: '交错动画',
            description: 'Sequential animation delays for list items',
            previewId: 'stagger',
            prompt: 'Create staggered list animation where each item animates with increasing delay.',
            code: `.stagger-item {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
}

.stagger-list.visible .stagger-item {
    opacity: 1;
    transform: translateY(0);
}

/* Auto-generate delays with CSS */
.stagger-item:nth-child(1) { transition-delay: 0.05s; }
.stagger-item:nth-child(2) { transition-delay: 0.1s; }
.stagger-item:nth-child(3) { transition-delay: 0.15s; }
.stagger-item:nth-child(4) { transition-delay: 0.2s; }
.stagger-item:nth-child(5) { transition-delay: 0.25s; }`
        },
        {
            id: 'elastic',
            name: 'Elastic Bounce',
            nameZh: '弹性弹跳',
            description: 'Overshooting scale with back-easing',
            previewId: 'elastic',
            prompt: 'Create elastic bounce transition with dramatic overshoot using custom cubic-bezier.',
            code: `.elastic {
    transform: scale(0);
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.elastic.visible {
    transform: scale(1);
}

/* Elastic hover effect */
.elastic:hover {
    transform: scale(1.2);
}

/* Alternative easing values */
.cubic-bezier(0.175, 0.885, 0.32, 1.275)  /* Gentle bounce */
cubic-bezier(0.68, -0.55, 0.265, 1.55)     /* Dramatic elastic */`
        },
        {
            id: 'clip-reveal',
            name: 'Clip Reveal',
            nameZh: '裁剪揭示',
            description: 'CSS clip-path polygon animation',
            previewId: 'clip-reveal',
            prompt: 'Create reveal using CSS clip-path polygon transition. Shape morphs from full to point.',
            code: `.clip-reveal {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transition: clip-path 0.5s ease;
}

.clip-reveal.hidden {
    clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
}

/* Circle reveal variant */
.clip-circle {
    clip-path: circle(0% at 50% 50%);
    transition: clip-path 0.5s ease;
}

.clip-circle.visible {
    clip-path: circle(100% at 50% 50%);
}`
        },
        {
            id: 'rotate-in',
            name: 'Rotate In',
            nameZh: '旋转进入',
            description: 'Spinning entrance with scale combination',
            previewId: 'rotate-in',
            prompt: 'Create rotate in transition combining rotation with scale for dynamic entrance.',
            code: `.rotate-in {
    transform: rotate(-180deg) scale(0);
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.rotate-in.visible {
    transform: rotate(0deg) scale(1);
}

/* Variants */
.rotate-in-cw {
    transform: rotate(180deg) scale(0);
}

.rotate-in-y {
    transform: rotateY(-180deg) scale(0);
}`
        },
        {
            id: 'shape-morph',
            name: 'Shape Morph',
            nameZh: '形状变换',
            description: 'Border-radius morph with rotation',
            previewId: 'shape-morph',
            prompt: 'Create shape morph using border-radius transition combined with rotate transform.',
            code: `.shape-morph {
    width: 60px;
    height: 60px;
    background: #f59e0b;
    border-radius: 12px;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.shape-morph:hover {
    border-radius: 50%;
    transform: scale(1.2) rotate(45deg);
}

/* Morphing blob animation */
@keyframes blob-morph {
    0%, 100% {
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }
    50% {
        border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    }
}`
        }
    ];

    // ============================================
    // PAGE TRANSITIONS EFFECTS DATA
    // ============================================
    const PAGE_TRANSITIONS = [
        {
            id: 'swipe-page',
            name: 'Swipe Left/Right',
            nameZh: '左右滑动',
            description: 'Horizontal swipe transition between pages',
            previewId: 'swipe-page',
            prompt: 'Create swipe page transition using CSS transform translateX. Pages slide in/out horizontally like mobile app navigation.',
            code: `/* Swipe Page Transition */
.page-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.page {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform 0.4s ease;
}

.page.next {
    transform: translateX(100%);
}

.page.prev {
    transform: translateX(-100%);
}

.page.active {
    transform: translateX(0);
}`
        },
        {
            id: 'slide-over',
            name: 'Slide Over',
            nameZh: '滑出覆盖',
            description: 'New content slides over from bottom/side',
            previewId: 'slide-over',
            prompt: 'Create slide over transition where new content slides in from bottom, covering existing content. Use translateY for bottom slide.',
            code: `/* Slide Over Transition */
.slide-over-overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80%;
    background: white;
    border-radius: 20px 20px 0 0;
    transform: translateY(100%);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 100;
}

.slide-over-overlay.open {
    transform: translateY(0);
}

/* Side slide variant */
.slide-over-side {
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    height: 100%;
    transform: translateX(100%);
    transition: transform 0.3s ease;
}`
        },
        {
            id: 'zoom-page',
            name: 'Zoom In/Out',
            nameZh: '缩放转场',
            description: 'Scale-based page transition with detail focus',
            previewId: 'zoom-page',
            prompt: 'Create zoom page transition where outgoing page scales up and fades, incoming page scales in from center.',
            code: `/* Zoom Page Transition */
.zoom-page {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
}

.zoom-page.outgoing {
    transform: scale(1.2);
    opacity: 0;
}

.zoom-page.incoming {
    transform: scale(0.8);
    opacity: 0;
}

.zoom-page.incoming.active {
    transform: scale(1);
    opacity: 1;
}`
        },
        {
            id: 'flip-page',
            name: 'Flip Page',
            nameZh: '翻转页面',
            description: '3D card flip effect for page transition',
            previewId: 'flip-page',
            prompt: 'Create flip page transition using CSS 3D transforms. Pages flip like cards with perspective and rotateY.',
            code: `/* Flip Page Transition */
.flip-container {
    perspective: 1000px;
    width: 100%;
    height: 100vh;
}

.flip-page {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.8s;
    backface-visibility: hidden;
}

.flip-page.flipped {
    transform: rotateY(180deg);
}

.flip-page-back {
    transform: rotateY(180deg);
}`
        },
        {
            id: 'dissolve',
            name: 'Dissolve',
            nameZh: '溶解过渡',
            description: 'Cross-fade between pages with scale',
            previewId: 'dissolve',
            prompt: 'Create dissolve/fade-through transition where outgoing page fades and scales down slightly while incoming fades in.',
            code: `/* Dissolve/Fade Through Transition */
.dissolve-page {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
}

.dissolve-page.outgoing {
    opacity: 0;
    transform: scale(0.95);
}

.dissolve-page.incoming {
    opacity: 0;
    transform: scale(1.05);
}

.dissolve-page.active {
    opacity: 1;
    transform: scale(1);
}`
        },
        {
            id: 'shared-element',
            name: 'Shared Element',
            nameZh: '共享元素',
            description: 'Element animates between pages (hero pattern)',
            previewId: 'shared-element',
            prompt: 'Create shared element transition where a hero element animates continuously from one page to another.',
            code: `/* Shared Element Transition */
@keyframes hero-enter {
    from {
        width: 100px;
        height: 100px;
        border-radius: 8px;
    }
    to {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
    }
}

.shared-hero {
    animation: hero-enter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* FLIP technique */
function flipTransition(element, endState) {
    const first = element.getBoundingClientRect();
    element.classList.add('expanded');
    const last = element.getBoundingClientRect();
    const invertX = first.left - last.left;
    const invertY = first.top - last.top;
    element.style.transform = \`translate(\${invertX}px, \${invertY}px)\`;
    element.offsetHeight; // Force reflow
    element.style.transition = 'transform 0.5s';
    element.style.transform = '';
}`
        },
        {
            id: 'curved-slide',
            name: 'Curved Slide',
            nameZh: '弧形滑动',
            description: '3D curved slide with perspective',
            previewId: 'curved-slide',
            prompt: 'Create curved slide transition using 3D transforms with perspective. Elements slide with rotation for curved motion.',
            code: `/* Curved Slide Transition */
.curved-container {
    perspective: 500px;
    perspective-origin: 50% 50%;
}

.curved-page {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.curved-page.entering {
    transform: translateX(100%) rotateY(-30deg);
    opacity: 0.5;
}

.curved-page.leaving {
    transform: translateX(-30%) rotateY(15deg);
    opacity: 0.5;
}

.curved-page.active {
    transform: translateX(0) rotateY(0);
    opacity: 1;
}`
        },
        {
            id: 'perspective-zoom',
            name: 'Perspective Zoom',
            nameZh: '透视缩放',
            description: '3D zoom with depth perception',
            previewId: 'perspective-zoom',
            prompt: 'Create perspective zoom transition using translateZ for depth effect. Pages zoom towards viewer with 3D perspective.',
            code: `/* Perspective Zoom Transition */
.perspective-container {
    perspective: 800px;
    perspective-origin: 50% 50%;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.perspective-page {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
    transform-style: preserve-3d;
}

.perspective-page.outgoing {
    transform: translateZ(-200px) scale(1.2);
    opacity: 0;
}

.perspective-page.incoming {
    transform: translateZ(200px) scale(0.9);
    opacity: 0;
}

.perspective-page.active {
    transform: translateZ(0) scale(1);
    opacity: 1;
}`
        }
    ];

    // ============================================
    // BACKGROUNDS EFFECTS DATA
    // ============================================
    const BACKGROUNDS = [
        {
            id: 'linear-gradient-bg',
            name: 'Linear Gradient',
            nameZh: '线性渐变',
            description: 'Classic linear gradient with angle control',
            previewId: 'linear-gradient-bg',
            prompt: 'Create linear gradient background with customizable angle and color stops.',
            code: `/* Linear Gradient Background */
.linear-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* With multiple color stops */
.linear-gradient-multi {
    background: linear-gradient(
        90deg,
        #ff6b6b 0%,
        #feca57 25%,
        #48dbfb 50%,
        #ff9ff3 75%,
        #ff6b6b 100%
    );
}

/* Diagonal gradient */
.linear-gradient-diagonal {
    background: linear-gradient(45deg, #6750A4, #9381FF);
}`
        },
        {
            id: 'radial-gradient-bg',
            name: 'Radial Gradient',
            nameZh: '径向渐变',
            description: 'Circular gradient from center or offset position',
            previewId: 'radial-gradient-bg',
            prompt: 'Create radial gradient background with customizable center position and color stops.',
            code: `/* Radial Gradient Background */
.radial-gradient {
    background: radial-gradient(circle, #6750A4 0%, #1a1a2e 100%);
}

/* Offset center */
.radial-gradient-offset {
    background: radial-gradient(
        circle at 30% 30%,
        #f472b6 0%,
        #6750A4 50%,
        #1a1a2e 100%
    );
}

/* Elliptical gradient */
.radial-gradient-ellipse {
    background: radial-gradient(ellipse at center, #9381FF, #6750A4);
}`
        },
        {
            id: 'conic-gradient-bg',
            name: 'Conic Gradient',
            nameZh: '锥形渐变',
            description: 'Rotating color sweep from center point',
            previewId: 'conic-gradient-bg',
            prompt: 'Create conic gradient background with color sweep around center point.',
            code: `/* Conic Gradient Background */
.conic-gradient {
    background: conic-gradient(
        from 0deg at 50% 50%,
        #ff6b6b,
        #feca57,
        #48dbfb,
        #ff9ff3,
        #ff6b6b
    );
}

/* With hard stops */
.conic-gradient-hard {
    background: conic-gradient(
        #6750A4 0deg 90deg,
        #9381FF 90deg 180deg,
        #EADDFF 180deg 270deg,
        #1a1a2e 270deg 360deg
    );
}`
        },
        {
            id: 'mesh-gradient-bg',
            name: 'Mesh Gradient',
            nameZh: '网格渐变',
            description: 'Multiple radial gradients blended together',
            previewId: 'mesh-gradient-bg',
            prompt: 'Create mesh gradient using multiple radial gradients positioned at different points.',
            code: `/* Mesh Gradient Background */
.mesh-gradient {
    background:
        radial-gradient(at 40% 20%, #f472b6 0px, transparent 50%),
        radial-gradient(at 80% 0%, #a78bfa 0px, transparent 50%),
        radial-gradient(at 0% 50%, #34d399 0px, transparent 50%),
        radial-gradient(at 80% 50%, #fbbf24 0px, transparent 50%),
        radial-gradient(at 0% 100%, #60a5fa 0px, transparent 50%);
    background-color: #1a1a2e;
}

/* Animated mesh gradient */
.mesh-gradient-animated {
    background-size: 200% 200%;
    animation: meshMove 10s ease infinite;
}

@keyframes meshMove {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}`
        },
        {
            id: 'animated-gradient-bg',
            name: 'Animated Gradient',
            nameZh: '动画渐变',
            description: 'Flowing gradient with background-position animation',
            previewId: 'animated-gradient-bg',
            prompt: 'Create animated gradient background using background-size and background-position animation.',
            code: `/* Animated Gradient Background */
.animated-gradient {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradientFlow 8s ease infinite;
}

@keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Slower animation */
.animated-gradient-slow {
    animation: gradientFlow 15s ease infinite;
}`
        },
        {
            id: 'grid-pattern-bg',
            name: 'Grid Pattern',
            nameZh: '网格图案',
            description: 'Subtle grid lines using linear-gradient',
            previewId: 'grid-pattern-bg',
            prompt: 'Create grid pattern background using CSS linear-gradient.',
            code: `/* Grid Pattern Background */
.grid-pattern {
    background-color: #1a1a2e;
    background-image:
        linear-gradient(rgba(103, 80, 164, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(103, 80, 164, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
}

/* Larger grid */
.grid-pattern-large {
    background-size: 40px 40px;
}

/* Isometric grid */
.grid-pattern-iso {
    background-image:
        linear-gradient(30deg, rgba(103, 80, 164, 0.1) 1px, transparent 1px),
        linear-gradient(150deg, rgba(103, 80, 164, 0.1) 1px, transparent 1px);
    background-size: 30px 30px;
}`
        },
        {
            id: 'dot-pattern-bg',
            name: 'Dot Pattern',
            nameZh: '点阵图案',
            description: 'Polka dots using radial-gradient',
            previewId: 'dot-pattern-bg',
            prompt: 'Create dot pattern background using CSS radial-gradient.',
            code: `/* Dot Pattern Background */
.dot-pattern {
    background-color: #1a1a2e;
    background-image: radial-gradient(rgba(103, 80, 164, 0.3) 1px, transparent 1px);
    background-size: 12px 12px;
}

/* Larger dots */
.dot-pattern-large {
    background-size: 20px 20px;
}

/* Different dot sizes */
.dot-pattern-varying {
    background-image:
        radial-gradient(rgba(103, 80, 164, 0.4) 2px, transparent 2px),
        radial-gradient(rgba(147, 129, 255, 0.3) 1px, transparent 1px);
    background-size: 24px 24px, 12px 12px;
}`
        },
        {
            id: 'noise-texture-bg',
            name: 'Noise Texture',
            nameZh: '噪点纹理',
            description: 'Grainy SVG filter overlay',
            previewId: 'noise-texture-bg',
            prompt: 'Create noise texture background using SVG filter with feTurbulence.',
            code: `/* Noise Texture Background */
.noise-texture {
    background: #2d2d3a;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
}

/* Lighter noise */
.noise-texture-light {
    filter: url(#noise);
    opacity: 0.04;
}

/* Colored noise */
.noise-texture-colored {
    background: linear-gradient(135deg, #667eea, #764ba2);
    background-image: url("data:image/svg+xml,..."), linear-gradient(...);
}

/* Inline SVG noise */
<div style="background: #2d2d3a;">
    <svg style="position:absolute;inset:0;opacity:0.08;">
        <filter id="n">
            <feTurbulence type="fractalNoise" baseFrequency="0.65"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#n)"/>
    </svg>
</div>`
        },
        {
            id: 'geometric-shapes-bg',
            name: 'Geometric Shapes',
            nameZh: '几何形状',
            description: 'Floating shapes with transparency',
            previewId: 'geometric-shapes-bg',
            prompt: 'Create geometric shapes background with positioned elements.',
            code: `/* Geometric Shapes Background */
.geometric-bg {
    background: #1a1a2e;
    position: relative;
    overflow: hidden;
}

.geo-shape {
    position: absolute;
    opacity: 0.3;
}

.geo-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #6750A4;
    top: 20%;
    left: 10%;
}

.geo-square {
    width: 60px;
    height: 60px;
    background: #9381FF;
    top: 60%;
    right: 15%;
    transform: rotate(45deg);
}

/* Animated floating shapes */
@keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
}

.geo-shape-animated {
    animation: float 6s ease-in-out infinite;
}`
        },
        {
            id: 'gradient-orbs-bg',
            name: 'Gradient Orbs',
            nameZh: '渐变光球',
            description: 'Soft radial gradient blobs for ambient effect',
            previewId: 'gradient-orbs-bg',
            prompt: 'Create gradient orbs background with soft radial gradients positioned absolutely.',
            code: `/* Gradient Orbs Background */
.gradient-orbs {
    background: #0f0f1a;
    position: relative;
    overflow: hidden;
}

.orb {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, var(--orb-color), transparent 70%);
    transform: translate(-50%, -50%);
    pointer-events: none;
}

.orb-1 {
    width: 200px;
    height: 200px;
    --orb-color: rgba(103, 80, 164, 0.6);
    top: 30%;
    left: 20%;
}

.orb-2 {
    width: 300px;
    height: 300px;
    --orb-color: rgba(147, 129, 255, 0.5);
    top: 60%;
    left: 70%;
}

/* Animated orbs */
@keyframes orbFloat {
    0%, 100% { transform: translate(-50%, -50%) translate(0, 0); }
    33% { transform: translate(-50%, -50%) translate(30px, -20px); }
    66% { transform: translate(-50%, -50%) translate(-20px, 20px); }
}

.orb-animated {
    animation: orbFloat 10s ease-in-out infinite;
}`
        }
    ];

    // ============================================
    // BACKGROUND EFFECTS DATA
    // ============================================
    const BACKGROUND_EFFECTS = [
        {
            id: 'floating-particles',
            name: 'Floating Particles',
            nameZh: '浮动粒子',
            description: 'Gentle floating dots with collision detection',
            previewId: 'floating-particles',
            prompt: 'Create floating particles background using HTML5 Canvas. Particles float smoothly, bounce off edges, and respond to mouse interaction.',
            code: `// Floating Particles Background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.cssText = 'position:fixed;inset:0;z-index:-1;';
document.body.appendChild(canvas);

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const particles = [];
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: \`hsla(\${260 + Math.random() * 40}, 60%, 60%, 0.6)\`
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();`
        },
        {
            id: 'starfield',
            name: 'Starfield',
            nameZh: '星空',
            description: 'Warp speed stars moving towards viewer',
            previewId: 'starfield',
            prompt: 'Create starfield warp effect with stars moving towards the viewer from center. Use 3D perspective with z-depth.',
            code: `// Starfield Background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.cssText = 'position:fixed;inset:0;background:#000;';
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 200;

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width
    });
}

function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    stars.forEach(star => {
        star.z -= 2;
        if (star.z <= 0) {
            star.z = canvas.width;
            star.x = Math.random() * canvas.width - cx;
            star.y = Math.random() * canvas.height - cy;
        }
        const x = (star.x / star.z) * 100 + cx;
        const y = (star.y / star.z) * 100 + cy;
        const size = (1 - star.z / canvas.width) * 3;
        const shade = parseInt((1 - star.z / canvas.width) * 255);
        ctx.fillStyle = \`rgb(\${shade},\${shade},\${shade})\`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();`
        },
        {
            id: 'animated-waves',
            name: 'Animated Waves',
            nameZh: '动态波浪',
            description: 'Layered sine waves at bottom of screen',
            previewId: 'animated-waves',
            prompt: 'Create animated waves using Canvas with multiple overlapping sine waves at different speeds.',
            code: `// Animated Waves Background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.cssText = 'position:fixed;bottom:0;left:0;right:0;height:200px;z-index:-1;';
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = 200;

let time = 0;
const waveCount = 3;
const colors = ['rgba(103,80,164,0.5)', 'rgba(147,129,255,0.4)', 'rgba(234,221,255,0.3)'];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let w = 0; w < waveCount; w++) {
        ctx.fillStyle = colors[w];
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 5) {
            const y = canvas.height - 50 - w * 20 +
                Math.sin(x * 0.01 + time + w) * 20 +
                Math.sin(x * 0.02 + time * 1.5 + w) * 10;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
    }
    time += 0.02;
    requestAnimationFrame(animate);
}
animate();`
        },
        {
            id: 'gradient-wave',
            name: 'Gradient Wave',
            nameZh: '渐变波浪',
            description: 'Rotating conic gradient for flowing effect',
            previewId: 'gradient-wave',
            prompt: 'Create gradient wave using rotating conic gradient with large size and blur.',
            code: `.gradient-wave {
    position: fixed;
    inset: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
        from 0deg,
        #6750A4,
        #9381FF,
        #EADDFF,
        #B794F6,
        #6750A4
    );
    animation: rotateGradient 10s linear infinite;
    opacity: 0.3;
    z-index: -1;
}

@keyframes rotateGradient {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Add blur for softer effect */
.gradient-wave-blur {
    filter: blur(60px);
}

/* Multiple layered waves */
.gradient-wave-2 {
    animation-delay: -5s;
    opacity: 0.2;
}`
        },
        {
            id: 'aurora',
            name: 'Aurora Borealis',
            nameZh: '极光效果',
            description: 'Northern lights style flowing color bands',
            previewId: 'aurora',
            prompt: 'Create aurora borealis effect using Canvas with flowing green/purple color bands.',
            code: `// Aurora Borealis Background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.cssText = 'position:fixed;inset:0;background:#0a0a1a;';
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let time = 0;
const bands = 5;

function animate() {
    ctx.fillStyle = 'rgba(10,10,26,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bands; i++) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        const hue = 120 + i * 15 + Math.sin(time * 0.5) * 20;
        gradient.addColorStop(0, \`hsla(\${hue},70%,50%,0)\`);
        gradient.addColorStop(0.3 + Math.sin(time + i) * 0.2, \`hsla(\${hue + 20},70%,50%,0.4)\`);
        gradient.addColorStop(0.6 + Math.cos(time + i) * 0.2, \`hsla(\${hue + 40},70%,50%,0.3)\`);
        gradient.addColorStop(1, \`hsla(\${hue + 60},70%,50%,0)\`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        const baseY = canvas.height * (0.3 + i * 0.1);
        ctx.moveTo(0, baseY);
        for (let x = 0; x <= canvas.width; x += 10) {
            const y = baseY + Math.sin(x * 0.008 + time + i * 0.5) * 50 +
                Math.sin(x * 0.003 + time * 0.7 + i) * 30;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
    }
    time += 0.015;
    requestAnimationFrame(animate);
}
animate();`
        },
        {
            id: 'plasma',
            name: 'Plasma Effect',
            nameZh: '等离子体',
            description: 'Retro demo-style flowing color plasma',
            previewId: 'plasma',
            prompt: 'Create plasma effect using pixel manipulation with multiple sine waves.',
            code: `// Plasma Effect Background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.cssText = 'position:fixed;inset:0;';
document.body.appendChild(canvas);

// Lower resolution for performance and retro look
const scale = 4;
canvas.width = Math.ceil(window.innerWidth / scale);
canvas.height = Math.ceil(window.innerHeight / scale);
canvas.style.width = '100%';
canvas.style.height = '100%';
ctx.imageSmoothingEnabled = false;

let time = 0;

function animate() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const v1 = Math.sin(x * 0.1 + time);
            const v2 = Math.sin(y * 0.1 + time * 0.5);
            const v3 = Math.sin((x + y) * 0.1 + time * 0.5);
            const v4 = Math.sin(Math.sqrt(x * x + y * y) * 0.1 + time);
            const v = (v1 + v2 + v3 + v4) / 4;

            const i = (y * canvas.width + x) * 4;
            const r = Math.sin(v * Math.PI) * 127 + 128;
            const g = Math.sin(v * Math.PI + 2) * 127 + 128;
            const b = Math.sin(v * Math.PI + 4) * 127 + 128;

            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
            data[i + 3] = 255;
        }
    }
    ctx.putImageData(imageData, 0, 0);
    time += 0.03;
    requestAnimationFrame(animate);
}
animate();`
        },
        {
            id: 'rain',
            name: 'Rain Effect',
            nameZh: '下雨效果',
            description: 'Falling raindrops with trails',
            previewId: 'rain',
            prompt: 'Create rain effect with falling streaks using Canvas animation.',
            code: `// Rain Effect Background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.cssText = 'position:fixed;inset:0;background:#1a1a2e;';
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const drops = [];
const dropCount = 100;

for (let i = 0; i < dropCount; i++) {
    drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 10 + 10,
        opacity: Math.random() * 0.3 + 0.2
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach(drop => {
        ctx.strokeStyle = \`rgba(103, 80, 164, \${drop.opacity})\`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animate);
}
animate();`
        },
        {
            id: 'snow',
            name: 'Snow Effect',
            nameZh: '下雪效果',
            description: 'Gentle falling snowflakes with drift',
            previewId: 'snow',
            prompt: 'Create snow effect with gently falling white circles using Canvas.',
            code: `// Snow Effect Background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.cssText = 'position:fixed;inset:0;background:#1a1a2e;';
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const flakes = [];
const flakeCount = 80;

for (let i = 0; i < flakeCount; i++) {
    flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 1 + 0.5,
        sway: Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    flakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();

        flake.y += flake.speed;
        flake.x += Math.sin(flake.y * flake.sway + flake.swayOffset) * 0.5;

        if (flake.y > canvas.height) {
            flake.y = -5;
            flake.x = Math.random() * canvas.width;
        }
        if (flake.x > canvas.width) flake.x = 0;
        if (flake.x < 0) flake.x = canvas.width;
    });
    requestAnimationFrame(animate);
}
animate();`
        },
        {
            id: 'confetti',
            name: 'Confetti',
            nameZh: '彩纸碎片',
            description: 'Colorful falling confetti squares',
            previewId: 'confetti',
            prompt: 'Create confetti effect with colorful squares falling and rotating.',
            code: `// Confetti Background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.cssText = 'position:fixed;inset:0;background:#1a1a2e;';
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#6750A4', '#9381FF', '#EADDFF', '#10b981', '#f472b6', '#fbbf24'];
const pieces = [];
const pieceCount = 100;

for (let i = 0; i < pieceCount; i++) {
    pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 6 + 4,
        speed: Math.random() * 2 + 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(piece => {
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        ctx.restore();

        piece.y += piece.speed;
        piece.rotation += piece.rotationSpeed;

        if (piece.y > canvas.height + 20) {
            piece.y = -20;
            piece.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animate);
}
animate();`
        },
        {
            id: 'spotlight-follow',
            name: 'Spotlight Follow',
            nameZh: '聚光灯跟随',
            description: 'Mouse-controlled reveal of hidden content',
            previewId: 'spotlight-follow',
            prompt: 'Create spotlight follow effect where mouse position reveals content through dark overlay using radial gradient.',
            code: `.spotlight-container {
    position: relative;
    background: #1a1a2e;
}

.spotlight-overlay {
    position: fixed;
    inset: 0;
    background: radial-gradient(
        circle 150px at var(--mouse-x, 50%) var(--mouse-y, 50%),
        transparent 0%,
        rgba(26, 26, 46, 0.95) 100%
    );
    pointer-events: none;
    z-index: 1;
}

.spotlight-content {
    position: relative;
    z-index: 0;
    color: white;
}

document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
});`
        }
    ];

    // ============================================
    // 3D EFFECTS DATA
    // ============================================
    const THREE_D_EFFECTS = [
        {
            id: 'rotating-cube',
            name: 'Rotating Cube',
            nameZh: '旋转立方体',
            description: '3D cube with 6 faces continuously rotating',
            previewId: 'rotating-cube',
            prompt: 'Create 3D rotating cube using CSS transform-style: preserve-3d with 6 positioned faces.',
            code: `.cube-container {
    perspective: 600px;
}

.cube {
    position: relative;
    width: 100px;
    height: 100px;
    transform-style: preserve-3d;
    animation: rotateCube 8s infinite linear;
}

.cube-face {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 1px solid rgba(255,255,255,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
}

.front  { transform: rotateY(0deg) translateZ(50px); }
.back   { transform: rotateY(180deg) translateZ(50px); }
.right  { transform: rotateY(90deg) translateZ(50px); }
.left   { transform: rotateY(-90deg) translateZ(50px); }
.top    { transform: rotateX(90deg) translateZ(50px); }
.bottom { transform: rotateX(-90deg) translateZ(50px); }

@keyframes rotateCube {
    from { transform: rotateX(0deg) rotateY(0deg); }
    to { transform: rotateX(360deg) rotateY(360deg); }
}`
        },
        {
            id: '3d-card-flip',
            name: '3D Card Flip',
            nameZh: '3D卡片翻转',
            description: 'Card flips on hover to reveal back content',
            previewId: '3d-card-flip',
            prompt: 'Create 3D card flip effect with front and back faces using rotateY transform.',
            code: `.flip-container {
    perspective: 400px;
}

.flip-card {
    position: relative;
    width: 200px;
    height: 150px;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    cursor: pointer;
}

.flip-card:hover {
    transform: rotateY(180deg);
}

.flip-front,
.flip-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.flip-front {
    background: #6750A4;
    color: white;
}

.flip-back {
    background: #9381FF;
    color: white;
    transform: rotateY(180deg);
}`
        },
        {
            id: 'perspective-tilt',
            name: 'Perspective Tilt',
            nameZh: '透视倾斜',
            description: 'Interactive 3D tilt following mouse position',
            previewId: 'perspective-tilt',
            prompt: 'Create perspective tilt effect where card tilts based on mouse position using rotateX and rotateY.',
            code: `.tilt-container {
    perspective: 500px;
}

.tilt-card {
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
    box-shadow: 0 20px 40px rgba(103,80,164,0.3);
}

.tilt-card:hover {
    transform: rotateY(var(--rotate-x)) rotateX(var(--rotate-y));
}

/* JavaScript to update CSS variables */
const card = document.querySelector('.tilt-card');
card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.setProperty('--rotate-x', \`\${x / 5}deg\`);
    card.style.setProperty('--rotate-y', \`\${-y / 5}deg\`);
});`
        },
        {
            id: '3d-carousel',
            name: '3D Carousel',
            nameZh: '3D旋转木马',
            description: 'Items arranged in rotating 3D circle',
            previewId: '3d-carousel',
            prompt: 'Create 3D carousel with items positioned in a circle using rotateY and translateZ.',
            code: `.carousel-container {
    perspective: 800px;
}

.carousel {
    position: relative;
    width: 100px;
    height: 100px;
    transform-style: preserve-3d;
    animation: carouselRotate 12s infinite linear;
}

.carousel-item {
    position: absolute;
    width: 80px;
    height: 60px;
    left: 10px;
    top: 20px;
    transform-origin: 50% 50%;
}

/* Position items in circle */
.carousel-item:nth-child(1) { transform: rotateY(0deg) translateZ(150px); }
.carousel-item:nth-child(2) { transform: rotateY(90deg) translateZ(150px); }
.carousel-item:nth-child(3) { transform: rotateY(180deg) translateZ(150px); }
.carousel-item:nth-child(4) { transform: rotateY(270deg) translateZ(150px); }

@keyframes carouselRotate {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(360deg); }
}`
        },
        {
            id: 'isometric-view',
            name: 'Isometric View',
            nameZh: '等轴测视图',
            description: '2.5D isometric cube projection',
            previewId: 'isometric-view',
            prompt: 'Create isometric 3D cube view using rotateX(60deg) rotateZ(-45deg) transforms.',
            code: `.iso-container {
    perspective: 800px;
}

.iso-cube {
    position: relative;
    width: 100px;
    height: 100px;
    transform: rotateX(60deg) rotateZ(-45deg);
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
}

.iso-cube:hover {
    transform: rotateX(45deg) rotateZ(-30deg) scale(1.1);
}

.iso-face {
    position: absolute;
    width: 100px;
    height: 100px;
}

.iso-top {
    background: #6750A4;
    transform: translateZ(50px);
}

.iso-left {
    background: #4a3670;
    transform: rotateX(-90deg) translateZ(50px) translateY(50px);
}

.iso-right {
    background: #9381FF;
    transform: rotateY(90deg) translateZ(50px) translateY(50px);
}`
        },
        {
            id: 'parallax-layers',
            name: 'Parallax Layers',
            nameZh: '视差图层',
            description: 'Multiple layers at different Z depths',
            previewId: 'parallax-layers',
            prompt: 'Create parallax layers effect using translateZ at different depths with perspective.',
            code: `.parallax-container {
    perspective: 500px;
    transform-style: preserve-3d;
}

.parallax-wrapper {
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
}

.parallax-layer {
    position: absolute;
    transition: transform 0.3s ease;
}

.layer-1 { transform: translateZ(0px); }
.layer-2 { transform: translateZ(30px); }
.layer-3 { transform: translateZ(60px); }
.layer-4 { transform: translateZ(90px); }

/* Mouse move effect */
wrapper.addEventListener('mousemove', (e) => {
    const x = (e.clientX - centerX) / 20;
    const y = (e.clientY - centerY) / 20;
    wrapper.style.transform = \`rotateY(\${x}deg) rotateX(\${-y}deg)\`;
});`
        },
        {
            id: '3d-button-press',
            name: '3D Button Press',
            nameZh: '3D按钮按压',
            description: 'Button with depth that presses down',
            previewId: '3d-button-press',
            prompt: 'Create 3D button press effect with multiple box-shadow layers that move on active state.',
            code: `.button-3d {
    position: relative;
    padding: 16px 32px;
    background: #6750A4;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transform-style: preserve-3d;
    box-shadow:
        0 6px 0 #4a3670,
        0 12px 0 #3a2858,
        0 18px 20px rgba(0,0,0,0.3);
    transition: all 0.1s ease;
}

.button-3d:active {
    transform: translateY(6px);
    box-shadow:
        0 0 0 #4a3670,
        0 6px 0 #3a2858,
        0 12px 20px rgba(0,0,0,0.3);
}`
        },
        {
            id: 'floating-elements',
            name: 'Floating Elements',
            nameZh: '浮动元素',
            description: 'Elements bobbing with Z-axis animation',
            previewId: 'floating-elements',
            prompt: 'Create floating elements with 3D translateY animation and shadow changes.',
            code: `.floating-element {
    animation: float 3s ease-in-out infinite;
    transform-style: preserve-3d;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0) translateZ(0);
        box-shadow: 0 10px 30px rgba(103,80,164,0.3);
    }
    50% {
        transform: translateY(-20px) translateZ(10px);
        box-shadow: 0 30px 50px rgba(103,80,164,0.4);
    }
}

/* Multiple floating items */
.floating-item-1 { animation-delay: 0s; }
.floating-item-2 { animation-delay: 0.5s; }
.floating-item-3 { animation-delay: 1s; }
.floating-item-4 { animation-delay: 1.5s; }`
        },
        {
            id: 'glass-cube',
            name: 'Glass Cube',
            nameZh: '玻璃立方体',
            description: 'Transparent cube with blur effect',
            previewId: 'glass-cube',
            prompt: 'Create glass cube using rgba backgrounds, backdrop-filter blur, and semi-transparent borders.',
            code: `.glass-cube-container {
    perspective: 600px;
}

.glass-cube {
    position: relative;
    width: 100px;
    height: 100px;
    transform-style: preserve-3d;
    animation: glassRotate 10s infinite linear;
}

.glass-face {
    position: absolute;
    width: 100px;
    height: 100px;
    background: rgba(147, 129, 255, 0.15);
    border: 1px solid rgba(147, 129, 255, 0.4);
    backdrop-filter: blur(4px);
    box-shadow:
        inset 0 0 20px rgba(147, 129, 255, 0.1),
        0 0 20px rgba(147, 129, 255, 0.2);
}

.front  { transform: translateZ(50px); }
.back   { transform: rotateY(180deg) translateZ(50px); }
.right  { transform: rotateY(90deg) translateZ(50px); }
.left   { transform: rotateY(-90deg) translateZ(50px); }
.top    { transform: rotateX(90deg) translateZ(50px); }
.bottom { transform: rotateX(-90deg) translateZ(50px); }

@keyframes glassRotate {
    from { transform: rotateX(-15deg) rotateY(0deg); }
    to { transform: rotateX(-15deg) rotateY(360deg); }
}`
        },
        {
            id: '3d-stack',
            name: '3D Stack',
            nameZh: '3D堆叠',
            description: 'Cards stacked with Z-axis spacing',
            previewId: '3d-stack',
            prompt: 'Create 3D stack of cards using translateZ for depth spacing and rotation for viewing angle.',
            code: `.stack-container {
    perspective: 400px;
}

.stack-3d {
    position: relative;
    width: 150px;
    height: 100px;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
}

.stack-3d:hover {
    transform: rotateY(25deg) rotateX(10deg);
}

.stack-card {
    position: absolute;
    width: 150px;
    height: 100px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    border: 1px solid rgba(255,255,255,0.2);
}

.stack-card:nth-child(1) { transform: translateZ(0px); background: #6750A4; }
.stack-card:nth-child(2) { transform: translateZ(15px); background: #7a63b8; }
.stack-card:nth-child(3) { transform: translateZ(30px); background: #9381FF; }
.stack-card:nth-child(4) { transform: translateZ(45px); background: #B794F6; }
.stack-card:nth-child(5) { transform: translateZ(60px); background: #EADDFF; color: #1a1a2e; }`
        }
    ];

    // ============================================
    // 3D TRANSFORMS DATA
    // ============================================
    const THREE_D_TRANSFORMS = [
        {
            id: 'rotate-3d',
            name: 'Rotate 3D',
            nameZh: '3D旋转',
            description: 'Combined rotateX and rotateY transforms',
            previewId: 'rotate-3d',
            prompt: 'Create 3D rotation effect using rotateX and rotateY transforms together.',
            code: `.element-3d {
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
}

.element-3d:hover {
    transform: rotateX(45deg) rotateY(180deg);
}

/* Individual axis rotations */
.rotate-x { transform: rotateX(180deg); }
.rotate-y { transform: rotateY(180deg); }
.rotate-z { transform: rotateZ(90deg); }
.rotate-3d { transform: rotate3d(45deg, 45deg, 0deg); }`
        },
        {
            id: 'scale-3d',
            name: 'Scale 3D',
            nameZh: '3D缩放',
            description: 'Independent XYZ scaling with scale3d',
            previewId: 'scale-3d',
            prompt: 'Create 3D scale effect using scale3d for independent XYZ control.',
            code: `.scale-3d {
    transform-style: preserve-3d;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.scale-3d:hover {
    transform: scale3d(1.5, 1.2, 1);
}

/* Scale variants */
.scale-all { transform: scale3d(1.5, 1.5, 1.5); }
.scale-x-only { transform: scale3d(1.5, 1, 1); }
.scale-y-only { transform: scale3d(1, 1.5, 1); }
.scale-z-only { transform: translateZ(30px) scale3d(1, 1, 1.5); }`
        },
        {
            id: 'translate-z',
            name: 'Translate Z',
            nameZh: 'Z轴平移',
            description: 'Movement along Z axis with perspective',
            previewId: 'translate-z',
            prompt: 'Create Z-axis translation effect using translateZ with perspective.',
            code: `.translate-z-container {
    perspective: 300px;
}

.translate-z {
    transform-style: preserve-3d;
    transition: transform 0.4s ease;
}

.translate-z:hover {
    transform: translateZ(60px);
}

/* Multiple depths */
.layer-1 { transform: translateZ(0); }
.layer-2 { transform: translateZ(20px); }
.layer-3 { transform: translateZ(40px); }
.layer-4 { transform: translateZ(60px); }`
        },
        {
            id: 'skew-3d',
            name: 'Skew 3D',
            nameZh: '3D倾斜',
            description: 'SkewX and skewY transform effects',
            previewId: 'skew-3d',
            prompt: 'Create 3D skew effect using skewX and skewY transforms.',
            code: `.skew-3d {
    transition: transform 0.4s ease;
}

.skew-3d:hover {
    transform: skewX(15deg) skewY(10deg);
}

/* Individual skew */
.skew-x { transform: skewX(20deg); }
.skew-y { transform: skewY(20deg); }
.skew-combo { transform: skewX(15deg) skewY(15deg); }

/* Dynamic skew */
.element { transform: skew(calc(var(--mouse-x) * 0.1deg)); }`
        },
        {
            id: 'matrix-3d',
            name: 'Matrix 3D',
            nameZh: '3D矩阵变换',
            description: 'Complex transform using matrix3d function',
            previewId: 'matrix-3d',
            prompt: 'Create complex 3D transform using matrix3d() function for combined effects.',
            code: `/* Matrix 3D Transform */
.matrix-3d {
    transform: matrix3d(
        scaleX,  skewY,   skewX,  scaleY,
        perspX, perspY, perspZ, translateZ,
        translateX, translateY, scaleW
    );
}

/* Example: Rotate 45deg + Scale 1.2 + Translate */
.example {
    transform: matrix3d(
        0.85, 0.85, 0, 0.85,    /* Scale & Rotate */
        0,     0,    0, 0,       /* Perspective */
        10,    20,   0, 1        /* Translate */
    );
}

/* Simplified: Just rotation */
.rotate-45 {
    transform: matrix3d(
        0.707, 0.707, 0, 0,
        -0.707, 0.707, 0, 0,
        0, 0, 0, 1,
        0, 0, 0, 1
    );
}`
        },
        {
            id: 'transform-origin',
            name: 'Transform Origin',
            nameZh: '变换原点',
            description: 'Control rotation/scaling pivot point',
            previewId: 'transform-origin',
            prompt: 'Create effects by changing transform-origin to control pivot point.',
            code: `.origin-center {
    transform-origin: center;
    transform: rotate(45deg);
}

.origin-top-left {
    transform-origin: top left;
    transform: rotate(45deg);
}

.origin-bottom-right {
    transform-origin: bottom right;
    transform: rotate(45deg) scale(1.2);
}

/* 3D transform origin */
.origin-3d {
    transform-origin: 50% 100%;  /* Bottom center */
    transform: rotateX(60deg);
}

/* Common origins */
transform-origin: center center;
transform-origin: top left;
transform-origin: bottom right;
transform-origin: 50% 100%;`
        },
        {
            id: 'chain-transforms',
            name: 'Chain Transforms',
            nameZh: '链式变换',
            description: 'Multiple transforms applied to nested elements',
            previewId: 'chain-transforms',
            prompt: 'Create chain transform effect with nested elements each applying their own transform.',
            code: `.chain-container {
    transform-style: preserve-3d;
    perspective: 500px;
}

.chain-item {
    position: absolute;
    transition: transform 0.5s ease;
}

/* Each layer adds more transform */
.layer-1 { transform: translateZ(0); }
.layer-2 { transform: translateZ(20px) rotateY(10deg); }
.layer-3 { transform: translateZ(40px) rotateY(20deg); }
.layer-4 { transform: translateZ(60px) rotateY(30deg); }

/* Hover chains the effect */
.chain-container:hover .layer-1 { transform: translateZ(10px) rotateY(15deg); }
.chain-container:hover .layer-2 { transform: translateZ(30px) rotateY(30deg); }
.chain-container:hover .layer-3 { transform: translateZ(50px) rotateY(45deg); }
.chain-container:hover .layer-4 { transform: translateZ(70px) rotateY(60deg); }`
        },
        {
            id: 'perspective-origin',
            name: 'Perspective Origin',
            nameZh: '透视原点',
            description: 'Control vanishing point position',
            previewId: 'perspective-origin',
            prompt: 'Create effects by changing perspective-origin to control 3D vanishing point.',
            code: `.perspective-container {
    perspective: 500px;
    perspective-origin: center center;  /* Default */
}

/* Different vanishing points */
.perspective-left {
    perspective-origin: left center;
}

.perspective-right {
    perspective-origin: right center;
}

.perspective-top {
    perspective-origin: top center;
}

.perspective-bottom {
    perspective-origin: bottom center;
}

/* Dynamic perspective */
.container {
    perspective: 600px;
    perspective-origin: var(--mouse-x) var(--mouse-y);
}

.rotating-box {
    transform: rotateY(30deg);
}`
        },
        {
            id: 'backface-visibility',
            name: 'Backface Visibility',
            nameZh: '背面可见性',
            description: 'Control visibility of element back side',
            previewId: 'backface-visibility',
            prompt: 'Create flip card effect using backface-visibility to hide/show back side.',
            code: `.flip-container {
    perspective: 400px;
}

.flip-card {
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.flip-side {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;  /* Key property */
}

.front {
    background: #6750A4;
}

.back {
    background: #10b981;
    transform: rotateY(180deg);
}

.flip-card:hover {
    transform: rotateY(180deg);
}

/* Show backface */
.show-backface {
    backface-visibility: visible;
}`
        },
        {
            id: 'transform-combo',
            name: 'Transform Combo',
            nameZh: '组合变换',
            description: 'Multiple transform types combined',
            previewId: 'transform-combo',
            prompt: 'Create complex effect combining multiple transform types: rotate, scale, translate.',
            code: `.transform-combo {
    transform-style: preserve-3d;
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.transform-combo:hover {
    /* All transforms in one declaration */
    transform:
        rotate3d(45deg, 45deg, 0deg)
        scale3d(1.3, 1.3, 1.3)
        translateZ(30px)
        translateX(10px);
}

/* Order matters! */
.wrong-order {
    /* This won't work as expected */
    transform: translateZ(30px) scale(1.3);
}

.right-order {
    /* Scale first, then translate */
    transform: scale(1.3) translateZ(30px);
}

/* Transform list */
.my-transform {
    transform:
        perspective(500px)
        rotateX(45deg)
        rotateY(45deg)
        scale(1.2)
        translateZ(50px);
}`
        }
    ];

    // ============================================
    // DATA VISUALIZATION EFFECTS DATA
    // ============================================
    const DATA_VIZ = [
        {
            id: 'bar-chart',
            name: 'Bar Chart',
            nameZh: '柱状图',
            description: 'Animated vertical bars with spring effect',
            previewId: 'bar-chart',
            prompt: 'Create animated bar chart with vertical bars that grow from zero with spring physics.',
            code: `/* Animated Bar Chart */
.bar-chart {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    height: 100px;
    padding: 10px;
}

.bar {
    flex: 1;
    background: linear-gradient(to top, #6750A4, #9381FF);
    border-radius: 4px 4px 0 0;
    height: 0;
    animation: growBar 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.bar:nth-child(1) { animation-delay: 0.1s; }
.bar:nth-child(2) { animation-delay: 0.2s; }
.bar:nth-child(3) { animation-delay: 0.3s; }
.bar:nth-child(4) { animation-delay: 0.4s; }
.bar:nth-child(5) { animation-delay: 0.5s; }

@keyframes growBar {
    to { height: var(--height); }
}

/* JS dynamic */
bars.forEach((bar, i) => {
    setTimeout(() => {
        bar.style.height = values[i] + '%';
    }, i * 100);
});`
        },
        {
            id: 'line-chart',
            name: 'Line Chart',
            nameZh: '折线图',
            description: 'SVG path with stroke animation and dots',
            previewId: 'line-chart',
            prompt: 'Create line chart using SVG with animated stroke draw effect and fade-in data points.',
            code: `/* Line Chart with SVG */
.line-chart {
    width: 100%;
    height: 100px;
}

.line-chart svg {
    width: 100%;
    height: 100%;
}

.chart-line {
    fill: none;
    stroke: #9381FF;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawLine 2s ease forwards;
}

.chart-dot {
    fill: #6750A4;
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
}

.chart-dot:nth-child(1) { animation-delay: 1s; }
.chart-dot:nth-child(2) { animation-delay: 1.3s; }
.chart-dot:nth-child(3) { animation-delay: 1.6s; }

@keyframes drawLine {
    to { stroke-dashoffset: 0; }
}

@keyframes fadeIn {
    to { opacity: 1; }
}`
        },
        {
            id: 'pie-chart',
            name: 'Pie Chart',
            nameZh: '饼图',
            description: 'SVG pie slices with scale animation',
            previewId: 'pie-chart',
            prompt: 'Create pie chart using SVG path commands with arc segments and scale animation.',
            code: `/* Pie Chart with SVG */
.pie-chart {
    width: 150px;
    height: 150px;
}

.pie-slice {
    transform-origin: center;
    animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    opacity: 0;
}

.pie-slice:nth-child(1) { animation-delay: 0.1s; }
.pie-slice:nth-child(2) { animation-delay: 0.2s; }
.pie-slice:nth-child(3) { animation-delay: 0.3s; }
.pie-slice:nth-child(4) { animation-delay: 0.4s; }

@keyframes scaleIn {
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* SVG path for each slice */
<path d="M 50 50 L ... A ..." fill="#6750A4" stroke="#fff" stroke-width="1"/>`
        },
        {
            id: 'donut-chart',
            name: 'Donut Chart',
            nameZh: '环形图',
            description: 'Circular progress with center text',
            previewId: 'donut-chart',
            prompt: 'Create donut chart using SVG circle with stroke-dasharray for progress animation.',
            code: `.donut-chart {
    position: relative;
    width: 150px;
    height: 150px;
}

.donut-circle {
    fill: none;
    stroke-width: 20;
    transform: rotate(-90deg);
    transform-origin: center;
}

.donut-bg {
    stroke: #2d2d3a;
}

.donut-fill {
    stroke: #6750A4;
    stroke-dasharray: 440;
    stroke-dashoffset: 440;
    animation: donutFill 2s ease forwards;
}

.donut-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: bold;
}

@keyframes donutFill {
    to { stroke-dashoffset: calc(440 - (440 * 0.75)); }
}

/* Calculate: circumference = 2 * PI * R
   For R=70: circumference ≈ 440
   For 75%: offset = 440 - (440 * 0.75) = 110 */`
        },
        {
            id: 'progress-ring',
            name: 'Progress Ring',
            nameZh: '进度环',
            description: 'Circular progress indicator with percentage',
            previewId: 'progress-ring',
            prompt: 'Create circular progress ring using SVG with stroke-dasharray animation.',
            code: `.progress-ring {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.progress-ring circle {
    fill: none;
    stroke-width: 8;
    transform: rotate(-90deg);
    transform-origin: center;
}

.progress-ring-bg {
    stroke: #2d2d3a;
}

.progress-ring-fill {
    stroke: #10b981;
    stroke-linecap: round;
    stroke-dasharray: 251; /* 2 * PI * 40 */
    stroke-dashoffset: 251;
    transition: stroke-dashoffset 1s ease;
}

/* Set progress value */
.progress-ring[data-progress="75"] .progress-ring-fill {
    stroke-dashoffset: 63; /* 251 - (251 * 0.75) */
}

/* Animate number */
const updateProgress = (element, target) => {
    let current = 0;
    const animate = () => {
        if (current <= target) {
            element.textContent = current + '%';
            current++;
            requestAnimationFrame(animate);
        }
    };
    animate();
};`
        },
        {
            id: 'stats-cards',
            name: 'Stats Cards',
            nameZh: '统计卡片',
            description: 'Staggered stat cards with icons and values',
            previewId: 'stats-cards',
            prompt: 'Create stats cards with staggered fade-in animation and value counting.',
            code: `.stats-container {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.stat-card {
    background: #2d2d3a;
    border-radius: 12px;
    padding: 20px;
    opacity: 0;
    transform: translateY(20px);
    animation: slideUpFade 0.5s ease forwards;
}

.stat-card:nth-child(1) { animation-delay: 0.1s; }
.stat-card:nth-child(2) { animation-delay: 0.2s; }
.stat-card:nth-child(3) { animation-delay: 0.3s; }

.stat-value {
    font-size: 28px;
    font-weight: 700;
    color: #6750A4;
}

.stat-label {
    font-size: 12px;
    color: #9ca3af;
    margin-top: 4px;
}

@keyframes slideUpFade {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}`
        },
        {
            id: 'gauge-meter',
            name: 'Gauge Meter',
            nameZh: '仪表盘',
            description: 'Semicircle gauge with animated needle',
            previewId: 'gauge-meter',
            prompt: 'Create gauge meter using SVG arc with animated needle pointer.',
            code: `/* Gauge Meter */
.gauge {
    position: relative;
    width: 200px;
    height: 100px;
}

.gauge-svg {
    width: 100%;
    height: 100%;
}

.gauge-bg {
    fill: none;
    stroke: #2d2d3a;
    stroke-width: 15;
}

.gauge-fill {
    fill: none;
    stroke: #fbbf24;
    stroke-width: 15;
    stroke-linecap: round;
    stroke-dasharray: 94;
    stroke-dashoffset: 94;
    transition: stroke-dashoffset 1.5s ease;
}

.gauge-needle {
    transform-origin: 60px 50px;
    transition: transform 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Animate to 70% */
.gauge-fill.progress-70 {
    stroke-dashoffset: 28; /* 94 * (1 - 0.7) */
}

.gauge-needle.progress-70 {
    transform: rotate(36deg); /* 180 * 0.2 */
}

/* Arc calculation:
   Semicircle (180deg) with R=30
   Arc length = PI * 30 ≈ 94
   For 70%: offset = 94 * (1 - 0.7) = 28 */`
        },
        {
            id: 'heatmap',
            name: 'Heatmap',
            nameZh: '热力图',
            description: 'Color-coded grid showing intensity',
            previewId: 'heatmap',
            prompt: 'Create heatmap grid with color-coded cells based on data values.',
            code: `.heatmap {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
}

.heatmap-cell {
    aspect-ratio: 1;
    border-radius: 2px;
    transition: all 0.3s ease;
}

/* Color scale */
.heatmap-low {
    background: rgba(103, 80, 164, 0.3);
}

.heatmap-medium {
    background: rgba(147, 129, 255, 0.6);
}

.heatmap-high {
    background: rgba(234, 221, 255, 0.9);
}

/* Dynamic value */
.heatmap-cell[data-value="0.2"] {
    background: rgba(103, 80, 164, 0.2);
}

.heatmap-cell[data-value="0.5"] {
    background: rgba(147, 129, 255, 0.5);
}

.heatmap-cell[data-value="0.9"] {
    background: rgba(234, 221, 255, 0.9);
}

/* Hover scale */
.heatmap-cell:hover {
    transform: scale(1.1);
    z-index: 1;
}

/* Show tooltip on hover */
.heatmap-cell:hover::after {
    content: attr(data-value);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #1a1a2e;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
}`
        }
    ];

    // ============================================
    // CHARTS & COUNTERS DATA
    // ============================================
    const CHARTS_COUNTERS = [
        {
            id: 'counter-up',
            name: 'Counter Up',
            nameZh: '数字递增',
            description: 'Animated number counting from 0 to target value',
            previewId: 'counter-up',
            prompt: 'Create a counter animation that counts numbers from 0 to target with smooth easing.',
            code: `/* Counter Up Animation */
const counter = document.querySelector('.counter');
const target = parseInt(counter.dataset.target);
const duration = 2000;
const stepTime = 20;
const steps = duration / stepTime;
const increment = target / steps;

let current = 0;
const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
        counter.textContent = target.toLocaleString();
        clearInterval(timer);
    } else {
        counter.textContent = Math.floor(current).toLocaleString();
    }
}, stepTime);`
        },
        {
            id: 'circular-counter',
            name: 'Circular Counter',
            nameZh: '环形计数器',
            description: 'Circular progress indicator with counting number',
            previewId: 'circular-counter',
            prompt: 'Create a circular counter with SVG stroke animation and centered number.',
            code: `/* Circular Counter */
.circle-counter {
    position: relative;
    width: 120px;
    height: 120px;
}

.circle-counter svg {
    transform: rotate(-90deg);
}

.circle-bg {
    fill: none;
    stroke: #EADDFF;
    stroke-width: 8;
}

.circle-progress {
    fill: none;
    stroke: #6750A4;
    stroke-width: 8;
    stroke-linecap: round;
    stroke-dasharray: 314;
    stroke-dashoffset: 314;
    animation: fillCircle 2s ease-out forwards;
}

@keyframes fillCircle {
    to { stroke-dashoffset: var(--offset); }
}

.circle-number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: 700;
    color: #6750A4;
}`
        },
        {
            id: 'progress-bar',
            name: 'Progress Bar',
            nameZh: '进度条',
            description: 'Smooth animated progress bar with percentage label',
            previewId: 'progress-bar',
            prompt: 'Create a progress bar that fills smoothly from 0% to target percentage.',
            code: `/* Progress Bar */
.progress-bar {
    width: 100%;
    height: 12px;
    background: #EADDFF;
    border-radius: 6px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #6750A4, #9381FF);
    border-radius: 6px;
    width: 0;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-label {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
}

/* JS */
progressBar.style.width = percentage + '%';`
        },
        {
            id: 'loading-bar',
            name: 'Loading Bar',
            nameZh: '加载条',
            description: 'Indeterminate loading bar with animated pulse',
            previewId: 'loading-bar',
            prompt: 'Create an indeterminate loading bar with continuous animation.',
            code: `/* Loading Bar - Indeterminate */
.loading-bar {
    width: 100%;
    height: 4px;
    background: #EADDFF;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
}

.loading-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: -50%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #6750A4, transparent);
    animation: loadingSlide 1.5s infinite;
}

@keyframes loadingSlide {
    0% { left: -50%; }
    100% { left: 100%; }
}`
        },
        {
            id: 'score-display',
            name: 'Score Display',
            nameZh: '分数显示',
            description: 'Animated score counter with celebration effect',
            previewId: 'score-display',
            prompt: 'Create an animated score display that counts up with pulse effect on complete.',
            code: `/* Score Display */
.score-display {
    font-size: 48px;
    font-weight: 900;
    color: #6750A4;
    font-family: monospace;
    position: relative;
}

.score-display.completed {
    animation: scorePulse 0.5s ease-out;
}

@keyframes scorePulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); color: #10b981; }
    100% { transform: scale(1); }
}

.score-label {
    font-size: 14px;
    color: #49454F;
    margin-top: 8px;
    text-transform: uppercase;
    letter-spacing: 2px;
}`
        },
        {
            id: 'countdown-timer',
            name: 'Countdown Timer',
            nameZh: '倒计时器',
            description: 'Circular countdown timer with animated stroke',
            previewId: 'countdown-timer',
            prompt: 'Create a countdown timer with circular progress and formatted time display.',
            code: `/* Countdown Timer */
.countdown {
    position: relative;
    width: 100px;
    height: 100px;
}

.countdown-circle {
    transform: rotate(-90deg);
}

.countdown-bg {
    fill: none;
    stroke: #EADDFF;
    stroke-width: 4;
}

.countdown-progress {
    fill: none;
    stroke: #6750A4;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: 283;
    transition: stroke-dashoffset 1s linear;
}

.countdown-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 700;
    color: #6750A4;
    font-family: monospace;
}

/* JS: Update every second */
const offset = 283 * (1 - timeLeft / totalTime);
progress.style.strokeDashoffset = offset;`
        },
        {
            id: 'animated-number',
            name: 'Animated Number',
            nameZh: '动态数字',
            description: 'Number that animates smoothly between values',
            previewId: 'animated-number',
            prompt: 'Create an animated number that transitions smoothly between different values.',
            code: `/* Animated Number */
.animated-number {
    font-size: 36px;
    font-weight: 700;
    color: #6750A4;
    font-family: monospace;
    transition: color 0.3s ease;
}

.animated-number.changed {
    animation: numberPop 0.4s ease-out;
}

@keyframes numberPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
}

/* JS: Animate between values */
function animateNumber(element, target, duration = 500) {
    const start = parseInt(element.textContent);
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (target - start) * easeOutQuad(progress);
        element.textContent = Math.round(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}`
        },
        {
            id: 'percentage-circle',
            name: 'Percentage Circle',
            nameZh: '百分比圆环',
            description: 'Donut chart showing percentage with animated fill',
            previewId: 'percentage-circle',
            prompt: 'Create a percentage donut chart with animated stroke and centered label.',
            code: `/* Percentage Circle */
.percentage-circle {
    position: relative;
    width: 100px;
    height: 100px;
}

.percentage-circle svg {
    transform: rotate(-90deg);
}

.perc-bg {
    fill: none;
    stroke: #EADDFF;
    stroke-width: 10;
}

.perc-fill {
    fill: none;
    stroke: url(#gradient);
    stroke-width: 10;
    stroke-linecap: round;
    stroke-dasharray: 251;
    stroke-dashoffset: 251;
    transition: stroke-dashoffset 1s ease-out;
}

.percentage-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    font-weight: 700;
    color: #6750A4;
}

/* JS */
const offset = 251 * (1 - percentage / 100);
fill.style.strokeDashoffset = offset;`
        }
    ];

    // ============================================
    // IMAGE EFFECTS DATA
    // ============================================
    const IMAGE_EFFECTS = [
        {
            id: 'image-zoom',
            name: 'Image Zoom',
            nameZh: '图片缩放',
            description: 'Smooth scale zoom effect on hover',
            previewId: 'image-zoom',
            prompt: 'Create an image zoom effect with smooth scale transition on hover.',
            code: `/* Image Zoom */
.image-zoom-container {
    overflow: hidden;
    border-radius: 12px;
}

.image-zoom-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-zoom-container:hover img {
    transform: scale(1.15);
}`
        },
        {
            id: 'image-filter',
            name: 'Image Filter',
            nameZh: '图片滤镜',
            description: 'CSS filter effects transition on hover',
            previewId: 'image-filter',
            prompt: 'Create an image with CSS filters that transition on hover (grayscale, blur, etc.).',
            code: `/* Image Filter */
.image-filter-container {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
}

.image-filter-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) brightness(0.8);
    transition: filter 0.4s ease;
}

.image-filter-container:hover img {
    filter: grayscale(0%) brightness(1);
}`
        },
        {
            id: 'grayscale-to-color',
            name: 'Grayscale to Color',
            nameZh: '灰度转彩色',
            description: 'Image transitions from grayscale to color on hover',
            previewId: 'grayscale-to-color',
            prompt: 'Create an image that starts grayscale and transitions to full color on hover.',
            code: `/* Grayscale to Color */
.grayscale-color {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
}

.grayscale-color img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.5s ease;
}

.grayscale-color:hover img {
    filter: grayscale(0%);
}`
        },
        {
            id: 'image-blur-in',
            name: 'Image Blur In',
            nameZh: '图片模糊淡入',
            description: 'Image transitions from blurred to sharp',
            previewId: 'image-blur-in',
            prompt: 'Create an image that loads blurred and sharpens with animation.',
            code: `/* Image Blur In */
.blur-in {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
}

.blur-in img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(10px);
    opacity: 0;
    transition: filter 0.8s ease, opacity 0.8s ease;
}

.blur-in.loaded img {
    filter: blur(0);
    opacity: 1;
}

/* JS */
img.addEventListener('load', () => {
    img.classList.add('loaded');
});`
        },
        {
            id: 'image-reveal',
            name: 'Image Reveal',
            nameZh: '图片揭示',
            description: 'Image reveals from behind a cover with slide animation',
            previewId: 'image-reveal',
            prompt: 'Create an image reveal effect with a sliding cover that uncovers the image.',
            code: `/* Image Reveal */
.image-reveal {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
}

.image-reveal img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-reveal::after {
    content: '';
    position: absolute;
    inset: 0;
    background: #6750A4;
    transform: translateY(0);
    transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
}

.image-reveal:hover::after {
    transform: translateY(-100%);
}`
        },
        {
            id: 'image-parallax',
            name: 'Image Parallax',
            nameZh: '图片视差',
            description: 'Image moves at different speed on mouse move',
            previewId: 'image-parallax',
            prompt: 'Create a parallax effect where image moves based on mouse position.',
            code: `/* Image Parallax */
.image-parallax {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
}

.image-parallax img {
    width: 110%;
    height: 110%;
    object-fit: cover;
    position: absolute;
    top: -5%;
    left: -5%;
    transition: transform 0.3s ease-out;
}

/* JS */
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    img.style.transform = \`translate(\${x * 10}px, \${y * 10}px)\`;
});`
        },
        {
            id: 'image-compare',
            name: 'Image Compare',
            nameZh: '图片对比',
            description: 'Before/after slider comparison',
            previewId: 'image-compare',
            prompt: 'Create an image comparison slider showing before and after states.',
            code: `/* Image Compare */
.image-compare {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
}

.image-compare img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-compare .after {
    clip-path: inset(0 50% 0 0);
    transition: clip-path 0.1s ease;
}

.compare-slider {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 3px;
    background: white;
    cursor: ew-resize;
    transform: translateX(-50%);
}

.compare-slider::after {
    content: '◀ ▶';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 8px;
    border-radius: 50%;
    font-size: 10px;
    white-space: nowrap;
}`
        },
        {
            id: 'image-gallery',
            name: 'Image Gallery',
            nameZh: '图片画廊',
            description: 'Thumbnail gallery with lightbox preview',
            previewId: 'image-gallery',
            prompt: 'Create an image gallery with thumbnails and expanded preview.',
            code: `/* Image Gallery */
.image-gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 8px;
}

.gallery-thumb {
    aspect-ratio: 1;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    background: linear-gradient(135deg, #6750A4, #9381FF);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-thumb:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(103, 80, 164, 0.4);
}

.gallery-thumb.active {
    outline: 3px solid #6750A4;
    outline-offset: 2px;
}`
        },
        {
            id: 'lightbox',
            name: 'Lightbox',
            nameZh: '灯箱效果',
            description: 'Full-screen image overlay modal',
            previewId: 'lightbox',
            prompt: 'Create a lightbox modal that shows full-screen image on click.',
            code: `/* Lightbox */
.lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 1000;
}

.lightbox-overlay.active {
    opacity: 1;
    pointer-events: auto;
}

.lightbox-overlay img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.lightbox-overlay.active img {
    transform: scale(1);
}

.lightbox-close {
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    font-size: 32px;
    cursor: pointer;
}`
        },
        {
            id: 'image-hover-effect',
            name: 'Image Hover Effect',
            nameZh: '图片悬停效果',
            description: 'Multi-layer hover with scale and overlay',
            previewId: 'image-hover-effect',
            prompt: 'Create an image with layered hover effects including scale, overlay, and text.',
            code: `/* Image Hover Effect */
.hover-effect {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    cursor: pointer;
}

.hover-effect img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-effect::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(103, 80, 164, 0.8), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
}

.hover-effect:hover img {
    transform: scale(1.1);
}

.hover-effect:hover::before {
    opacity: 1;
}

.hover-effect-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    color: white;
    transform: translateY(100%);
    transition: transform 0.4s ease;
}

.hover-effect:hover .hover-effect-caption {
    transform: translateY(0);
}`
        }
    ];

    // ============================================
    // SCROLLING EFFECTS DATA
    // ============================================
    const SCROLL_EFFECTS = [
        {
            id: 'scroll-progress',
            name: 'Scroll Progress',
            nameZh: '滚动进度条',
            description: 'Progress bar at top shows scroll position',
            previewId: 'scroll-progress',
            prompt: 'Create a fixed progress bar at the top of the page that fills based on scroll percentage.',
            code: `/* Scroll Progress Bar */
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: #EADDFF;
    z-index: 1000;
}

.scroll-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #6750A4, #9381FF);
    width: 0%;
    transition: width 0.1s linear;
}

/* JS */
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
});`
        },
        {
            id: 'parallax-scroll',
            name: 'Parallax Scroll',
            nameZh: '视差滚动',
            description: 'Background moves at different speed than foreground',
            previewId: 'parallax-scroll',
            prompt: 'Create a parallax effect where background elements move slower than foreground content on scroll.',
            code: `/* Parallax Scroll Effect */
.parallax-section {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
}

.parallax-bg {
    position: absolute;
    inset: -20%;
    background: radial-gradient(circle at 50% 50%, rgba(103, 80, 164, 0.2), transparent 70%);
    transform: translateY(0);
    will-change: transform;
}

/* JS */
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const parallaxOffset = (scrollY - lastScrollY) * 0.3;
    parallaxBg.style.transform = \`translateY(\${parseFloat(parallaxBg.style.transform.match(/-?\\d+\\.?\\d*/)?.[0] || 0) - parallaxOffset}px)\`;
    lastScrollY = scrollY;
}, { passive: true });`
        },
        {
            id: 'scroll-spy',
            name: 'Scroll Spy',
            nameZh: '滚动监听',
            description: 'Highlights navigation based on visible section',
            previewId: 'scroll-spy',
            prompt: 'Create a scroll spy that updates navigation highlighting based on which section is visible.',
            code: `/* Scroll Spy Navigation */
.scroll-nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
}

.nav-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #EADDFF;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    cursor: pointer;
}

.nav-dot.active {
    background: #6750A4;
    border-color: #6750A4;
    transform: scale(1.3);
}

/* JS */
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.nav-dot').forEach(dot => dot.classList.remove('active'));
            document.querySelector(\`.nav-dot[href="#\${entry.target.id}"]\`).classList.add('active');
        }
    });
}, { threshold: 0.5 });`
        },
        {
            id: 'scroll-reveal',
            name: 'Scroll Reveal',
            nameZh: '滚动揭示',
            description: 'Elements animate in as they enter viewport',
            previewId: 'scroll-reveal',
            prompt: 'Create scroll-triggered reveal animations where elements fade and slide in when entering viewport.',
            code: `/* Scroll Reveal Animation */
.reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

/* JS - Intersection Observer */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));`
        },
        {
            id: 'sticky-header',
            name: 'Sticky Header',
            nameZh: '粘性标题栏',
            description: 'Header sticks to top with style change on scroll',
            previewId: 'sticky-header',
            prompt: 'Create a header that sticks to top of page and changes appearance when scrolling.',
            code: `/* Sticky Header */
.site-header {
    position: sticky;
    top: 0;
    background: white;
    padding: 20px;
    transition: all 0.3s ease;
    z-index: 100;
    box-shadow: none;
}

.site-header.scrolled {
    padding: 12px 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

/* JS */
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    header.classList.toggle('scrolled', currentScroll > 50);
    lastScroll = currentScroll;
}, { passive: true });`
        },
        {
            id: 'scroll-snap',
            name: 'Scroll Snap',
            nameZh: '滚动捕捉',
            description: 'Content snaps to defined scroll positions',
            previewId: 'scroll-snap',
            prompt: 'Create horizontal scroll container that snaps to each section.',
            code: `/* Scroll Snap Container */
.snap-container {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
}

.snap-section {
    flex: 0 0 100vw;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Hide scrollbar */
.snap-container::-webkit-scrollbar {
    display: none;
}
.snap-container {
    scrollbar-width: none;
}`
        },
        {
            id: 'horizontal-scroll',
            name: 'Horizontal Scroll',
            nameZh: '水平滚动',
            description: 'Smooth horizontal scrolling with buttons',
            previewId: 'horizontal-scroll',
            prompt: 'Create a horizontal scrolling section with navigation buttons.',
            code: `/* Horizontal Scroll */
.horizontal-scroll {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    padding: 20px;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
}

.scroll-item {
    flex: 0 0 300px;
    height: 200px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Scroll Buttons */
.scroll-btn {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    background: #6750A4;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;
}

.scroll-btn.left { left: 20px; }
.scroll-btn.right { right: 20px; }`
        },
        {
            id: 'scroll-trigger',
            name: 'Scroll Trigger',
            nameZh: '滚动触发',
            description: 'Animations trigger when elements enter viewport',
            previewId: 'scroll-trigger',
            prompt: 'Create scroll-triggered animations using Intersection Observer.',
            code: `/* Scroll Trigger Animation */
.trigger-element {
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.trigger-element.in-view {
    opacity: 1;
    transform: scale(1);
}

/* JS Intersection Observer */
const triggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('in-view');
            }, Math.random() * 300);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.trigger-element').forEach(el => {
    triggerObserver.observe(el);
});`
        },
        {
            id: 'smooth-scroll',
            name: 'Smooth Scroll',
            nameZh: '平滑滚动',
            description: 'Smooth animated scrolling to anchors',
            previewId: 'smooth-scroll',
            prompt: 'Implement smooth scrolling when clicking anchor links.',
            code: `/* Smooth Scroll */
html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
}

/* OR JS-based smooth scroll for more control */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* For smoother cross-browser experience */
function smoothScrollTo(target, duration = 600) {
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, startPosition + distance * ease);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
}`
        },
        {
            id: 'scroll-indicator',
            name: 'Scroll Indicator',
            nameZh: '滚动指示器',
            description: 'Animated arrow prompting users to scroll',
            previewId: 'scroll-indicator',
            prompt: 'Create an animated scroll indicator at bottom of hero section.',
            code: `/* Scroll Indicator */
.scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    animation: fadeInUp 1s ease 1s both;
}

.scroll-indicator span {
    font-size: 12px;
    color: #49454F;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.scroll-arrow {
    width: 20px;
    height: 20px;
    border-right: 2px solid #6750A4;
    border-bottom: 2px solid #6750A4;
    transform: rotate(45deg);
    animation: scrollBounce 2s infinite;
}

@keyframes scrollBounce {
    0%, 20% { transform: rotate(45deg) translateY(0); }
    50% { transform: rotate(45deg) translateY(10px); }
    80%, 100% { transform: rotate(45deg) translateY(0); }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate(-50%, 20px);
    }
    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}`
        }
    ];

    // ============================================
    // LOADING STATES DATA
    // ============================================
    const LOADING_STATES = [
        {
            id: 'spinner',
            name: 'Spinner',
            nameZh: '旋转加载器',
            description: 'Classic circular spinning loader',
            previewId: 'spinner',
            prompt: 'Create a circular spinning loader with smooth rotation animation.',
            code: `/* Spinner Loader */
.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #EADDFF;
    border-top-color: #6750A4;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}`
        },
        {
            id: 'pulse-loader',
            name: 'Pulse Loader',
            nameZh: '脉冲加载器',
            description: 'Pulsing circle with scale and opacity animation',
            previewId: 'pulse-loader',
            prompt: 'Create a pulsing loader that scales up and down with opacity changes.',
            code: `/* Pulse Loader */
.pulse-loader {
    width: 40px;
    height: 40px;
    background: #6750A4;
    border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.2);
        opacity: 1;
    }
}`
        },
        {
            id: 'dot-loader',
            name: 'Dot Loader',
            nameZh: '点状加载器',
            description: 'Three dots with staggered bounce animation',
            previewId: 'dot-loader',
            prompt: 'Create a dot loader with three dots that bounce in sequence.',
            code: `/* Dot Loader */
.dot-loader {
    display: flex;
    gap: 8px;
}

.dot {
    width: 12px;
    height: 12px;
    background: #6750A4;
    border-radius: 50%;
    animation: dotBounce 1.4s ease-in-out infinite;
}

.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.16s; }
.dot:nth-child(3) { animation-delay: 0.32s; }

@keyframes dotBounce {
    0%, 80%, 100% {
        transform: scale(0.6);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}`
        },
        {
            id: 'skeleton-screen',
            name: 'Skeleton Screen',
            nameZh: '骨架屏',
            description: 'Content placeholders with shimmer animation',
            previewId: 'skeleton-screen',
            prompt: 'Create skeleton screen loaders that shimmer to indicate loading content.',
            code: `/* Skeleton Screen */
.skeleton {
    background: linear-gradient(
        90deg,
        #f0f0f0 25%,
        #e0e0e0 50%,
        #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* Usage examples */
.skeleton-text {
    height: 16px;
    margin-bottom: 8px;
}

.skeleton-title {
    height: 24px;
    width: 60%;
    margin-bottom: 16px;
}

.skeleton-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}`
        },
        {
            id: 'shimmer',
            name: 'Shimmer',
            nameZh: '闪光效果',
            description: 'Gradient shimmer sweeps across element',
            previewId: 'shimmer',
            prompt: 'Create a shimmer effect with gradient sweeping across content.',
            code: `/* Shimmer Effect */
.shimmer {
    position: relative;
    overflow: hidden;
    background: #f5f5f5;
}

.shimmer::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.6),
        transparent
    );
    animation: shimmerSlide 2s infinite;
}

@keyframes shimmerSlide {
    0% { left: -100%; }
    100% { left: 100%; }
}`
        },
        {
            id: 'progress-dots',
            name: 'Progress Dots',
            nameZh: '进度点',
            description: 'Row of dots lighting up in sequence',
            previewId: 'progress-dots',
            prompt: 'Create progress dots that light up one by one in a loop.',
            code: `/* Progress Dots */
.progress-dots {
    display: flex;
    gap: 8px;
}

.progress-dot {
    width: 10px;
    height: 10px;
    background: #EADDFF;
    border-radius: 50%;
    transition: background 0.3s ease;
}

.progress-dot.active {
    background: #6750A4;
}

/* JS Implementation */
let currentDot = 0;
const dots = document.querySelectorAll('.progress-dot');

setInterval(() => {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentDot].classList.add('active');
    currentDot = (currentDot + 1) % dots.length;
}, 500);`
        },
        {
            id: 'bounce-loader',
            name: 'Bounce Loader',
            nameZh: '弹跳加载器',
            description: 'Three balls bouncing in sequence',
            previewId: 'bounce-loader',
            prompt: 'Create a bounce loader with balls bouncing one after another.',
            code: `/* Bounce Loader */
.bounce-loader {
    display: flex;
    gap: 6px;
}

.bounce-ball {
    width: 14px;
    height: 14px;
    background: #6750A4;
    border-radius: 50%;
    animation: bounce 0.6s ease-in-out infinite;
}

.bounce-ball:nth-child(1) { animation-delay: 0s; }
.bounce-ball:nth-child(2) { animation-delay: 0.1s; }
.bounce-ball:nth-child(3) { animation-delay: 0.2s; }

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}`
        },
        {
            id: 'bar-loader',
            name: 'Bar Loader',
            nameZh: '条状加载器',
            description: 'Horizontal bars stretching in sequence',
            previewId: 'bar-loader',
            prompt: 'Create a bar loader with horizontal bars stretching animation.',
            code: `/* Bar Loader */
.bar-loader {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.bar {
    width: 60px;
    height: 6px;
    background: #6750A4;
    border-radius: 3px;
    animation: barStretch 1s ease-in-out infinite;
    transform-origin: left center;
}

.bar:nth-child(1) { animation-delay: 0s; }
.bar:nth-child(2) { animation-delay: 0.1s; }
.bar:nth-child(3) { animation-delay: 0.2s; }
.bar:nth-child(4) { animation-delay: 0.3s; }

@keyframes barStretch {
    0%, 100% { transform: scaleX(0.4); }
    50% { transform: scaleX(1); }
}`
        },
        {
            id: 'circular-progress',
            name: 'Circular Progress',
            nameZh: '环形进度',
            description: 'SVG circle with animated stroke',
            previewId: 'circular-progress',
            prompt: 'Create a circular progress indicator using SVG stroke animation.',
            code: `/* Circular Progress */
.circular-progress {
    position: relative;
    width: 80px;
    height: 80px;
}

.circular-progress svg {
    transform: rotate(-90deg);
}

.progress-bg {
    fill: none;
    stroke: #EADDFF;
    stroke-width: 8;
}

.progress-bar {
    fill: none;
    stroke: #6750A4;
    stroke-width: 8;
    stroke-linecap: round;
    stroke-dasharray: 220;
    stroke-dashoffset: 220;
    animation: circularLoad 2s ease-out forwards;
}

@keyframes circularLoad {
    to { stroke-dashoffset: 44; }
}

/* HTML */
<svg width="80" height="80">
    <circle class="progress-bg" cx="40" cy="40" r="35"/>
    <circle class="progress-bar" cx="40" cy="40" r="35"/>
</svg>`
        },
        {
            id: 'typing-indicator',
            name: 'Typing Indicator',
            nameZh: '输入指示器',
            description: 'Chat bubble with bouncing dots',
            previewId: 'typing-indicator',
            prompt: 'Create a typing indicator like in chat apps with bouncing dots.',
            code: `/* Typing Indicator */
.typing-indicator {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: #f0f0f0;
    border-radius: 18px;
    border-bottom-left-radius: 4px;
    width: fit-content;
}

.typing-dots {
    display: flex;
    gap: 4px;
}

.typing-dot {
    width: 8px;
    height: 8px;
    background: #6750A4;
    border-radius: 50%;
    animation: typingBounce 1.4s ease-in-out infinite;
}

.typing-dot:nth-child(1) { animation-delay: 0s; }
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-8px); }
}`
        },
        {
            id: 'wave-loader',
            name: 'Wave Loader',
            nameZh: '波浪加载器',
            description: 'Vertical bars creating wave motion',
            previewId: 'wave-loader',
            prompt: 'Create a wave loader with vertical bars animating like ocean waves.',
            code: `/* Wave Loader */
.wave-loader {
    display: flex;
    gap: 4px;
    align-items: center;
}

.wave-bar {
    width: 4px;
    height: 24px;
    background: #6750A4;
    border-radius: 2px;
    animation: wave 1.2s ease-in-out infinite;
}

.wave-bar:nth-child(1) { animation-delay: 0s; }
.wave-bar:nth-child(2) { animation-delay: 0.1s; }
.wave-bar:nth-child(3) { animation-delay: 0.2s; }
.wave-bar:nth-child(4) { animation-delay: 0.3s; }
.wave-bar:nth-child(5) { animation-delay: 0.4s; }

@keyframes wave {
    0%, 100% { transform: scaleY(0.4); }
    50% { transform: scaleY(1); }
}`
        },
        {
            id: 'infinity-loader',
            name: 'Infinity Loader',
            nameZh: '无限符号加载器',
            description: 'Animated infinity symbol path',
            previewId: 'infinity-loader',
            prompt: 'Create an infinity symbol loader with animated path drawing.',
            code: `/* Infinity Loader */
.infinity-loader {
    width: 60px;
    height: 30px;
}

.infinity-loader svg {
    width: 100%;
    height: 100%;
}

.infinity-path {
    fill: none;
    stroke: #6750A4;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 50;
    stroke-dashoffset: 50;
    animation: infinityDraw 2s ease-in-out infinite;
}

@keyframes infinityDraw {
    0% {
        stroke-dasharray: 0, 50;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 25, 50;
        stroke-dashoffset: -25;
    }
    100% {
        stroke-dasharray: 0, 50;
        stroke-dashoffset: -50;
    }
}

/* HTML */
<svg viewBox="0 0 60 30">
    <path class="infinity-path" d="M30,15 C30,15 24,8 18,8 C12,8 8,13 8,18 C8,23 13,23 18,18 C23,13 30,13 30,13 C30,13 36,8 42,8 C48,8 52,13 52,18 C52,23 47,23 42,18 C37,13 30,13 30,13"/>
</svg>`
        }
    ];

    // ============================================
    // SVG ANIMATION DATA
    // ============================================
    const SVG_ANIMATION = [
        {
            id: 'svg-draw',
            name: 'SVG Draw',
            nameZh: 'SVG描边动画',
            description: 'Path strokes animate like being drawn',
            previewId: 'svg-draw',
            prompt: 'Create SVG path drawing animation using stroke-dasharray and stroke-dashoffset.',
            code: `/* SVG Draw Animation */
.svg-draw path {
    fill: none;
    stroke: #6750A4;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawStroke 2s ease-in-out forwards;
}

@keyframes drawStroke {
    to {
        stroke-dashoffset: 0;
    }
}

/* Calculate path length in JS */
const path = document.querySelector('path');
const length = path.getTotalLength();
path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;`
        },
        {
            id: 'svg-morph',
            name: 'SVG Morph',
            nameZh: 'SVG变形动画',
            description: 'Shape morphs between different path forms',
            previewId: 'svg-morph',
            prompt: 'Create SVG shape morphing animation between different path data.',
            code: `/* SVG Morph Animation */
.svg-morph path {
    fill: #6750A4;
    transition: d 0.5s ease;
}

/* Manual morph with path data changes */
const shapes = [
    'M10,10 L40,10 L40,40 L10,40 Z',  // Square
    'M10,25 L25,10 L40,25 L25,40 Z',  // Diamond
    'M25,10 L40,40 L10,40 Z'          // Triangle
];

let index = 0;
setInterval(() => {
    index = (index + 1) % shapes.length;
    path.setAttribute('d', shapes[index]);
}, 1000);

/* Or use GSAP for smooth morphing:
gsap.to(path, {
    attr: { d: newShape },
    duration: 0.5,
    ease: 'power2.inOut'
});`
        },
        {
            id: 'svg-path-animation',
            name: 'SVG Path Animation',
            nameZh: 'SVG路径动画',
            description: 'Animated wave/path with continuous motion',
            previewId: 'svg-path-animation',
            prompt: 'Create animated SVG path with continuous wave motion.',
            code: `/* SVG Path Wave Animation */
.svg-wave path {
    fill: none;
    stroke: #9381FF;
    stroke-width: 2;
}

/* JS Animation Loop */
let offset = 0;
function animateWave() {
    offset += 0.05;
    let d = 'M0,50 ';

    for (let x = 0; x <= 300; x += 10) {
        const y = 50 + Math.sin(x * 0.02 + offset) * 20;
        d += \`L\${x},\${y} \`;
    }

    path.setAttribute('d', d);
    requestAnimationFrame(animateWave);
}

animateWave();`
        },
        {
            id: 'svg-stroke-dash',
            name: 'SVG Stroke Dash',
            nameZh: 'SVG虚线动画',
            description: 'Animated marching ants dashed line',
            previewId: 'svg-stroke-dash',
            prompt: 'Create SVG with animated dashed stroke using stroke-dashoffset.',
            code: `/* SVG Stroke Dash Animation */
.svg-dash circle {
    fill: none;
    stroke: #6750A4;
    stroke-width: 3;
    stroke-dasharray: 10, 5;
    animation: dashMove 1s linear infinite;
}

@keyframes dashMove {
    to {
        stroke-dashoffset: -15;
    }
}

/* Multiple dash patterns */
.svg-dash-complex path {
    stroke-dasharray: 20, 10, 5, 10;
    animation: dashMove 2s linear infinite;
}`
        },
        {
            id: 'svg-icon-anim',
            name: 'SVG Icon Animation',
            nameZh: 'SVG图标动画',
            description: 'Icons with scale, color, and transform effects',
            previewId: 'svg-icon-anim',
            prompt: 'Create animated SVG icons with scale, bounce, and color transitions.',
            code: `/* SVG Icon Animation */
.svg-icon {
    width: 48px;
    height: 48px;
    transition: transform 0.3s ease;
}

.svg-icon path {
    fill: #6750A4;
    transition: fill 0.3s ease, transform 0.3s ease;
    transform-origin: center;
}

.svg-icon:hover {
    transform: scale(1.1);
}

.svg-icon:hover path {
    fill: #9381FF;
    animation: iconBounce 0.5s ease;
}

@keyframes iconBounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}

/* Heart beat animation */
.heart-beat {
    animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    10%, 30% { transform: scale(1.1); }
    20%, 40% { transform: scale(1); }
}`
        },
        {
            id: 'svg-shape-shift',
            name: 'SVG Shape Shift',
            nameZh: 'SVG形状变换',
            description: 'Shape transitions between different forms',
            previewId: 'svg-shape-shift',
            prompt: 'Create SVG shape that shifts between square, circle, triangle, etc.',
            code: `/* SVG Shape Shift */
.shape-shift {
    fill: #6750A4;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* CSS morph for same-shape transitions */
.shape-shift.square {
    d: path('M10,10 L40,10 L40,40 L10,40 Z');
}

.shape-shift.circle {
    d: path('M25,10 A15,15 0 1,1 25,40 A15,15 0 1,1 25,10');
}

.shape-shift.triangle {
    d: path('M25,10 L40,40 L10,40 Z');
}

/* JS-based shape shifting */
const shapes = ['square', 'circle', 'triangle'];
let index = 0;

setInterval(() => {
    shape.classList.remove(shapes[index]);
    index = (index + 1) % shapes.length;
    shape.classList.add(shapes[index]);
}, 1500);`
        },
        {
            id: 'svg-fill-anim',
            name: 'SVG Fill Animation',
            nameZh: 'SVG填充动画',
            description: 'Fill animates from 0 to 100 percent',
            previewId: 'svg-fill-anim',
            prompt: 'Create SVG fill animation that fills shape gradually.',
            code: `/* SVG Fill Animation */
.svg-fill-animated {
    fill: none;
    stroke: #6750A4;
    stroke-width: 40;
    stroke-dasharray: 126; /* 2 * PI * r(20) ≈ 125.66 */
    stroke-dashoffset: 126;
    animation: fillCircle 2s ease-out forwards;
}

@keyframes fillCircle {
    to {
        stroke-dashoffset: 0;
    }
}

/* Percentage-based fill */
function setFillProgress(element, percent) {
    const circumference = 126;
    const offset = circumference - (percent / 100) * circumference;
    element.style.strokeDashoffset = offset;
}

/* Usage */
setFillProgress(circle, 75); // 75% filled`
        },
        {
            id: 'svg-line-draw',
            name: 'SVG Line Draw',
            nameZh: 'SVG线条绘制',
            description: 'Multiple lines draw in sequence',
            previewId: 'svg-line-draw',
            prompt: 'Create SVG with multiple lines that draw in sequence.',
            code: `/* SVG Line Draw - Sequential */
.svg-lines path {
    fill: none;
    stroke: #6750A4;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: drawLine 0.5s ease forwards;
}

.svg-lines path:nth-child(1) { animation-delay: 0s; }
.svg-lines path:nth-child(2) { animation-delay: 0.15s; }
.svg-lines path:nth-child(3) { animation-delay: 0.3s; }
.svg-lines path:nth-child(4) { animation-delay: 0.45s; }

@keyframes drawLine {
    to {
        stroke-dashoffset: 0;
    }
}

/* Get path length dynamically */
document.querySelectorAll('.svg-lines path').forEach((path, i) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.animationDelay = \`\${i * 0.15}s\`;
});`
        },
        {
            id: 'svg-rotate',
            name: 'SVG Rotate',
            nameZh: 'SVG旋转动画',
            description: 'Elements rotate continuously around center',
            previewId: 'svg-rotate',
            prompt: 'Create SVG with rotating elements and groups.',
            code: `/* SVG Rotate Animation */
.svg-rotate .rotating-element {
    transform-origin: center;
    animation: rotateSvg 3s linear infinite;
}

@keyframes rotateSvg {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* Counter-rotation example */
.svg-rotate .counter-rotate {
    animation: rotateSvg 3s linear infinite reverse;
}

/* Orbit animation */
.orbit-element {
    animation: orbit 4s linear infinite;
}

@keyframes orbit {
    from {
        transform: rotate(0deg) translateX(30px) rotate(0deg);
    }
    to {
        transform: rotate(360deg) translateX(30px) rotate(-360deg);
    }
}`
        },
        {
            id: 'svg-bounce',
            name: 'SVG Bounce',
            nameZh: 'SVG弹跳动画',
            description: 'Element bounces with squash and stretch',
            previewId: 'svg-bounce',
            prompt: 'Create SVG element with bouncing and squash-stretch animation.',
            code: `/* SVG Bounce Animation */
.svg-bounce {
    animation: bounceSvg 0.6s ease-in-out infinite;
    transform-origin: bottom center;
}

@keyframes bounceSvg {
    0%, 100% {
        transform: translateY(0) scaleY(1);
    }
    30% {
        transform: translateY(-20px) scaleY(1.1);
    }
    50% {
        transform: translateY(-25px) scaleY(1);
    }
    80% {
        transform: translateY(0) scaleY(0.9);
    }
}

/* Ball drop with squash */
.ball-drop {
    animation: ballDrop 1s ease-in infinite;
    transform-origin: bottom center;
}

@keyframes ballDrop {
    0% {
        transform: translateY(-50px) scale(1, 1);
    }
    60% {
        transform: translateY(0) scale(1.1, 0.9);
    }
    80% {
        transform: translateY(-15px) scale(0.95, 1.05);
    }
    100% {
        transform: translateY(0) scale(1, 1);
    }
}`
        }
    ];

    // ============================================
    // MICRO INTERACTIONS DATA
    // ============================================
    const MICRO_INTERACTIONS = [
        {
            id: 'button-ripple',
            name: 'Button Ripple',
            nameZh: '按钮涟漪',
            description: 'Material Design ripple effect on click',
            previewId: 'button-ripple',
            prompt: 'Create a Material Design ripple effect that radiates from click position on buttons.',
            code: `/* Button Ripple Effect */
.ripple-btn {
    position: relative;
    overflow: hidden;
}

.ripple-btn .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: rippleAnim 0.6s linear;
    pointer-events: none;
}

@keyframes rippleAnim {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* JS */
button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});`
        },
        {
            id: 'checkbox-anim',
            name: 'Checkbox Animation',
            nameZh: '复选框动画',
            description: 'Smooth checkbox with animated checkmark',
            previewId: 'checkbox-anim',
            prompt: 'Create animated checkbox with smooth background fill and checkmark draw.',
            code: `/* Animated Checkbox */
.animated-checkbox {
    position: relative;
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.checkbox-input {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.checkbox-box {
    width: 24px;
    height: 24px;
    border: 2px solid #6750A4;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.checkbox-check {
    width: 12px;
    height: 12px;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(45deg) scale(0);
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.checkbox-input:checked + .checkbox-box {
    background: #6750A4;
}

.checkbox-input:checked + .checkbox-box .checkbox-check {
    transform: rotate(45deg) scale(1);
}`
        },
        {
            id: 'radio-anim',
            name: 'Radio Animation',
            nameZh: '单选框动画',
            description: 'Radio button with animated dot',
            previewId: 'radio-anim',
            prompt: 'Create animated radio button with smooth dot scale animation.',
            code: `/* Animated Radio Button */
.animated-radio {
    position: relative;
    cursor: pointer;
}

.radio-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.radio-outer {
    width: 24px;
    height: 24px;
    border: 2px solid #6750A4;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.radio-inner {
    width: 10px;
    height: 10px;
    background: #6750A4;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.radio-input:checked + .radio-outer {
    border-color: #9381FF;
}

.radio-input:checked + .radio-outer .radio-inner {
    transform: scale(1);
}`
        },
        {
            id: 'toggle-switch',
            name: 'Toggle Switch',
            nameZh: '切换开关',
            description: 'iOS-style toggle with smooth animation',
            previewId: 'toggle-switch',
            prompt: 'Create an iOS-style toggle switch with smooth sliding animation.',
            code: `/* Toggle Switch */
.toggle-switch {
    position: relative;
    width: 52px;
    height: 28px;
    background: #e0e0e0;
    border-radius: 14px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.toggle-switch.active {
    background: #6750A4;
}

.toggle-knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.active .toggle-knob {
    transform: translateX(24px);
}

/* JS */
toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
});`
        },
        {
            id: 'input-focus',
            name: 'Input Focus',
            nameZh: '输入框聚焦',
            description: 'Animated underline/border on input focus',
            previewId: 'input-focus',
            prompt: 'Create input field with animated underline that expands on focus.',
            code: `/* Input Focus Animation */
.input-wrapper {
    position: relative;
    margin-bottom: 20px;
}

.animated-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
}

.input-underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: #6750A4;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

.animated-input:focus {
    border-color: #6750A4;
}

.animated-input:focus + .input-underline {
    transform: scaleX(1);
}`
        },
        {
            id: 'hover-lift',
            name: 'Hover Lift',
            nameZh: '悬停抬起',
            description: 'Element lifts up with shadow on hover',
            previewId: 'hover-lift',
            prompt: 'Create hover effect where card lifts up with enhanced shadow.',
            code: `/* Hover Lift Effect */
.lift-card {
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.lift-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* For more dramatic effect */
.lift-card-2 {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.lift-card-2:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 40px rgba(103, 80, 164, 0.2);
}`
        },
        {
            id: 'click-shrink',
            name: 'Click Shrink',
            nameZh: '点击收缩',
            description: 'Button shrinks briefly on click',
            previewId: 'click-shrink',
            prompt: 'Create button that briefly shrinks when clicked for tactile feedback.',
            code: `/* Click Shrink Effect */
.shrink-btn {
    padding: 12px 24px;
    background: #6750A4;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.1s ease;
}

.shrink-btn:active {
    transform: scale(0.95);
}

/* More pronounced version */
.shrink-btn-2 {
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.shrink-btn-2:active {
    transform: scale(0.9);
}

/* Using animation */
@keyframes shrink {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(0.92); }
}

.shrink-btn.animating:active {
    animation: shrink 0.2s ease;
}`
        },
        {
            id: 'like-button',
            name: 'Like Button',
            nameZh: '点赞按钮',
            description: 'Heart animation with counter increment',
            previewId: 'like-button',
            prompt: 'Create like button with heart pop animation and counter.',
            code: `/* Like Button */
.like-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #f0f0f0;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.like-button.liked {
    background: #ffe4e4;
}

.heart-icon {
    font-size: 20px;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.like-button.liked .heart-icon {
    color: #ef4444;
    animation: heartPop 0.4s ease;
}

@keyframes heartPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
}

.like-count {
    font-weight: 600;
    min-width: 20px;
}

/* JS */
let liked = false;
let count = 0;

likeBtn.addEventListener('click', () => {
    liked = !liked;
    count += liked ? 1 : -1;
    likeBtn.classList.toggle('liked', liked);
    heartIcon.textContent = liked ? '♥' : '♡';
    countEl.textContent = count;
});`
        },
        {
            id: 'star-rating',
            name: 'Star Rating',
            nameZh: '星级评分',
            description: 'Interactive stars with hover and selection',
            previewId: 'star-rating',
            prompt: 'Create star rating component with hover preview and click selection.',
            code: `/* Star Rating */
.star-rating {
    display: flex;
    gap: 4px;
}

.star {
    font-size: 24px;
    color: #e0e0e0;
    cursor: pointer;
    transition: all 0.2s ease;
}

.star:hover,
.star.hovered {
    color: #fbbf24;
    transform: scale(1.1);
}

.star.selected {
    color: #fbbf24;
}

/* JS Implementation */
const stars = document.querySelectorAll('.star');
let currentRating = 0;

stars.forEach((star, index) => {
    star.addEventListener('mouseenter', () => {
        highlightStars(index + 1);
    });

    star.addEventListener('mouseleave', () => {
        highlightStars(currentRating);
    });

    star.addEventListener('click', () => {
        currentRating = index + 1;
        star.classList.add('selected');
        animateStar(star);
    });
});

function highlightStars(count) {
    stars.forEach((star, i) => {
        star.classList.toggle('hovered', i < count);
    });
}

function animateStar(star) {
    star.style.transform = 'scale(1.3)';
    setTimeout(() => {
        star.style.transform = 'scale(1)';
    }, 200);
}`
        },
        {
            id: 'quantity-spinner',
            name: 'Quantity Spinner',
            nameZh: '数量选择器',
            description: 'Plus/minus buttons with value display',
            previewId: 'quantity-spinner',
            prompt: 'Create quantity selector with increment/decrement buttons.',
            code: `/* Quantity Spinner */
.quantity-spinner {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 4px;
}

.spinner-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: #f0f0f0;
    border-radius: 6px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.spinner-btn:hover {
    background: #e0e0e0;
}

.spinner-btn:active {
    transform: scale(0.92);
}

.spinner-value {
    min-width: 40px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
}

/* JS */
let quantity = 1;

minusBtn.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        updateValue();
    }
});

plusBtn.addEventListener('click', () => {
    quantity++;
    updateValue();
});

function updateValue() {
    valueEl.textContent = quantity;
    valueEl.style.transform = 'scale(1.1)';
    setTimeout(() => valueEl.style.transform = 'scale(1)', 150);
}`
        },
        {
            id: 'dropdown-anim',
            name: 'Dropdown Animation',
            nameZh: '下拉菜单动画',
            description: 'Smooth dropdown with fade and slide',
            previewId: 'dropdown-anim',
            prompt: 'Create dropdown menu with smooth fade and slide animation.',
            code: `/* Animated Dropdown */
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-trigger {
    padding: 10px 16px;
    background: #6750A4;
    color: white;
    border-radius: 8px;
    cursor: pointer;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    min-width: 160px;
    background: white;
    border-radius: 8px;
    padding: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
    pointer-events: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: top left;
}

.dropdown.open .dropdown-menu {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
}

.dropdown-item {
    padding: 10px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease;
}

.dropdown-item:hover {
    background: #f0f0f0;
}

/* JS */
dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
});

document.addEventListener('click', () => {
    dropdown.classList.remove('open');
});`
        },
        {
            id: 'tab-indicator',
            name: 'Tab Indicator',
            nameZh: '标签指示器',
            description: 'Sliding indicator for active tab',
            previewId: 'tab-indicator',
            prompt: 'Create tabs with sliding indicator that follows active tab.',
            code: `/* Tab Indicator */
.tabs-container {
    position: relative;
    display: flex;
    gap: 4px;
    padding: 4px;
    background: #f0f0f0;
    border-radius: 10px;
}

.tab {
    position: relative;
    padding: 10px 20px;
    z-index: 1;
    cursor: pointer;
    transition: color 0.3s ease;
}

.tab-indicator {
    position: absolute;
    bottom: 4px;
    left: 4px;
    height: calc(100% - 8px);
    background: #6750A4;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
}

.tab.active {
    color: white;
}

/* JS */
const tabs = document.querySelectorAll('.tab');
const indicator = document.querySelector('.tab-indicator');

function moveIndicator(tab) {
    indicator.style.width = tab.offsetWidth + 'px';
    indicator.style.left = (tab.offsetLeft - 4) + 'px';
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        moveIndicator(tab);
    });
});

// Initialize
moveIndicator(tabs[0]);`
        }
    ];

    // ============================================
    // LAYOUT PATTERNS DATA
    // ============================================
    const LAYOUT_PATTERNS = [
        {
            id: 'masonry-grid',
            name: 'Masonry Grid',
            nameZh: '瀑布流布局',
            description: 'Pinterest-style grid with items of varying heights',
            previewId: 'masonry-grid',
            prompt: 'Create a masonry grid layout where items arrange vertically based on height.',
            code: `/* Masonry Grid */
.masonry-grid {
    column-count: 3;
    column-gap: 16px;
}

.masonry-item {
    break-inside: avoid;
    margin-bottom: 16px;
    background: white;
    border-radius: 12px;
    overflow: hidden;
}

/* CSS Grid alternative */
.masonry-grid-alt {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 10px;
    gap: 16px;
}

.masonry-item-alt {
    grid-row-end: span var(--span);
    background: white;
    border-radius: 12px;
}`
        },
        {
            id: 'bento-layout',
            name: 'Bento Layout',
            nameZh: '便当盒布局',
            description: 'Grid-based dashboard with cells of varying sizes',
            previewId: 'bento-layout',
            prompt: 'Create a bento box layout with different sized cells in a grid.',
            code: `/* Bento Layout */
.bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 120px);
    gap: 16px;
}

.bento-cell {
    background: white;
    border-radius: 16px;
    padding: 20px;
}

.bento-cell.large {
    grid-column: span 2;
    grid-row: span 2;
}

.bento-cell.wide {
    grid-column: span 2;
}

.bento-cell.tall {
    grid-row: span 2;
}`
        },
        {
            id: 'card-grid',
            name: 'Card Grid',
            nameZh: '卡片网格',
            description: 'Responsive grid of evenly-sized cards',
            previewId: 'card-grid',
            prompt: 'Create a responsive card grid that adapts columns to viewport width.',
            code: `/* Card Grid */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
}

.card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
    .card-grid {
        grid-template-columns: 1fr;
    }
}`
        },
        {
            id: 'split-view',
            name: 'Split View',
            nameZh: '分屏视图',
            description: 'Two-column layout with adjustable divider',
            previewId: 'split-view',
            prompt: 'Create a split view layout with two resizable panels.',
            code: `/* Split View */
.split-view {
    display: flex;
    height: 100vh;
}

.split-panel {
    flex: 1;
    overflow: auto;
    padding: 20px;
}

.split-divider {
    width: 4px;
    background: #e0e0e0;
    cursor: col-resize;
    transition: background 0.2s ease;
}

.split-divider:hover,
.split-divider.active {
    background: #6750A4;
}

/* JS for resizable split */
let isResizing = false;

divider.addEventListener('mousedown', (e) => {
    isResizing = true;
    divider.classList.add('active');
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const containerWidth = splitView.offsetWidth;
    const leftWidth = e.clientX - splitView.offsetLeft;
    leftPanel.style.flex = 'none';
    leftPanel.style.width = leftWidth + 'px';
});

document.addEventListener('mouseup', () => {
    isResizing = false;
    divider.classList.remove('active');
});`
        },
        {
            id: 'stacked-cards',
            name: 'Stacked Cards',
            nameZh: '堆叠卡片',
            description: 'Cards stacked with visible edges',
            previewId: 'stacked-cards',
            prompt: 'Create stacked cards with edges visible and interactive.',
            code: `/* Stacked Cards */
.stacked-cards {
    position: relative;
    width: 320px;
    height: 200px;
    margin: 40px auto;
}

.stacked-card {
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.stacked-card:nth-child(1) { z-index: 3; transform: translateY(0) scale(1); }
.stacked-card:nth-child(2) { z-index: 2; transform: translateY(12px) scale(0.96); }
.stacked-card:nth-child(3) { z-index: 1; transform: translateY(24px) scale(0.92); }

.stacked-cards:hover .stacked-card:nth-child(1) { transform: translateY(-16px) scale(1.02); }
.stacked-cards:hover .stacked-card:nth-child(2) { transform: translateY(0) scale(0.98); }
.stacked-cards:hover .stacked-card:nth-child(3) { transform: translateY(12px) scale(0.94); }`
        },
        {
            id: 'overlapping-grid',
            name: 'Overlapping Grid',
            nameZh: '重叠网格',
            description: 'Grid items with overlapping edges',
            previewId: 'overlapping-grid',
            prompt: 'Create a grid where items overlap slightly.',
            code: `/* Overlapping Grid */
.overlap-grid {
    display: flex;
    justify-content: center;
    gap: -12px;
}

.overlap-item {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #6750A4, #9381FF);
    border-radius: 50%;
    margin-left: -12px;
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, z-index 0s;
}

.overlap-item:first-child {
    margin-left: 0;
}

.overlap-item:hover {
    transform: scale(1.15);
    z-index: 10;
}`
        },
        {
            id: 'featured-layout',
            name: 'Featured Layout',
            nameZh: '特色布局',
            description: 'Hero section with featured content',
            previewId: 'featured-layout',
            prompt: 'Create a layout with a large featured item and smaller supporting items.',
            code: `/* Featured Layout */
.featured-layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: repeat(2, 150px);
    gap: 16px;
}

.featured-main {
    grid-row: span 2;
    background: linear-gradient(135deg, #6750A4, #9381FF);
    border-radius: 16px;
    color: white;
    padding: 32px;
}

.featured-sub {
    background: white;
    border-radius: 16px;
    padding: 20px;
}

/* Responsive */
@media (max-width: 768px) {
    .featured-layout {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }
    .featured-main {
        grid-row: span 1;
    }
}`
        },
        {
            id: 'staggered-grid',
            name: 'Staggered Grid',
            nameZh: '交错网格',
            description: 'Grid with items offset in alternating rows',
            previewId: 'staggered-grid',
            prompt: 'Create a grid where alternating rows are offset.',
            code: `/* Staggered Grid */
.staggered-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.staggered-item {
    width: calc(33.333% - 11px);
    height: 120px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.staggered-item:nth-child(3n+2) {
    transform: translateY(40px);
}

@media (max-width: 768px) {
    .staggered-item {
        width: calc(50% - 8px);
    }
    .staggered-item:nth-child(3n+2) {
        transform: none;
    }
    .staggered-item:nth-child(2n) {
        transform: translateY(20px);
    }
}`
        }
    ];

    // ============================================
    // FILTER EFFECTS DATA
    // ============================================
    const FILTER_EFFECTS = [
        {
            id: 'blur-filter',
            name: 'Blur Filter',
            nameZh: '模糊滤镜',
            description: 'CSS blur effect with animation',
            previewId: 'blur-filter',
            prompt: 'Create blur filter effect that animates on hover.',
            code: `/* Blur Filter */
.blur-element {
    filter: blur(0px);
    transition: filter 0.5s ease;
}

.blur-element:hover {
    filter: blur(4px);
}

/* Animated blur */
@keyframes blurIn {
    from {
        filter: blur(10px);
        opacity: 0;
    }
    to {
        filter: blur(0px);
        opacity: 1;
    }
}

.blur-in {
    animation: blurIn 0.6s ease-out forwards;
}`
        },
        {
            id: 'brightness-filter',
            name: 'Brightness Filter',
            nameZh: '亮度滤镜',
            description: 'Adjust brightness with CSS filter',
            previewId: 'brightness-filter',
            prompt: 'Create brightness filter that adjusts element lightness.',
            code: `/* Brightness Filter */
.brightness-element {
    filter: brightness(1);
    transition: filter 0.3s ease;
}

.brightness-element:hover {
    filter: brightness(1.3);
}

/* Darken on hover */
.brightness-element.dim:hover {
    filter: brightness(0.7);
}

/* Pulse brightness */
@keyframes brightnessPulse {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.5); }
}

.brightness-pulse {
    animation: brightnessPulse 2s ease-in-out infinite;
}`
        },
        {
            id: 'contrast-filter',
            name: 'Contrast Filter',
            nameZh: '对比度滤镜',
            description: 'Adjust contrast for visual emphasis',
            previewId: 'contrast-filter',
            prompt: 'Create contrast filter effect for visual emphasis.',
            code: `/* Contrast Filter */
.contrast-element {
    filter: contrast(1);
    transition: filter 0.3s ease;
}

.contrast-element:hover {
    filter: contrast(1.5);
}

/* High contrast for accessibility */
.high-contrast {
    filter: contrast(2);
}

/* Dramatic contrast */
@keyframes contrastPop {
    0% { filter: contrast(1); }
    50% { filter: contrast(2); }
    100% { filter: contrast(1); }
}

.contrast-pop:hover {
    animation: contrastPop 0.4s ease;
}`
        },
        {
            id: 'saturate-filter',
            name: 'Saturate Filter',
            nameZh: '饱和度滤镜',
            description: 'Adjust color saturation intensity',
            previewId: 'saturate-filter',
            prompt: 'Create saturate filter that adjusts color intensity.',
            code: `/* Saturate Filter */
.saturate-element {
    filter: saturate(1);
    transition: filter 0.3s ease;
}

.saturate-element:hover {
    filter: saturate(2);
}

/* Desaturate for grayscale look */
.desaturate {
    filter: saturate(0);
}

/* Vivid colors */
.vivid {
    filter: saturate(2.5);
}

/* Cycle saturation */
@keyframes saturateCycle {
    0%, 100% { filter: saturate(0.5); }
    50% { filter: saturate(2); }
}

.saturate-cycle {
    animation: saturateCycle 3s ease-in-out infinite;
}`
        },
        {
            id: 'hue-rotate-filter',
            name: 'Hue Rotate Filter',
            nameZh: '色相旋转滤镜',
            description: 'Rotate colors around the color wheel',
            previewId: 'hue-rotate-filter',
            prompt: 'Create hue-rotate filter for color shifting effect.',
            code: `/* Hue Rotate Filter */
.hue-element {
    filter: hue-rotate(0deg);
    transition: filter 0.3s ease;
}

.hue-element:hover {
    filter: hue-rotate(90deg);
}

/* Continuous rotation */
@keyframes hueSpin {
    from { filter: hue-rotate(0deg); }
    to { filter: hue-rotate(360deg); }
}

.hue-spin {
    animation: hueSpin 4s linear infinite;
}

/* Subtle shift */
.hue-shift {
    filter: hue-rotate(15deg);
}`
        },
        {
            id: 'invert-filter',
            name: 'Invert Filter',
            nameZh: '反色滤镜',
            description: 'Invert colors for negative effect',
            previewId: 'invert-filter',
            prompt: 'Create invert filter for dark/light mode toggle.',
            code: `/* Invert Filter */
.invert-element {
    filter: invert(0);
    transition: filter 0.3s ease;
}

.invert-element:hover {
    filter: invert(1);
}

/* Dark mode toggle */
.dark-mode {
    filter: invert(1) hue-rotate(180deg);
}

.dark-mode img {
    filter: invert(1) hue-rotate(180deg);
}

/* Partial invert */
.invert-partial {
    filter: invert(0.5);
}`
        },
        {
            id: 'sepia-filter',
            name: 'Sepia Filter',
            nameZh: '复古滤镜',
            description: 'Vintage sepia tone effect',
            previewId: 'sepia-filter',
            prompt: 'Create sepia filter for vintage photo effect.',
            code: `/* Sepia Filter */
.sepia-element {
    filter: sepia(0);
    transition: filter 0.5s ease;
}

.sepia-element:hover {
    filter: sepia(1);
}

/* Always sepia */
.vintage {
    filter: sepia(0.8);
}

/* Fade to sepia */
@keyframes sepiaFade {
    from { filter: sepia(0); }
    to { filter: sepia(1); }
}

.sepia-fade {
    animation: sepiaFade 1s ease forwards;
}`
        },
        {
            id: 'grayscale-filter',
            name: 'Grayscale Filter',
            nameZh: '灰度滤镜',
            description: 'Convert to black and white',
            previewId: 'grayscale-filter',
            prompt: 'Create grayscale filter for B&W effect.',
            code: `/* Grayscale Filter */
.grayscale-element {
    filter: grayscale(0);
    transition: filter 0.5s ease;
}

.grayscale-element:hover {
    filter: grayscale(1);
}

/* Always grayscale */
.bw-photo {
    filter: grayscale(1);
}

/* Color on hover */
.color-reveal {
    filter: grayscale(1);
    transition: filter 0.4s ease;
}

.color-reveal:hover {
    filter: grayscale(0);
}

/* Fade to grayscale */
@keyframes grayscaleFade {
    from { filter: grayscale(0); }
    to { filter: grayscale(1); }
}

.grayscale-fade {
    animation: grayscaleFade 1s ease forwards;
}`
        }
    ];

    // ============================================
    // BUTTON ANIMATIONS DATA
    // ============================================
    const BUTTON_ANIMATIONS = [
        {
            id: 'glow-button',
            name: 'Glow Button',
            nameZh: '发光按钮',
            description: 'Button with glowing shadow on hover',
            previewId: 'glow-button',
            prompt: 'Create a button that glows with a colored shadow when hovered.',
            code: `/* Glow Button */
.glow-btn {
    padding: 14px 28px;
    background: #6750A4;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.glow-btn:hover {
    box-shadow: 0 0 20px rgba(103, 80, 164, 0.6),
                0 0 40px rgba(103, 80, 164, 0.4),
                0 0 60px rgba(103, 80, 164, 0.2);
    transform: translateY(-2px);
}

/* Multi-colored glow */
.glow-btn-colorful:hover {
    box-shadow:
        0 0 20px rgba(103, 80, 164, 0.6),
        0 0 40px rgba(147, 129, 255, 0.4),
        0 0 60px rgba(183, 148, 246, 0.2);
}`
        },
        {
            id: 'slide-button',
            name: 'Slide Button',
            nameZh: '滑动按钮',
            description: 'Background slides in from direction on hover',
            previewId: 'slide-button',
            prompt: 'Create button where background color slides in on hover.',
            code: `/* Slide Button */
.slide-btn {
    position: relative;
    padding: 14px 28px;
    background: #6750A4;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    z-index: 1;
}

.slide-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #9381FF;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: -1;
}

.slide-btn:hover::before {
    transform: translateX(0);
}

/* Slide from different directions */
.slide-from-top::before {
    transform: translateY(-100%);
}

.slide-from-top:hover::before {
    transform: translateY(0);
}`
        },
        {
            id: 'fill-button',
            name: 'Fill Button',
            nameZh: '填充按钮',
            description: 'Button fills from center on hover',
            previewId: 'fill-button',
            prompt: 'Create button that fills with color from center on hover.',
            code: `/* Fill Button */
.fill-btn {
    position: relative;
    padding: 14px 28px;
    color: #6750A4;
    background: transparent;
    border: 2px solid #6750A4;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    z-index: 1;
    transition: color 0.3s ease;
}

.fill-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: #6750A4;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
    z-index: -1;
}

.fill-btn:hover {
    color: white;
}

.fill-btn:hover::before {
    width: 300px;
    height: 300px;
}`
        },
        {
            id: 'border-button',
            name: 'Border Button',
            nameZh: '边框按钮',
            description: 'Animated border draws around button',
            previewId: 'border-button',
            prompt: 'Create button with animated border that draws on hover.',
            code: `/* Border Button */
.border-btn {
    position: relative;
    padding: 14px 28px;
    background: transparent;
    color: #6750A4;
    border: none;
    font-weight: 600;
    cursor: pointer;
}

.border-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #6750A4;
    border-radius: 8px;
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    transition: clip-path 0.4s ease;
}

.border-btn:hover::before {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

/* SVG version for smoother animation */
.border-svg {
    position: relative;
}

.border-svg svg {
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
}

.border-svg rect {
    fill: none;
    stroke: #6750A4;
    stroke-width: 2;
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
    transition: stroke-dashoffset 0.5s ease;
}

.border-svg:hover rect {
    stroke-dashoffset: 0;
}`
        },
        {
            id: 'ripple-button',
            name: 'Ripple Button',
            nameZh: '涟漪按钮',
            description: 'Material Design ripple effect on click',
            previewId: 'ripple-button',
            prompt: 'Create button with ripple effect emanating from click position.',
            code: `/* Ripple Button */
.ripple-btn {
    position: relative;
    padding: 14px 28px;
    background: #6750A4;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: rippleAnim 0.6s linear;
    pointer-events: none;
}

@keyframes rippleAnim {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* JS */
button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = e.clientX - rect.left + 'px';
    ripple.style.top = e.clientY - rect.top + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});`
        },
        {
            id: 'bounce-button',
            name: 'Bounce Button',
            nameZh: '弹跳按钮',
            description: 'Button bounces on hover',
            previewId: 'bounce-button',
            prompt: 'Create button with bounce animation on hover.',
            code: `/* Bounce Button */
.bounce-btn {
    padding: 14px 28px;
    background: #6750A4;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
}

.bounce-btn:hover {
    animation: bounce 0.5s ease;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-8px); }
    50% { transform: translateY(-4px); }
    75% { transform: translateY(-2px); }
}

/* Continuous bounce */
.bounce-continuous {
    animation: bounce 1s ease infinite;
}`
        },
        {
            id: 'flip-button',
            name: 'Flip Button',
            nameZh: '翻转按钮',
            description: 'Button flips to reveal back content',
            previewId: 'flip-button',
            prompt: 'Create button that flips like a card to show reverse side.',
            code: `/* Flip Button */
.flip-btn-wrapper {
    perspective: 200px;
}

.flip-btn {
    position: relative;
    width: 120px;
    height: 50px;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    cursor: pointer;
}

.flip-btn.flipped {
    transform: rotateY(180deg);
}

.flip-front,
.flip-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
}

.flip-front {
    background: #6750A4;
    color: white;
}

.flip-back {
    background: #9381FF;
    color: white;
    transform: rotateY(180deg);
}

/* JS */
flipBtn.addEventListener('click', () => {
    flipBtn.classList.toggle('flipped');
});`
        },
        {
            id: 'rotate-arrow',
            name: 'Rotate Arrow',
            nameZh: '旋转箭头',
            description: 'Arrow/icon rotates on hover',
            previewId: 'rotate-arrow',
            prompt: 'Create button with arrow that rotates on hover.',
            code: `/* Rotate Arrow Button */
.arrow-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background: #6750A4;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
}

.arrow-btn .arrow {
    transition: transform 0.3s ease;
    display: inline-block;
}

.arrow-btn:hover .arrow {
    transform: rotate(180deg);
}

/* Rotate clockwise */
.arrow-btn:hover .arrow.clockwise {
    transform: rotate(90deg);
}

/* Scale with rotation */
.arrow-btn:hover .arrow.scale-rotate {
    transform: rotate(180deg) scale(1.2);
}`
        },
        {
            id: 'shrink-grow',
            name: 'Shrink Grow',
            nameZh: '缩放按钮',
            description: 'Button shrinks on click, grows on release',
            previewId: 'shrink-grow',
            prompt: 'Create button with shrink/grow animation on click.',
            code: `/* Shrink Grow Button */
.shrink-grow-btn {
    padding: 14px 28px;
    background: #6750A4;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.1s ease;
}

.shrink-grow-btn:active {
    transform: scale(0.92);
}

.shrink-grow-btn:hover {
    transform: scale(1.02);
}

/* More dramatic version */
.sharp-press {
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.sharp-press:active {
    transform: scale(0.85);
}

.sharp-press:hover {
    transform: scale(1.05);
}`
        },
        {
            id: 'shake-button',
            name: 'Shake Button',
            nameZh: '抖动按钮',
            description: 'Button shakes on hover',
            previewId: 'shake-button',
            prompt: 'Create button that shakes when hovered.',
            code: `/* Shake Button */
.shake-btn {
    padding: 14px 28px;
    background: #6750A4;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
}

.shake-btn:hover {
    animation: shake 0.5s ease;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
}

/* Vigorous shake */
@keyframes shakeHard {
    0%, 100% { transform: translateX(0) rotate(0); }
    25% { transform: translateX(-8px) rotate(-5deg); }
    75% { transform: translateX(8px) rotate(5deg); }
}

.shake-btn-hard:hover {
    animation: shakeHard 0.4s ease;
}`
        },
        {
            id: 'pulse-button',
            name: 'Pulse Button',
            nameZh: '脉冲按钮',
            description: 'Button pulses with expanding ring',
            previewId: 'pulse-button',
            prompt: 'Create button with pulsing animation on hover.',
            code: `/* Pulse Button */
.pulse-btn {
    padding: 14px 28px;
    background: #6750A4;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
}

.pulse-btn:hover {
    animation: pulse 1.5s ease infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(103, 80, 164, 0.7);
    }
    70% {
        transform: scale(1.05);
        box-shadow: 0 0 0 15px rgba(103, 80, 164, 0);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(103, 80, 164, 0);
    }
}

/* Heartbeat pulse */
@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    14% { transform: scale(1.1); }
    28% { transform: scale(1); }
    42% { transform: scale(1.1); }
    70% { transform: scale(1); }
}

.heartbeat:hover {
    animation: heartbeat 1.5s ease infinite;
}`
        },
        {
            id: 'sweep-button',
            name: 'Sweep Button',
            nameZh: '扫光按钮',
            description: 'Light sweep effect across button',
            previewId: 'sweep-button',
            prompt: 'Create button with light sweep effect on hover.',
            code: `/* Sweep Button */
.sweep-btn {
    position: relative;
    padding: 14px 28px;
    background: #6750A4;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
}

.sweep-btn::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        to right,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
    );
    transform: translateX(-100%) translateY(-50%) rotate(45deg);
    transition: transform 0.6s ease;
}

.sweep-btn:hover::after {
    transform: translateX(100%) translateY(-50%) rotate(45deg);
}

/* Diagonal sweep */
.sweep-btn-diagonal::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transform: skewX(-20deg);
    transition: left 0.5s ease;
}

.sweep-btn-diagonal:hover::before {
    left: 150%;
}`
        }
    ];

    // Card Effects Data
    const CARD_EFFECTS = [
        {
            id: 'card-hover',
            name: 'Card Hover',
            nameZh: '卡片悬停',
            description: 'Card lifts and scales on hover with enhanced shadow',
            previewId: 'card-hover',
            prompt: 'Create a card that lifts up and scales slightly when hovered, with an enhanced drop shadow.',
            code: `/* Card Hover Effect */
.card-hover {
    padding: 20px;
    background: #1a1a2e;
}

.hover-card {
    width: 300px;
    height: 200px;
    background: linear-gradient(135deg, #6750A4, #9381FF);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(103, 80, 164, 0.3);
    cursor: pointer;
}

.hover-card:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 20px 40px rgba(103, 80, 164, 0.5);
}

/* With 3D effect */
.hover-card-3d {
    transform-style: preserve-3d;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.hover-card-3d:hover {
    transform: translateY(-15px) scale(1.05) rotateX(5deg);
    box-shadow:
        0 25px 50px rgba(103, 80, 164, 0.5),
        0 10px 20px rgba(103, 80, 164, 0.3);
}

/* Glow effect on hover */
.hover-card-glow:hover {
    box-shadow:
        0 20px 40px rgba(103, 80, 164, 0.4),
        0 0 60px rgba(103, 80, 164, 0.2);
}`
        },
        {
            id: 'card-flip',
            name: 'Card Flip',
            nameZh: '卡片翻转',
            description: '3D card that flips to reveal back content',
            previewId: 'card-flip',
            prompt: 'Create a card that flips 180 degrees on hover to reveal content on the back side.',
            code: `/* Card Flip Effect */
.flip-container {
    perspective: 1000px;
    width: 300px;
    height: 200px;
}

.flip-card {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    cursor: pointer;
}

.flip-container:hover .flip-card {
    transform: rotateY(180deg);
}

.flip-front,
.flip-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: 600;
}

.flip-front {
    background: linear-gradient(135deg, #6750A4, #9381FF);
}

.flip-back {
    background: linear-gradient(135deg, #9381FF, #6750A4);
    transform: rotateY(180deg);
}

/* Vertical flip */
.flip-vertical:hover .flip-card {
    transform: rotateX(180deg);
}

.flip-back.vertical {
    transform: rotateX(180deg);
}`
        },
        {
            id: 'card-expand',
            name: 'Card Expand',
            nameZh: '卡片展开',
            description: 'Card expands smoothly on hover to reveal more content',
            previewId: 'card-expand',
            prompt: 'Create a card that smoothly expands its width and height when hovered, revealing hidden content.',
            code: `/* Card Expand Effect */
.expand-card {
    width: 200px;
    height: 150px;
    background: linear-gradient(135deg, #6750A4, #9381FF);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
}

.expand-card:hover {
    width: 350px;
    height: 250px;
}

.expand-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    transition: opacity 0.2s;
}

.expand-hidden {
    opacity: 0;
    transition: opacity 0.3s ease 0.1s;
}

.expand-card:hover .expand-hidden {
    opacity: 1;
}

/* Horizontal expand */
.expand-h {
    transition: width 0.4s ease;
}

.expand-h:hover {
    width: 400px;
}

/* Vertical expand */
.expand-v {
    transition: height 0.4s ease;
}

.expand-v:hover {
    height: 300px;
}`
        },
        {
            id: 'card-stack',
            name: 'Card Stack',
            nameZh: '卡片堆叠',
            description: 'Stacked cards that separate on hover',
            previewId: 'card-stack',
            prompt: 'Create a stack of cards that spread apart when hovered, revealing each card.',
            code: `/* Card Stack Effect */
.stack-container {
    position: relative;
    width: 280px;
    height: 180px;
    perspective: 1000px;
}

.stack-card {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #6750A4, #9381FF);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    font-weight: 600;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

.stack-card:nth-child(1) {
    z-index: 3;
    transform: translateY(0) translateX(0);
}

.stack-card:nth-child(2) {
    z-index: 2;
    transform: translateY(8px) translateX(8px);
    opacity: 0.9;
}

.stack-card:nth-child(3) {
    z-index: 1;
    transform: translateY(16px) translateX(16px);
    opacity: 0.8;
}

.stack-container:hover .stack-card:nth-child(1) {
    transform: translateY(-30px) translateX(0);
}

.stack-container:hover .stack-card:nth-child(2) {
    transform: translateY(0) translateX(30px);
}

.stack-container:hover .stack-card:nth-child(3) {
    transform: translateY(30px) translateX(60px);
}`
        },
        {
            id: 'card-reveal',
            name: 'Card Reveal',
            nameZh: '卡片揭示',
            description: 'Cover slides away to reveal hidden content underneath',
            previewId: 'card-reveal',
            prompt: 'Create a card with a cover that slides away on hover to reveal hidden content.',
            code: `/* Card Reveal Effect */
.reveal-card {
    position: relative;
    width: 300px;
    height: 200px;
    background: linear-gradient(135deg, #6750A4, #9381FF);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
}

.reveal-cover,
.reveal-content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    font-weight: 600;
}

.reveal-cover {
    background: linear-gradient(135deg, #9381FF, #B794F6);
    z-index: 2;
    transition: transform 0.4s ease;
}

.reveal-card:hover .reveal-cover {
    transform: translateY(-100%);
}

/* Slide right reveal */
.reveal-right:hover .reveal-cover {
    transform: translateX(100%);
}

/* Scale reveal */
.reveal-scale:hover .reveal-cover {
    transform: scale(0);
    transform-origin: center;
    border-radius: 50%;
}

/* Fade reveal */
.reveal-fade:hover .reveal-cover {
    opacity: 0;
    transform: scale(1.1);
}

.reveal-fade .reveal-cover {
    transition: all 0.4s ease;
}`
        },
        {
            id: 'card-tilt',
            name: 'Card Tilt',
            nameZh: '卡片倾斜',
            description: '3D tilt effect that follows mouse position',
            previewId: 'card-tilt',
            prompt: 'Create a card that tilts in 3D space following the mouse position within the card.',
            code: `/* Card Tilt Effect */
.tilt-card {
    width: 300px;
    height: 200px;
    background: linear-gradient(135deg, #6750A4, #9381FF);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: 600;
    transform-style: preserve-3d;
    transform: perspective(1000px) rotateX(0) rotateY(0);
    transition: transform 0.1s ease;
    box-shadow: 0 10px 30px rgba(103, 80, 164, 0.3);
    cursor: pointer;
}

/* JavaScript for tilt */
const tiltCard = document.querySelector('.tilt-card');
tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    tiltCard.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
});

tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
});

/* Enhanced tilt with shine */
.tilt-card-shine::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(255,255,255,0.3) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: 16px;
    pointer-events: none;
}

.tilt-card-shine:hover::before {
    opacity: 1;
}`
        },
        {
            id: 'card-lift',
            name: 'Card Lift',
            nameZh: '卡片升起',
            description: 'Card smoothly lifts up on hover with shadow',
            previewId: 'card-lift',
            prompt: 'Create a card that lifts up vertically on hover with a growing shadow.',
            code: `/* Card Lift Effect */
.lift-card {
    width: 300px;
    height: 200px;
    background: linear-gradient(135deg, #6750A4, #9381FF);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
}

.lift-card:hover {
    transform: translateY(-20px);
    box-shadow:
        0 25px 50px rgba(103, 80, 164, 0.4),
        0 10px 20px rgba(103, 80, 164, 0.2);
}

/* Quick lift */
.lift-card-fast {
    transition: all 0.15s ease-out;
}

.lift-card-fast:hover {
    transform: translateY(-12px);
}

/* Bouncy lift */
.lift-card-bouncy {
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.lift-card-bouncy:hover {
    transform: translateY(-25px);
}

/* Lift with scale */
.lift-card-scale:hover {
    transform: translateY(-15px) scale(1.03);
}

/* Sequential lift for multiple cards */
.lift-card:nth-child(1):hover {
    transform: translateY(-20px);
    transition-delay: 0s;
}

.lift-card:nth-child(2):hover {
    transform: translateY(-20px);
    transition-delay: 0.05s;
}

.lift-card:nth-child(3):hover {
    transform: translateY(-20px);
    transition-delay: 0.1s;
}`
        },
        {
            id: 'card-spotlight',
            name: 'Card Spotlight',
            nameZh: '卡片聚光灯',
            description: 'Mouse-controlled spotlight follows over card',
            previewId: 'card-spotlight',
            prompt: 'Create a card with a spotlight effect that follows the mouse cursor.',
            code: `/* Card Spotlight Effect */
.spotlight-card {
    position: relative;
    width: 300px;
    height: 200px;
    background: linear-gradient(135deg, #6750A4, #9381FF);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: 600;
    overflow: hidden;
    cursor: pointer;
}

.spotlight {
    position: absolute;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    transform: translate(-50%, -50%);
}

.spotlight-card:hover .spotlight {
    opacity: 1;
}

/* JavaScript */
const card = document.querySelector('.spotlight-card');
const spotlight = card.querySelector('.spotlight');

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlight.style.left = x + 'px';
    spotlight.style.top = y + 'px';
});

/* Multiple spotlights */
.spotlight-multi .spotlight-2 {
    background: radial-gradient(circle, rgba(147,129,255,0.5) 0%, transparent 70%);
}

.spotlight-multi .spotlight-3 {
    background: radial-gradient(circle, rgba(183,148,246,0.5) 0%, transparent 70%);
}

/* Colored spotlight */
.spotlight-color .spotlight {
    background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(103,80,164,0.2) 50%, transparent 70%);
}`
        },
        {
            id: 'card-morph',
            name: 'Card Morph',
            nameZh: '卡片变形',
            description: 'Card shape morphs and transforms on hover',
            previewId: 'card-morph',
            prompt: 'Create a card that changes shape, border radius, and rotation when hovered.',
            code: `/* Card Morph Effect */
.morph-card {
    width: 300px;
    height: 200px;
    background: linear-gradient(135deg, #6750A4, #9381FF);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: 600;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    cursor: pointer;
}

.morph-card:hover {
    border-radius: 50% 10% 50% 10%;
    transform: scale(1.05) rotate(3deg);
    background: linear-gradient(135deg, #9381FF, #6750A4);
}

/* Organic blob morph */
.morph-blob {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    animation: morph 8s ease-in-out infinite;
}

@keyframes morph {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
}

.morph-blob:hover {
    animation-duration: 2s;
}

/* Corner morph */
.morph-corner:hover {
    border-radius: 0 50px 0 50px;
    transform: scale(1.02);
}

/* Skew morph */
.morph-skew:hover {
    transform: scale(1.05) skewX(-5deg) skewY(2deg);
    border-radius: 30px 5px 30px 5px;
}

/* Clip path morph */
.morph-clip {
    clip-path: polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%);
    transition: clip-path 0.4s ease;
}

.morph-clip:hover {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}`
        },
        {
            id: 'card-glare',
            name: 'Card Glare',
            nameZh: '卡片光泽',
            description: 'Sweeping light glare effect on hover',
            previewId: 'card-glare',
            prompt: 'Create a card with a sweeping glare/shine effect that passes across on hover.',
            code: `/* Card Glare Effect */
.glare-card {
    position: relative;
    width: 300px;
    height: 200px;
    background: linear-gradient(135deg, #6750A4, #9381FF);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: 600;
    overflow: hidden;
    cursor: pointer;
}

.glare-card::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: linear-gradient(
        45deg,
        transparent 40%,
        rgba(255, 255, 255, 0.4) 50%,
        transparent 60%
    );
    transform: translateX(-100%) translateY(-50%) rotate(45deg);
    transition: transform 0.6s ease;
    pointer-events: none;
}

.glare-card:hover::before {
    transform: translateX(100%) translateY(-50%) rotate(45deg);
}

/* Horizontal glare */
.glare-horizontal::before {
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
    );
    transform: translateX(-100%) rotate(0);
}

.glare-horizontal:hover::before {
    transform: translateX(100%) rotate(0);
}

/* Multiple glares */
.glare-multiple::before {
    animation: glare-sweep 3s infinite;
}

@keyframes glare-sweep {
    0% { transform: translateX(-100%) translateY(-50%) rotate(45deg); }
    50% { transform: translateX(100%) translateY(-50%) rotate(45deg); }
    100% { transform: translateX(-100%) translateY(-50%) rotate(45deg); }
}

/* Colorful glare */
.glare-color::before {
    background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 255, 255, 0.5) 45%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(255, 255, 255, 0.5) 55%,
        transparent 70%
    );
}

/* Pulsing glare */
.glare-pulse:hover::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
    animation: pulse 1s ease-out infinite;
}

@keyframes pulse {
    0% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 1; }
    100% { opacity: 0; transform: scale(1.5); }
}`
        }
    ];

    // Parallax Effects Data
    const PARALLAX_EFFECTS = [
        {
            id: 'multi-layer-parallax',
            name: 'Multi-Layer Parallax',
            nameZh: '多层视差',
            description: 'Multiple layers move at different speeds based on depth',
            previewId: 'multi-layer-parallax',
            prompt: 'Create a multi-layer parallax effect where elements at different depths move at different speeds when the mouse moves.',
            code: `/* Multi-Layer Parallax Effect */
.parallax-container {
    perspective: 1000px;
    width: 400px;
    height: 300px;
    overflow: hidden;
}

.parallax-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform 0.1s ease;
}

.parallax-layer.layer-1 { transform: translateZ(50px); }
.parallax-layer.layer-2 { transform: translateZ(100px); }
.parallax-layer.layer-3 { transform: translateZ(150px); }

/* JavaScript for parallax */
const container = document.querySelector('.parallax-container');
const layers = document.querySelectorAll('.parallax-layer');

container.addEventListener('mousemove', (e) => {
    const x = (e.clientX - container.offsetLeft) / 30;
    const y = (e.clientY - container.offsetTop) / 30;

    layers.forEach((layer, i) => {
        const depth = (i + 1) * 2;
        layer.style.transform = \`translateZ(\${depth * 20}px) translateX(\${x * depth}px) translateY(\${y * depth}px)\`;
    });
});

/* Reset on mouse leave */
container.addEventListener('mouseleave', () => {
    layers.forEach((layer, i) => {
        layer.style.transform = \`translateZ(\${(i + 1) * 50}px)\`;
    });
});`
        },
        {
            id: 'mouse-parallax',
            name: 'Mouse Parallax',
            nameZh: '鼠标视差',
            description: 'Background and foreground move in opposite directions',
            previewId: 'mouse-parallax',
            prompt: 'Create a mouse-controlled parallax effect where background and foreground elements move in opposite directions based on cursor position.',
            code: `/* Mouse Parallax Effect */
.mouse-parallax {
    position: relative;
    width: 400px;
    height: 300px;
    overflow: hidden;
}

.parallax-bg {
    position: absolute;
    width: 120%;
    height: 120%;
    left: -10%;
    top: -10%;
    background: radial-gradient(circle, #9381FF, #1a1a2e);
    transition: transform 0.1s ease;
}

.parallax-fg {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 30px rgba(147, 129, 255, 0.5);
    transition: transform 0.15s ease;
}

/* JavaScript */
const parallax = document.querySelector('.mouse-parallax');
const bg = parallax.querySelector('.parallax-bg');
const fg = parallax.querySelector('.parallax-fg');

parallax.addEventListener('mousemove', (e) => {
    const rect = parallax.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;

    bg.style.transform = \`translate(\${-x}px, \${-y}px)\`;
    fg.style.transform = \`translate(\${x * 2}px, \${y * 2}px)\`;
});`
        },
        {
            id: 'scroll-parallax',
            name: 'Scroll Parallax',
            nameZh: '滚动视差',
            description: 'Elements move at different speeds during scroll',
            previewId: 'scroll-parallax',
            prompt: 'Create a scroll-based parallax effect where elements move at different speeds as the user scrolls.',
            code: `/* Scroll Parallax Effect */
.scroll-parallax {
    position: relative;
    height: 200vh;
    overflow-y: auto;
}

.parallax-section {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.parallax-item {
    position: absolute;
    transition: transform 0.1s linear;
}

.parallax-item.slow { --speed: 0.2; }
.parallax-item.medium { --speed: 0.5; }
.parallax-item.fast { --speed: 0.8; }

/* JavaScript */
const scrollContainer = document.querySelector('.scroll-parallax');
const items = document.querySelectorAll('.parallax-item');

scrollContainer.addEventListener('scroll', () => {
    const scrollPos = scrollContainer.scrollTop;

    items.forEach(item => {
        const speed = parseFloat(getComputedStyle(item).getPropertyValue('--speed')) || 0.5;
        const yOffset = scrollPos * speed;
        item.style.transform = \`translateY(\${yOffset}px)\`;
    });
});

/* Alternative: Using CSS */
.parallax-css {
    transform: translateY(calc(var(--scroll) * var(--speed)));
    will-change: transform;
}

/* With scroll-driven animations (modern browsers) */
@supports (animation-timeline: scroll()) {
    .parallax-modern {
        animation: parallax-move linear;
        animation-timeline: scroll();
    }

    @keyframes parallax-move {
        to { transform: translateY(-100px); }
    }
}`
        },
        {
            id: 'tilt-parallax',
            name: 'Tilt Parallax',
            nameZh: '倾斜视差',
            description: '3D tilt with parallax depth effect',
            previewId: 'tilt-parallax',
            prompt: 'Create a 3D tilt effect with parallax depth where elements at different Z positions move relative to the tilt angle.',
            code: `/* Tilt Parallax Effect */
.tilt-parallax {
    perspective: 800px;
    width: 300px;
    height: 200px;
}

.tilt-card {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #6750A4, #9381FF);
    border-radius: 20px;
    transform-style: preserve-3d;
    transition: transform 0.1s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tilt-element {
    position: absolute;
    transform-style: preserve-3d;
}

.tilt-element.z-1 { transform: translateZ(30px); }
.tilt-element.z-2 { transform: translateZ(60px); }
.tilt-element.z-3 { transform: translateZ(90px); }

/* JavaScript */
const tiltContainer = document.querySelector('.tilt-parallax');
const tiltCard = tiltContainer.querySelector('.tilt-card');

tiltContainer.addEventListener('mousemove', (e) => {
    const rect = tiltContainer.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = (e.clientY - rect.top - rect.height / 2) / 10;

    tiltCard.style.transform = \`rotateY(\${x}deg) rotateX(\${-y}deg)\`;
});

tiltContainer.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'rotateY(0) rotateX(0)';
});

/* Enhanced with elements at different depths */
.tilt-card .element-1 {
    transform: translateZ(20px) translateX(var(--tx, 0)) translateY(var(--ty, 0));
}

.tilt-card .element-2 {
    transform: translateZ(40px) translateX(var(--tx, 0)) translateY(var(--ty, 0));
}`
        },
        {
            id: 'depth-parallax',
            name: 'Depth Parallax',
            nameZh: '深度视差',
            description: 'Elements scale based on Z-depth for 3D effect',
            previewId: 'depth-parallax',
            prompt: 'Create a depth-based parallax effect where elements scale and move based on their Z-distance from the viewer.',
            code: `/* Depth Parallax Effect */
.depth-parallax {
    perspective: 600px;
    width: 400px;
    height: 300px;
    position: relative;
    overflow: hidden;
}

.depth-element {
    position: absolute;
    transition: transform 0.2s ease;
}

.depth-element[data-depth="0.2"] { --depth: 0.2; }
.depth-element[data-depth="0.5"] { --depth: 0.5; }
.depth-element[data-depth="1"] { --depth: 1; }
.depth-element[data-depth="1.5"] { --depth: 1.5; }

/* JavaScript */
const depthContainer = document.querySelector('.depth-parallax');
const depthElements = depthContainer.querySelectorAll('.depth-element');

depthContainer.addEventListener('mousemove', (e) => {
    const rect = depthContainer.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    depthElements.forEach(el => {
        const depth = parseFloat(el.dataset.depth);
        const moveX = (mouseX - centerX) * depth * 0.5;
        const moveY = (mouseY - centerY) * depth * 0.5;
        const scale = 1 + depth * 0.1;
        const opacity = 1 - (depth - 1) * 0.2;

        el.style.transform = \`translate(\${moveX}px, \${moveY}px) scale(\${scale}) translateZ(\${depth * 50}px)\`;
        el.style.opacity = Math.max(0.2, Math.min(1, opacity));
    });
});

/* Reset */
depthContainer.addEventListener('mouseleave', () => {
    depthElements.forEach(el => {
        el.style.transform = 'translate(0, 0) scale(1) translateZ(0)';
        el.style.opacity = 1;
    });
});`
        },
        {
            id: 'perspective-parallax',
            name: 'Perspective Parallax',
            nameZh: '透视视差',
            description: 'Multiple planes at different perspective depths',
            previewId: 'perspective-parallax',
            prompt: 'Create a perspective parallax with multiple layered planes that rotate in 3D space based on mouse position.',
            code: `/* Perspective Parallax Effect */
.perspective-parallax {
    perspective: 1000px;
    width: 350px;
    height: 250px;
}

.perspective-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.2s ease;
}

.perspective-plane {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    backface-visibility: visible;
}

.perspective-plane.p-1 {
    background: rgba(103, 80, 164, 0.9);
    transform: translateZ(0);
}

.perspective-plane.p-2 {
    background: rgba(147, 129, 255, 0.8);
    transform: translateZ(40px);
}

.perspective-plane.p-3 {
    background: rgba(183, 148, 246, 0.7);
    transform: translateZ(80px);
}

/* JavaScript */
const pContainer = document.querySelector('.perspective-parallax');
const pWrapper = pContainer.querySelector('.perspective-wrapper');

pContainer.addEventListener('mousemove', (e) => {
    const rect = pContainer.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 12;
    const y = (e.clientY - rect.top - rect.height / 2) / 12;

    pWrapper.style.transform = \`rotateY(\${x}deg) rotateX(\${-y}deg)\`;
});

pContainer.addEventListener('mouseleave', () => {
    pWrapper.style.transform = 'rotateY(0) rotateX(0)';
});`
        },
        {
            id: 'floating-parallax',
            name: 'Floating Parallax',
            nameZh: '浮动视差',
            description: 'Floating elements with parallax mouse interaction',
            previewId: 'floating-parallax',
            prompt: 'Create a floating parallax effect where elements gently float and respond to mouse movement with parallax.',
            code: `/* Floating Parallax Effect */
.floating-parallax {
    position: relative;
    width: 400px;
    height: 300px;
    overflow: hidden;
}

.floating-element {
    position: absolute;
    border-radius: 50%;
    opacity: 0.6;
    transition: transform 0.15s ease;
}

.floating-element:nth-child(1) {
    width: 40px; height: 40px;
    background: #6750A4;
    animation: float 3s ease-in-out infinite;
}

.floating-element:nth-child(2) {
    width: 30px; height: 30px;
    background: #9381FF;
    animation: float 4s ease-in-out infinite 0.5s;
}

.floating-element:nth-child(3) {
    width: 50px; height: 50px;
    background: #B794F6;
    animation: float 5s ease-in-out infinite 1s;
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

/* JavaScript for parallax */
const floatContainer = document.querySelector('.floating-parallax');
const floatElements = floatContainer.querySelectorAll('.floating-element');

floatContainer.addEventListener('mousemove', (e) => {
    const rect = floatContainer.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 15;
    const y = (e.clientY - rect.top - rect.height / 2) / 15;

    floatElements.forEach((el, i) => {
        const factor = (i + 1) * 0.8;
        const currentTransform = getComputedStyle(el).transform;
        el.style.transform = \`translate(\${x * factor}px, \${y * factor}px)\`;
    });
});`
        },
        {
            id: 'zoom-parallax',
            name: 'Zoom Parallax',
            nameZh: '缩放视差',
            description: 'Parallax effect with zoom based on position',
            previewId: 'zoom-parallax',
            prompt: 'Create a zoom parallax where elements scale and move differently based on their distance from the cursor.',
            code: `/* Zoom Parallax Effect */
.zoom-parallax {
    position: relative;
    width: 400px;
    height: 300px;
    overflow: hidden;
}

.zoom-layer {
    position: absolute;
    transition: transform 0.1s ease;
}

.zoom-layer.bg {
    width: 150%; height: 150%;
    left: -25%; top: -25%;
    background: radial-gradient(circle, #9381FF, #6750A4);
}

.zoom-layer.mid {
    width: 80%; height: 80%;
    left: 10%; top: 10%;
    background: radial-gradient(circle, rgba(183,148,246,0.5), transparent);
    border-radius: 50%;
}

.zoom-layer.fg {
    width: 100px; height: 80px;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #6750A4, #9381FF);
    border-radius: 20px;
}

/* JavaScript */
const zoomContainer = document.querySelector('.zoom-parallax');
const bg = zoomContainer.querySelector('.zoom-layer.bg');
const mid = zoomContainer.querySelector('.zoom-layer.mid');
const fg = zoomContainer.querySelector('.zoom-layer.fg');

zoomContainer.addEventListener('mousemove', (e) => {
    const rect = zoomContainer.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

    bg.style.transform = \`translate(\${-x * 40}px, \${-y * 40}px) scale(1.15)\`;
    mid.style.transform = \`translate(\${x * 20}px, \${y * 20}px) scale(1.25)\`;
    fg.style.transform = \`translate(calc(-50% + \${x * 35}px), calc(-50% + \${y * 35}px)) scale(1.2)\`;
});

zoomContainer.addEventListener('mouseleave', () => {
    bg.style.transform = 'translate(0, 0) scale(1)';
    mid.style.transform = 'translate(0, 0) scale(1)';
    fg.style.transform = 'translate(-50%, -50%) scale(1)';
});`
        }
    ];

    // Form Effects Data
    const FORM_EFFECTS = [
        {
            id: 'input-underline',
            name: 'Input Underline',
            nameZh: '输入下划线',
            description: 'Animated underline that expands on focus',
            previewId: 'input-underline',
            prompt: 'Create an input field with an animated underline that expands from left to right when focused.',
            code: `/* Input Underline Effect */
.input-underline {
    position: relative;
    width: 300px;
}

.input-underline input {
    width: 100%;
    padding: 12px 0;
    background: transparent;
    border: none;
    border-bottom: 2px solid #49454F;
    color: white;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
}

.input-underline::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #6750A4, #9381FF);
    transition: width 0.3s ease;
}

.input-underline input:focus {
    border-color: transparent;
}

.input-underline input:focus ~ ::after {
    width: 100%;
}

/* With label animation */
.input-underline-label {
    position: relative;
}

.input-underline-label label {
    position: absolute;
    left: 0;
    top: 12px;
    color: #9ca3af;
    pointer-events: none;
    transition: all 0.3s ease;
}

.input-underline-label input:focus ~ label,
.input-underline-label input:valid ~ label {
    top: -20px;
    font-size: 12px;
    color: #6750A4;
}`
        },
        {
            id: 'input-float',
            name: 'Input Float Label',
            nameZh: '浮动标签输入框',
            description: 'Label floats up when input is focused',
            previewId: 'input-float',
            prompt: 'Create an input with a floating label that moves above the input when focused or has value.',
            code: `/* Floating Label Input */
.float-input {
    position: relative;
    width: 300px;
}

.float-input input {
    width: 100%;
    padding: 16px 12px 8px;
    background: transparent;
    border: 2px solid #49454F;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
}

.float-input label {
    position: absolute;
    left: 12px;
    top: 16px;
    color: #9ca3af;
    font-size: 16px;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.float-input input:focus,
.float-input input:not(:placeholder-shown) {
    border-color: #6750A4;
}

.float-input input:focus ~ label,
.float-input input:not(:placeholder-shown) ~ label {
    top: -8px;
    left: 8px;
    font-size: 12px;
    color: #6750A4;
    background: #1a1a2e;
    padding: 0 4px;
}

/* Material style with focus ring */
.float-input-material input:focus {
    border-color: #6750A4;
    box-shadow: 0 0 0 3px rgba(103, 80, 164, 0.1);
}`
        },
        {
            id: 'input-icon',
            name: 'Input Icon',
            nameZh: '图标输入框',
            description: 'Input with animated icon on focus',
            previewId: 'input-icon',
            prompt: 'Create an input field with an icon that animates when the input is focused.',
            code: `/* Input with Icon Effect */
.icon-input {
    position: relative;
    width: 300px;
}

.icon-input .icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    transition: all 0.3s ease;
    color: #9ca3af;
}

.icon-input input {
    width: 100%;
    padding: 12px 12px 12px 44px;
    background: transparent;
    border: 2px solid #49454F;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease;
}

.icon-input input:focus {
    border-color: #6750A4;
    padding-left: 48px;
}

.icon-input input:focus ~ .icon {
    transform: translateY(-50%) scale(1.1);
    color: #6750A4;
}

/* With right icon */
.icon-input-right .icon-right {
    left: auto;
    right: 12px;
}

.icon-input-right input {
    padding-left: 12px;
    padding-right: 44px;
}

/* Search input */
.search-input {
    border-radius: 24px;
}

.search-input:focus {
    box-shadow: 0 0 0 4px rgba(103, 80, 164, 0.1);
}`
        },
        {
            id: 'input-shake',
            name: 'Input Shake',
            nameZh: '输入框抖动',
            description: 'Input shakes on invalid submission',
            previewId: 'input-shake',
            prompt: 'Create an input field that shakes when the user submits with invalid data.',
            code: `/* Input Shake Effect */
.shake-input {
    padding: 12px 16px;
    background: transparent;
    border: 2px solid #49454F;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
}

.shake-input:focus {
    border-color: #6750A4;
}

.shake-input.error {
    border-color: #ef4444;
    animation: shake 0.5s ease;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

/* JavaScript trigger */
function validateInput(input) {
    if (!input.value.trim()) {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 500);
        return false;
    }
    return true;
}

/* Bounce shake variant */
@keyframes shake-bounce {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px) rotate(-1deg); }
    75% { transform: translateX(8px) rotate(1deg); }
}

.shake-bounce.error {
    animation: shake-bounce 0.4s ease;
}

/* With error message */
.shake-wrapper {
    position: relative;
}

.error-message {
    position: absolute;
    bottom: -20px;
    left: 0;
    font-size: 12px;
    color: #ef4444;
    opacity: 0;
    transform: translateY(-5px);
    transition: all 0.3s ease;
}

.error-message.show {
    opacity: 1;
    transform: translateY(0);
}`
        },
        {
            id: 'button-fill',
            name: 'Button Fill',
            nameZh: '按钮填充',
            description: 'Button fills with color on hover',
            previewId: 'button-fill',
            prompt: 'Create a button that fills with color from bottom to top on hover.',
            code: `/* Button Fill Effect */
.fill-button {
    position: relative;
    padding: 14px 32px;
    background: transparent;
    border: 2px solid #6750A4;
    border-radius: 8px;
    color: #6750A4;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    transition: color 0.3s ease;
}

.fill-button::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #6750A4;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fill-button:hover {
    color: white;
}

.fill-button:hover::before {
    transform: translateY(0);
}

.fill-button span {
    position: relative;
    z-index: 1;
}

/* Diagonal fill */
.fill-diagonal::before {
    transform: translateY(100%) rotate(45deg);
    transform-origin: left bottom;
}

.fill-diagonal:hover::before {
    transform: translateY(0) rotate(0deg);
}

/* From center */
.fill-center::before {
    transform: scale(0);
    transform-origin: center;
    transition: transform 0.4s ease;
}

.fill-center:hover::before {
    transform: scale(1);
}

/* Fade fill */
.fill-fade::before {
    opacity: 0;
    transform: translateY(0);
}

.fill-fade:hover::before {
    opacity: 1;
}`
        },
        {
            id: 'checkbox-slide',
            name: 'Checkbox Slide',
            nameZh: '滑块复选框',
            description: 'Checkbox with sliding circle indicator',
            previewId: 'checkbox-slide',
            prompt: 'Create a checkbox styled as a toggle switch with a sliding circle.',
            code: `/* Checkbox Slide Effect */
.slide-checkbox {
    position: relative;
    display: inline-block;
    width: 52px;
    height: 28px;
}

.slide-checkbox input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slide-checkbox .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #49454F;
    transition: 0.3s;
    border-radius: 28px;
}

.slide-checkbox .slider::before {
    content: '';
    position: absolute;
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slide-checkbox input:checked + .slider {
    background: #6750A4;
}

.slide-checkbox input:checked + .slider::before {
    transform: translateX(24px);
}

/* With scale effect */
.slide-checkbox.scale input:checked + .slider::before {
    transform: translateX(24px) scale(1.1);
}

/* With icon inside */
.slide-checkbox.icon .slider::before {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

.slide-checkbox.icon input:checked + .slider::before::after {
    content: '✓';
    color: #6750A4;
}

/* Green when checked */
.slide-checkbox.green input:checked + .slider {
    background: #10b981;
}`
        },
        {
            id: 'toggle-slide',
            name: 'Toggle Slide',
            nameZh: '滑动开关',
            description: 'Toggle switch with ON/OFF labels',
            previewId: 'toggle-slide',
            prompt: 'Create a toggle switch with ON/OFF labels that slide with the switch.',
            code: `/* Toggle Slide Effect */
.toggle-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
}

.toggle-label {
    font-size: 14px;
    font-weight: 600;
    transition: color 0.3s ease;
}

.toggle-label.off { color: #9ca3af; }
.toggle-label.on { color: #6750A4; }

.toggle-switch {
    position: relative;
    width: 56px;
    height: 28px;
    background: #49454F;
    border-radius: 14px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.toggle-switch::before {
    content: '';
    position: absolute;
    width: 22px;
    height: 22px;
    background: white;
    border-radius: 50%;
    top: 3px;
    left: 3px;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.toggle-switch.active {
    background: #6750A4;
}

.toggle-switch.active::before {
    transform: translateX(28px);
}

/* JavaScript */
const toggle = document.querySelector('.toggle-switch');
const onLabel = document.querySelector('.toggle-label.on');
const offLabel = document.querySelector('.toggle-label.off');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    const isActive = toggle.classList.contains('active');
    onLabel.style.opacity = isActive ? '1' : '0.4';
    offLabel.style.opacity = isActive ? '0.4' : '1';
});

/* With scale bounce */
.toggle-switch.bounce::before {
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Pill shaped */
.toggle-switch.pill {
    width: 64px;
    border-radius: 16px;
}`
        },
        {
            id: 'radio-pulse',
            name: 'Radio Pulse',
            nameZh: '单选脉冲',
            description: 'Radio button with pulse effect on selection',
            previewId: 'radio-pulse',
            prompt: 'Create a custom radio button with a pulse animation effect when selected.',
            code: `/* Radio Pulse Effect */
.radio-pulse {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.radio-pulse input {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #49454F;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
}

.radio-pulse input::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #6750A4;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.radio-pulse input:checked {
    border-color: #6750A4;
}

.radio-pulse input:checked::before {
    transform: translate(-50%, -50%) scale(1);
}

.radio-pulse input:checked::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid #6750A4;
    animation: pulse 1s ease-out;
}

@keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(1.6); opacity: 0; }
}

/* With glow */
.radio-glow input:checked {
    box-shadow: 0 0 0 3px rgba(103, 80, 164, 0.2);
}

/* Large radio */
.radio-large input {
    width: 24px;
    height: 24px;
}

.radio-large input::before {
    width: 10px;
    height: 10px;
}

/* Colored variants */
.radio-blue input:checked { border-color: #3b82f6; }
.radio-blue input::before { background: #3b82f6; }
.radio-blue input:checked::after { border-color: #3b82f6; }`
        },
        {
            id: 'select-arrow',
            name: 'Select Arrow',
            nameZh: '下拉箭头',
            description: 'Select dropdown with animated arrow',
            previewId: 'select-arrow',
            prompt: 'Create a custom select dropdown with an animated arrow that rotates on open.',
            code: `/* Select Arrow Animation */
.custom-select {
    position: relative;
    width: 250px;
}

.custom-select select {
    width: 100%;
    padding: 12px 40px 12px 12px;
    background: transparent;
    border: 2px solid #49454F;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    appearance: none;
    cursor: pointer;
    outline: none;
    transition: border-color 0.3s ease;
}

.custom-select select:focus {
    border-color: #6750A4;
}

.custom-select::after {
    content: '▼';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    color: #9ca3af;
    pointer-events: none;
    transition: all 0.3s ease;
}

.custom-select select:focus ~ ::after {
    transform: translateY(-50%) rotate(180deg);
    color: #6750A4;
}

/* Option styling */
.custom-select option {
    background: #1a1a2e;
    padding: 12px;
}

/* Underline style */
.select-underline {
    border: none;
    border-bottom: 2px solid #49454F;
    border-radius: 0;
}

.select-underline:focus {
    border-bottom-color: #6750A4;
}

/* With label */
.select-wrapper {
    position: relative;
}

.select-label {
    position: absolute;
    left: 12px;
    top: 12px;
    color: #9ca3af;
    font-size: 16px;
    pointer-events: none;
    transition: all 0.3s ease;
}

.select-wrapper select:focus ~ .select-label,
.select-wrapper select:valid ~ .select-label {
    top: -10px;
    font-size: 12px;
    color: #6750A4;
}`
        },
        {
            id: 'file-drop',
            name: 'File Drop',
            nameZh: '文件拖放',
            description: 'Drag and drop file upload zone',
            previewId: 'file-drop',
            prompt: 'Create a drag and drop zone for file uploads with visual feedback.',
            code: `/* File Drop Zone Effect */
.drop-zone {
    width: 100%;
    max-width: 400px;
    min-height: 200px;
    border: 2px dashed #49454F;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.drop-zone:hover {
    border-color: #6750A4;
    background: rgba(103, 80, 164, 0.05);
}

.drop-zone.dragover {
    border-color: #6750A4;
    background: rgba(103, 80, 164, 0.1);
    transform: scale(1.02);
}

.drop-zone-icon {
    font-size: 48px;
    transition: transform 0.3s ease;
}

.drop-zone:hover .drop-zone-icon {
    transform: scale(1.1);
}

.drop-zone-text {
    color: #9ca3af;
    font-size: 14px;
}

.drop-zone-success {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
}

/* JavaScript handlers */
const dropZone = document.querySelector('.drop-zone');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    dropZone.classList.add('drop-zone-success');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

/* File preview */
.file-preview {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
    background: rgba(103, 80, 164, 0.1);
    border-radius: 8px;
}

.file-preview img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 4px;
}`
        }
    ];

    // Glitch Effects Data
    const GLITCH_EFFECTS = [
        {
            id: 'text-glitch',
            name: 'Text Glitch',
            nameZh: '文字故障',
            description: 'Text randomly glitches with random characters',
            previewId: 'text-glitch',
            prompt: 'Create a text glitch effect where characters randomly change to symbols and the text has chromatic aberration.',
            code: `/* Text Glitch Effect */
.glitch-text {
    position: relative;
    font-size: 48px;
    font-weight: 700;
    letter-spacing: 4px;
}

.glitch-text::before,
.glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.glitch-text::before {
    left: 2px;
    text-shadow: -2px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch-text::after {
    left: -2px;
    text-shadow: -2px 0 #00fff9;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
    0% { clip: rect(35px, 9999px, 11px, 0); }
    20% { clip: rect(68px, 9999px, 89px, 0); }
    40% { clip: rect(15px, 9999px, 48px, 0); }
    60% { clip: rect(82px, 9999px, 24px, 0); }
    80% { clip: rect(57px, 9999px, 96px, 0); }
    100% { clip: rect(29px, 9999px, 63px, 0); }
}

@keyframes glitch-anim2 {
    0% { clip: rect(65px, 9999px, 100px, 0); }
    20% { clip: rect(52px, 9999px, 74px, 0); }
    40% { clip: rect(79px, 9999px, 21px, 0); }
    60% { clip: rect(14px, 9999px, 86px, 0); }
    80% { clip: rect(31px, 9999px, 54px, 0); }
    100% { clip: rect(93px, 9999px, 38px, 0); }
}

/* Hover trigger */
.glitch-text:hover::before,
.glitch-text:hover::after {
    animation-duration: 0.3s;
}`
        },
        {
            id: 'image-glitch',
            name: 'Image Glitch',
            nameZh: '图像故障',
            description: 'Image splits and shifts with glitch effect',
            previewId: 'image-glitch',
            prompt: 'Create an image glitch effect where the image splits into RGB color channels that shift and distort.',
            code: `/* Image Glitch Effect */
.glitch-image {
    position: relative;
    width: 300px;
    height: 200px;
}

.glitch-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.glitch-image::before,
.glitch-image::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    pointer-events: none;
}

.glitch-image::before {
    background-color: #ff0080;
    mix-blend-mode: hard-light;
    opacity: 0;
}

.glitch-image::after {
    background-color: #00ffff;
    mix-blend-mode: hard-light;
    opacity: 0;
}

.glitch-image:hover::before {
    opacity: 0.8;
    animation: glitch-shift-1 0.3s infinite;
}

.glitch-image:hover::after {
    opacity: 0.8;
    animation: glitch-shift-2 0.3s infinite;
}

@keyframes glitch-shift-1 {
    0%, 100% { clip-path: inset(20% 0 60% 0); transform: translate(-5px, 0); }
    50% { clip-path: inset(60% 0 20% 0); transform: translate(5px, 0); }
}

@keyframes glitch-shift-2 {
    0%, 100% { clip-path: inset(40% 0 40% 0); transform: translate(5px, 0); }
    50% { clip-path: inset(10% 0 80% 0); transform: translate(-5px, 0); }
}`
        },
        {
            id: 'rgb-split',
            name: 'RGB Split',
            nameZh: 'RGB分离',
            description: 'Red, green, and blue channels separate',
            previewId: 'rgb-split',
            prompt: 'Create an RGB split effect where the red, green, and blue color channels separate from each other.',
            code: `/* RGB Split Effect */
.rgb-split {
    position: relative;
    display: inline-block;
}

.rgb-split::before,
.rgb-split::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.rgb-split::before {
    color: #ff0000;
    animation: rgb-left 2s ease-in-out infinite;
}

.rgb-split::after {
    color: #0000ff;
    animation: rgb-right 2s ease-in-out infinite;
}

@keyframes rgb-left {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(-3px, 1px); }
    75% { transform: translate(3px, -1px); }
}

@keyframes rgb-right {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(3px, -1px); }
    75% { transform: translate(-3px, 1px); }
}

/* Image RGB split */
.rgb-split-image {
    position: relative;
    overflow: hidden;
}

.rgb-split-image::before,
.rgb-split-image::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    mix-blend-mode: screen;
}

.rgb-split-image::before {
    background-color: #ff0000;
    transform: translateX(-5px);
    opacity: 0.7;
}

.rgb-split-image::after {
    background-color: #0000ff;
    transform: translateX(5px);
    opacity: 0.7;
}`
        },
        {
            id: 'scan-lines',
            name: 'Scan Lines',
            nameZh: '扫描线',
            description: 'Retro CRT scan line overlay effect',
            previewId: 'scan-lines',
            prompt: 'Create a CRT scan line effect with horizontal lines and a slight flicker.',
            code: `/* Scan Lines Effect */
.scan-lines {
    position: relative;
    overflow: hidden;
}

.scan-lines::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.15),
        rgba(0, 0, 0, 0.15) 1px,
        transparent 1px,
        transparent 2px
    );
    pointer-events: none;
    animation: scan-flicker 0.15s infinite;
}

@keyframes scan-flicker {
    0% { opacity: 0.9; }
    50% { opacity: 1; }
    100% { opacity: 0.95; }
}

/* Scan line moving effect */
.scan-lines-moving::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: rgba(255, 255, 255, 0.1);
    animation: scan-move 3s linear infinite;
    pointer-events: none;
}

@keyframes scan-move {
    0% { transform: translateY(0); }
    100% { transform: translateY(100vh); }
}

/* CRT curvature effect */
.crt-effect {
    position: relative;
}

.crt-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%);
    pointer-events: none;
}`
        },
        {
            id: 'digital-noise',
            name: 'Digital Noise',
            nameZh: '数字噪点',
            description: 'Random pixel noise overlay effect',
            previewId: 'digital-noise',
            prompt: 'Create a digital noise effect with random colored pixels appearing and disappearing.',
            code: `/* Digital Noise Effect */
.digital-noise {
    position: relative;
    overflow: hidden;
}

.digital-noise::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.15"/></svg>');
    animation: noise-scroll 0.5s steps(10) infinite;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.digital-noise:hover::before {
    opacity: 1;
}

@keyframes noise-scroll {
    0% { transform: translate(0, 0); }
    10% { transform: translate(-5%, -5%); }
    20% { transform: translate(5%, 5%); }
    30% { transform: translate(-3%, 3%); }
    40% { transform: translate(3%, -3%); }
    50% { transform: translate(-2%, -2%); }
    60% { transform: translate(2%, 2%); }
    70% { transform: translate(-4%, 4%); }
    80% { transform: translate(4%, -4%); }
    90% { transform: translate(-1%, -1%); }
    100% { transform: translate(0, 0); }
}

/* Canvas-based noise */
.noise-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.noise-canvas.active {
    opacity: 0.4;
}

/* JavaScript for canvas noise */
function initNoise(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;

    function drawNoise() {
        for (let i = 0; i < 500; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            ctx.fillStyle = \`rgba(\${Math.random() * 255}, \${Math.random() * 255}, \${Math.random() * 255}, 0.5)\`;
            ctx.fillRect(x, y, 2, 2);
        }
    }

    setInterval(drawNoise, 50);
}`
        },
        {
            id: 'chromatic-aberration',
            name: 'Chromatic Aberration',
            nameZh: '色差效果',
            description: 'Color fringing around edges',
            previewId: 'chromatic-aberration',
            prompt: 'Create a chromatic aberration effect where colors separate around the edges like a lens distortion.',
            code: `/* Chromatic Aberration Effect */
.chromatic-aberration {
    position: relative;
}

.chromatic-aberration::before,
.chromatic-aberration::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    mix-blend-mode: screen;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.chromatic-aberration::before {
    background: rgba(255, 0, 0, 0.5);
    transform: translateX(-3px);
}

.chromatic-aberration::after {
    background: rgba(0, 0, 255, 0.5);
    transform: translateX(3px);
}

.chromatic-aberration:hover::before,
.chromatic-aberration:hover::after {
    opacity: 1;
}

/* Text chromatic aberration */
.text-chromatic {
    position: relative;
    color: #fff;
}

.text-chromatic::before,
.text-chromatic::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}

.text-chromatic::before {
    color: #ff0000;
    transform: translate(-2px, 0);
    opacity: 0.7;
}

.text-chromatic::after {
    color: #00ffff;
    transform: translate(2px, 0);
    opacity: 0.7;
}

/* Animated chromatic aberration */
.chromatic-animated::before {
    animation: chromatic-r 2s ease-in-out infinite;
}

.chromatic-animated::after {
    animation: chromatic-b 2s ease-in-out infinite;
}

@keyframes chromatic-r {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-4px, 0); }
}

@keyframes chromatic-b {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(4px, 0); }
}`
        },
        {
            id: 'vhs-effect',
            name: 'VHS Effect',
            nameZh: 'VHS录像效果',
            description: 'Retro VHS tape distortion effect',
            previewId: 'vhs-effect',
            prompt: 'Create a VHS tape effect with tracking lines, color bleeding, and wobble.',
            code: `/* VHS Tape Effect */
.vhs-effect {
    position: relative;
    overflow: hidden;
}

.vhs-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0.1) 1px,
        transparent 1px,
        transparent 2px
    );
    pointer-events: none;
    z-index: 10;
}

.vhs-effect::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.03) 50%,
        transparent 100%
    );
    animation: vhs-tracking 3s linear infinite;
    pointer-events: none;
}

@keyframes vhs-tracking {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

/* VHS color bleed */
.vhs-color-bleed {
    filter: blur(0.5px) saturate(1.2);
    animation: vhs-bleed 0.1s infinite;
}

@keyframes vhs-bleed {
    0%, 100% { filter: blur(0.5px) saturate(1.2) hue-rotate(0deg); }
    50% { filter: blur(0.8px) saturate(1.3) hue-rotate(2deg); }
}

/* VHS wobble */
.vhs-wobble {
    animation: vhs-wobble 2s ease-in-out infinite;
}

@keyframes vhs-wobble {
    0%, 100% { transform: translateX(0) skewX(0deg); }
    25% { transform: translateX(-1px) skewX(0.2deg); }
    75% { transform: translateX(1px) skewX(-0.2deg); }
}

/* VHS noise overlay */
.vhs-noise {
    position: relative;
}

.vhs-noise::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><filter id="vhsNoise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" /></filter><rect width="100%" height="100%" filter="url(%23vhsNoise)" opacity="0.05"/></svg>');
    pointer-events: none;
    animation: vhs-noise 0.2s steps(5) infinite;
}

@keyframes vhs-noise {
    0% { transform: translate(0, 0); }
    20% { transform: translate(-1%, 1%); }
    40% { transform: translate(1%, -1%); }
    60% { transform: translate(-1%, -1%); }
    80% { transform: translate(1%, 1%); }
    100% { transform: translate(0, 0); }
}`
        },
        {
            id: 'cyber-glitch',
            name: 'Cyber Glitch',
            nameZh: '赛博故障',
            description: 'Futuristic cyberpunk glitch effect',
            previewId: 'cyber-glitch',
            prompt: 'Create a cyberpunk glitch effect with neon colors, grid overlay, and digital distortion.',
            code: `/* Cyber Glitch Effect */
.cyber-glitch {
    position: relative;
    background: #000;
    overflow: hidden;
}

.cyber-glitch::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
        linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 30px 30px;
    pointer-events: none;
    z-index: 1;
}

.cyber-text {
    position: relative;
    font-family: 'Courier New', monospace;
    font-size: 48px;
    font-weight: 700;
    color: #0ff;
    text-shadow:
        0 0 10px #0ff,
        0 0 20px #0ff,
        0 0 40px #0ff;
    letter-spacing: 8px;
    z-index: 2;
}

.cyber-text::before,
.cyber-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}

.cyber-text::before {
    color: #f0f;
    animation: cyber-glitch-1 0.5s infinite;
}

.cyber-text::after {
    color: #ff0;
    animation: cyber-glitch-2 0.5s infinite;
}

@keyframes cyber-glitch-1 {
    0%, 100% { clip-path: inset(0 0 95% 0); transform: translate(-2px, 0); }
    20% { clip-path: inset(40% 0 40% 0); transform: translate(2px, 0); }
    40% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 0); }
    60% { clip-path: inset(10% 0 70% 0); transform: translate(2px, 0); }
    80% { clip-path: inset(30% 0 50% 0); transform: translate(-2px, 0); }
}

@keyframes cyber-glitch-2 {
    0%, 100% { clip-path: inset(95% 0 0 0); transform: translate(2px, 0); }
    20% { clip-path: inset(40% 0 40% 0); transform: translate(-2px, 0); }
    40% { clip-path: inset(5% 0 80% 0); transform: translate(2px, 0); }
    60% { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 0); }
    80% { clip-path: inset(50% 0 30% 0); transform: translate(2px, 0); }
}

/* Cyber border glow */
.cyber-border {
    position: relative;
    border: 2px solid #0ff;
    box-shadow:
        0 0 10px #0ff,
        inset 0 0 10px rgba(0, 255, 255, 0.1);
}

/* Scan line effect */
.cyber-scan::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, #0ff, transparent);
    animation: cyber-scan 2s linear infinite;
    pointer-events: none;
    z-index: 3;
}

@keyframes cyber-scan {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0.5; }
}`
        }
    ];

    // Particle Effects Data
    const PARTICLE_EFFECTS = [
        {
            id: 'snow-particles',
            name: 'Snow Particles',
            nameZh: '雪花粒子',
            description: 'Gentle falling snowflakes',
            previewId: 'snow-particles',
            prompt: 'Create a snow particle effect with snowflakes gently falling down with slight horizontal wobble.',
            code: `/* Snow Particle Effect */
.snow-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(180deg, #1a1a3e, #0a0a2e);
}

.snowflake {
    position: absolute;
    background: white;
    border-radius: 50%;
    pointer-events: none;
    animation: snow-fall linear infinite;
}

@keyframes snow-fall {
    0% {
        transform: translateY(-10px) translateX(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) translateX(20px);
        opacity: 0;
    }
}

/* JavaScript to generate snowflakes */
function createSnowflakes(count) {
    const container = document.querySelector('.snow-container');
    for (let i = 0; i < count; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;

        snowflake.style.width = size + 'px';
        snowflake.style.height = size + 'px';
        snowflake.style.left = left + '%';
        snowflake.style.animationDuration = duration + 's';
        snowflake.style.animationDelay = delay + 's';
        snowflake.style.opacity = Math.random() * 0.5 + 0.3;

        container.appendChild(snowflake);
    }
}

createSnowflakes(50);`
        },
        {
            id: 'fire-particles',
            name: 'Fire Particles',
            nameZh: '火焰粒子',
            description: 'Rising fire particles with glow',
            previewId: 'fire-particles',
            prompt: 'Create a fire particle effect with glowing embers rising upward and fading out.',
            code: `/* Fire Particle Effect */
.fire-container {
    position: relative;
    width: 200px;
    height: 300px;
    background: #1a1a1a;
    border-radius: 12px;
    overflow: hidden;
}

.fire-base {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 40px;
    background: radial-gradient(ellipse at center, #ff6600, #ff3300);
    border-radius: 50%;
    filter: blur(10px);
}

.fire-particle {
    position: absolute;
    bottom: 40px;
    border-radius: 50%;
    pointer-events: none;
    animation: fire-rise ease-out infinite;
}

@keyframes fire-rise {
    0% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateY(-250px) scale(0);
        opacity: 0;
    }
}

/* JavaScript to generate fire particles */
function createFireParticles(count) {
    const container = document.querySelector('.fire-container');
    const colors = ['#ff4500', '#ff6347', '#ffa500', '#ffcc00', '#ff3300'];

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'fire-particle';
        const size = Math.random() * 8 + 4;
        const left = 50 + (Math.random() - 0.5) * 60;
        const duration = Math.random() * 2 + 1;
        const delay = Math.random() * 2;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        particle.style.boxShadow = '0 0 ' + size + 'px ' + particle.style.background;

        container.appendChild(particle);
    }
}

setInterval(() => {
    const particles = document.querySelectorAll('.fire-particle');
    particles.forEach(p => {
        if (parseFloat(p.style.animationDelay) < 0) {
            p.style.animationDelay = Math.random() * 2 + 's';
        }
    });
}, 100);`
        },
        {
            id: 'spark-particles',
            name: 'Spark Particles',
            nameZh: '火花粒子',
            description: 'Radiating sparks from center',
            previewId: 'spark-particles',
            prompt: 'Create a spark particle effect that radiates outward from a central point.',
            code: `/* Spark Particle Effect */
.spark-container {
    position: relative;
    width: 100%;
    height: 400px;
    background: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
}

.spark-source {
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, #ffcc00, #ff6600);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 30px #ffcc00;
    transition: transform 0.2s ease;
}

.spark-source:hover {
    transform: scale(1.1);
}

.spark {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: spark-fly 1s ease-out forwards;
}

@keyframes spark-fly {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(var(--tx), var(--ty)) scale(0);
        opacity: 0;
    }
}

/* JavaScript to create sparks */
const source = document.querySelector('.spark-source');
const container = document.querySelector('.spark-container');

source.addEventListener('mouseenter', () => {
    const sparkInterval = setInterval(() => {
        const spark = document.createElement('div');
        spark.className = 'spark';
        const size = Math.random() * 6 + 2;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 150 + 50;
        const tx = Math.cos(angle) * distance + 'px';
        const ty = Math.sin(angle) * distance + 'px';

        spark.style.width = size + 'px';
        spark.style.height = size + 'px';
        spark.style.left = '50%';
        spark.style.top = '50%';
        spark.style.background = '#ffcc00';
        spark.style.setProperty('--tx', tx);
        spark.style.setProperty('--ty', ty);
        spark.style.boxShadow = '0 0 ' + size * 2 + 'px #ffcc00';

        container.appendChild(spark);

        setTimeout(() => spark.remove(), 1000);
    }, 50);

    source.addEventListener('mouseleave', () => {
        clearInterval(sparkInterval);
    }, { once: true });
});`
        },
        {
            id: 'bubble-particles',
            name: 'Bubble Particles',
            nameZh: '气泡粒子',
            description: 'Rising soap bubbles',
            previewId: 'bubble-particles',
            prompt: 'Create a bubble particle effect with translucent, shimmering bubbles floating upward.',
            code: `/* Bubble Particle Effect */
.bubble-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, #0a2a3a, #1a4a5a);
    overflow: hidden;
}

.bubble {
    position: absolute;
    bottom: -50px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(100,200,255,0.2));
    border: 1px solid rgba(255,255,255,0.3);
    animation: bubble-rise linear infinite;
    pointer-events: none;
}

.bubble::after {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    width: 30%;
    height: 30%;
    background: rgba(255,255,255,0.6);
    border-radius: 50%;
}

@keyframes bubble-rise {
    0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
    }
    10% {
        opacity: 0.8;
    }
    100% {
        transform: translateY(calc(-100vh - 100px)) translateX(var(--wobble));
        opacity: 0;
    }
}

/* JavaScript to create bubbles */
function createBubbles(count) {
    const container = document.querySelector('.bubble-container');
    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 30 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 10;
        const wobble = (Math.random() - 0.5) * 100 + 'px';

        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = left + '%';
        bubble.style.animationDuration = duration + 's';
        bubble.style.animationDelay = delay + 's';
        bubble.style.setProperty('--wobble', wobble);

        container.appendChild(bubble);
    }
}

createBubbles(30);`
        },
        {
            id: 'star-particles',
            name: 'Star Particles',
            nameZh: '星星粒子',
            description: 'Twinkling stars in night sky',
            previewId: 'star-particles',
            prompt: 'Create a star particle effect with twinkling stars scattered across a night sky.',
            code: `/* Star Particle Effect */
.star-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, #0a0a2e, #1a1a4e);
    overflow: hidden;
}

.star {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: star-twinkle ease-in-out infinite;
}

@keyframes star-twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
}

/* Shooting star */
.shooting-star {
    position: absolute;
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, white, transparent);
    animation: shooting 3s ease-out infinite;
    opacity: 0;
}

@keyframes shooting {
    0% { transform: translateX(0) translateY(0); opacity: 0; }
    5% { opacity: 1; }
    20% { transform: translateX(300px) translateY(150px); opacity: 0; }
    100% { opacity: 0; }
}

/* JavaScript to create stars */
function createStars(count) {
    const container = document.querySelector('.star-container');
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 3;

        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = left + '%';
        star.style.top = top + '%';
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = delay + 's';

        container.appendChild(star);
    }
}

createStars(100);

// Add shooting star
const shootingStar = document.createElement('div');
shootingStar.className = 'shooting-star';
shootingStar.style.left = '10%';
shootingStar.style.top = '20%';
document.querySelector('.star-container').appendChild(shootingStar);`
        },
        {
            id: 'dust-particles',
            name: 'Dust Particles',
            nameZh: '尘埃粒子',
            description: 'Floating dust motes in light',
            previewId: 'dust-particles',
            prompt: 'Create a dust particle effect with small particles floating gently in the air.',
            code: `/* Dust Particle Effect */
.dust-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #2a2520, #3a3530);
    overflow: hidden;
}

.dust {
    position: absolute;
    background: rgba(255, 220, 150, 0.6);
    border-radius: 50%;
    animation: dust-float linear infinite;
    pointer-events: none;
}

@keyframes dust-float {
    0% {
        transform: translate(0, 0);
    }
    25% {
        transform: translate(var(--tx1), var(--ty1));
    }
    50% {
        transform: translate(var(--tx2), var(--ty2));
    }
    75% {
        transform: translate(var(--tx3), var(--ty3));
    }
    100% {
        transform: translate(0, 0);
    }
}

/* JavaScript to create dust */
function createDust(count) {
    const container = document.querySelector('.dust-container');
    for (let i = 0; i < count; i++) {
        const dust = document.createElement('div');
        dust.className = 'dust';
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 20 + 15;

        const tx1 = (Math.random() - 0.5) * 100 + 'px';
        const ty1 = (Math.random() - 0.5) * 100 + 'px';
        const tx2 = (Math.random() - 0.5) * 100 + 'px';
        const ty2 = (Math.random() - 0.5) * 100 + 'px';
        const tx3 = (Math.random() - 0.5) * 100 + 'px';
        const ty3 = (Math.random() - 0.5) * 100 + 'px';

        dust.style.width = size + 'px';
        dust.style.height = size + 'px';
        dust.style.left = left + '%';
        dust.style.top = top + '%';
        dust.style.animationDuration = duration + 's';
        dust.style.setProperty('--tx1', tx1);
        dust.style.setProperty('--ty1', ty1);
        dust.style.setProperty('--tx2', tx2);
        dust.style.setProperty('--ty2', ty2);
        dust.style.setProperty('--tx3', tx3);
        dust.style.setProperty('--ty3', ty3);

        container.appendChild(dust);
    }
}

createDust(50);`
        },
        {
            id: 'rain-particles',
            name: 'Rain Particles',
            nameZh: '雨滴粒子',
            description: 'Falling raindrops',
            previewId: 'rain-particles',
            prompt: 'Create a rain particle effect with raindrops falling vertically.',
            code: `/* Rain Particle Effect */
.rain-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, #1a1a2e, #0a0a1e);
    overflow: hidden;
}

.raindrop {
    position: absolute;
    background: linear-gradient(180deg, transparent, rgba(100, 150, 255, 0.6));
    animation: rain-fall linear infinite;
    pointer-events: none;
}

@keyframes rain-fall {
    0% {
        transform: translateY(-100px);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    100% {
        transform: translateY(100vh);
        opacity: 0.3;
    }
}

/* Rain splash effect */
.splash {
    position: absolute;
    bottom: 0;
    width: 8px;
    height: 2px;
    background: rgba(100, 150, 255, 0.8);
    border-radius: 50%;
    animation: splash 0.5s ease-out forwards;
}

@keyframes splash {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(3); opacity: 0; }
}

/* JavaScript to create rain */
function createRain(count) {
    const container = document.querySelector('.rain-container');
    for (let i = 0; i < count; i++) {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        const height = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 0.5 + 0.5;
        const delay = Math.random() * 2;

        drop.style.width = '1px';
        drop.style.height = height + 'px';
        drop.style.left = left + '%';
        drop.style.animationDuration = duration + 's';
        drop.style.animationDelay = delay + 's';

        container.appendChild(drop);
    }
}

createRain(100);`
        },
        {
            id: 'confetti-particles',
            name: 'Confetti Particles',
            nameZh: '彩纸粒子',
            description: 'Colorful confetti explosion',
            previewId: 'confetti-particles',
            prompt: 'Create a confetti particle effect with colorful paper pieces exploding outward.',
            code: `/* Confetti Particle Effect */
.confetti-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.confetti-btn {
    padding: 16px 32px;
    background: white;
    border: none;
    border-radius: 50px;
    font-size: 18px;
    font-weight: 600;
    color: #667eea;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
}

.confetti-btn:hover {
    transform: scale(1.05);
}

.confetti {
    position: absolute;
    pointer-events: none;
}

.confetti.square {
    width: 10px;
    height: 10px;
}

.confetti.circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.confetti.rectangle {
    width: 6px;
    height: 12px;
}

/* JavaScript to create confetti */
const btn = document.querySelector('.confetti-btn');
const container = document.querySelector('.confetti-container');
const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'];

btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        const type = ['square', 'circle', 'rectangle'][Math.floor(Math.random() * 3)];
        confetti.className = 'confetti ' + type;

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 15 + 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 5;
        const rotation = Math.random() * 360;
        const rotationSpeed = (Math.random() - 0.5) * 20;

        confetti.style.left = centerX + 'px';
        confetti.style.top = centerY + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(confetti);

        let x = 0, y = 0, rot = rotation, opacity = 1;
        const animate = () => {
            x += vx;
            y += vy + 0.5;
            rot += rotationSpeed;
            opacity -= 0.01;

            confetti.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + rot + 'deg)';
            confetti.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        requestAnimationFrame(animate);
    }
});`
        }
    ];

    // Make available globally
    window.MOUSE_EFFECTS = MOUSE_EFFECTS;
    window.DESIGN_STYLE_EFFECTS = DESIGN_STYLE_EFFECTS;
    window.TEXT_EFFECTS = TEXT_EFFECTS;
    window.TRANSITIONS = TRANSITIONS;
    window.PAGE_TRANSITIONS = PAGE_TRANSITIONS;
    window.BACKGROUNDS = BACKGROUNDS;
    window.BACKGROUND_EFFECTS = BACKGROUND_EFFECTS;
    window.THREE_D_EFFECTS = THREE_D_EFFECTS;
    window.THREE_D_TRANSFORMS = THREE_D_TRANSFORMS;
    window.DATA_VIZ = DATA_VIZ;
    window.CHARTS_COUNTERS = CHARTS_COUNTERS;
    window.IMAGE_EFFECTS = IMAGE_EFFECTS;
    window.SCROLL_EFFECTS = SCROLL_EFFECTS;
    window.LOADING_STATES = LOADING_STATES;
    window.SVG_ANIMATION = SVG_ANIMATION;
    window.MICRO_INTERACTIONS = MICRO_INTERACTIONS;
    window.LAYOUT_PATTERNS = LAYOUT_PATTERNS;
    window.FILTER_EFFECTS = FILTER_EFFECTS;
    window.BUTTON_ANIMATIONS = BUTTON_ANIMATIONS;
    window.CARD_EFFECTS = CARD_EFFECTS;
    window.PARALLAX_EFFECTS = PARALLAX_EFFECTS;
    window.FORM_EFFECTS = FORM_EFFECTS;
    window.GLITCH_EFFECTS = GLITCH_EFFECTS;
    window.PARTICLE_EFFECTS = PARTICLE_EFFECTS;
    window.PREVIEW_INITERS = PREVIEW_INITERS;

})();
