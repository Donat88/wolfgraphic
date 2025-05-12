(() => {
    const c = document.getElementById('network-canvas');
    const ctx = c.getContext('2d');
    let W, H;
  
    const LINK_DIST  = 60;
    const SPAWN_RATE = 2;
    const MAX_LIFE   = 80;
    const SPEED      = 0.5;
    let particles = [], mouseX = 0, mouseY = 0, isHover = false;
  
    function resize() {
      W = c.width  = c.clientWidth;
      H = c.height = c.clientHeight;
    }
    window.addEventListener('resize', resize);
  
    const hero = document.getElementById('hero');
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
      isHover = true;
    });
    hero.addEventListener('mouseleave', () => isHover = false);
  
    function spawn() {
      for (let i = 0; i < SPAWN_RATE; i++) {
        const ang = Math.random() * Math.PI*2;
        const spd = SPEED * Math.random();
        particles.push({
          x: mouseX + Math.cos(ang)*10,
          y: mouseY + Math.sin(ang)*10,
          vx: Math.cos(ang)*spd,
          vy: Math.sin(ang)*spd,
          life: MAX_LIFE
        });
      }
    }
  
    function draw() {
      ctx.clearRect(0,0,W,H);
      if (isHover) spawn();
  
      // update + draw pontok
      let alive = [];
      for (let p of particles) {
        p.x += p.vx; p.y += p.vy; p.life--;
        if (p.life>0) {
          alive.push(p);
          const alpha = p.life / MAX_LIFE;
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fillRect(p.x-1,p.y-1,2,2);
        }
      }
      particles = alive;
  
      // draw vonalak
      ctx.lineWidth = 1;
      for (let i=0; i<particles.length; i++){
        for (let j=i+1; j<particles.length; j++){
          const a=particles[i], b=particles[j];
          const dx=a.x-b.x, dy=a.y-b.y, d2=dx*dx+dy*dy;
          if (d2<LINK_DIST*LINK_DIST){
            const dist=Math.sqrt(d2);
            const alpha=(1-dist/LINK_DIST)*(a.life/MAX_LIFE)*0.6;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x,a.y);
            ctx.lineTo(b.x,b.y);
            ctx.stroke();
          }
        }
      }
  
      requestAnimationFrame(draw);
    }
  
    resize();
    draw();
  })();
  