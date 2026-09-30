// ASCII background: plasma, wave, equalizer bars and scrolling titles
(() => {
  const WORDS = [
    "CLUB ANXIETY", "DON'T LIE", "RUN", "SPIN IT BACK", "DANCE ALL NIGHT (YEAH)",
    "DON'T STOP THE RHYTHM", "CHUNGKING BASEMENT", "LOST IN U", "ESCAPE (HI-TECH RMX)",
    "SPIN IT BACK", "JASON Y", "INTERNET EMOTIONAL MUSIC*", "IEM*"
  ];
  const RAMP = " .·:-=+*#%@";
  const cv = document.getElementById("ascii");
  const ctx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W, H, cols, rows, cw, ch, fs, dpr, rowsText = [];

  function build() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    fs = W < 600 ? 11 : 13;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${fs}px "Courier New", Courier, ui-monospace, monospace`;
    ctx.textBaseline = "top";
    cw = ctx.measureText("M").width;
    ch = fs * 1.15;
    cols = Math.ceil(W / cw) + 1;
    rows = Math.ceil(H / ch) + 1;

    // word tickers: every Nth row carries a scrolling line of titles
    const gap = W < 600 ? 5 : 6;
    rowsText = [];
    let wi = 0;
    for (let r = 2; r < rows - 1; r += gap) {
      let s = "";
      while (s.length < cols * 2 + 60) { s += WORDS[wi++ % WORDS.length] + "   //   "; }
      rowsText.push({ r, s, dir: (rowsText.length % 2 ? 1 : -1), speed: 3 + ((rowsText.length * 7) % 5) * 1.6 });
    }
  }

  function field(x, y, t, beat) {
    // layered plasma + rolling wave + equalizer bars
    const nx = x / cols, ny = y / rows;
    let v = Math.sin(nx * 9 + t * .8) + Math.sin(ny * 7 - t * .6)
          + Math.sin((nx + ny) * 8 + t * .5) + Math.sin(Math.hypot(nx - .5, (ny - .5) * .6) * 14 - t * 1.4);
    v = (v + 4) / 8;
    // horizon sine wave
    const wave = .5 + .22 * Math.sin(nx * 14 - t * 2.2) * (.6 + beat * .5);
    v += Math.max(0, 1 - Math.abs(ny - wave) * 16) * .9;
    // equalizer bars along the bottom
    const bar = Math.floor(x / 2);
    const h = (.5 + .5 * Math.sin(bar * 1.7 + t * 3.1) * Math.sin(bar * .31 - t * 1.3)) * (.16 + beat * .1);
    if (ny > 1 - h) v += .55;
    return v * v * (.85 + beat * .35);
  }

  function frame(ms) {
    const t = ms / 1000;
    const beat = Math.pow(1 - ((t * 124 / 60) % 1), 3); // 124 bpm kick envelope
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);

    // background field, batched by ramp level for cheap fillStyle changes
    const buckets = Array.from({ length: RAMP.length }, () => []);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const v = field(x, y, t, beat);
        const i = Math.min(RAMP.length - 1, Math.max(0, (v * RAMP.length * .9) | 0));
        if (i > 0) buckets[i].push(x, y);
      }
    }
    for (let i = 1; i < buckets.length; i++) {
      const a = .10 + (i / RAMP.length) * .5;
      ctx.fillStyle = `rgba(${140 + i * 10},${140 + i * 10},${140 + i * 10},${a.toFixed(2)})`;
      const c = RAMP[i], b = buckets[i];
      for (let k = 0; k < b.length; k += 2) ctx.fillText(c, b[k] * cw, b[k + 1] * ch);
    }

    // drifting title tickers, bright over the field
    ctx.fillStyle = `rgba(244,244,240,${(.72 + beat * .28).toFixed(2)})`;
    for (const row of rowsText) {
      const len = row.s.length;
      const off = ((t * row.speed * row.dir) % len + len) % len;
      const start = Math.floor(off);
      const sub = (off - start) * cw;
      const y = row.r * ch;
      // clear a small band so the text stays legible over the noise
      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,.78)";
      ctx.fillRect(0, y - 1, W, ch + 1);
      ctx.restore();
      ctx.fillStyle = `rgba(244,244,240,${(.7 + beat * .3).toFixed(2)})`;
      for (let x = 0; x < cols; x++) {
        const c = row.s[(start + x) % len];
        if (c !== " ") ctx.fillText(c, x * cw - sub, y);
      }
    }
  }

  function loop(ms) {
    frame(ms);
    if (!reduce) setTimeout(() => requestAnimationFrame(loop), 1000 / 30);
  }

  let rz;
  addEventListener("resize", () => {
    clearTimeout(rz);
    rz = setTimeout(() => { build(); if (reduce) frame(4000); }, 120);
  });

  build();
  if (reduce) frame(4000); else requestAnimationFrame(loop);
})();
