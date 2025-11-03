// --------- Utilidades de timing para “escritura” ----------
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function typeText(el, text, speed = 28) {
  el.innerHTML = "";
  // Pausas más largas tras signos de puntuación
  const longPause = new Set([",", ".", ";", ":", "?", "¿", "¡", "!"]);
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    el.innerHTML += ch === "\n" ? "<br/>" : ch;
    let delay = speed;

    // Pequeñas variaciones de velocidad para que se sienta más “humano”
    delay += Math.random() * 22 - 8;

    if (longPause.has(ch)) delay += 120;
    if (ch === "…" || (ch === "." && text[i+1] === ".")) delay += 180;

    await sleep(Math.max(10, delay));
  }
}

// --------- Fondos / efectos ----------
const bgBase = document.getElementById("bg-base");
const bgEffect = document.getElementById("bg-effect");
const particles = document.getElementById("particles");

function clearParticles(){
  particles.innerHTML = "";
}

function spawnParticles(type = "hearts", amount = 28, duration = [6000, 11000]) {
  clearParticles();
  const glyphs = type === "hearts" ? ["💜","🖤","🤍","❤️","🏆"] : ["💜","🖤","🤍"];
  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  for (let i = 0; i < amount; i++) {
    const el = document.createElement("div");
    el.className = "particle";
    el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    const left = Math.random() * vw;
    const xShift = (Math.random() * 160 - 80) + "px";
    const dur = (Math.random() * (duration[1]-duration[0]) + duration[0]) + "ms";
    el.style.left = `${left}px`;
    el.style.setProperty("--xShift", xShift);
    el.style.animationDuration = dur;
    el.style.animationDelay = (Math.random()*1000) + "ms";
    particles.appendChild(el);
  }
}

function setEffect(effect){
  // Reset estilos
  bgEffect.className = "bg-layer";
  bgEffect.style.opacity = 0;
  bgEffect.innerHTML = "";

  switch(effect){
    case "hearts":
      bgEffect.style.opacity = 1;
      spawnParticles("hearts", 34);
      break;

    case "tequiero":
      // Fondo de texto repetido
      bgEffect.style.opacity = 1;
      clearParticles();
      const grid = document.createElement("div");
      grid.className = "te-quiero";
      // Llenamos una cuadrícula con “te quiero”
      const cells = 60;
      for (let i=0;i<cells;i++){
        const s = document.createElement("span");
        s.textContent = "te quiero";
        grid.appendChild(s);
      }
      bgEffect.appendChild(grid);
      break;

    case "cow":
      bgBase.classList.add("cow-bg");
      bgEffect.style.opacity = 1;
      clearParticles();
      const spots = document.createElement("div");
      spots.className = "cow-spots";
      bgEffect.appendChild(spots);
      break;

    default:
      clearParticles();
      bgBase.classList.remove("cow-bg");
      // degradé morado/plateado suave (definido vía CSS base)
      break;
  }
}

// --------- Interfaz ----------
const title = document.getElementById("title");
const text = document.getElementById("text");
const actions = document.getElementById("actions");

// Botón helper
function createBtn(label, { ghost=false, href=null, target="_blank", onClick=null } = {}){
  const el = href ? document.createElement("a") : document.createElement("button");
  el.className = "btn" + (ghost ? " btn--ghost" : "");
  el.textContent = label;
  if (href) {
    el.href = href;
    el.target = target;
    el.rel = "noopener noreferrer";
  } else if (onClick) {
    el.addEventListener("click", onClick);
  }
  return el;
}

// --------- Escenas / Slides ----------
const slides = [
  // 0: Pantalla de inicio con botón "Comenzar"
  {
    title: "💌 Para Yir",
    effect: null,
    text: "",
    buttons: [{ label:"Comenzar", ghost:false, next:true }]
  },
  // 1: Primer texto + “¡vamos!”
  {
    title: "Escúchame tantito 💫",
    effect: null,
    text: "Hola Yir, ¿sabias que te quiero mucho? Bueno, si no lo sabías ahora ya lo sabes, enfin, tu sabes que soy mala con las cartas así que haré todo lo posible para expresar aunque sea un poco de cuanto te quiero y espero te guste, a la cargaaa",
    buttons: [{ label:"¡vamos!", next:true }]
  },
  // 2: Corazones y trofeos + typing
  {
    title: "Para tu esfuerzo de cada día 🏆",
    effect: "hearts",
    text: "Primero que nada quiero felicitarte por el esfuerzo que haces todos los días, sobre todo en esos días que son más difíciles. Eres valiente, fuerte y eres suficiente; jamás dudes de ti mismo y si lo haces que sea para aprender más y seguir adelante. Caerse y tropezar es algo normal en la vida, la cuestión es volver a levantarse. Cometer errores es normal en el ser humano, la cuestión es qué haces con ese error y cómo mejoras a partir de ello",
    buttons: [{ label:"Siguiente", next:true }]
  },
  // 3: Fondo lleno de “te quiero” + canción + continuar
  {
    title: "Te quiero en grande ✨",
    effect: "tequiero",
    text: "Abrázame fuerte, ven corriendo a mi. Te quiero, te quiero, te quiero y no hago otra cosa que pensar en ti",
    buttons: [
      { label:"Escuchar canción (Spotify)", href:"https://open.spotify.com/search/Te%20quiero%20Hombres%20G", ghost:true },
      { label:"Continuar", next:true }
    ]
  },
  // 4: Texto apreciar + fondo libre
  {
    title: "Cosas bonitas 🌙",
    effect: null,
    text: "Enfin, sabías que existen cosas muy bonitas que se deben de apreciar_ ccomo el cielo, las flores, la luna, los atardeceres y... tú! tq uier mucho guapo, muaaa",
    buttons: [{ label:"Siguiente", next:true }]
  },
  // 5: Agradecimiento largo
  {
    title: "Gracias por existir en mi vida 🤍",
    effect: null,
    text: "¡Qué bonito es tenerte en mi vida! Gracias por haberme dado el privilegio de ser parte de tu vida, de abrirme las puertas de tu casa, de permitirme conocer a tu familia, de estar ahí para compartir tus logros, de ver como vas creciendo profesionalmente es algo que hace que mi corazon se llene de agradecimiento por el hecho de tener un vinculo tan estrecho y de que poco a poco nos vayamos conociendo y compartiendo nuestras vidas sin prisa :)",
    buttons: [{ label:"Continuar", next:true }]
  },
  // 6: Poema
  {
    title: "Te dedico un poema 📜",
    effect: null,
    text: "Te dedico un poema: Me gustaria que estuvieras aca conmigo, donde mi insomnio anhela tenerte y donde mi corazon grita que no quiere perderte",
    buttons: [{ label:"Siguiente", next:true }]
  },
  // 7: “Habrá un pedazo de ti en mí…”
  {
    title: "Siempre en mí 💭",
    effect: null,
    text: "Me gustaria que supieras que habra un pedazo de ti en mi siempre y estoy agradecida por eso, sea cual sea la persona en la que te conviertas, y donde quiera que estes en el mundo, lejos o cercva de mi, te envio amor y cariño y te lo dare siempre que te tenga cerca de mi",
    buttons: [{ label:"Siguiente", next:true }]
  },
  // 8: “Te quiero a ti…”
  {
    title: "Te quiero tal como eres ♡",
    effect: null,
    text: "Te quiero a ti, as tus miedos, inseguridades, tus fuerzas y tus debilidades, quiero tus sonrisas y tus lagrimas, tus carcajadas y tus silencios, te quier hasta que me lo permitas y por toda la vida aunque tomemos caminos separados en un futuro o sigamos siendo amigos o lo que sea, no me importa, pero siempre habra algo de ti en mi y eso es lo que importa",
    buttons: [{ label:"Siguiente", next:true }]
  },
  // 9: Vaquita cute + “te quiero MUUUUUUUUUcho”
  {
    title: "🐮💜",
    effect: "cow",
    text: "te quiero MUUUUUUUUUcho",
    buttons: [] // última slide, sin botón
  }
];

let idx = 0;

async function renderSlide(i){
  const s = slides[i];
  title.textContent = s.title || "💜";
  actions.innerHTML = "";
  setEffect(s.effect);

  // En la slide 0 (inicio) no mostramos texto, solo botón
  if (i === 0) {
    text.innerHTML = "";
  } else {
    await typeText(text, s.text);
  }

  // botones
  s.buttons.forEach(b => {
    const btn = createBtn(b.label, {
      ghost: !!b.ghost,
      href: b.href || null,
      onClick: b.next ? () => nextSlide() : (b.onClick || null)
    });
    actions.appendChild(btn);
  });
}

function nextSlide(){
  // Transición suave del efecto
  bgEffect.style.transform = "scale(1.01)";
  setTimeout(()=>{ bgEffect.style.transform = "scale(1)"; }, 300);

  // Avanza
  idx = Math.min(idx + 1, slides.length - 1);
  renderSlide(idx);
}

// Primera render
renderSlide(idx);

// Mejora sutil: si cambia el tamaño, re-lanza partículas en escenas que las usan
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(()=>{
    if (slides[idx].effect === "hearts") spawnParticles("hearts", 34);
  }, 200);
});
