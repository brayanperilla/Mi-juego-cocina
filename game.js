/* ===================================================
   ATRAPA LOS INGREDIENTES — LÓGICA DE JUEGO
   =================================================== */

'use strict';

// ─── RECETAS Y CLIENTES ──────────────────────────────────────────────────
const CUSTOMERS = ['🧑‍🍳', '👩‍💼', '👨‍🎓', '🕵️', '🧙‍♂️', '🧛', '🦸‍♀️', '🥷', '🧑‍🚀'];

const RECIPES = [
  { name: 'Hamburguesa', gender: 'f', emoji: '🍔', ingredients: ['🍞', '🥩', '🧀', '🥬', '🍅', '🍞'] },
  { name: 'Salchipapa',  gender: 'f', emoji: '🍟', ingredients: ['🍟', '🌭', '🧀', '🥫'] },
  { name: 'Arepa Rellena', gender: 'f', emoji: '🫓', ingredients: ['🫓', '🧀', '🥩', '🥑'] },
  { name: 'Pizza',       gender: 'f', emoji: '🍕', ingredients: ['🌾', '🍅', '🧀', '🍄', '🥩'] },
  { name: 'Taco',        gender: 'm', emoji: '🌮', ingredients: ['🌮', '🥩', '🥬', '🍅', '🧀'] },
  { name: 'Sopa',        gender: 'f', emoji: '🥣', ingredients: ['🥕', '🧅', '🧄', '🍗', '🌽'] },
  { name: 'Ensalada',    gender: 'f', emoji: '🥗', ingredients: ['🥬', '🍅', '🧅', '🥑', '🍋'] },
  { name: 'Burrito',     gender: 'm', emoji: '🌯', ingredients: ['🌮', '🥩', '🧀', '🥑', '🍅', '🍚'] },
  { name: 'Sushi',       gender: 'm', emoji: '🍣', ingredients: ['🍚', '🐟', '🥑', '🥒'] },
  { name: 'Empanada',    gender: 'f', emoji: '🥟', ingredients: ['🌾', '🥩', '🧅', '🍅'] },
  { name: 'Pasta',       gender: 'f', emoji: '🍝', ingredients: ['🍝', '🍅', '🧄', '🧀', '🍄'] },
  { name: 'Sándwich',    gender: 'm', emoji: '🥪', ingredients: ['🍞', '🧀', '🥩', '🥬', '🍞'] },
  { name: 'Desayuno',    gender: 'm', emoji: '🍳', ingredients: ['🥚', '🥓', '🍞', '🧀'] }
];

// ─── INGREDIENTES DISPONIBLES ──────────────────────────────────────────────
const INGREDIENTS = [
  { emoji: '🍅', name: 'Tomate',      color: '#ff6b6b' },
  { emoji: '🧅', name: 'Cebolla',     color: '#ffd93d' },
  { emoji: '🧄', name: 'Ajo',         color: '#f9f0dc' },
  { emoji: '🥕', name: 'Zanahoria',   color: '#ff8c42' },
  { emoji: '🥬', name: 'Lechuga',     color: '#6bcb77' },
  { emoji: '🍋', name: 'Limón',       color: '#ffd700' },
  { emoji: '🥑', name: 'Aguacate',    color: '#4caf50' },
  { emoji: '🌽', name: 'Maíz',        color: '#ffc107' },
  { emoji: '🍄', name: 'Champiñón',   color: '#bc8a5f' },
  { emoji: '🧀', name: 'Queso',       color: '#f9a825' },
  { emoji: '🥩', name: 'Carne',       color: '#c62828' },
  { emoji: '🍗', name: 'Pollo',       color: '#e6a817' },
  { emoji: '🍞', name: 'Pan',         color: '#f4a460' },
  { emoji: '🍟', name: 'Papas',       color: '#ffcc00' },
  { emoji: '🌭', name: 'Salchicha',   color: '#ff9933' },
  { emoji: '🥫', name: 'Salsa',       color: '#ff3300' },
  { emoji: '🫓', name: 'Arepa',       color: '#ffe4b5' },
  { emoji: '🌾', name: 'Harina',      color: '#f5deb3' },
  { emoji: '🌮', name: 'Tortilla',    color: '#f5deb3' },
  { emoji: '🍚', name: 'Arroz',       color: '#ffffff' },
  { emoji: '🐟', name: 'Pescado',     color: '#a0c4ff' },
  { emoji: '🥒', name: 'Pepino',      color: '#8fbc8f' },
  { emoji: '🍝', name: 'Fideos',      color: '#ffd700' },
  { emoji: '🥚', name: 'Huevo',       color: '#fffacd' },
  { emoji: '🥓', name: 'Tocino',      color: '#ff9999' }
];

// ─── OBJETOS PELIGROSOS (quitan vida si los atrapas) ──────────────────────
const HAZARDS = [
  { emoji: '💣', name: 'Bomba',       color: '#ff2222' },
  { emoji: '🛞', name: 'Llanta',      color: '#cc3300' },
  { emoji: '👕', name: 'Camiseta',    color: '#dd1144' },
  { emoji: '👖', name: 'Pantalón',    color: '#cc0055' },
  { emoji: '🧦', name: 'Calcetín',   color: '#bb2233' },
  { emoji: '👟', name: 'Zapato',      color: '#cc1133' },
  { emoji: '🪨', name: 'Piedra',      color: '#aa2222' },
  { emoji: '🗑️', name: 'Basura',      color: '#bb3300' },
  { emoji: '🧨', name: 'Dinamita',    color: '#dd2200' },
  { emoji: '🪤', name: 'Trampa',      color: '#cc2211' },
  { emoji: '☢️', name: 'Tóxico',      color: '#39ff14' },
  { emoji: '✂️', name: 'Tijeras',     color: '#b0c4de' },
  { emoji: '💩', name: 'Popó',        color: '#8b4513' },
  { emoji: '🦠', name: 'Virus',       color: '#32cd32' },
  { emoji: '🧪', name: 'Ácido',       color: '#00ff00' }
];

// ─── HABILIDADES (POWER-UPS) ────────────────────────────────────────────────
const POWERUPS = [
  { emoji: '🧲', name: 'Super Imán', color: '#ff4d4d', type: 'magnet' }
];

// ─── SKINS / ROPA ──────────────────────────────────────────────────────────
const SKINS = [
  { id: 'none',      name: 'Chef (Normal)',  src: 'imgs/remy_chef.png',       cost: 0,  desc: '¡El chef clásico!', scale: 1.2 },
  { id: 'xmas',      name: 'Navideño',       src: 'imgs/remy_xmas.png',       cost: 40, desc: 'Pedidos: +20% Puntos' },
  { id: 'hallow',    name: 'Halloween',      src: 'imgs/remy_halloween.png',  cost: 40, desc: '50% de Esquivar Trampas' },
  { id: 'valentine', name: 'San Valentín',   src: 'imgs/remy_valentine.png',  cost: 35, desc: 'Pedidos: Regalan Monedas' },
  { id: 'cowboy',    name: 'Vaquero',        src: 'imgs/remy_cowboy.png',     cost: 45, desc: 'Imán: +2 segundos' },
  { id: 'fashion',   name: 'A la Moda',      src: 'imgs/remy_fashion.png',    cost: 60, desc: '50% de +2 🪙 Extra' },
  { id: 'soccer',    name: 'Futbolista',     src: 'imgs/remy_soccer.png',     cost: 50, desc: 'Movimiento +35% veloz' },
  { id: 'basket',    name: 'Básquet',        src: 'imgs/remy_basket.png',     cost: 50, desc: 'Canasta +40% más ancha' },
  { id: 'football',  name: 'Americano',      src: 'imgs/remy_football.png',   cost: 55, desc: 'Escudo 5s al perder vida' },
  { id: 'cheer',     name: 'Porrista',       src: 'imgs/remy_cheer.png',      cost: 45, desc: '+5 pts extra por acierto' },
  { id: 'anime',     name: 'Anime',          src: 'imgs/remy_anime.png',      cost: 65, desc: 'Ingredientes 30% más lentos' },
  { id: 'spring',    name: 'Primavera',      src: 'imgs/remy_spring.png',     cost: 70, desc: '25% ❤️ extra al completar pedido', scale: 1.45 }
];

// ─── DISEÑOS DE CANASTA ──────────────────────────────────────────────────────
const BASKETS = [
  { id: 'classic',  name: 'Clásica',       cost: 0,   color1: '#b37d4e', color2: '#6e4a2c', stroke: '#4a311d', fill: '#5d3f25', decor: '' },
  { id: 'metal',    name: 'Metálica',      cost: 50,  color1: '#e6e6e6', color2: '#999999', stroke: '#666666', fill: '#aaaaaa', decor: '' },
  { id: 'gold',     name: 'Dorada',        cost: 200, color1: '#ffdd00', color2: '#cc8800', stroke: '#b37700', fill: '#cca300', decor: '✨' },
  { id: 'neon',     name: 'Neón',          cost: 500, color1: '#00ffcc', color2: '#006655', stroke: '#003322', fill: '#00ccaa', decor: '⚡' },
  { id: 'xmas',     name: 'Navidad',       cost: 150, color1: '#e63946', color2: '#2a9d8f', stroke: '#d90429', fill: '#264653', decor: '🎄' },
  { id: 'hallow',   name: 'Halloween',     cost: 150, color1: '#f4a261', color2: '#9b5de5', stroke: '#e76f51', fill: '#3a0ca3', decor: '🎃' },
  { id: 'spring',   name: 'Primavera',     cost: 150, imgSrc: 'imgs/basket_spring.png', desc: 'Pétalos de rosa marfil' },
  { id: 'autumn',   name: 'Otoño',         cost: 150, color1: '#dda15e', color2: '#bc6c25', stroke: '#b0891d', fill: '#603808', decor: '🍁' },
  { id: 'love',     name: 'San Valentín', cost: 250, color1: '#ff4d6d', color2: '#c9184a', stroke: '#a4133c', fill: '#590d22', decor: '❤️' },
  { id: 'cowboyhat',name: 'Sombrero',      cost: 180, color1: '#8B4513', color2: '#5C2E00', stroke: '#3d1a00', fill: '#6b3410', decor: '🤠' },
  { id: 'fashionbag',name: 'A la Moda',   cost: 200, color1: '#e91e8c', color2: '#7b0050', stroke: '#5a003a', fill: '#c2185b', decor: '👗' },
  { id: 'soccerball',name: 'Balón ⚽',    cost: 160, color1: '#ffffff', color2: '#cccccc', stroke: '#333333', fill: '#888888', decor: '⚽' },
  { id: 'basketball',name: 'Baloncesto',   cost: 160, color1: '#ff6f00', color2: '#e65100', stroke: '#bf360c', fill: '#cc4400', decor: '🏀' },
  { id: 'footballhelm',name: 'Casco 🏈',  cost: 180, color1: '#1a237e', color2: '#0d1b6e', stroke: '#000033', fill: '#283593', decor: '🏈' },
  { id: 'pompoms',  name: 'Pompones',      cost: 160, color1: '#ff4081', color2: '#c51162', stroke: '#880e4f', fill: '#e91e63', decor: '📣' },
  { id: 'nimbus',   name: 'Nube Voladora', cost: 250, color1: '#fff176', color2: '#ffee58', stroke: '#f9a825', fill: '#fff9c4', decor: '☁️' }
];

// ─── MAPA DE SPRITES (emoji → hoja + celda en cuadrícula 3x3) ───────────────────────
const SPRITE_MAP = {
  // veggies.png — fila 0: tomate, cebolla, ajo
  '🍅': { sheet: 'veggies',  col: 0, row: 0 },
  '🧅': { sheet: 'veggies',  col: 1, row: 0 },
  '🧄': { sheet: 'veggies',  col: 2, row: 0 },
  // fila 1: zanahoria, lechuga, limón
  '🥕': { sheet: 'veggies',  col: 0, row: 1 },
  '🥬': { sheet: 'veggies',  col: 1, row: 1 },
  '🍋': { sheet: 'veggies',  col: 2, row: 1 },
  // fila 2: aguacate, maíz, champiñón
  '🥑': { sheet: 'veggies',  col: 0, row: 2 },
  '🌽': { sheet: 'veggies',  col: 1, row: 2 },
  '🍄': { sheet: 'veggies',  col: 2, row: 2 },
  // proteins.png — fila 0: queso, carne, pollo
  '🧀': { sheet: 'proteins', col: 0, row: 0 },
  '🥩': { sheet: 'proteins', col: 1, row: 0 },
  '🍗': { sheet: 'proteins', col: 2, row: 0 },
  // fila 1: pan, papas, salchicha
  '🍞': { sheet: 'proteins', col: 0, row: 1 },
  '🍟': { sheet: 'proteins', col: 1, row: 1 },
  '🌭': { sheet: 'proteins', col: 2, row: 1 },
  // fila 2: salsa enlatada, arepa, harina
  '🥫': { sheet: 'proteins', col: 0, row: 2 },
  '�ae': { sheet: 'proteins', col: 1, row: 2 },
  '🌾': { sheet: 'proteins', col: 2, row: 2 },
  // others.png — fila 0: tortilla, arroz, pescado
  '🌮': { sheet: 'others',   col: 0, row: 0 },
  '🍚': { sheet: 'others',   col: 1, row: 0 },
  '🐟': { sheet: 'others',   col: 2, row: 0 },
  // fila 1: pepino, fideos, huevo
  '🥒': { sheet: 'others',   col: 0, row: 1 },
  '🍝': { sheet: 'others',   col: 1, row: 1 },
  '🥚': { sheet: 'others',   col: 2, row: 1 },
  // fila 2: tocón (centro)
  '🥓': { sheet: 'others',   col: 1, row: 2 },
};

// Helper: dibuja un ingrediente desde su sprite sheet. Devuelve true si lo
// pudo dibujar, false para que el llamador use el emoji como fallback.
function drawItemSprite(emoji, size) {
  if (emoji === '🫓') {
    drawCustomArepa(ctx, 0, 0, size);
    return true;
  }
  
  // Caso especial: Tocino (queremos ver las 3 tiras de la imagen)
  if (emoji === '🥓') {
    const info = SPRITE_MAP['🥓'];
    const sheet = ASSETS.sprites[info.sheet];
    if (!sheet || !sheet.complete || sheet.naturalWidth === 0) return false;
    
    const cellH = sheet.naturalHeight / 3;
    const sy = info.row * cellH;
    // Dibujamos toda la fila (las 3 tiras) y lo hacemos un poco más ancho
    const aspect = 1.5; 
    const drawW = size * aspect;
    ctx.drawImage(sheet, 0, sy, sheet.naturalWidth, cellH, -drawW/2, -size/2, drawW, size);
    return true;
  }

  const info = SPRITE_MAP[emoji];
  if (!info) return false;
  const sheet = ASSETS.sprites[info.sheet];
  if (!sheet || !sheet.complete || sheet.naturalWidth === 0) return false;
  const cellW = sheet.naturalWidth  / 3;
  const cellH = sheet.naturalHeight / 3;
  const sx = info.col * cellW;
  const sy = info.row * cellH;
  const half = size / 2;
  ctx.drawImage(sheet, sx, sy, cellW, cellH, -half, -half, size, size);
  return true;
}

// Helper para dibujar la arepa artesanal en cualquier contexto
function drawCustomArepa(targetCtx, x, y, size) {
  targetCtx.save();
  targetCtx.translate(x, y);
  
  // 1. Cuerpo de la Arepa (Masa)
  targetCtx.beginPath();
  targetCtx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
  targetCtx.fillStyle = '#fffceb'; 
  targetCtx.fill();
  
  // 2. Sombras de relieve
  const grad = targetCtx.createRadialGradient(-size*0.1, -size*0.1, 0, 0, 0, size * 0.45);
  grad.addColorStop(0, 'rgba(255,255,255,0.8)');
  grad.addColorStop(1, 'rgba(210,180,140,0.4)'); 
  targetCtx.fillStyle = grad;
  targetCtx.fill();

  // 3. PECAS DE TOSTADO
  const spots = [
    {x: -size*0.2, y: -size*0.1, r: size*0.08}, 
    {x: size*0.15, y: size*0.25, r: size*0.1}, 
    {x: -size*0.25, y: size*0.3, r: size*0.06},
    {x: size*0.3, y: -size*0.15, r: size*0.08}, 
    {x: size*0.05, y: size*0.05, r: size*0.12}, 
    {x: -size*0.1, y: -size*0.35, r: size*0.06}
  ];
  targetCtx.fillStyle = 'rgba(139, 69, 19, 0.6)'; 
  spots.forEach(s => {
    targetCtx.beginPath();
    targetCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    targetCtx.fill();
  });

  // 4. QUESO
  targetCtx.fillStyle = '#ffd700'; 
  targetCtx.beginPath();
  targetCtx.moveTo(size*0.2, -size*0.1);
  targetCtx.quadraticCurveTo(size*0.45, 0, size*0.3, size*0.2);
  targetCtx.closePath();
  targetCtx.fill();

  // 5. Borde
  targetCtx.strokeStyle = '#8b4513';
  targetCtx.lineWidth = size * 0.04;
  targetCtx.stroke();
  targetCtx.restore();
}


// ─── CONFIGURACIÓN ──────────────────────────────────────────────────────────
const CONFIG = {
  maxLives:          3,
  baseSpeed:         2.5,
  speedIncrement:    0.15,
  levelUpEvery:      3,         // pedidos completados para subir de nivel
  maxLevel:          15,
  barHeight:         18,
  barColor:          '#ffd93d',
  barBorderColor:    '#ff8e53',
  barGlow:           'rgba(255,217,61,.45)',
  baseFallRate:      1600,
  minFallRate:       350,
  fontSize:          36,
  maxSimultaneous:   5,
  hazardBaseChance:  0.30,
  hazardMaxChance:   0.60,
};

// ─── DATOS DEL JUGADOR (localStorage) ───────────────────────────────────────
// ─── CONFIGURACIÓN GLOBAL (Leaderboard) ─────────────────────────────────────
const GLOBAL_CONFIG = {
  leaderboard: [], // Empezamos vacío para detectar carga real
  DREAMLO_PUBLIC: '671ab2518f40776b208ef766',
  DREAMLO_PRIVATE: 'h8qUu1S_00CHm5vE44919w6eS_n0k5-UunZ6I4XyEonw',
  isLoaded: false
};

const PlayerData = {
  KEY: 'catchgame_data_v2',
  data: {
    bestScore: 0,
    coins: 999,
    magnetLevel: 6,
    unlockedSkins: ['none', 'chef', 'cool', 'gentle', 'king'],
    activeSkin: 'none',
    unlockedBaskets: ['classic'],
    activeBasket: 'classic',
    globalName: 'Brayan',
    storyLevel: 1,
    maxStoryLevel: 1
  },
  load() {
    const d = localStorage.getItem(this.KEY);
    if (d) {
      const parsed = JSON.parse(d);
      this.data = { ...this.data, ...parsed };
      if (!this.data.unlockedBaskets) {
        this.data.unlockedBaskets = ['classic'];
        this.data.activeBasket = 'classic';
      }
      if (!this.data.storyLevel) this.data.storyLevel = 1;
      if (!this.data.maxStoryLevel) this.data.maxStoryLevel = 1;
    }
  },
  save() {
    localStorage.setItem(this.KEY, JSON.stringify(this.data));
  },
  getBest() { return this.data.bestScore; },
  saveBest(score) {
    let changed = false;
    if (score > this.data.bestScore) {
      this.data.bestScore = score;
      changed = true;
    }
    
    // Lógica de Top 3 Local
    if (score > 0) {
      if (!this.data.leaderboard) this.data.leaderboard = [];
      this.data.leaderboard.push(score);
      this.data.leaderboard.sort((a, b) => b - a);
      this.data.leaderboard = this.data.leaderboard.slice(0, 3);
      changed = true;
    }

    if (changed) {
      this.save();
      renderLeaderboard();
    }
    return changed;
  }
};

PlayerData.load();
// MODO PRUEBA: Forzamos desbloqueo de todo
PlayerData.data.unlockedSkins = SKINS.map(s => s.id);
PlayerData.data.unlockedBaskets = BASKETS.map(b => b.id);
PlayerData.data.magnetLevel = 6;
PlayerData.data.coins = 999;
PlayerData.save();


// ─── SISTEMA DE ANUNCIOS ──────────────────────────────────────────────────────
const AdSystem = {
  _rewardCb: null,
  _failCb:   null,

  init() {
    window._gdEventHandler = (event) => {
      switch (event.name) {
        case 'SDK_GAME_START':
          document.getElementById('ad-overlay').classList.add('hidden');
          break;
        case 'SDK_REWARDED_WATCH_COMPLETE':
          if (this._rewardCb) { this._rewardCb(); this._rewardCb = null; }
          break;
        case 'SDK_ERROR':
        case 'SDK_REWARDED_WATCH_INCOMPLETE':
          document.getElementById('ad-overlay').classList.add('hidden');
          if (this._failCb) { this._failCb(); this._failCb = null; }
          break;
      }
    };
  },

  showRewarded(onReward, onFail) {
    this._rewardCb = onReward;
    this._failCb   = onFail;
    document.getElementById('ad-overlay').classList.remove('hidden');

    if (typeof gdsdk !== 'undefined' && gdsdk.AdType) {
      gdsdk.showAd(gdsdk.AdType.Rewarded).catch(() => {
        document.getElementById('ad-overlay').classList.add('hidden');
        if (this._failCb) { this._failCb(); this._failCb = null; }
      });
    } else {
      console.log('[AdSystem] SDK no detectado → simulando anuncio (3 s)...');
      setTimeout(() => {
        document.getElementById('ad-overlay').classList.add('hidden');
        if (this._rewardCb) { this._rewardCb(); this._rewardCb = null; }
      }, 3000);
    }
  },
};

// ─── SISTEMA DE SONIDO (Web Audio API) ────────────────────────────────────────
const SoundSystem = {
  ctx: null,
  muted: false,

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  },

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  },

  playTone(freq, type, duration, vol=0.1) {
    if (this.muted) return;
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  },

  playPop() { this.playTone(800, 'sine', 0.1, 0.15); },
  playError() { this.playTone(150, 'sawtooth', 0.3, 0.15); },
  playSuccess() {
    if (this.muted) return;
    this.playTone(400, 'square', 0.1, 0.1);
    setTimeout(() => this.playTone(600, 'square', 0.3, 0.1), 100);
  },
  playLevelUp() {
    if (this.muted) return;
    [300, 400, 500, 600, 800].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sine', 0.1, 0.1), i * 100);
    });
  },

  // --- MELODÍA DE MENÚ (Programática) ---
  menuMusicId: null,
  startMenuMusic() {
    if (this.menuMusicId || this.muted) return;
    this.init();
    
    // Forzar reanudación del contexto de audio
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    
    const playTune = () => {
      if (this.muted) return;
      if (state.running && !state.paused) return;
      
      // Melodía inspirada en Terraria (Overworld Day)
      // Estilo saltarín con ritmo sincopado
      const tune = [
        {f: 392.00, t: 0.12, d: 0},    // G4
        {f: 392.00, t: 0.12, d: 200},  // G4
        {f: 493.88, t: 0.12, d: 400},  // B4
        {f: 523.25, t: 0.12, d: 550},  // C5
        {f: 587.33, t: 0.12, d: 700},  // D5
        {f: 392.00, t: 0.12, d: 1000}, // G4
        {f: 783.99, t: 0.12, d: 1150}, // G5 (salto!)
        {f: 587.33, t: 0.12, d: 1350}, // D5
        {f: 493.88, t: 0.12, d: 1550}, // B4
        {f: 440.00, t: 0.12, d: 1750}  // A4
      ];

      tune.forEach((note) => {
        setTimeout(() => {
          if ((!state.running || state.paused) && !this.muted) {
            this.playTone(note.f, 'square', note.t, 0.05); 
          }
        }, note.d);
      });
    };

    playTune();
    this.menuMusicId = setInterval(playTune, 3000); // Espacio para que respire el bucle
  },

  stopMenuMusic() {
    if (this.menuMusicId) {
      clearInterval(this.menuMusicId);
      this.menuMusicId = null;
    }
  }
};

// ─── ESTADO DEL JUEGO ───────────────────────────────────────────────────────
let state = {};
// ─── MISIONES DEL MODO HISTORIA ─────────────────────────────────────────────
const STORY_MISSIONS = [
  { level: 1, title: 'Prueba Rápida', desc: '¡Recolecta 2 tomates para ganar!', target: { '🍅': 2 } }
];

function createState() {
  return {
    running:    false,
    paused:     false,
    lives:      CONFIG.maxLives,
    score:      0,
    level:      1,
    caught:     0,
    completedOrders: 0,
    items:      [],
    currentOrder: null,
    orderProgress: [],
    barX:       0,
    barW:       80, // Ajustado para la canasta
    speed:      CONFIG.baseSpeed,
    fallTimer:  null,
    animFrame:  null,
    lastTime:   0,
    canRevive:  true,
    happyAnimTime: 0, 
    magnetTime: 0, // Tiempo de duración del imán mágico
    invincibleUntil: 0, // Tiempo de invulnerabilidad después de recibir daño
    failCause:  null, 
    trapHordeActive: false, 
    nextHordeTime: 0,
    dizziness: 0,
    isDrunk: false,
    lastMouseX: 0,
    gameMode: 'classic', // 'classic', 'time', 'survival'
    gameTimer: 0,
    timerInterval: null,
    survivalMisses: 0,
    nextBgChangeTime: 0,
    survivalIntensity: 1.0,
    bgTransition: 1.0, // 1.0 = cambio completado, < 1.0 = en progreso
    lastBgIndex: 0
  };
}

// Assets globales (No se resetean al iniciar partida)
const ASSETS = {
  baskets: {}, // Almacena las imágenes de las canastas
  magnet: new Image(),
  skinImages: {},
  skinCleanCanvas: {},
  kitchenBg: new Image(),
  bgImages: {},          // Fondos temáticos adicionales
  currentBgIndex: 0,     // Índice del fondo actual
  sprites: {
    veggies:  new Image(),
    proteins: new Image(),
    others:   new Image()
  }
};

// ─── TEMAS DE FONDO (rotan cada nivel) ───────────────────────────────────────
const BG_THEMES = [
  { id: 'kitchen',   label: 'Cocina',      img: 'kitchen_bg.png',   overlay: 'rgba(10,5,20,0.72)',    draw: null },
  { id: 'halloween', label: 'Halloween',   img: 'imgs/bg_halloween.jpg', overlay: 'rgba(5,0,15,0.50)',     draw: 'halloween' },
  { id: 'soccer',    label: 'Fútbol',     img: 'imgs/bg_soccer.jpg', overlay: 'rgba(0,20,5,0.65)',     draw: 'soccer' },
  { id: 'xmas',      label: 'Navidad',     img: 'imgs/bg_xmas.jpg', overlay: 'rgba(10,0,5,0.55)',     draw: 'xmas' },
  { id: 'anime',     label: 'Anime',       img: 'imgs/bg_anime.png', overlay: 'rgba(10,0,30,0.60)',   draw: null },
];

// Pre-cargar los fondos con imagen
BG_THEMES.forEach(t => {
  if (t.img) {
    const img = new Image();
    img.src = t.img;
    ASSETS.bgImages[t.id] = img;
  }
});
ASSETS.sprites.veggies.src  = 'imgs/veggies.png';
ASSETS.sprites.proteins.src = 'imgs/proteins.png';
ASSETS.sprites.others.src   = 'imgs/others.png';

// Función para remover fondo blanco de las skins
function processWhiteBackground(img) {
  const oc  = document.createElement('canvas');
  oc.width  = img.naturalWidth;
  oc.height = img.naturalHeight;
  const octx = oc.getContext('2d');
  octx.drawImage(img, 0, 0);

  const imgData = octx.getImageData(0, 0, oc.width, oc.height);
  const d = imgData.data;

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i+1], b = d[i+2];
    if (r > 220 && g > 220 && b > 220) {
      const whiteness = Math.min(r, g, b);
      d[i+3] = Math.max(0, 255 - Math.round((whiteness - 220) * (255 / 35)));
    }
  }
  octx.putImageData(imgData, 0, 0);
  return oc;
}

// Cargar todas las skins dinámicamente
SKINS.forEach(skin => {
  const img = new Image();
  img.onload = () => {
    ASSETS.skinCleanCanvas[skin.id] = processWhiteBackground(img);
  };
  img.onerror = () => {
    if (skin.id === 'none') {
      console.warn("Usando fallback para Chef Normal.");
      img.src = 'imgs/remy_chef.png';
    } else if (skin.id === 'spring') {
      console.warn("Usando fallback para Primavera.");
      img.src = 'imgs/remy_chef.png';
    }
  };
  img.src = skin.src;
  ASSETS.skinImages[skin.id] = img;
});

const canvas  = document.getElementById('gameCanvas');
const ctx     = canvas.getContext('2d');

function resizeCanvas() {
  const container = canvas.parentElement;
  canvas.width  = container.clientWidth;
  canvas.height = container.clientHeight;
  if (state.barX === 0) {
    state.barX = canvas.width / 2 - state.barW / 2;
  }
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ─── INICIAR / REINICIAR ─────────────────────────────────────────────────────
function startGame(mode = 'classic') {
  if (state.animFrame)  cancelAnimationFrame(state.animFrame);
  if (state.fallTimer)  clearInterval(state.fallTimer);

  SoundSystem.init();
  SoundSystem.stopMenuMusic(); 

  state = createState();
  state.gameMode = mode; // Asignar el modo antes de configurar la UI
  state.barX = canvas.width / 2 - state.barW / 2;
  state.running = true;
  state.nextHordeTime = Date.now() + 45000; 
  state.nextBgChangeTime = Date.now() + 45000; // Primer cambio en 45 seg
  // Configuración específica por modo
  const timerHud = document.getElementById('timer-hud');
  const customerArea = document.getElementById('customer-area'); // El cuadro de ingredientes
  const hudRecipe = document.querySelector('.sidebar-title'); // El texto "Faltan:"
  
  if (state.gameMode === 'time') {
    state.gameTimer = 90;
    if (timerHud) {
      timerHud.style.display = 'block';
      timerHud.textContent = state.gameTimer;
      timerHud.classList.remove('timer-low');
    }
    if (customerArea) customerArea.style.display = 'flex'; // Volver a mostrar
    if (hudRecipe) hudRecipe.style.display = 'block';
    startModeTimer();
  } else if (state.gameMode === 'survival') {
    state.gameTimer = 0;
    if (timerHud) timerHud.style.display = 'none';
    if (customerArea) customerArea.style.display = 'none'; // Ocultar solo ingredientes
    if (hudRecipe) hudRecipe.style.display = 'none'; // Ocultar solo el título "Faltan:"
  } else {
    if (timerHud) timerHud.style.display = 'none';
    if (customerArea) customerArea.style.display = 'flex';
    if (hudRecipe) hudRecipe.style.display = 'block';
  }

  document.getElementById('revive-section').style.display = '';
  document.getElementById('new-record-badge').classList.add('hidden');

  // Resetear corazones visualmente
  const hearts = document.querySelectorAll('#hud-lives .heart');
  hearts.forEach(h => {
    h.classList.add('active');
    h.classList.remove('lost', 'heart-pop');
    h.style.transform = '';
    h.style.opacity = '';
  });

  updateHUD();
  generateOrder();
  showScreen('screen-game');
  resizeCanvas();

  scheduleNextFall();
  state.lastTime = performance.now();
  state.animFrame = requestAnimationFrame(gameLoop);
}

function startModeTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    if (!state.running || state.paused) return;
    state.gameTimer--;
    const timerHud = document.getElementById('timer-hud');
    if (timerHud) {
      timerHud.textContent = state.gameTimer;
      if (state.gameTimer <= 10) timerHud.classList.add('timer-low');
    }
    if (state.gameTimer <= 0) {
      clearInterval(state.timerInterval);
      endGame({ type: 'time' });
    }
  }, 1000);
}

// ─── LOOP PRINCIPAL ──────────────────────────────────────────────────────────
function gameLoop(timestamp) {
  if (!state.running) return;
  if (state.paused) {
    state.animFrame = requestAnimationFrame(gameLoop);
    return;
  }

  const dt = Math.min((timestamp - state.lastTime) / 16.67, 3);
  state.lastTime = timestamp;

  // Lógica para disparar la horda de trampas
  if (Date.now() > state.nextHordeTime && !state.trapHordeActive) {
    triggerTrapHorde();
  }

  // Lógica para cambiar de escenario automáticamente (SOLO en modo Supervivencia)
  if (state.gameMode === 'survival' && Date.now() > state.nextBgChangeTime) {
    rotateBg();
    state.nextBgChangeTime = Date.now() + 45000;
  }

  update(dt);
  draw();

  state.animFrame = requestAnimationFrame(gameLoop);
}

function update(dt) {
  let speed = state.speed * dt;
  if (state.trapHordeActive) speed *= 1.3;

  // HABILIDAD ANIME: Ingredientes caen 30% más despacio
  if (PlayerData.data.activeSkin === 'anime') speed *= 0.70;

  // En Supervivencia, la dificultad sube con el tiempo
  if (state.gameMode === 'survival') {
    state.speed += 0.0004 * dt; 
    // Aumentar la intensidad de aparición (frecuencia) poco a poco hasta un tope de 2.2
    if (state.survivalIntensity < 2.2) {
        state.survivalIntensity += 0.0001 * dt;
    }
  }

  // Avanzar transición de fondo
  if (state.bgTransition < 1.0) {
    state.bgTransition += 0.006 * dt; // Más lento para mayor elegancia
    if (state.bgTransition > 1.0) state.bgTransition = 1.0;
  }

  const isMagnet = state.magnetTime > Date.now();
  const ratCenterX = state.barX + state.barW / 2;

  // HABILIDAD BÁSQUET: La canasta es 40% más ancha
  const baseBarW = 120;
  state.barW = PlayerData.data.activeSkin === 'basket' ? Math.floor(baseBarW * 1.4) : baseBarW;

  for (let i = state.items.length - 1; i >= 0; i--) {
    const item = state.items[i];
    item.y += speed;
    item.rot += item.rotSpeed * dt;

    if (isMagnet && !item.isBad && !item.isPowerup && isIngredientNeeded(item.emoji)) {
      const dist = ratCenterX - item.x;
      item.x += Math.sign(dist) * Math.min(Math.abs(dist), 6 * dt);
    }

    if (item.y > canvas.height + 20) {
      state.items.splice(i, 1);
      if (!item.isBad && !item.isPowerup && isIngredientNeeded(item.emoji)) {
        onMiss(item.emoji);
      }
    }
  }

  // HABILIDAD FUTBOLISTA: Movimiento 35% más rápido
  const moveSpeed = PlayerData.data.activeSkin === 'soccer' ? 9.45 : 7;
  if (keys.ArrowLeft)  state.barX = Math.max(0, state.barX - moveSpeed * dt);
  if (keys.ArrowRight) state.barX = Math.min(canvas.width - state.barW, state.barX + moveSpeed * dt);

  if (state.dizziness > 0) {
    state.dizziness = Math.max(0, state.dizziness - 0.5 * dt);
    if (state.dizziness > 100) state.isDrunk = true;
    if (state.dizziness < 20) state.isDrunk = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // DIBUJAR FONDOS CON TRANSICIÓN (Efecto "Cross-fade" mejorado)
  if (state.bgTransition < 1.0) {
    // 1. Dibujamos el escenario viejo como base sólida (100% opacidad)
    renderSingleTheme(state.lastBgIndex);

    // 2. Dibujamos el escenario nuevo encima con opacidad progresiva
    ctx.save();
    ctx.globalAlpha = state.bgTransition;
    renderSingleTheme(ASSETS.currentBgIndex);
    ctx.restore();
  } else {
    // Escenario Actual (Estático al finalizar el cambio)
    renderSingleTheme(ASSETS.currentBgIndex);
  }

  // Líneas de cuadrícula sutiles
  ctx.save();
  ctx.strokeStyle = 'rgba(155,89,182,.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.font = `${CONFIG.fontSize}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

    for (const item of state.items) {
      ctx.save();
      ctx.translate(item.x, item.y);

      // --- 1. RESALTADO (Aura/Luz) ---
      // Lo dibujamos ANTES de rotar/escalar para que el aura sea estable y circular
      if (!item.isBad && !item.isPowerup && isIngredientNeeded(item.emoji)) {
        ctx.shadowColor = '#6bcb77';
        ctx.shadowBlur = 30;
        
        ctx.beginPath();
        // Si es tocino, el aura es más ancha para cubrir las 3 tiras
        const auraSize = (item.emoji === '🥓') ? CONFIG.fontSize * 1.1 : CONFIG.fontSize * 0.65;
        ctx.arc(0, 0, auraSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(107, 203, 119, 0.3)';
        ctx.fill();
      }

      // Sombra de contraste para el objeto
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 15;

      // --- 2. TRANSFORMACIONES (Giro y Rotación) ---
      const spinScale = Math.cos(Date.now() * item.spinSpeed + item.spinPhase);
      ctx.scale(spinScale, 1);
      ctx.rotate(item.rot);

      // --- 3. DIBUJO DEL OBJETO ---
      if (item.isBad) {
        // (Lógica de trampa se mantiene igual...)
        const pulse = 0.7 + 0.3 * Math.sin(Date.now() * 0.008);
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(255, 30, 30, ${0.4 * pulse})`;
        ctx.beginPath();
        ctx.arc(0, 0, CONFIG.fontSize * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 30, 30, ${0.8 * pulse})`;
        ctx.lineWidth = 3;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(0, 0, CONFIG.fontSize * 0.72, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#ffffff';
        const drawn = drawItemSprite(item.emoji, CONFIG.fontSize * 1.6);
        if (!drawn) ctx.fillText(item.emoji, 0, 0);
        ctx.font = '13px serif';
        ctx.shadowBlur = 0;
        ctx.fillText('⚠️', CONFIG.fontSize * 0.55, -CONFIG.fontSize * 0.55);
        ctx.font = `${CONFIG.fontSize}px serif`;
      } else {
        // Ingredientes normales
        ctx.shadowColor = 'rgba(0,0,0,1)';
        ctx.shadowBlur = 12;

        // VISIBILIDAD ESPECIAL: Monedas (Estilo Metálico Brillante)
        if (item.emoji === '🪙') {
          ctx.beginPath();
          ctx.arc(0, 0, CONFIG.fontSize * 0.65, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff'; // Fondo blanco para contraste
          ctx.fill();
          
          ctx.shadowColor = '#ffd700';
          ctx.shadowBlur = 35;
          ctx.strokeStyle = '#b8860b'; // Borde dorado oscuro
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Efecto de Destello (Sparkle)
          const s = Math.sin(Date.now() * 0.01) * 5;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.moveTo(-s, 0); ctx.lineTo(0, -s-10); ctx.lineTo(s, 0); ctx.lineTo(0, s+10); ctx.fill();
          ctx.beginPath();
          ctx.moveTo(0, -s); ctx.lineTo(-s-10, 0); ctx.lineTo(0, s); ctx.lineTo(s+10, 0); ctx.fill();
        }

        // VISIBILIDAD ESPECIAL: Arepas (Usando función unificada)
        if (item.emoji === '🫓') {
          if (isIngredientNeeded('🫓')) {
            // Resaltado verde para cuando es necesaria
            ctx.shadowColor = '#6bcb77';
            ctx.shadowBlur = 35;
            
            ctx.beginPath();
            ctx.arc(0, 0, CONFIG.fontSize * 0.75, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(107, 203, 119, 0.4)';
            ctx.fill();

            // Borde verde extra para que se note en el blanco
            ctx.strokeStyle = '#6bcb77';
            ctx.lineWidth = 3;
            ctx.stroke();
          } else {
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 15;
          }
          
          drawItemSprite('🫓', CONFIG.fontSize * 1.5);
          ctx.restore();
          continue; 
        }
      
      // Si es un imán, le damos un brillo especial tipo Subway Surfers
      if (item.type === 'magnet') {
        const pulse = Math.sin(Date.now() * 0.01) * 10 + 20; // Pulso dinámico
        ctx.shadowBlur = 0; // Optimizado sin lag
        
        // Aura exterior adicional
        ctx.beginPath();
        ctx.arc(0, 0, 30 + pulse/5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 51, 51, 0.2)';
        ctx.fill();

        if (ASSETS.magnet.complete) {
          ctx.drawImage(ASSETS.magnet, -25, -25, 50, 50);
          ctx.restore();
          continue; 
        }
      }

      // Sprite WebP o emoji como fallback
      const drawnGood = drawItemSprite(item.emoji, CONFIG.fontSize * 1.6);
      if (!drawnGood) ctx.fillText(item.emoji, 0, 0);
    }

    ctx.restore();
  }
  ctx.restore();

  drawBar();
}

function drawBar() {
  const bx = state.barX;
  const by = canvas.height - 20; // Base (piso)
  const bw = state.barW;
  
  let yAnim = 0;
  // Si está feliz, da pequeños saltos
  if (state.happyAnimTime > Date.now()) {
    yAnim = -Math.abs(Math.sin(Date.now() * 0.02) * 15);
  }

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';

  // Efecto de parpadeo (i-frames) si es invencible
  if (Date.now() < state.invincibleUntil) {
    if (Math.floor(Date.now() / 150) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }
  }

  // Sombra suave en el piso
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(bx + bw/2, by + 5, 35, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  const skin = SKINS.find(s => s.id === PlayerData.data.activeSkin) || SKINS[0];
  const scl = skin.scale || 1.0;
  const remyW = 160 * scl; 
  const remyH = 195 * scl; 
  const skinId = skin.id;

  // Imán activo: Dibujar imán flotando sobre el ratón
  if (state.magnetTime > Date.now()) {
    if (ASSETS.magnet.complete && ASSETS.magnet.naturalWidth > 0) {
      const pulseY = Math.sin(Date.now() * 0.01) * 5;
      const magW = 50;
      const magH = 50;
      ctx.drawImage(ASSETS.magnet, bx + bw/2 - magW/2, by - remyH - 35 + yAnim + pulseY, magW, magH);
    }
  }
  
  const cleanCanvas = ASSETS.skinCleanCanvas[skinId] || ASSETS.skinCleanCanvas['none'];
  const rawImage = ASSETS.skinImages[skinId] || ASSETS.skinImages['none'];

  ctx.save();
  // Efecto borracho: Balanceo
  if (state.isDrunk) {
    const wobble = Math.sin(Date.now() * 0.01) * 15;
    ctx.translate(bx + bw/2, by - remyH/2);
    ctx.rotate(wobble * Math.PI / 180);
    ctx.translate(-(bx + bw/2), -(by - remyH/2));

    // Dibujar quesos mareados sobre la cabeza
    ctx.save();
    const centerX = bx + bw/2;
    const centerY = by - remyH - 20 + yAnim;
    for (let i = 0; i < 3; i++) {
      const angle = (Date.now() * 0.005) + (i * Math.PI * 2 / 3);
      const qx = centerX + Math.cos(angle) * 40;
      const qy = centerY + Math.sin(angle) * 15;
      ctx.font = '24px serif';
      ctx.fillText('🧀', qx, qy);
    }
    ctx.restore();
  }

  if (cleanCanvas) {
    // Usar el canvas procesado (fondo transparente)
    ctx.drawImage(cleanCanvas, bx + bw/2 - remyW/2, by - remyH + 10 + yAnim, remyW, remyH);
  } else if (rawImage && rawImage.complete && rawImage.naturalWidth > 0) {
    ctx.drawImage(rawImage, bx + bw/2 - remyW/2, by - remyH + 10 + yAnim, remyW, remyH);
  } else {
    // Fallback
    ctx.font = '45px serif';
    ctx.fillText('🐭', bx + bw/2, by - 75 + yAnim);
  }
  ctx.restore();

  // 4. Canasta - ABAJO (Base)
  const activeB = PlayerData.data.activeBasket;
  if (ASSETS.baskets[activeB] && ASSETS.baskets[activeB].complete) {
    // La SVG ahora tiene un viewBox de -30 a 110 en X, y de -30 a 70 en Y.
    // Para mantener la canasta central en la misma posición (que era 80x60 en x-40, y-35):
    ctx.drawImage(ASSETS.baskets[activeB], bx + bw/2 - 70, by - 65 + yAnim, 140, 100);
  } else {
    ctx.font = '65px serif';
    ctx.fillText('🧺', bx + bw/2, by + 5 + yAnim);
  }

  ctx.restore();
}

// ─── LÓGICA DE PEDIDOS ────────────────────────────────────────────────────────
function generateOrder() {
  let recipe;
  
  if (state.gameMode === 'story') {
    const mission = STORY_MISSIONS[PlayerData.data.storyLevel - 1];
    if (!mission) {
      showVictoryScreen();
      // Reiniciar para que el jugador pueda volver a jugar la historia (sin los super premios)
      PlayerData.data.storyLevel = 1;
      PlayerData.save();
      return;
    }
    const reqs = [];
    for(let e in mission.target) {
      for(let i=0; i<mission.target[e]; i++) reqs.push(e);
    }
    recipe = { name: mission.title, emoji: '🌟', ingredients: reqs, desc: mission.desc };
  } else {
    recipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
  }

  state.currentOrder = recipe;
  state.orderProgress = [];
  
  const charEl = document.getElementById('customer-character');
  const bubble = document.getElementById('speech-bubble');
  const bubbleOrder = document.getElementById('bubble-order');

  // Reset animaciones
  charEl.className = 'customer-character';
  bubble.classList.remove('show');
  charEl.style.transform = '';

  // Asignar cliente y orden
  charEl.textContent = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
  bubbleOrder.textContent = `${recipe.emoji} ${recipe.name}`;
  
  const bubbleText = bubble.querySelector('.bubble-text');
  if (state.gameMode === 'story') {
    if (bubbleText) bubbleText.innerHTML = `¡Nivel ${PlayerData.data.storyLevel}!<br /><span style="font-size:0.8rem">${recipe.desc}</span>`;
  } else {
    const article = recipe.gender === 'f' ? 'una' : 'un';
    if (bubbleText) bubbleText.innerHTML = `¡Hola!<br />Quiero ${article}`;
  }
  
  // Animar llegada
  setTimeout(() => {
    charEl.classList.add('arrived');
    setTimeout(() => {
      charEl.classList.add('waiting');
      bubble.classList.add('show');
    }, 600);
  }, 100);

  // Efecto de escritura en la burbuja
  bubbleText.classList.remove('typing');
  void bubbleText.offsetWidth;
  bubbleText.classList.add('typing');

  updateCustomerUI();
}

function updateCustomerUI() {
  const container = document.getElementById('order-ingredients');
  container.innerHTML = '';
  
  // Contar requerimientos
  const required = {};
  state.currentOrder.ingredients.forEach(i => required[i] = (required[i] || 0) + 1);
  
  // Contar progreso
  const progress = {};
  state.orderProgress.forEach(i => progress[i] = (progress[i] || 0) + 1);
  
  // Renderizar chips
  for (const [emoji, total] of Object.entries(required)) {
    const current = progress[emoji] || 0;
    for (let i = 0; i < total; i++) {
      const chip = document.createElement('div');
      chip.className = 'req-chip';
      if (i < current) chip.classList.add('caught');
      
      const info = SPRITE_MAP[emoji];
      if (emoji === '🫓') {
        const arepaCanvas = document.createElement('canvas');
        arepaCanvas.width = 44;
        arepaCanvas.height = 44;
        const actx = arepaCanvas.getContext('2d');
        drawCustomArepa(actx, 22, 22, 40);
        chip.appendChild(arepaCanvas);
      } else if (emoji === '🥓') {
        // Tocino trío para la burbuja de pedido
        const baconDiv = document.createElement('div');
        baconDiv.style.width = '44px';
        baconDiv.style.height = '44px';
        const info = SPRITE_MAP['🥓'];
        baconDiv.style.backgroundImage = `url(imgs/${info.sheet}.png)`;
        // Mostrar toda la fila (300% de ancho, pero queremos ver el trío)
        baconDiv.style.backgroundSize = '300% 300%';
        // Posición col:0 row:2 pero como es 300% de ancho, col 0 es el inicio
        baconDiv.style.backgroundPosition = `0% ${info.row * 50}%`;
        baconDiv.style.backgroundRepeat = 'no-repeat';
        chip.appendChild(baconDiv);
      } else if (info) {
        const spriteDiv = document.createElement('div');
        spriteDiv.style.width = '44px';
        spriteDiv.style.height = '44px';
        spriteDiv.style.backgroundImage = `url(imgs/${info.sheet}.png)`;
        spriteDiv.style.backgroundSize = '300% 300%';
        spriteDiv.style.backgroundPosition = `${info.col * 50}% ${info.row * 50}%`;
        chip.appendChild(spriteDiv);
      } else {
        chip.textContent = emoji;
      }
      container.appendChild(chip);
    }
  }
}

function isIngredientNeeded(emoji) {
  if (state.gameMode === 'survival') return true;
  if (!state.currentOrder) return false;
  const requiredCount = state.currentOrder.ingredients.filter(i => i === emoji).length;
  const currentCount = state.orderProgress.filter(i => i === emoji).length;
  return currentCount < requiredCount;
}

// ─── CAÍDA DE INGREDIENTES ────────────────────────────────────────────────────
function scheduleNextFall() {
  if (state.fallTimer) clearTimeout(state.fallTimer);
  if (!state.running || state.paused) return;

  let rate = Math.max(
    CONFIG.minFallRate,
    CONFIG.baseFallRate - (state.level - 1) * 100
  );

  // Si hay horda activa, las trampas caen MUCHÍSIMO más rápido (Casi lluvia)
  if (state.trapHordeActive) rate /= 5.5;

  // MODO SUPERVIVENCIA: Intensidad dinámica que crece con el tiempo
  if (state.gameMode === 'survival') {
    rate /= state.survivalIntensity;
  }

  state.fallTimer = setTimeout(() => {
    if (state.running && !state.paused) {
      spawnIngredient(); // Primer objeto

      // Determinar cuántos extras lanzar según el nivel
      const currentLvl = (state.gameMode === 'story') ? PlayerData.data.storyLevel : state.level;
      const extraCount = (currentLvl >= 10) ? 2 : 1; // 2 extras = 3 total, 1 extra = 2 total

      // Lanzamos los extras con un retraso más generoso (500ms) para dar tiempo a reaccionar
      for (let i = 1; i <= extraCount; i++) {
        setTimeout(() => {
          if (state.running && !state.paused) spawnIngredient();
        }, i * 500);
      }
      
      scheduleNextFall();
    }
  }, rate + Math.random() * 200);
}

function spawnIngredient() {
  const limit = state.trapHordeActive ? 12 : CONFIG.maxSimultaneous;
  if (state.items.length >= limit) return;

  const hazardChance = Math.min(
    CONFIG.hazardMaxChance,
    CONFIG.hazardBaseChance + (state.level - 1) * 0.025
  );
  
  let isBad = false;
  let isPowerup = false;
  let ing = null;

  // 4% chance de lanzar una Moneda
  if (Math.random() < 0.04) {
    isPowerup = true;
    ing = { emoji: '🪙', name: 'Moneda', color: '#ffd700', type: 'coin' };
  }
  // 2% chance de lanzar un Power-Up (Estrella Imán)
  else if (Math.random() < 0.02) {
    isPowerup = true;
    ing = POWERUPS[0];
  } 
  // SI HAY HORDA ACTIVA, SOLO LANZAR TRAMPAS
  else if (state.trapHordeActive) {
    isBad = true;
    ing = HAZARDS[Math.floor(Math.random() * HAZARDS.length)];
  }
  else if (Math.random() < hazardChance) {
    isBad = true;
    ing = HAZARDS[Math.floor(Math.random() * HAZARDS.length)];
  } else {
    // 85% chance de lanzar algo que el cliente NECESITA (Más rápido!)
    if (Math.random() < 0.85 && state.currentOrder && state.gameMode !== 'survival') {
      const needed = state.currentOrder.ingredients.filter(e => isIngredientNeeded(e));
      if (needed.length > 0) {
        const targetEmoji = needed[Math.floor(Math.random() * needed.length)];
        ing = INGREDIENTS.find(i => i.emoji === targetEmoji);
      }
    }
    
    // Si no se asignó (40% chance o no hay needed), lanzar aleatorio
    if (!ing) {
      ing = INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)];
    }
  }

  const size = CONFIG.fontSize;
  const item = {
    emoji:    ing.emoji,
    name:     ing.name,
    color:    ing.color,
    isBad:    isBad,
    isPowerup: isPowerup,
    type:     ing.type || null,
    x:        0, // Se calcula abajo
    y:        -size,
    rot:      (Math.random() - .5) * Math.PI,
    rotSpeed: (Math.random() - .5) * .08,
    spinPhase: Math.random() * Math.PI * 2,    
    spinSpeed: 0.003 + Math.random() * 0.004   
  };

  // SEGURIDAD: Evitar que el nuevo item aparezca encima de otro
  let finalX = size + Math.random() * (canvas.width - size * 2);
  const minSafeDist = 90; // Aumentado de 60 a 90 para que no salgan "pegados"

  for (let attempt = 0; attempt < 5; attempt++) {
    let tooClose = false;
    for (const other of state.items) {
      if (other.y < 100) { // Solo chequear items que acaban de salir
        const dx = Math.abs(other.x - finalX);
        if (dx < minSafeDist) {
          tooClose = true;
          break;
        }
      }
    }
    if (!tooClose) break;
    finalX = size + Math.random() * (canvas.width - size * 2);
  }
  item.x = finalX;

  state.items.push(item);
}

// ─── COLISIÓN ────────────────────────────────────────────────────────────────
function checkCatch() {
  // Ajustamos la zona de colisión para que coincida exactamente con la canasta en la base (suelo)
  const barY  = canvas.height - 60; 
  const barY2 = canvas.height - 10;
  const half  = CONFIG.fontSize * 0.55;

  for (let i = state.items.length - 1; i >= 0; i--) {
    const item = state.items[i];
    const inX = item.x >= state.barX - half && item.x <= state.barX + state.barW + half;
    const inY = item.y + half >= barY && item.y - half <= barY2;

    if (inX && inY) {
      state.items.splice(i, 1);
      onCatch(item);
    }
  }
}

function onCatch(item) {
  if (item.isBad) {
    onBadCatch(item);
    return;
  }

  if (item.isPowerup) {
    if (item.type === 'coin') {
      let bonus = 0;
      if (PlayerData.data.activeSkin === 'fashion') {
        if (Math.random() < 0.50) {
          bonus = 2;
          showEffectText('¡SUPER SUERTE! +2🪙', item.x, item.y);
        }
      }
      PlayerData.data.coins += (1 + bonus);
      state.score += 50;
      PlayerData.save();
      SoundSystem.playPop();
      spawnCatchParticle(item, true);
      updateHUD();
      updateMenuCoins();
    } else if (item.type === 'magnet') {
      let duration = 6000 + (PlayerData.data.magnetLevel * 2000); 
      if (PlayerData.data.activeSkin === 'cowboy') {
        duration += 2000;
        showEffectText('+2s IMÁN 🤠', item.x, item.y);
      }
      state.magnetTime = Date.now() + duration; 
      SoundSystem.playSuccess();
      spawnCatchParticle(item, true);
    }
    return;
  }

  if (isIngredientNeeded(item.emoji)) {
    SoundSystem.playPop();
    let pts = 10;
    // HABILIDAD PORRISTA: +5 puntos extra por acierto
    if (PlayerData.data.activeSkin === 'cheer') {
      pts = 15;
      showEffectText('¡ÁNIMO! +5 📣', item.x, item.y);
    }
    state.score += pts;
    state.caught += 1;
    state.orderProgress.push(item.emoji);

    spawnCatchParticle(item, true);
    updateCustomerUI();
    updateHUD();

    if (state.gameMode !== 'survival' && state.orderProgress.length === state.currentOrder.ingredients.length) {
      completeOrder();
    }
  } else {
    // Ingrediente incorrecto
    SoundSystem.playError();
    spawnCatchParticle(item, false);
  }
}

function completeOrder() {
  SoundSystem.playSuccess();
  state.completedOrders += 1;
  
  let basePoints = 50 + (state.level * 10);
  let bonus = 0;
  
  if (state.gameMode === 'story') {
    if (PlayerData.data.storyLevel >= (PlayerData.data.maxStoryLevel || 1)) {
      PlayerData.data.coins += 50; // Gran premio la primera vez
      PlayerData.data.maxStoryLevel = PlayerData.data.storyLevel + 1;
      showEffectText('¡NUEVA MISIÓN CUMPLIDA! +50🪙', canvas.width/2, canvas.height/2 - 150);
    } else {
      PlayerData.data.coins += 5; // Premio pequeño si se repite
      showEffectText('¡MISIÓN CUMPLIDA! +5🪙', canvas.width/2, canvas.height/2 - 150);
    }
    
    PlayerData.data.storyLevel++;
    PlayerData.save();
    basePoints = 200;
  }

  if (PlayerData.data.activeSkin === 'xmas') {
    bonus = Math.floor(basePoints * 0.2);
    showEffectText('BONUS +20% 🎄', canvas.width/2, canvas.height/2 - 100);
  }
  state.score += basePoints + bonus;

  // HABILIDAD SAN VALENTÍN: Regalar monedas extra
  if (PlayerData.data.activeSkin === 'valentine') {
    for(let i=0; i<3; i++) {
      setTimeout(() => spawnValentineTip(), i * 200);
    }
  }

  // HABILIDAD PRIMAVERA: Chance de recuperar vida
  if (PlayerData.data.activeSkin === 'spring' && state.lives < 3 && Math.random() < 0.25) {
    state.lives++;
    showEffectText('¡VIDA +1! 🌸', canvas.width/2, canvas.height/2);
    updateHUD();
    SoundSystem.playLevelUp(); 
  }
  
  if (state.gameMode === 'time') {
    state.gameTimer += 5;
    showEffectText('+5 seg ⏱️', canvas.width/2, canvas.height/2 - 150);
  }

  // ¡Ratica feliz salta durante 1.5 segundos!
  state.happyAnimTime = Date.now() + 1500;
  
  // Animación de éxito en ingredientes
  const area = document.getElementById('customer-area');
  area.style.animation = 'none';
  area.offsetHeight; 
  area.style.animation = 'chipIn 0.5s ease';
  
  // Animar salida del cliente
  const charEl = document.getElementById('customer-character');
  const bubble = document.getElementById('speech-bubble');
  
  bubble.classList.remove('show');
  charEl.classList.remove('waiting');
  charEl.style.transform = 'translateX(250px)'; // Se va caminando
  
  if (state.completedOrders % CONFIG.levelUpEvery === 0) {
    state.level = Math.min(CONFIG.maxLevel, state.level + 1);
    state.speed = CONFIG.baseSpeed + (state.level - 1) * CONFIG.speedIncrement;
    rotateBg(); // Cambiar el fondo al subir de nivel
    showLevelUp();
  }
  
  updateHUD();
  
  // Limpiar ingredientes que sobran en pantalla (pero dejar trampas y monedas)
  state.items = state.items.filter(item => item.isBad || item.isPowerup);
  
  // Detener temporalmente la caída para que no caigan cosas "en el aire"
  if (state.fallTimer) clearTimeout(state.fallTimer);

  setTimeout(() => {
    generateOrder();
    scheduleNextFall(); // Reanudar caídas con el nuevo pedido
  }, 600); 

  // ¡Dejar propina!
  spawnTip();
}

function spawnTip() {
  const container = document.getElementById('tip-container');
  if (!container) return;

  // Los clientes dejan entre 1 y 3 monedas de propina
  const count = 1 + Math.floor(Math.random() * 3);
  
  for (let i = 0; i < count; i++) {
    const coin = document.createElement('div');
    coin.className = 'tip-coin';
    coin.textContent = '🪙';
    // Posición aleatoria leve sobre el mostrador
    coin.style.marginLeft = (Math.random() * 40 - 20) + 'px';
    
    coin.onclick = () => {
      if (coin.classList.contains('collecting')) return;
      coin.classList.add('collecting');
      
      SoundSystem.playPop();
      PlayerData.data.coins += 1;
      PlayerData.save();
      updateHUD();
      
      setTimeout(() => coin.remove(), 500);
    };

    // Auto-recolectar después de 8 segundos si el jugador no lo hace
    setTimeout(() => {
      if (coin.parentElement) {
        coin.click(); // Simulamos el clic para disparar la animación y la suma
      }
    }, 8000);

    container.appendChild(coin);
  }
}

function onBadCatch(item) {
  // HABILIDAD HALLOWEEN: 50% de probabilidad de esquivar
  if (PlayerData.data.activeSkin === 'hallow' && Math.random() < 0.50) {
    showEffectText('¡ESQUIVADO! 🎃', item.x, item.y);
    SoundSystem.playPop();
    return;
  }

  // IGNORAR SI ES INVENCIBLE (i-frames)
  if (Date.now() < state.invincibleUntil) return;

  SoundSystem.playError();
  if (state.gameMode === 'time') {
    state.gameTimer = Math.max(0, state.gameTimer - 5);
    showEffectText('-5 seg ⚠️', item.x, item.y);
    return; // En modo tiempo no mueres por trampas, solo pierdes tiempo
  }

  state.lives--;

  // HABILIDAD FÚTBOL AMERICANO: Escudo de 5 segundos al recibir daño
  const shieldTime = PlayerData.data.activeSkin === 'football' ? 5000 : 1500;
  if (PlayerData.data.activeSkin === 'football') {
    showEffectText('¡ESCUDO! 🏈', item.x, item.y);
  }
  state.invincibleUntil = Date.now() + shieldTime;

  updateHUD();
  shakeHeart(state.lives);
  showHazardFlash();
  shakeScreen();
  spawnHazardParticle(item);

  if (state.lives <= 0) {
    endGame({ type: 'hazard', emoji: item.emoji, name: item.name });
  }
}

function onMiss(emoji) {
  SoundSystem.playError();
  showMissFlash();

  if (state.gameMode === 'time') {
    state.gameTimer = Math.max(0, state.gameTimer - 2);
    showEffectText('-2 seg ⏱️', canvas.width / 2, canvas.height - 100);
  } else {
    // Para Classic, Story y Survival: Quitar vida
    state.lives--;
    updateHUD();
    shakeHeart(state.lives);
    if (state.lives <= 0) endGame({ type: 'miss', emoji: emoji });
  }
}

function triggerTrapHorde() {
  if (state.trapHordeActive) return;
  state.trapHordeActive = true;
  
  // Mostrar alerta visual
  showHordeWarning();
  
  // Sonido de alerta
  SoundSystem.playTone(200, 'sawtooth', 0.5, 0.2);
  setTimeout(() => SoundSystem.playTone(200, 'sawtooth', 0.5, 0.2), 300);

  // La horda dura 7 segundos
  setTimeout(() => {
    state.trapHordeActive = false;
    state.nextHordeTime = Date.now() + 45000; // Próxima horda en 45 seg
  }, 7000);
}

function showHordeWarning() {
  const container = document.querySelector('.canvas-container');
  const el = document.createElement('div');
  el.style.cssText = `
    position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;
    pointer-events:none; z-index:200; background:rgba(255,0,0,0.15);
    animation: flashHorde 0.5s infinite alternate;
  `;
  el.innerHTML = `
    <div style="font-family:'Fredoka One',cursive; font-size:3rem; color:#ffdd00; text-shadow:0 0 10px #ff0000; text-align:center;">
      ⚠️ ¡HORDA DE TRAMPAS! ⚠️<br>
      <small style="font-size:1.2rem; color:#fff;">¡ESQUIVA TODO!</small>
    </div>
  `;

  if (!document.getElementById('horde-kf')) {
    const s = document.createElement('style');
    s.id = 'horde-kf';
    s.textContent = `
      @keyframes flashHorde {
        from { opacity: 0.4; background:rgba(255,0,0,0.1); }
        to { opacity: 1; background:rgba(255,0,0,0.3); }
      }
    `;
    document.head.appendChild(s);
  }

  container.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ─── EFECTOS VISUALES ─────────────────────────────────────────────────────────
function spawnCatchParticle(item, isGood) {
  const container = document.querySelector('.canvas-container');
  const rect      = canvas.getBoundingClientRect();
  const px        = (item.x / canvas.width)  * rect.width;
  const py        = ((canvas.height - 40) / canvas.height) * rect.height;

  if (isGood) {
    // Explosión de confeti GIGANTE 3D (Efecto Ultra Juicy)
    const colors = ['#ff0055', '#00ffcc', '#ffff00', '#ff00ff', '#00ff00', '#ffffff', '#ff9900', '#ff3300', '#33ccff'];
    const particleCount = 25; 
    
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'catch-particle';
      p.style.left = px + 'px';
      p.style.top = py + 'px';
      
      // TAMAÑOS GIGANTES
      const size = 15 + Math.random() * 20;
      p.style.width = size + 'px';
      p.style.height = (size * (0.3 + Math.random() * 0.8)) + 'px';
      
      // FORMAS VARIADAS
      const shapeType = Math.floor(Math.random() * 3);
      if (shapeType === 0) p.style.borderRadius = '2px'; // Rectángulo
      else if (shapeType === 1) p.style.borderRadius = '50%'; // Círculo
      else p.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)'; // Triángulo
      
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.zIndex = '150';
      p.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
      
      const angle = (Math.random() * Math.PI * 2);
      const dist = 80 + Math.random() * 150; 
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 120; 
      
      const duration = 1.0 + Math.random() * 0.8;
      p.style.transition = `all ${duration}s cubic-bezier(0.19, 1, 0.22, 1)`;
      container.appendChild(p);
      
      // Animación 3D para que no se vea plano
      requestAnimationFrame(() => {
        const rotX = Math.random() * 1080;
        const rotY = Math.random() * 1080;
        const rotZ = Math.random() * 720;
        p.style.transform = `translate(${tx}px, ${ty}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(0.3)`;
        p.style.opacity = '0';
      });
      
      setTimeout(() => p.remove(), duration * 1000);
    }
    return;
  }

  const el = document.createElement('div');
  el.className = 'catch-particle';
  el.textContent = '❌';
  el.style.left = px + 'px';
  el.style.top  = py + 'px';
  el.style.fontSize = '1.8rem';
  container.appendChild(el);
  setTimeout(() => el.remove(), 800);
}

function spawnHazardParticle(item) {
  const container = document.querySelector('.canvas-container');
  const rect      = canvas.getBoundingClientRect();
  const px        = (item.x / canvas.width)  * rect.width;
  const py        = ((canvas.height - 40) / canvas.height) * rect.height;

  const el = document.createElement('div');
  el.className = 'catch-particle hazard-particle';
  el.textContent = item.emoji;
  el.style.left = px + 'px';
  el.style.top  = py + 'px';
  container.appendChild(el);

  const warn = document.createElement('div');
  warn.className = 'hazard-warn';
  warn.textContent = '¡CUIDADO!';
  warn.style.left = (px - 40) + 'px';
  warn.style.top  = (py - 30) + 'px';
  container.appendChild(warn);

  setTimeout(() => { el.remove(); warn.remove(); }, 900);
}

function showEffectText(text, x, y) {
  const container = document.querySelector('.canvas-container');
  if (!container) return;
  const rect      = canvas.getBoundingClientRect();
  const px        = (x / canvas.width)  * rect.width;
  const py        = (y / canvas.height) * rect.height;

  const el = document.createElement('div');
  el.style.cssText = `
    position: absolute;
    left: ${px}px;
    top: ${py}px;
    transform: translate(-50%, -50%);
    font-family: 'Fredoka One', cursive;
    font-size: 1.6rem;
    font-weight: 900;
    color: #fff;
    text-shadow: 0 0 15px rgba(0,0,0,0.9), 0 0 10px #ffdd00, 0 0 5px #ff0000;
    pointer-events: none;
    z-index: 500;
    white-space: nowrap;
    animation: floatUpFade 1.2s forwards;
  `;
  el.textContent = text;
  container.appendChild(el);
  
  if (!document.getElementById('float-up-fade-kf')) {
    const s = document.createElement('style');
    s.id = 'float-up-fade-kf';
    s.textContent = `
      @keyframes floatUpFade {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        20% { transform: translate(-50%, -80%) scale(1.3); opacity: 1; }
        100% { transform: translate(-50%, -180%) scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(s);
  }
  setTimeout(() => el.remove(), 1200);
}

function spawnValentineTip() {
  const container = document.querySelector('.canvas-container');
  if (!container) return;
  const rect = canvas.getBoundingClientRect();
  const rx = (0.2 + Math.random() * 0.6) * rect.width;
  const ry = (0.2 + Math.random() * 0.6) * rect.height;

  const heart = document.createElement('div');
  heart.style.cssText = `
    position: absolute;
    left: ${rx}px;
    top: ${ry}px;
    font-size: 2.5rem;
    cursor: pointer;
    z-index: 1000;
    animation: popHeart 2s infinite alternate ease-in-out;
    filter: drop-shadow(0 0 10px #ff4d6d);
  `;
  heart.textContent = '💝';
  
  if (!document.getElementById('pop-heart-kf')) {
    const s = document.createElement('style');
    s.id = 'pop-heart-kf';
    s.textContent = `
      @keyframes popHeart {
        from { transform: scale(1); }
        to { transform: scale(1.3); }
      }
    `;
    document.head.appendChild(s);
  }

  heart.onclick = () => {
    SoundSystem.playPop();
    PlayerData.data.coins += 2;
    PlayerData.save();
    updateMenuCoins();
    showEffectText('+2 🪙 ❤️', rx / (rect.width/canvas.width), ry / (rect.height/canvas.height));
    heart.remove();
  };

  container.appendChild(heart);
  setTimeout(() => { if(heart.parentElement) heart.click(); }, 3000);
}

function showMissFlash() {
  const container = document.querySelector('.canvas-container');
  const el = document.createElement('div');
  el.className = 'miss-flash';
  container.appendChild(el);
  setTimeout(() => el.remove(), 450);
}

function showHazardFlash() {
  const container = document.querySelector('.canvas-container');
  const el = document.createElement('div');
  el.style.cssText = `
    position:absolute; inset:0; background:rgba(255,0,0,.28);
    pointer-events:none; z-index:5;
    animation: flashOut .5s ease forwards;
  `;
  container.appendChild(el);
  setTimeout(() => el.remove(), 550);
}

function shakeScreen() {
  const wrapper = document.querySelector('.canvas-container');
  wrapper.style.animation = 'none';
  wrapper.offsetHeight; 
  wrapper.style.animation = 'screenShake 0.4s ease';
  setTimeout(() => { wrapper.style.animation = ''; }, 450);
}

function shakeHeart(remaining) {
  const hearts = document.querySelectorAll('#hud-lives .heart');
  hearts.forEach((h, i) => {
    if (i >= remaining) {
      if (h.classList.contains('active')) {
        h.classList.remove('active');
        h.classList.add('lost', 'heart-pop');
        setTimeout(() => h.classList.remove('heart-pop'), 600);
      }
    }
  });
}

// Renderiza un solo tema (usado para el cross-fade)
function renderSingleTheme(index) {
  const theme = BG_THEMES[index] || BG_THEMES[0];
  const w = canvas.width;
  const h = canvas.height;

  // 1. Dibujar Imagen de fondo
  const bgImg = ASSETS.bgImages[theme.id] || (theme.id === 'kitchen' ? ASSETS.kitchenBg : null);
  if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
    const scale = Math.max(w / bgImg.naturalWidth, h / bgImg.naturalHeight);
    const bw = bgImg.naturalWidth * scale;
    const bh = bgImg.naturalHeight * scale;
    const bx = (w - bw) / 2;
    const bby = (h - bh) / 2;
    ctx.drawImage(bgImg, bx, bby, bw, bh);
  } else if (!theme.draw) {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#1a1630');
    grad.addColorStop(1, '#0a0815');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  // 2. Dibujar Efectos Especiales
  if (theme.draw) {
    drawThemedBg(theme.draw);
  }
  
  // 3. Overlay
  ctx.fillStyle = theme.overlay;
  ctx.fillRect(0, 0, w, h);
}

// ─── ROTACIÓN Y DIBUJO DE FONDOS TEMÁTICOS ───────────────────────────────────
function rotateBg() {
  state.lastBgIndex = ASSETS.currentBgIndex;
  ASSETS.currentBgIndex = (ASSETS.currentBgIndex + 1) % BG_THEMES.length;
  state.bgTransition = 0; // Iniciar transición
  
  // REINICIAR CRONÓMETRO: Si el fondo cambia (por pedido o tiempo),
  // reseteamos el tiempo para que el próximo cambio sea en 45 segundos.
  state.nextBgChangeTime = Date.now() + 45000;

  const theme = BG_THEMES[ASSETS.currentBgIndex];

  // Mostrar notificación del nuevo fondo
  const notif = document.createElement('div');
  notif.style.cssText = `
    position:absolute; bottom: 80px; left:50%; transform:translateX(-50%);
    background:rgba(0,0,0,0.75); backdrop-filter:blur(8px);
    color:white; font-family:'Fredoka One',cursive; font-size:1.1rem;
    padding:8px 20px; border-radius:20px; z-index:35;
    border:1px solid rgba(255,255,255,0.2);
    animation: bgNotifAnim 2s ease forwards; pointer-events:none;
  `;
  notif.textContent = `🎨 Nuevo escenario: ${theme.label}`;

  if (!document.getElementById('bg-notif-kf')) {
    const s = document.createElement('style');
    s.id = 'bg-notif-kf';
    s.textContent = `
      @keyframes bgNotifAnim {
        0%   { opacity:0; transform:translateX(-50%) translateY(20px); }
        20%  { opacity:1; transform:translateX(-50%) translateY(0); }
        75%  { opacity:1; }
        100% { opacity:0; }
      }
    `;
    document.head.appendChild(s);
  }

  const container = document.querySelector('.canvas-container');
  container.appendChild(notif);
  setTimeout(() => notif.remove(), 2200);
}

function drawThemedBg(type) {
  const w = canvas.width;
  const h = canvas.height;

  if (type === 'soccer') {
    // Si no hay imagen, dibujaríamos el césped
    const theme = BG_THEMES[ASSETS.currentBgIndex];
    if (!ASSETS.bgImages[theme.id]) {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#1a3a1a');
      grad.addColorStop(0.6, '#0d2b0d');
      grad.addColorStop(1, '#050f05');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Césped del estadio
      ctx.fillStyle = '#1a6b1a';
      ctx.fillRect(0, h * 0.65, w, h * 0.35);
      // Líneas del césped
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, h * 0.65 + i * (h * 0.35 / 8), w, h * 0.35 / 8);
      }
    }
    // Línea central
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath(); ctx.moveTo(w/2, h*0.65); ctx.lineTo(w/2, h); ctx.stroke();
    ctx.setLineDash([]);

    // Focos del estadio
    ctx.save();
    const spotlights = [[0.1*w, 0.05*h], [0.9*w, 0.05*h], [0.5*w, 0.02*h]];
    spotlights.forEach(([sx, sy]) => {
      const glowGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, h*0.5);
      glowGrad.addColorStop(0, 'rgba(255,240,180,0.15)');
      glowGrad.addColorStop(1, 'rgba(255,240,180,0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);
      // Punto de foco
      ctx.beginPath();
      ctx.arc(sx, sy, 8, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,240,200,0.9)';
      ctx.fill();
    });
    ctx.restore();

    // Balones decorativos flotando
    ctx.font = '32px serif';
    ctx.globalAlpha = 0.15;
    const t = Date.now() * 0.0005;
    ctx.fillText('⚽', w*0.15 + Math.sin(t)*10, h*0.2 + Math.cos(t*0.7)*8);
    ctx.fillText('⚽', w*0.8 + Math.sin(t+1)*12, h*0.35 + Math.cos(t*0.5)*10);
    ctx.fillText('🏆', w*0.5 + Math.sin(t+2)*8, h*0.15 + Math.cos(t*0.8)*6);
    ctx.globalAlpha = 1;

  } else if (type === 'xmas') {
    // (Opcional) Si no hubiera imagen, dibujaríamos el gradiente rojo
    const theme = BG_THEMES[ASSETS.currentBgIndex];
    if (!ASSETS.bgImages[theme.id]) {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#1a0a0a');
      grad.addColorStop(0.5, '#2d0808');
      grad.addColorStop(1, '#0a0505');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    // Estrellas/copos de nieve de fondo
    ctx.save();
    ctx.globalAlpha = 0.4;
    const t = Date.now() * 0.001;
    for (let i = 0; i < 20; i++) {
      const x = (w * (i * 0.05 + 0.025)) % w;
      const y = ((h * (i * 0.15) + t * 30 * (i % 3 + 0.5)) % h);
      ctx.font = `${14 + (i % 3) * 6}px serif`;
      ctx.fillText(i % 3 === 0 ? '❄️' : i % 3 === 1 ? '⛄' : '✨', x, y);
    }
    ctx.restore();

    // Luces navideñas en la parte superior
    const colors = ['#ff0000','#00aa00','#ffff00','#0000ff','#ff6600'];
    for (let i = 0; i < Math.floor(w / 35); i++) {
      const bx = i * 35 + 10;
      const by = 20 + Math.sin(i * 1.2) * 12;
      ctx.save();
      ctx.beginPath();
      ctx.arc(bx, by, 7, 0, Math.PI * 2);
      ctx.fillStyle = colors[i % colors.length];
      ctx.shadowColor = colors[i % colors.length];
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();
      // Hilo
      if (i < Math.floor(w / 35) - 1) {
        ctx.strokeStyle = 'rgba(80,40,20,0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(bx + 7, by);
        ctx.lineTo(bx + 42, 20 + Math.sin((i+1)*1.2)*12);
        ctx.stroke();
      }
    }

    // Árbol de navidad a un lado
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.font = '80px serif';
    ctx.fillText('🎄', -10, h * 0.55);
    ctx.font = '60px serif';
    ctx.fillText('🎄', w - 55, h * 0.6);
    ctx.globalAlpha = 1;
    ctx.restore();

  } else if (type === 'halloween') {
    // Si no hay imagen, dibujaríamos la noche oscura
    const theme = BG_THEMES[ASSETS.currentBgIndex];
    if (!ASSETS.bgImages[theme.id]) {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#050010');
      grad.addColorStop(0.4, '#1a0035');
      grad.addColorStop(1, '#0a000a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Luna llena (Solo si no hay imagen de fondo)
      const moonX = w * 0.85, moonY = h * 0.12, moonR = 40;
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonR * 3);
      moonGlow.addColorStop(0, 'rgba(255,240,180,0.3)');
      moonGlow.addColorStop(1, 'rgba(255,240,180,0)');
      ctx.fillStyle = moonGlow;
      ctx.fillRect(0, 0, w, h);
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.fillStyle = '#fff8c0';
      ctx.shadowColor = '#ffee80';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Estrellas
    ctx.save();
    ctx.globalAlpha = 0.7;
    for (let i = 0; i < 30; i++) {
      const sx = (i * 137.5) % w;
      const sy = (i * 89.3) % (h * 0.5);
      ctx.beginPath();
      ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
    ctx.restore();

    // Murciélagos volando
    const t = Date.now() * 0.001;
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.font = '24px serif';
    ctx.fillText('🦇', w * 0.2 + Math.sin(t) * 30, h * 0.2 + Math.cos(t * 0.7) * 15);
    ctx.fillText('🦇', w * 0.6 + Math.sin(t + 2) * 25, h * 0.15 + Math.cos(t * 0.9) * 10);
    ctx.fillText('🦇', w * 0.4 + Math.sin(t + 1) * 20, h * 0.3 + Math.cos(t * 0.6) * 12);
    ctx.restore();

    // Calabazas en el suelo
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.font = '45px serif';
    ctx.fillText('🎃', -5, h * 0.95);
    ctx.fillText('🎃', w - 45, h * 0.95);
    ctx.globalAlpha = 0.2;
    ctx.font = '30px serif';
    ctx.fillText('🕷️', w * 0.3, h * 0.1);
    ctx.fillText('💀', w * 0.5, h * 0.05);
    ctx.restore();

    // Niebla en el suelo
    const fogGrad = ctx.createLinearGradient(0, h * 0.75, 0, h);
    fogGrad.addColorStop(0, 'rgba(80,0,120,0)');
    fogGrad.addColorStop(1, 'rgba(80,0,120,0.35)');
    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, h * 0.75, w, h * 0.25);
  }
}

function showLevelUp() {
  SoundSystem.playLevelUp();
  const el = document.createElement('div');
  el.style.cssText = `
    position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    pointer-events:none; z-index:30; animation: lvlAnim .8s ease forwards;
  `;
  el.innerHTML = `<div style="
    font-family:'Fredoka One',cursive; font-size:2.5rem;
    background:linear-gradient(135deg,#ffd93d,#ff6b6b);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    text-shadow:none; filter:drop-shadow(0 0 20px rgba(255,217,61,.5));
    animation: lvlScale .8s cubic-bezier(.34,1.56,.64,1) forwards;
  ">⬆️ ¡NIVEL ${state.level}!</div>`;

  if (!document.getElementById('lvl-kf')) {
    const s = document.createElement('style');
    s.id = 'lvl-kf';
    s.textContent = `
      @keyframes lvlScale {
        0%   { transform:scale(0) rotate(-10deg); opacity:0; }
        60%  { transform:scale(1.2) rotate(2deg);  opacity:1; }
        100% { transform:scale(1) rotate(0deg);    opacity:1; }
      }
      @keyframes lvlAnim {
        0%   { opacity:1; }
        70%  { opacity:1; }
        100% { opacity:0; }
      }
    `;
    document.head.appendChild(s);
  }

  const container = document.querySelector('.canvas-container');
  container.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

// ─── PANTALLA VICTORIA HISTORIA ──────────────────────────────────────────────
function showVictoryScreen() {
  if (!state.running) return; 
  state.running = false;
  
  if (state.timerInterval) clearInterval(state.timerInterval);
  cancelAnimationFrame(state.animFrame);
  clearTimeout(state.fallTimer);
  
  SoundSystem.playLevelUp();
  setTimeout(() => SoundSystem.playSuccess(), 500);

  const confettiContainer = document.getElementById('victory-confetti');
  if (confettiContainer) {
    confettiContainer.innerHTML = '';
    const colors = ['#ff0055', '#00ffcc', '#ffff00', '#ff00ff', '#00ff00', '#ffffff', '#ff9900'];
    for (let i = 0; i < 60; i++) {
      const p = document.createElement('div');
      p.style.position = 'absolute';
      p.style.left = (Math.random() * 100) + '%';
      p.style.top = '-10%';
      p.style.width = (10 + Math.random() * 15) + 'px';
      p.style.height = (20 + Math.random() * 10) + 'px';
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      p.style.animation = `fallDown ${1.5 + Math.random() * 2.5}s linear infinite`;
      p.style.animationDelay = (Math.random() * 2) + 's';
      p.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
      confettiContainer.appendChild(p);
    }
  }

  if (!document.getElementById('victory-kf')) {
    const s = document.createElement('style');
    s.id = 'victory-kf';
    s.textContent = `
      @keyframes fallDown {
        0% { transform: translateY(0) rotateX(0) rotateY(0); opacity: 1; }
        100% { transform: translateY(120vh) rotateX(720deg) rotateY(360deg); opacity: 0; }
      }
      @keyframes victoryPop {
        0% { transform: scale(0); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes pulseGlow {
        0% { transform: scale(1); opacity: 0.3; }
        100% { transform: scale(1.3); opacity: 0.6; }
      }
      @keyframes ratFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(s);
  }

  showScreen('screen-victory');
  SoundSystem.startMenuMusic();
}

// ─── FIN DEL JUEGO ────────────────────────────────────────────────────────────
function endGame(cause = null) {
  if (!state.running) return; // Evitar llamadas dobles
  state.running = false;
  
  if (state.timerInterval) clearInterval(state.timerInterval);
  const timerHud = document.getElementById('timer-hud');
  if (timerHud) timerHud.style.display = 'none';

  cancelAnimationFrame(state.animFrame);
  clearTimeout(state.fallTimer);

  const isNewRecord = PlayerData.saveBest(state.score);
  const best        = PlayerData.getBest();

  document.getElementById('final-score').textContent = state.score;
  document.getElementById('final-level').textContent = state.level;
  document.getElementById('final-caught').textContent = state.caught;
  document.getElementById('final-best').textContent  = best;

  const recipe = document.getElementById('final-recipe');
  recipe.textContent = `Pedidos completados: ${state.completedOrders}`;

  const badge = document.getElementById('new-record-badge');
  if (isNewRecord && state.score > 0) {
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }

  // Visual Cause Feedback
  const causeEmoji = document.querySelector('.gameover-emoji');
  const causeSub = document.querySelector('.gameover-sub');
  
  if (cause) {
    if (cause.type === 'hazard') {
      causeEmoji.textContent = cause.emoji || '💥';
      causeSub.innerHTML = `¡Ten cuidado con el objeto peligroso!<br>Atrapaste: <strong style="color:var(--accent1)">${cause.emoji} ${cause.name}</strong>`;
    } else if (cause.type === 'win') {
      causeEmoji.textContent = '🏆';
      causeSub.innerHTML = `<span style="color:#ffd700; font-size:1.2em">¡Felicidades Chef!</span><br>Has completado el Modo Historia.`;
    } else {
      causeEmoji.textContent = cause.emoji || '🏃';
      causeSub.innerHTML = `¡Oh no! Se te escapó un ingrediente.<br><span style="color:var(--accent2); font-weight:bold;">¡Intenta ser más rápido!</span>`;
    }
  } else {
    causeEmoji.textContent = '😵';
    causeSub.textContent = '¡Se escaparon demasiados ingredientes!';
  }

  const reviveSection = document.getElementById('revive-section');
  if (reviveSection) reviveSection.style.display = state.canRevive ? '' : 'none';

  // Verificamos si entra en el Top 10 Global
  const isGlobalRecord = state.score > (GLOBAL_CONFIG.leaderboard[9]?.score || 0);
  const globalInput = document.getElementById('global-record-input');
  if (isGlobalRecord && state.score > 0) {
    if (globalInput) globalInput.classList.remove('hidden');
  } else {
    if (globalInput) globalInput.classList.add('hidden');
  }

  showScreen('screen-gameover');
  SoundSystem.startMenuMusic();
}

function reviveWithAd() {
  if (!state.canRevive) return;
  state.canRevive = false;

  AdSystem.showRewarded(
    () => {
      state.lives   = 1;
      state.running = true;
      state.items   = [];

      const hearts = document.querySelectorAll('#hud-lives .heart');
      hearts.forEach((h, i) => {
        h.classList.toggle('active', i < 1);
        h.classList.toggle('lost',   i >= 1);
        h.style.transform = '';
        h.style.opacity = '';
        h.classList.remove('shake');
      });

      document.getElementById('revive-section').style.display = 'none';

      updateHUD();
      showScreen('screen-game');
      resizeCanvas();
      scheduleNextFall();
      SoundSystem.stopMenuMusic();
      state.lastTime = performance.now();
      state.animFrame = requestAnimationFrame(gameLoop);
    },
    () => {
      alert('¡Debes ver el anuncio completo para revivir!');
      state.canRevive = false;
      document.getElementById('revive-section').style.display = 'none';
    }
  );
}

// ─── HUD Y TIENDA ────────────────────────────────────────────────────────────
function updateHUD() {
  const scoreEl = document.getElementById('hud-score');
  const levelEl = document.getElementById('hud-level');
  const coinsEl = document.getElementById('hud-coins');
  const bestEl  = document.getElementById('hud-best');

  // Si el puntaje cambió, animamos rebote
  if (scoreEl.textContent !== String(state.score)) {
    scoreEl.textContent = state.score;
    scoreEl.classList.remove('hud-bounce');
    void scoreEl.offsetWidth; // Trigger reflow
    scoreEl.classList.add('hud-bounce');
  }

  levelEl.textContent = state.level;

  // Si las monedas cambiaron, animamos rebote
  if (coinsEl.textContent !== String(PlayerData.data.coins)) {
    coinsEl.textContent = PlayerData.data.coins;
    coinsEl.classList.remove('hud-bounce');
    void coinsEl.offsetWidth;
    coinsEl.classList.add('hud-bounce');
  }

  if (bestEl) {
    bestEl.textContent = PlayerData.getBest();
    if (state.score >= PlayerData.getBest() && state.score > 0) {
      bestEl.classList.add('beating-record');
    } else {
      bestEl.classList.remove('beating-record');
    }
  }
  updateSpeedBar();
}

function updateSpeedBar() {
  if (!state || !state.level) return;
  const range = CONFIG.maxLevel - 1;
  const current = state.level - 1;
  const pct = Math.max(0, Math.min(100, (current / range) * 100));

  const barHud = document.getElementById('speed-bar-hud');
  const barSide = document.getElementById('speed-bar-sidebar');
  if (barHud) barHud.style.width = pct + '%';
  if (barSide) barSide.style.width = pct + '%';
}

const MAGNET_COSTS = [5, 8, 15, 18, 20];
const MAX_MAGNET_LEVEL = 6; // Base 1 + 5 mejoras

function getMagnetCost() {
  const currentLvl = PlayerData.data.magnetLevel;
  if (currentLvl >= MAX_MAGNET_LEVEL) return 'MAX';
  return MAGNET_COSTS[currentLvl - 1];
}

function updateMenuCoins() {
  const c = PlayerData.data.coins;
  const hm = document.getElementById('home-coins');
  const up = document.getElementById('upgrades-coins-display');
  const sk = document.getElementById('skins-coins-display');
  if (hm) hm.textContent = c;
  if (up) up.textContent = c;
  if (sk) sk.textContent = c;
  
  const mCost = getMagnetCost();
  const cEl = document.getElementById('upg-magnet-cost');
  const labelEl = document.getElementById('upg-magnet-cost-label');
  const vEl = document.getElementById('upg-magnet-val');
  const btnMag = document.getElementById('btn-buy-magnet');
  
  if (mCost === 'MAX') {
    if (labelEl) labelEl.innerHTML = '¡AL MÁXIMO!';
    if (btnMag) {
      btnMag.disabled = true;
      btnMag.style.opacity = '0.5';
      btnMag.style.cursor = 'not-allowed';
    }
  } else {
    if (cEl) cEl.textContent = mCost;
    if (labelEl) labelEl.innerHTML = `<span id="upg-magnet-cost">${mCost}</span> 🪙`;
    if (btnMag) {
      btnMag.disabled = false;
      btnMag.style.opacity = '1';
      btnMag.style.cursor = 'pointer';
    }
  }
  
  if (vEl) vEl.textContent = 6 + (PlayerData.data.magnetLevel * 2);

  // Actualizar barrita visual
  for (let i = 1; i <= 5; i++) {
    const dot = document.getElementById(`mag-dot-${i}`);
    if (dot) {
      if (PlayerData.data.magnetLevel > i) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    }
  }
  updateSkinsUI();
  updateComboPreview();
}

function updateComboPreview(tempSkinId = null, tempBasketId = null) {
  const activeSkinId = tempSkinId || PlayerData.data.activeSkin;
  const activeBasketId = tempBasketId || PlayerData.data.activeBasket;
  
  const skin = SKINS.find(s => s.id === activeSkinId) || SKINS[0];
  const basket = BASKETS.find(b => b.id === activeBasketId) || BASKETS[0];
  const basketImg = ASSETS.baskets[activeBasketId];

  // Actualizar Pantalla de Skins
  const skinImg = document.getElementById('skin-preview-img');
  const skinBasketImg = document.getElementById('basket-preview-img-sk');
  const skinName = document.getElementById('skin-preview-name');
  const skinDesc = document.getElementById('skin-preview-desc');

  if (skinImg) {
    skinImg.src = skin.src;
    skinImg.style.transform = `scale(${skin.scale || 1.0})`;
    skinImg.style.filter = 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))';
  }
  if (skinBasketImg && basketImg) skinBasketImg.src = basketImg.src;
  if (skinName) skinName.textContent = skin.name;
  if (skinDesc) skinDesc.textContent = skin.desc;

  // Actualizar Pantalla de Canastas
  const bkSkinImg = document.getElementById('skin-preview-img-bk');
  const bkImg = document.getElementById('basket-preview-img');
  const bkName = document.getElementById('basket-preview-name');
  const bkDesc = document.getElementById('basket-preview-desc');

  if (bkSkinImg) {
    bkSkinImg.src = skin.src;
    bkSkinImg.style.transform = `scale(${skin.scale || 1.0})`;
    bkSkinImg.style.filter = 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))';
  }
  if (bkImg && basketImg) bkImg.src = basketImg.src;
  
  if (bkName) bkName.textContent = tempBasketId ? basket.name : `Canasta ${basket.name}`;
  if (bkDesc) bkDesc.textContent = basket.desc || (basket.decor ? `Efecto: ${basket.decor}` : 'Diseño personalizado');

  spawnPreviewParticles('preview-particles-skins');
  spawnPreviewParticles('preview-particles-bk');
}

function spawnPreviewParticles(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    const size = 3 + Math.random() * 5;
    const x = 30 + Math.random() * 40; 
    const delay = Math.random() * 2;
    
    p.style.cssText = `
      position: absolute;
      left: ${x}%;
      bottom: 20%;
      width: ${size}px;
      height: ${size}px;
      background: #ffd93d;
      border-radius: 50%;
      opacity: 0;
      box-shadow: 0 0 10px #ffd93d;
      animation: previewParticle 2s linear infinite;
      animation-delay: ${delay}s;
    `;
    container.appendChild(p);
  }
}

function spawnPreviewParticles() {
  const container = document.getElementById('preview-particles');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    const size = 3 + Math.random() * 5;
    const x = 40 + Math.random() * 20; // Centrado relativo
    const delay = Math.random() * 2;
    
    p.style.cssText = `
      position: absolute;
      left: ${x}%;
      bottom: 20%;
      width: ${size}px;
      height: ${size}px;
      background: #ffd93d;
      border-radius: 50%;
      opacity: 0;
      box-shadow: 0 0 10px #ffd93d;
      animation: previewParticle 2s linear infinite;
      animation-delay: ${delay}s;
    `;
    container.appendChild(p);
  }

  if (!document.getElementById('preview-particle-kf')) {
    const s = document.createElement('style');
    s.id = 'preview-particle-kf';
    s.textContent = `
      @keyframes previewParticle {
        0% { transform: translateY(0) scale(1); opacity: 0; }
        20% { opacity: 0.8; }
        100% { transform: translateY(-100px) scale(0); opacity: 0; }
      }
      @keyframes previewPop {
        0% { transform: scale(0.5) translateY(20px); opacity: 0.5; }
        100% { transform: scale(1) translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(s);
  }
}

function updateSkinsUI() {
  const container = document.getElementById('skins-container');
  if (!container) return;
  container.innerHTML = '';

  SKINS.forEach(skin => {
    const card = document.createElement('div');
    const isUnlocked = PlayerData.data.unlockedSkins.includes(skin.id);
    const isActive = PlayerData.data.activeSkin === skin.id;

    card.style.cssText = `
      flex: 0 0 85px;
      background: ${isActive ? 'rgba(168, 85, 247, 0.25)' : 'rgba(0,0,0,0.2)'};
      border: 2px solid ${isActive ? '#a855f7' : (isUnlocked ? 'rgba(107,203,119,0.5)' : 'rgba(255,255,255,0.08)')};
      border-radius: 12px;
      padding: 10px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    `;

    card.innerHTML = `
      <div style="margin-bottom: 5px; height: 50px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="${skin.src}" style="height: 70px; object-fit: contain; object-position: center top; transform: translateY(5px);" alt="${skin.name}">
      </div>
      <div style="font-size: 0.85rem; font-weight: 800; margin-bottom: 4px; color: #fff; text-transform: uppercase; letter-spacing: 0.5px;">${skin.name}</div>
      <div style="font-size: 0.72rem; color: #bbb; margin-bottom: 8px; line-height: 1.2; min-height: 2rem; display: flex; align-items: center; justify-content: center;">${skin.desc || ''}</div>
      <div style="font-size: 0.95rem; font-weight: bold; color: ${isActive ? '#a855f7' : '#ffd700'};">
        ${isUnlocked ? (isActive ? 'USANDO' : 'PONER') : `${skin.cost} 🪙`}
      </div>
    `;

    card.onclick = () => {
      updateComboPreview(skin.id, null);
      if (isUnlocked) {
        PlayerData.data.activeSkin = skin.id;
        PlayerData.save();
        updateSkinsUI();
        SoundSystem.playPop();
      } else {
        if (PlayerData.data.coins >= skin.cost) {
          PlayerData.data.coins -= skin.cost;
          PlayerData.data.unlockedSkins.push(skin.id);
          PlayerData.data.activeSkin = skin.id;
          PlayerData.save();
          updateMenuCoins();
          SoundSystem.playSuccess();
        } else {
          SoundSystem.playError();
          alert('¡No tienes suficientes monedas! 🪙');
        }
      }
    };
    container.appendChild(card);
  });
}

function scrollShop(containerId, direction) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const scrollAmount = 150; // Cantidad de píxeles a desplazar
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
  SoundSystem.playPop();
}

function updateBasketsUI() {
  const container = document.getElementById('baskets-container');
  if (!container) return;
  container.innerHTML = '';

  BASKETS.forEach(b => {
    const card = document.createElement('div');
    const isUnlocked = PlayerData.data.unlockedBaskets.includes(b.id);
    const isActive = PlayerData.data.activeBasket === b.id;

    card.style.cssText = `
      flex: 0 0 85px;
      background: ${isActive ? 'rgba(168, 85, 247, 0.25)' : 'rgba(0,0,0,0.2)'};
      border: 2px solid ${isActive ? '#a855f7' : (isUnlocked ? 'rgba(107,203,119,0.5)' : 'rgba(255,255,255,0.08)')};
      border-radius: 12px;
      padding: 10px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    `;

    card.innerHTML = `
      <div style="font-size: 2.2rem; margin-bottom: 5px; height: 40px; display: flex; align-items: center; justify-content: center;">
        <img src="${ASSETS.baskets[b.id]?.src || ''}" style="width:40px; height:auto;" alt="${b.name}">
      </div>
      <div style="font-size: 0.7rem; font-weight: 800; margin-bottom: 6px; color: #eee; text-transform: uppercase;">${b.name}</div>
      <div style="font-size: 0.85rem; font-weight: bold; color: ${isActive ? '#a855f7' : '#ffd700'};">
        ${isUnlocked ? (isActive ? 'USANDO' : 'PONER') : `${b.cost} 🪙`}
      </div>
    `;

    card.onclick = () => {
      updateComboPreview(null, b.id);
      if (isUnlocked) {
        PlayerData.data.activeBasket = b.id;
        PlayerData.save();
        updateBasketsUI();
        SoundSystem.playPop();
      } else {
        if (PlayerData.data.coins >= b.cost) {
          PlayerData.data.coins -= b.cost;
          PlayerData.data.unlockedBaskets.push(b.id);
          PlayerData.data.activeBasket = b.id;
          PlayerData.save();
          updateMenuCoins();
          updateBasketsUI();
          SoundSystem.playSuccess();
        } else {
          SoundSystem.playError();
          alert('¡No tienes suficientes monedas! 🪙');
        }
      }
    };

    container.appendChild(card);
  });
}


// ─── CONTROLES ───────────────────────────────────────────────────────────────
canvas.addEventListener('mousemove', e => {
  if (!state.running || state.paused) return;
  const rect = canvas.getBoundingClientRect();
  const mx   = (e.clientX - rect.left) * (canvas.width / rect.width);
  state.barX = Math.max(0, Math.min(canvas.width - state.barW, mx - state.barW / 2));

  // Detección de velocidad para mareo en juego
  const dx = Math.abs(mx - (state.lastMouseX || mx));
  if (dx > 5) {
    state.dizziness += dx * 0.15;
  }
  state.lastMouseX = mx;
});

canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  if (!state.running || state.paused) return;
  const rect = canvas.getBoundingClientRect();
  const tx   = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
  state.barX = Math.max(0, Math.min(canvas.width - state.barW, tx - state.barW / 2));
}, { passive: false });

const keys = {};
document.addEventListener('keydown', e => {
  keys[e.key] = true;
  if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') togglePause();
});
document.addEventListener('keyup', e => { keys[e.key] = false; });

function togglePause() {
  if (!state.running) return;
  state.paused = !state.paused;
  document.getElementById('pause-overlay').classList.toggle('hidden', !state.paused);
  if (!state.paused) {
    SoundSystem.stopMenuMusic();
    state.lastTime = performance.now();
    scheduleNextFall();
  } else {
    SoundSystem.startMenuMusic();
    clearTimeout(state.fallTimer);
  }
}

// ─── BOTONES UI ──────────────────────────────────────────────────────────────
document.getElementById('btn-restart').addEventListener('click', () => startGame(state.gameMode || 'classic'));
document.getElementById('btn-menu').addEventListener('click', () => {
  state.running = false;
  cancelAnimationFrame(state.animFrame);
  clearTimeout(state.fallTimer);
  showScreen('screen-start');
  SoundSystem.startMenuMusic(); // Reanudar melodía
});
document.getElementById('btn-pause').addEventListener('click', togglePause);
document.getElementById('btn-resume').addEventListener('click', togglePause);
document.getElementById('btn-pause-restart').addEventListener('click', () => {
  document.getElementById('pause-overlay').classList.add('hidden');
  startGame(state.gameMode || 'classic');
});
document.getElementById('btn-pause-menu').addEventListener('click', () => {
  document.getElementById('pause-overlay').classList.add('hidden');
  state.running = false;
  if (state.animFrame) cancelAnimationFrame(state.animFrame);
  if (state.fallTimer) clearTimeout(state.fallTimer);
  showScreen('screen-start');
  SoundSystem.startMenuMusic();
});
document.getElementById('btn-revive').addEventListener('click', reviveWithAd);

const btnSaveGlobal = document.getElementById('btn-save-global');
if(btnSaveGlobal) {
  btnSaveGlobal.addEventListener('click', () => {
    const input = document.getElementById('player-name-input');
    const name = input.value.trim() || "Anónimo";
    saveGlobalScore(name, state.score);
    document.getElementById('global-record-input').classList.add('hidden');
    SoundSystem.playSuccess();
    alert("¡Tu récord ha sido enviado al mundo! 🌍");
  });
}


// Sincronización de Botones de Silencio
function updateMuteIcons(isMuted) {
  const icon = isMuted ? '🔇' : '🔊';
  const btnGame = document.getElementById('btn-mute');
  const btnMenu = document.getElementById('mute-icon-menu');
  if (btnGame) btnGame.textContent = icon;
  if (btnMenu) btnMenu.textContent = icon;
  
  if (isMuted) {
    SoundSystem.stopMenuMusic();
  } else if (!state.running || state.paused) {
    SoundSystem.startMenuMusic();
  }
}

document.getElementById('btn-mute').addEventListener('click', () => {
  const isMuted = SoundSystem.toggleMute();
  updateMuteIcons(isMuted);
});

const btnMuteMenu = document.getElementById('btn-mute-menu');
if (btnMuteMenu) {
  btnMuteMenu.addEventListener('click', () => {
    const isMuted = SoundSystem.toggleMute();
    updateMuteIcons(isMuted);
  });
}

// Botones de Habilidades
const btnUpg = document.getElementById('btn-upgrades');
if(btnUpg) {
  btnUpg.addEventListener('click', () => {
    updateMenuCoins();
    showScreen('screen-upgrades');
  });
}

const btnBack = document.getElementById('btn-back-menu');
if(btnBack) {
  btnBack.addEventListener('click', () => {
    showScreen('screen-start');
    SoundSystem.startMenuMusic();
  });
}

const btnOpenSkins = document.getElementById('btn-open-skins');
if(btnOpenSkins) {
  btnOpenSkins.addEventListener('click', () => {
    updateMenuCoins();
    showScreen('screen-skins');
  });
}

const btnBackSkins = document.getElementById('btn-back-skins');
if(btnBackSkins) {
  btnBackSkins.addEventListener('click', () => {
    showScreen('screen-start');
    SoundSystem.startMenuMusic();
  });
}

const btnOpenBaskets = document.getElementById('btn-open-baskets');
if(btnOpenBaskets) {
  btnOpenBaskets.addEventListener('click', () => {
    updateMenuCoins();
    updateBasketsUI();
    showScreen('screen-baskets');
  });
}

const btnBackBaskets = document.getElementById('btn-back-baskets');
if(btnBackBaskets) {
  btnBackBaskets.addEventListener('click', () => {
    showScreen('screen-start');
    SoundSystem.startMenuMusic();
  });
}

const btnOpenGuide = document.getElementById('btn-open-guide');
if(btnOpenGuide) {
  btnOpenGuide.addEventListener('click', () => {
    showScreen('screen-guide');
  });
}

const btnBackGuide = document.getElementById('btn-back-guide');
if(btnBackGuide) {
  btnBackGuide.addEventListener('click', () => {
    showScreen('screen-start');
    SoundSystem.startMenuMusic();
  });
}

const btnRefreshLB = document.getElementById('btn-refresh-leaderboard');
if(btnRefreshLB) {
  btnRefreshLB.addEventListener('click', () => {
    fetchGlobalLeaderboard();
    SoundSystem.playPop();
  });
}


const btnBuyMag = document.getElementById('btn-buy-magnet');
if(btnBuyMag) {
  btnBuyMag.addEventListener('click', () => {
    const cost = getMagnetCost();
    if (cost === 'MAX') return;

    if (PlayerData.data.coins >= cost) {
      PlayerData.data.coins -= cost;
      PlayerData.data.magnetLevel++;
      PlayerData.save();
      updateMenuCoins();
      SoundSystem.playSuccess();
    } else {
      SoundSystem.playError();
      alert('¡No tienes suficientes monedas! 🪙');
    }
  });
}

const btnFreeCoinsUpg = document.getElementById('btn-free-coins-upg');
const btnFreeCoinsSk = document.getElementById('btn-free-coins-sk');
const btnFreeCoinsBk = document.getElementById('btn-free-coins-bk');

const freeCoinsHandler = () => {
  AdSystem.showRewarded(
    () => {
      PlayerData.data.coins += 50;
      PlayerData.save();
      updateMenuCoins();
      updateBasketsUI();
      SoundSystem.playSuccess();
      alert('¡Genial! Has ganado 50 monedas 🪙');
    },
    () => {
      alert('Debes ver el anuncio completo para recibir las monedas.');
    }
  );
};

if(btnFreeCoinsUpg) btnFreeCoinsUpg.addEventListener('click', freeCoinsHandler);
if(btnFreeCoinsSk) btnFreeCoinsSk.addEventListener('click', freeCoinsHandler);
if(btnFreeCoinsBk) btnFreeCoinsBk.addEventListener('click', freeCoinsHandler);

setInterval(() => {
  if (state.running && !state.paused) checkCatch();
}, 16);

window.addEventListener('resize', () => {
  resizeCanvas();
  if (!state.running) return;
  state.barX = Math.min(state.barX, canvas.width - state.barW);
});

function initFloatingFood() {
  const containers = [
    document.getElementById('floating-food'),
    document.getElementById('floating-food-guide'),
    document.getElementById('floating-food-upg'),
    document.getElementById('floating-food-skins'),
    document.getElementById('floating-food-baskets'),
    document.getElementById('floating-food-gameover')
  ];
  
  const allGood = INGREDIENTS.map(i => i.emoji);
  const allBad  = HAZARDS.map(i => i.emoji);
  const all     = [...allGood, ...allGood, ...allBad]; 

  containers.forEach(container => {
    if (!container) return;
    container.innerHTML = '';
    // Un poco más de densidad para que se vea premium
    for (let n = 0; n < 30; n++) {
      const emoji = all[Math.floor(Math.random() * all.length)];
      const el    = document.createElement('div');
      el.className = 'float-item';
      
      // Aplicar sprite si existe
      const info = SPRITE_MAP[emoji];
      if (emoji === '🫓') {
        // Usar la arepa artesanal para el fondo también
        if (!window._arepaCache) {
          const off = document.createElement('canvas');
          off.width = 64; off.height = 64;
          drawCustomArepa(off.getContext('2d'), 32, 32, 50);
          window._arepaCache = off.toDataURL();
        }
        el.style.backgroundImage = `url(${window._arepaCache})`;
        el.style.backgroundSize = 'contain';
        el.style.backgroundRepeat = 'no-repeat';
      } else if (emoji === '🥓') {
        // Tocino trío para el fondo
        const info = SPRITE_MAP['🥓'];
        el.style.backgroundImage = `url(imgs/${info.sheet}.png)`;
        el.style.backgroundSize = '300% 300%';
        el.style.backgroundPosition = `0% ${info.row * 50}%`;
        el.style.backgroundRepeat = 'no-repeat';
        el.style.width = '60px'; // Un poco más ancho para el trío
      } else if (info) {
        el.style.backgroundImage = `url(imgs/${info.sheet}.png)`;
        el.style.backgroundPosition = `${(info.col * 50)}% ${(info.row * 50)}%`;
      } else {
        el.classList.add('is-emoji');
        el.textContent = emoji;
      }
      
      el.style.left  = Math.random() * 100 + 'vw';
      // Variar velocidad y retraso para que no caigan todos juntos
      el.style.animationDuration = (10 + Math.random() * 15) + 's';
      el.style.animationDelay    = (-Math.random() * 25) + 's';
      
      // Tamaño aleatorio sutil
      const scale = 0.8 + Math.random() * 0.7;
      el.style.transform = `scale(${scale})`;
      
      container.appendChild(el);
    }
  });
}


function initAssets() {
  BASKETS.forEach(b => {
    if (b.imgSrc) {
      const bImg = new Image();
      bImg.src = b.imgSrc;
      ASSETS.baskets[b.id] = bImg;
      return;
    }

    let basketSVG = '';
    
    if (b.id === 'xmas') {
      // DISEÑO TOTALMENTE NUEVO: CAJA DE REGALO NAVIDEÑA
      basketSVG = `
      <svg width="140" height="100" viewBox="-30 -30 140 100" overflow="visible" xmlns="http://www.w3.org/2000/svg">
        <!-- Sombras de la caja -->
        <rect x="12" y="27" width="60" height="35" fill="rgba(0,0,0,0.3)" rx="3"/>
        <!-- Base de la Caja -->
        <rect x="10" y="25" width="60" height="35" fill="#d90429" stroke="#8a031a" stroke-width="3" rx="3"/>
        
        <!-- Cinta Dorada Vertical -->
        <rect x="32" y="25" width="16" height="35" fill="#ffb703" stroke="#fb8500" stroke-width="2"/>
        <!-- Cinta Dorada Horizontal -->
        <rect x="10" y="38" width="60" height="12" fill="#ffb703" stroke="#fb8500" stroke-width="2"/>
        
        <!-- Tapa de la Caja (un poco más ancha) -->
        <rect x="5" y="12" width="70" height="16" fill="#ef233c" stroke="#8a031a" stroke-width="3" rx="2"/>
        <!-- Cinta Dorada de la Tapa -->
        <rect x="32" y="12" width="16" height="16" fill="#ffb703" stroke="#fb8500" stroke-width="2"/>
        
        <!-- Lazo Dorado Gigante y Elegante -->
        <path d="M 40 12 C 15 -15 0 5 40 12" fill="#ffb703" stroke="#fb8500" stroke-width="3"/>
        <path d="M 40 12 C 65 -15 80 5 40 12" fill="#ffb703" stroke="#fb8500" stroke-width="3"/>
        
        <!-- Cintas cayendo del lazo -->
        <path d="M 38 12 Q 25 30 30 45" fill="none" stroke="#ffb703" stroke-width="4" stroke-linecap="round"/>
        <path d="M 42 12 Q 55 30 50 45" fill="none" stroke="#ffb703" stroke-width="4" stroke-linecap="round"/>
        
        <!-- Nudo del lazo -->
        <circle cx="40" cy="12" r="5" fill="#fb8500" stroke="#8a031a" stroke-width="1.5"/>
        
        <!-- Detalles mágicos navideños alrededor -->
        <text x="-25" y="15" font-size="28" transform="rotate(-15, -25, 15)">❄️</text>
        <text x="80" y="5" font-size="32">✨</text>
        <text x="85" y="55" font-size="24" transform="rotate(20, 85, 55)">❄️</text>
      </svg>
      `;
    } else if (b.id === 'autumn') {
      // DISEÑO TOTALMENTE NUEVO: HOJA OTOÑAL GIGANTE (BARQUITO)
      basketSVG = `
      <svg width="140" height="100" viewBox="-30 -30 140 100" overflow="visible" xmlns="http://www.w3.org/2000/svg">
        <!-- Tallo curvado -->
        <path d="M 2 25 Q -15 25 -20 15" fill="none" stroke="#603808" stroke-width="5" stroke-linecap="round"/>
        
        <!-- Base de la hoja (sombra interior de profundidad) -->
        <path d="M 0 25 C 20 70 60 70 80 25 C 65 35 40 45 0 25 Z" fill="#8b4513"/>
        
        <!-- Cara frontal de la hoja (doblada hacia arriba como cuenco, bordes irregulares) -->
        <path d="M 0 25 C 10 60 40 65 80 25 C 75 10 65 5 55 15 C 45 20 35 20 25 15 C 15 5 5 10 0 25 Z" fill="#bc6c25" stroke="#a0522d" stroke-width="2" stroke-linejoin="round"/>
        
        <!-- Reflejo más claro en la pancita de la hoja -->
        <path d="M 10 35 C 30 60 50 60 70 35 C 50 45 30 45 10 35 Z" fill="#dda15e" opacity="0.8"/>
        
        <!-- Nervadura central gruesa -->
        <path d="M 0 25 Q 40 55 80 25" fill="none" stroke="#603808" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
        
        <!-- Nervaduras laterales -->
        <path d="M 20 38 Q 25 25 30 20" fill="none" stroke="#603808" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
        <path d="M 40 46 Q 45 35 50 30" fill="none" stroke="#603808" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
        <path d="M 60 38 Q 62 25 65 20" fill="none" stroke="#603808" stroke-width="2" stroke-linecap="round" opacity="0.6"/>

        <!-- Remolinos de viento otoñal a los lados -->
        <path d="M -15 10 Q 0 -5 15 10 T 40 5" fill="none" stroke="#dda15e" stroke-width="2" stroke-dasharray="4,6" opacity="0.6"/>
        <path d="M 50 50 Q 65 65 80 50" fill="none" stroke="#dda15e" stroke-width="2" stroke-dasharray="4,6" opacity="0.6"/>

        <!-- Hojitas pequeñas revoloteando -->
        <text x="-5" y="-5" font-size="22" transform="rotate(-15, -5, -5)">🍁</text>
        <text x="85" y="10" font-size="24" transform="rotate(25, 85, 10)">🍂</text>
        <text x="-15" y="55" font-size="20" transform="rotate(-35, -15, 55)">🍂</text>
        <text x="80" y="55" font-size="18" transform="rotate(45, 80, 55)">🍁</text>
      </svg>
      `;
    } else if (b.id === 'love') {
      // DISEÑO TOTALMENTE NUEVO: CANASTA EN FORMA DE CORAZÓN GIGANTE
      basketSVG = `
      <svg width="140" height="100" viewBox="-30 -30 140 100" overflow="visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="heartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#ff758f;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#c9184a;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Sombra del corazón -->
        <path d="M 40 60 C 20 45 -5 30 -5 10 C -5 -10 20 -10 40 10 C 60 -10 85 -10 85 10 C 85 30 60 45 40 60" fill="rgba(0,0,0,0.3)" transform="translate(3,3)"/>
        
        <!-- Cuerpo del Corazón -->
        <path d="M 40 60 C 20 45 -5 30 -5 10 C -5 -10 20 -10 40 10 C 60 -10 85 -10 85 10 C 85 30 60 45 40 60" fill="url(#heartGrad)" stroke="#a4133c" stroke-width="4"/>
        
        <!-- Brillo superior -->
        <path d="M 10 10 C 10 0 30 0 35 10" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
        
        <!-- Asa de la canasta (como un lazo) -->
        <path d="M 10 5 Q 40 -25 70 5" fill="none" stroke="#ffb703" stroke-width="5" stroke-linecap="round"/>
        
        <!-- Detalles mágicos -->
        <text x="-25" y="15" font-size="28" transform="rotate(-15, -25, 15)">✨</text>
        <text x="80" y="5" font-size="32">💖</text>
        <text x="85" y="55" font-size="24" transform="rotate(20, 85, 55)">✨</text>
      </svg>
      `;
    } else if (b.id === 'cowboyhat') {
      basketSVG = `
      <svg width="140" height="100" viewBox="-30 -30 140 100" overflow="visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#c47c3c;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#5C2E00;stop-opacity:1" />
          </linearGradient>
        </defs>
        <!-- Ala del sombrero (base plana y ancha) -->
        <ellipse cx="40" cy="50" rx="60" ry="12" fill="#5C2E00" stroke="#3d1a00" stroke-width="3"/>
        <ellipse cx="40" cy="46" rx="58" ry="10" fill="#8B4513" stroke="#3d1a00" stroke-width="2"/>
        <!-- Copa del sombrero -->
        <rect x="15" y="5" width="50" height="42" rx="6" fill="url(#hatGrad)" stroke="#3d1a00" stroke-width="3"/>
        <!-- Cinta negra del sombrero -->
        <rect x="13" y="37" width="54" height="10" rx="3" fill="#1a0a00" stroke="#3d1a00" stroke-width="1.5"/>
        <!-- Hebilla dorada -->
        <rect x="32" y="39" width="16" height="6" rx="2" fill="#ffb703" stroke="#cc8800" stroke-width="1.5"/>
        <!-- Reflejo del sombrero -->
        <rect x="22" y="10" width="8" height="22" rx="4" fill="rgba(255,255,255,0.15)" />
        <!-- Estrella de vaquero -->
        <text x="-20" y="40" font-size="26" transform="rotate(-10,-20,40)">⭐</text>
        <text x="82" y="10" font-size="22" transform="rotate(15,82,10)">🤠</text>
      </svg>`;
    } else if (b.id === 'fashionbag') {
      basketSVG = `
      <svg width="140" height="100" viewBox="-30 -30 140 100" overflow="visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f48fb1;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#880e4f;stop-opacity:1" />
          </linearGradient>
        </defs>
        <!-- Bolsa de moda (forma de bolso) -->
        <rect x="5" y="15" width="70" height="48" rx="10" fill="url(#bagGrad)" stroke="#5a003a" stroke-width="3"/>
        <!-- Asa del bolso -->
        <path d="M18 15 Q18 -10 40 -10 Q62 -10 62 15" fill="none" stroke="#5a003a" stroke-width="5" stroke-linecap="round"/>
        <!-- Detalle dorado central -->
        <rect x="32" y="33" width="16" height="12" rx="4" fill="#ffd700" stroke="#cc8800" stroke-width="2"/>
        <circle cx="40" cy="39" r="4" fill="#cc8800"/>
        <!-- Patrones de moda -->
        <text x="-25" y="10" font-size="26" transform="rotate(-15,-25,10)">✨</text>
        <text x="78" y="5" font-size="28" transform="rotate(10,78,5)">💅</text>
        <text x="82" y="55" font-size="22">💎</text>
      </svg>`;
    } else if (b.id === 'soccerball') {
      basketSVG = `
      <svg width="140" height="100" viewBox="-30 -30 140 100" overflow="visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="ballRelief" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" />
            <feOffset dx="1" dy="1" />
            <feComponentTransfer><feFuncA type="linear" slope="0.4"/></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        
        <!-- Sombra proyectada -->
        <ellipse cx="40" cy="55" rx="38" ry="8" fill="rgba(0,0,0,0.25)"/>
        
        <g clip-path="url(#soccerClip)" filter="url(#ballRelief)">
          <clipPath id="soccerClip">
            <rect x="-30" y="0" width="140" height="100"/>
          </clipPath>
          
          <!-- Fondo del balón -->
          <circle cx="40" cy="25" r="42" fill="#eee" stroke="#222" stroke-width="2.5"/>
          
          <!-- Paneles de Colores Artísticos -->
          <!-- Pentágono Central (Amarillo) -->
          <path d="M40,5 L54,15 L49,32 L31,32 L26,15 Z" fill="#fbc02d" stroke="#222" stroke-width="1.5"/>
          
          <!-- Paneles Superiores (Azul y Rojo) -->
          <path d="M40,5 L26,15 L15,5 L28,-5 Z" fill="#1565c0" stroke="#222" stroke-width="1.2"/>
          <path d="M40,5 L54,15 L65,5 L52,-5 Z" fill="#d32f2f" stroke="#222" stroke-width="1.2"/>
          
          <!-- Paneles Laterales con Detalles Orgánicos (Simulados con trazados) -->
          <!-- Izquierda (Rojo con trazos azules) -->
          <path d="M26,15 L15,5 L5,15 L10,32 L26,15" fill="#d32f2f" stroke="#222" stroke-width="1.2"/>
          <path d="M12,12 Q18,18 22,15" fill="none" stroke="#1565c0" stroke-width="4" stroke-linecap="round"/>
          
          <!-- Derecha (Azul con trazos amarillos) -->
          <path d="M54,15 L65,5 L75,15 L70,32 L54,15" fill="#1565c0" stroke="#222" stroke-width="1.2"/>
          <path d="M68,12 Q62,18 58,15" fill="none" stroke="#fbc02d" stroke-width="4" stroke-linecap="round"/>
          
          <!-- Paneles Inferiores (Tricolor Mixto) -->
          <path d="M31,32 L10,32 L15,50 L35,55 L31,32" fill="#fbc02d" stroke="#222" stroke-width="1.2"/>
          <path d="M20,40 Q28,45 32,40" fill="none" stroke="#d32f2f" stroke-width="5" stroke-linecap="round"/>
          
          <path d="M49,32 L70,32 L65,50 L45,55 L49,32" fill="#d32f2f" stroke="#222" stroke-width="1.2"/>
          <path d="M60,40 Q52,45 48,40" fill="none" stroke="#1565c0" stroke-width="5" stroke-linecap="round"/>
          
          <!-- Brillo de Cuero -->
          <path d="M25,8 Q35,-5 50,5" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.3"/>
        </g>
        
        <text x="80" y="-5" font-size="26">⚽</text>
      </svg>`;
    } else if (b.id === 'basketball') {
      basketSVG = `
      <svg width="140" height="100" viewBox="-30 -30 140 100" overflow="visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bballGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ff9800;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#bf360c;stop-opacity:1" />
          </linearGradient>
        </defs>
        <clipPath id="bballClip">
          <rect x="-30" y="0" width="140" height="100"/>
        </clipPath>
        <!-- Sombra -->
        <ellipse cx="40" cy="58" rx="38" ry="8" fill="rgba(0,0,0,0.3)"/>
        <!-- Balón -->
        <circle cx="40" cy="25" r="42" fill="url(#bballGrad)" stroke="#bf360c" stroke-width="3" clip-path="url(#bballClip)"/>
        <!-- Líneas del baloncesto -->
        <path d="M40,-18 Q40,70 40,70" stroke="#1a0000" stroke-width="3" fill="none" clip-path="url(#bballClip)"/>
        <path d="M-2,25 Q80,25 82,25" stroke="#1a0000" stroke-width="3" fill="none" clip-path="url(#bballClip)"/>
        <path d="M5,-5 Q30,25 5,55" stroke="#1a0000" stroke-width="2.5" fill="none" clip-path="url(#bballClip)"/>
        <path d="M75,-5 Q50,25 75,55" stroke="#1a0000" stroke-width="2.5" fill="none" clip-path="url(#bballClip)"/>
        <!-- Brillo -->
        <ellipse cx="26" cy="8" rx="9" ry="6" fill="rgba(255,255,255,0.35)" clip-path="url(#bballClip)"/>
        <text x="-22" y="-5" font-size="24" transform="rotate(-10,-22,-5)">🏀</text>
      </svg>`;
    } else if (b.id === 'footballhelm') {
      basketSVG = `
      <svg width="140" height="100" viewBox="-30 -30 140 100" overflow="visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="helmGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#3949ab;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0d1b6e;stop-opacity:1" />
          </linearGradient>
        </defs>
        <!-- Casco de fútbol americano (forma redondeada) -->
        <path d="M5,55 Q5,5 40,5 Q75,5 75,55 Z" fill="url(#helmGrad)" stroke="#000033" stroke-width="3"/>
        <!-- Franja blanca del casco -->
        <path d="M40,5 L40,55" stroke="white" stroke-width="8" opacity="0.9"/>
        <!-- Visera/rejilla -->
        <path d="M10,35 Q12,22 18,18" stroke="#c0c0c0" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M10,45 Q14,32 22,26" stroke="#c0c0c0" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M15,53 Q20,42 28,36" stroke="#c0c0c0" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Brillo del casco -->
        <ellipse cx="28" cy="15" rx="10" ry="7" fill="rgba(255,255,255,0.2)"/>
        <!-- Logo -->
        <text x="-22" y="5" font-size="24" transform="rotate(-10,-22,5)">⭐</text>
        <text x="78" y="-5" font-size="26">🏈</text>
      </svg>`;
    } else if (b.id === 'pompoms') {
      basketSVG = `
      <svg width="140" height="100" viewBox="-30 -30 140 100" overflow="visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="pompomShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
            <feOffset dx="1" dy="1" />
            <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        
        <!-- Pompón Izquierdo -->
        <g transform="translate(-10, 5) rotate(-15, 40, 40)" filter="url(#pompomShadow)">
          <!-- Capas de cintas (Amarillo, Azul, Rojo) -->
          <g stroke-width="4" stroke-linecap="round">
            <!-- Amarillo (Capa base) -->
            <path d="M40,40 L15,10 M40,40 L25,5 M40,40 L40,0 M40,40 L55,5 M40,40 L65,15" stroke="#fbc02d"/>
            <!-- Azul (Capa media) -->
            <path d="M40,40 L10,25 M40,40 L12,40 M40,40 L20,55 M40,40 L70,25 M40,40 L68,40" stroke="#1565c0"/>
            <!-- Rojo (Capa superior) -->
            <path d="M40,40 L30,60 M40,40 L40,65 M40,40 L50,60 M40,40 L60,55 M40,40 L20,15" stroke="#d32f2f"/>
          </g>
          <!-- Mango Negro -->
          <rect x="36" y="40" width="8" height="25" rx="2" fill="#212121" stroke="#000" stroke-width="1"/>
          <!-- Anillo Plateado -->
          <circle cx="40" cy="68" r="5" fill="none" stroke="#9e9e9e" stroke-width="2"/>
        </g>

        <!-- Pompón Derecho -->
        <g transform="translate(45, 5) rotate(15, 40, 40)" filter="url(#pompomShadow)">
          <g stroke-width="4" stroke-linecap="round">
            <!-- Amarillo -->
            <path d="M40,40 L15,10 M40,40 L25,5 M40,40 L40,0 M40,40 L55,5 M40,40 L65,15" stroke="#fbc02d"/>
            <!-- Azul -->
            <path d="M40,40 L10,25 M40,40 L12,40 M40,40 L20,55 M40,40 L70,25 M40,40 L68,40" stroke="#1565c0"/>
            <!-- Rojo -->
            <path d="M40,40 L30,60 M40,40 L40,65 M40,40 L50,60 M40,40 L60,55 M40,40 L20,15" stroke="#d32f2f"/>
          </g>
          <!-- Mango Negro -->
          <rect x="36" y="40" width="8" height="25" rx="2" fill="#212121" stroke="#000" stroke-width="1"/>
          <!-- Anillo Plateado -->
          <circle cx="40" cy="68" r="5" fill="none" stroke="#9e9e9e" stroke-width="2"/>
        </g>
        
        <!-- Brillo/Destellos de Cheerleader -->
        <text x="35" y="-10" font-size="20">⭐</text>
        <text x="-25" y="10" font-size="22" opacity="0.6">✨</text>
      </svg>`;
    } else if (b.id === 'nimbus') {
      basketSVG = `
      <svg width="140" height="100" viewBox="-30 -30 140 100" overflow="visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="nimbusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#fff9c4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#fbc02d;stop-opacity:1" />
          </radialGradient>
        </defs>
        <!-- Resplandor mágico de fondo -->
        <ellipse cx="40" cy="28" rx="55" ry="35" fill="rgba(255,236,64,0.2)"/>
        <!-- Nube principal (forma suave de nube) -->
        <ellipse cx="40" cy="38" rx="40" ry="18" fill="url(#nimbusGlow)" stroke="#f9a825" stroke-width="2"/>
        <ellipse cx="22" cy="28" rx="20" ry="16" fill="url(#nimbusGlow)" stroke="#f9a825" stroke-width="2"/>
        <ellipse cx="42" cy="22" rx="22" ry="18" fill="url(#nimbusGlow)" stroke="#f9a825" stroke-width="2"/>
        <ellipse cx="60" cy="28" rx="18" ry="14" fill="url(#nimbusGlow)" stroke="#f9a825" stroke-width="2"/>
        <!-- Brillo interior de la nube -->
        <ellipse cx="30" cy="30" rx="12" ry="7" fill="rgba(255,255,255,0.55)"/>
        <!-- Destellos mágicos de la nube voladora -->
        <text x="-20" y="-5" font-size="22" transform="rotate(-15,-20,-5)">⭐</text>
        <text x="82" y="-8" font-size="20" transform="rotate(10,82,-8)">✨</text>
        <text x="-25" y="45" font-size="18" transform="rotate(-20,-25,45)">💫</text>
        <text x="85" y="50" font-size="20" transform="rotate(15,85,50)">⭐</text>
        <!-- Ondas de velocidad -->
        <path d="M -15 50 Q 5 58 25 50" stroke="#fbc02d" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>
        <path d="M -10 58 Q 10 66 30 58" stroke="#fbc02d" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5"/>
      </svg>`;
    } else {
      // DISEÑO BASE DE CANASTA CON DECORACIONES
      let customDecor = '';
      if (b.id === 'hallow') {
        customDecor = `
          <!-- Alas de murciélago ENORMES a los lados -->
          <path d="M 15 25 Q -15 -10 -10 -25 Q -30 5 -20 25 Q -35 20 -5 45 Z" fill="#3a0ca3" stroke="#111" stroke-width="2"/>
          <path d="M 65 25 Q 95 -10 90 -25 Q 110 5 100 25 Q 115 20 85 45 Z" fill="#3a0ca3" stroke="#111" stroke-width="2"/>
          <!-- Cara de calabaza tallada GRANDE -->
          <polygon points="30,28 36,36 24,36" fill="#111" />
          <polygon points="50,28 56,36 44,36" fill="#111" />
          <path d="M 25 44 Q 40 52 55 44 L 50 48 L 40 44 L 30 48 Z" fill="#111" />
        `;
      }

      basketSVG = `
        <svg width="140" height="100" viewBox="-30 -30 140 100" overflow="visible" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wickerGrad-${b.id}" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${b.color1};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${b.color2};stop-opacity:1" />
            </linearGradient>
            <pattern id="wickerPattern-${b.id}" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="none" stroke="${b.fill}" stroke-width="0.5"/>
              <line x1="0" y1="5" x2="10" y2="5" stroke="${b.fill}" stroke-width="0.5"/>
            </pattern>
          </defs>
          <path d="M5,15 Q5,5 15,5 L65,5 Q75,5 75,15 L70,50 Q68,58 60,58 L20,58 Q12,58 10,50 Z" fill="url(#wickerGrad-${b.id})" stroke="${b.stroke}" stroke-width="2"/>
          <path d="M5,15 L75,15" stroke="${b.stroke}" stroke-width="3" stroke-linecap="round"/>
          <rect x="5" y="15" width="70" height="43" fill="url(#wickerPattern-${b.id})" opacity="0.3"/>
          <path d="M20,5 Q20,-10 40,-10 Q60,-10 60,5" fill="none" stroke="${b.stroke}" stroke-width="4" stroke-linecap="round"/>
          ${b.decor && !customDecor ? `<text x="40" y="44" font-size="30" text-anchor="middle" font-family="sans-serif">${b.decor}</text>` : ''}
          ${customDecor}
        </svg>
      `;
    }

    const bImg = new Image();
    try {
      bImg.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(basketSVG)));
    } catch(e) {
      bImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(basketSVG);
    }
    ASSETS.baskets[b.id] = bImg;
  });
  
  const magnetSVG = `
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="magRed" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#ff4d4d;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#b30000;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="magSilver" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#e6e6e6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#999999;stop-opacity:1" />
        </linearGradient>
      </defs>
      <path d="M10,20 C10,45 50,45 50,20 L50,10 L40,10 L40,20 C40,35 20,35 20,20 L20,10 L10,10 Z" fill="url(#magRed)" stroke="#800000" stroke-width="1"/>
      <rect x="10" y="5" width="10" height="10" fill="url(#magSilver)" stroke="#666" stroke-width="1"/>
      <rect x="40" y="5" width="10" height="10" fill="url(#magSilver)" stroke="#666" stroke-width="1"/>
      <path d="M15,10 L15,20" stroke="white" stroke-width="2" opacity="0.3" stroke-linecap="round"/>
    </svg>
  `;

  ASSETS.magnet.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(magnetSVG)));
}

window.addEventListener('load', () => {
  resizeCanvas();
  showScreen('screen-start');
  initFloatingFood();
  state = createState();
  initAssets(); // Inicializar las imágenes vectoriales
  AdSystem.init();
  updateMenuCoins();

  // Iniciar música al primer clic (por restricciones de navegador)
  const startAudioOnFirstClick = () => {
    SoundSystem.init();
    if (SoundSystem.ctx.state === 'suspended') {
      SoundSystem.ctx.resume();
    }
    SoundSystem.startMenuMusic();
    document.removeEventListener('click', startAudioOnFirstClick);
    document.removeEventListener('touchstart', startAudioOnFirstClick);
  };
  document.addEventListener('click', startAudioOnFirstClick);
  document.addEventListener('touchstart', startAudioOnFirstClick);

  const best = PlayerData.getBest();
  if (best > 0) {
    const actions = document.querySelector('.secondary-actions');
    if (actions) {
      const rec = document.createElement('p');
      rec.style.cssText = 'margin-top:20px; font-size:1.1rem; color:#ffd93d; font-weight:700; text-align:center; text-shadow:0 2px 4px rgba(0,0,0,0.5);';
      rec.textContent = `🏆 Tu récord: ${best} pts`;
      actions.insertAdjacentElement('afterend', rec);
    }
  }
  renderLeaderboard();


});

// ─── GLOBAL LEADERBOARD (Dreamlo) ───────────────────────────────────────────
// ─── GLOBAL LEADERBOARD (Dreamlo con JSONP para evitar bloqueos) ─────────────
function fetchGlobalLeaderboard() {
  const container = document.getElementById('leaderboard-body');
  if (!container) return;
  
  if (!GLOBAL_CONFIG.isLoaded) {
    container.innerHTML = '<p style="font-size:0.75rem; opacity:0.6; color:#fff; text-align:center;">⌛ Cargando tabla mundial...</p>';
  }

  const old = document.getElementById('dreamlo-script');
  if (old) old.remove();

  const script = document.createElement('script');
  script.id = 'dreamlo-script';
  // Formato nativo de Dreamlo para JSONP (más compatible)
  script.src = `https://dreamlo.com/lb/${GLOBAL_CONFIG.DREAMLO_PUBLIC}/json-p/handleDreamloData`;
  
  script.onerror = () => {
    if (!GLOBAL_CONFIG.isLoaded) {
      container.innerHTML = '<p style="color:#ff6b6b; font-size:0.7rem; text-align:center;">⚠️ Error al conectar con el servidor.</p>';
    }
  };

  document.body.appendChild(script);

  // Tiempo de espera de 10 segundos
  setTimeout(() => {
    if (!GLOBAL_CONFIG.isLoaded && container) {
       container.innerHTML = '<p style="color:#ff9f43; font-size:0.7rem; text-align:center;">⚠️ La tabla tarda demasiado en responder.</p>';
    }
  }, 10000);
}

// Esta función es llamada automáticamente por el servidor de Dreamlo
window.handleDreamloData = function(data) {
  GLOBAL_CONFIG.isLoaded = true;
  if (data && data.dreamlo && data.dreamlo.leaderboard) {
    let entries = data.dreamlo.leaderboard.entry;
    
    if (!entries) {
      GLOBAL_CONFIG.leaderboard = [];
    } else {
      if (!Array.isArray(entries)) entries = [entries];
      
      GLOBAL_CONFIG.leaderboard = entries.map(s => ({
        name: s.name,
        score: parseInt(s.score) || 0
      })).sort((a, b) => b.score - a.score).slice(0, 10);
    }
  }
  renderLeaderboard();
};

// Almacén global para evitar que el recolector de basura elimine las peticiones pendientes
window._activePings = [];

function saveGlobalScore(name, score) {
  const cleanName = name.trim().replace(/[^a-zA-Z0-9]/g, "").substring(0, 12) || "Anonimo";
  const btn = document.getElementById('btn-save-global');
  
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Enviando... ⏳";
  }

  console.log("Enviando récord global...", cleanName, score);
  
  // Usar un beacon de imagen persistente
  const ping = new Image();
  window._activePings.push(ping); // Evita GC
  
  ping.onload = ping.onerror = () => {
    // Limpiar del almacén una vez terminada
    const idx = window._activePings.indexOf(ping);
    if (idx > -1) window._activePings.splice(idx, 1);
  };

  ping.src = `https://dreamlo.com/lb/${GLOBAL_CONFIG.DREAMLO_PRIVATE}/add/${cleanName}/${score}`;
  
  // Esperar 3 segundos para dar tiempo al servidor a procesar el registro
  setTimeout(() => {
    if (btn) btn.textContent = "¡Guardado! ✅";
    fetchGlobalLeaderboard();
  }, 3000);
}

function renderLeaderboard() {
  const container = document.getElementById('leaderboard-body');
  if (!container) return;
  container.innerHTML = '';
  
  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
  const colors = ['#ffd700', '#c0c0c0', '#cd7f32', '#9b59b6', '#3498db', '#1abc9c', '#e67e22', '#e74c3c', '#95a5a6', '#7f8c8d'];
  
  GLOBAL_CONFIG.leaderboard.forEach((entry, i) => {
    const row = document.createElement('div');
    row.style.cssText = `
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 15px; background: rgba(255,255,255,0.03); border-radius: 8px;
      margin-bottom: 5px; border-left: 3px solid ${colors[i]};
    `;
    row.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size: 1.1rem;">${medals[i]}</span>
        <span style="font-size: 0.85rem; font-weight:700; color:#fff;">${entry.name}</span>
      </div>
      <span style="font-family:'Fredoka One',cursive; color:${colors[i]}; font-size: 1.1rem;">${entry.score}</span>
    `;
    container.appendChild(row);
  });
}

// Al iniciar, cargar tabla global
fetchGlobalLeaderboard();

// LÓGICA DE MAREO (Easter Egg)
let mouseDizzyData = {
  lastX: 0,
  lastTime: 0,
  velocitySum: 0,
  isDizzy: false,
  timer: null
};

function triggerDizzy() {
  if (mouseDizzyData.isDizzy) return;
  mouseDizzyData.isDizzy = true;
  
  const logoRat = document.querySelector('.logo-rat');
  const dizzyCheese = document.getElementById('dizzy-cheese');
  const gameLogo = document.querySelector('.game-logo');

  if (logoRat) logoRat.classList.add('dizzy');
  if (dizzyCheese) dizzyCheese.classList.remove('hidden');
  if (gameLogo) gameLogo.style.transform = `rotateY(0deg) rotateX(0deg)`;
  
  // Sonido de error suave para el mareo
  SoundSystem.playTone(200, 'sine', 0.5, 0.05);

  if (mouseDizzyData.timer) clearTimeout(mouseDizzyData.timer);
  mouseDizzyData.timer = setTimeout(() => {
    mouseDizzyData.isDizzy = false;
    mouseDizzyData.velocitySum = 0;
    if (logoRat) logoRat.classList.remove('dizzy');
    if (dizzyCheese) dizzyCheese.classList.add('hidden');
  }, 4000);
}

// EFECTO PREMIUM: Remy sigue al mouse en el menú
document.addEventListener('mousemove', (e) => {
  const startScreen = document.getElementById('screen-start');
  const gameLogo = document.querySelector('.game-logo');
  
  // Solo si la pantalla de inicio es visible
  if (startScreen && startScreen.classList.contains('active') && gameLogo) {
    const rect = gameLogo.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Si está mareado, no sigue al cursor
    if (mouseDizzyData.isDizzy) return;

    // Calcular inclinación (limitada para que no gire de más)
    const angleX = (e.clientX - centerX) / 25;
    const angleY = (e.clientY - centerY) / 25;
    
    // Aplicamos la rotación 3D
    gameLogo.style.transform = `rotateY(${angleX}deg) rotateX(${-angleY}deg)`;

    // DETECCIÓN DE VELOCIDAD PARA EL MAREO
    const now = Date.now();
    const dt = now - mouseDizzyData.lastTime;
    if (dt > 0 && dt < 100) { // Solo si son eventos cercanos
      const dx = Math.abs(e.clientX - mouseDizzyData.lastX);
      const v = dx / dt;
      
      if (v > 5) { // Umbral un poco más bajo
        mouseDizzyData.velocitySum += v;
        if (mouseDizzyData.velocitySum > 100) {
          triggerDizzy();
        }
      } else {
        mouseDizzyData.velocitySum *= 0.96; // Se enfría ligeramente más lento
      }
    }
    mouseDizzyData.lastX = e.clientX;
    mouseDizzyData.lastTime = now;
  }
});

// EFECTO: Remy se emociona al pasar sobre el botón de Jugar
const btnStart = document.getElementById('btn-start');
const logoRat = document.querySelector('.logo-rat');
if (btnStart && logoRat) {
  btnStart.addEventListener('mouseenter', () => logoRat.classList.add('excited'));
  btnStart.addEventListener('mouseleave', () => logoRat.classList.remove('excited'));
}

// Resetear posición si el mouse sale de la ventana
document.addEventListener('mouseleave', () => {
  const gameLogo = document.querySelector('.game-logo');
  if (gameLogo) {
    gameLogo.style.transform = `rotateY(0deg) rotateX(0deg)`;
  }
});

// EVENTOS DE MODOS DE JUEGO
document.getElementById('btn-start').onclick = () => showScreen('screen-modes');
document.getElementById('btn-back-modes').onclick = () => showScreen('screen-start');

document.getElementById('mode-classic').onclick = () => {
  startGame('classic');
};
document.getElementById('mode-time').onclick = () => {
  startGame('time');
};
document.getElementById('mode-survival').onclick = () => {
  startGame('survival');
};
document.getElementById('mode-story').onclick = () => {
  startGame('story');
};
document.getElementById('btn-back-guide').onclick = () => showScreen('screen-modes');
document.getElementById('btn-victory-menu').onclick = () => showScreen('screen-start');

initAssets();
updateBasketsUI();
