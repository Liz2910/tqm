const title   = document.getElementById("title");
const text    = document.getElementById("text");
const actions = document.getElementById("actions");
const bgBase  = document.getElementById("bg-base");
const card    = document.getElementById("card");

function createBtn(label, { href=null, next=false } = {}) {
  const el = href ? document.createElement("a") : document.createElement("button");
  el.className = "btn";
  el.textContent = label;
  if (href) {
    el.href = href;
    el.target = "_blank";
  } else if (next) {
    el.onclick = () => nextSlide();
  }
  return el;
}

const slides = [
  { title:"Para Yir 💜", bg:"S1.gif", text:"", buttons:[{ label:"Comenzar", next:true }], special:"first" },
  { title:"¿Me regalas un poquito de tu tiempo?", bg:"S2.gif", text:"Hola Yir, ¿sabías que te quiero mucho? Bueno, si no lo sabías, ahora ya lo sabes. En fin, tú sabes que soy mala con las cartas, así que haré todo lo posible por expresar, aunque sea un poco, cuánto te quiero. Espero te guste, ¡a la cargaaa!", buttons:[{ label:"¡Vamos!", next:true }] },
  { title:"Para tu esfuerzo de cada día 🏆", bg:"S3.gif", text:"Primero que nada, quiero felicitarte por el esfuerzo que haces todos los días...", buttons:[{ label:"Siguiente", next:true }] },
  { title:"Te quiero en grande ✨", bg:"S4.gif", text:"Abrázame fuerte, ven corriendo a mí. Te quiero, te quiero, te quiero...", buttons:[{ label:"Escucha la canción en Spotify :D", href:"https://open.spotify.com/search/Te%20quiero%20Hombres%20G" }, { label:"Continuar", next:true }] },
  { title:"Cosas bonitas 🌙", bg:"S5.gif", text:"En fin, ¿sabías que existen cosas muy bonitas que se deben apreciar?...",
    buttons:[{ label:"Siguiente", next:true }] },
  { title:"Gracias por existir en mi vida 🤍", bg:"S6.gif", text:"¡Qué bonito es tenerte en mi vida!...", buttons:[{ label:"Continuar", next:true }] },
  { title:"Te dedico un poema 📜", bg:"S7.gif", text:"Me gustaría que estuvieras acá conmigo...", buttons:[{ label:"Siguiente", next:true }] },
  { title:"Siempre en mí 💭", bg:"S8.gif", text:"Me gustaría que supieras que habrá un pedazo de ti en mí siempre...", buttons:[{ label:"Siguiente", next:true }] },
  { title:"Te quiero tal como eres ♡", bg:"S9.gif", text:"Te quiero a ti: tus miedos, tus fuerzas y tus silencios...", buttons:[{ label:"Siguiente", next:true }] },
  { title:"TE QUIERO MUUUUUUUUUUUUUUCHO 🐮💜", bg:"S10.gif", text:"", final:true, special:"final" }
];

let idx = 0;

function renderSlide(i){
  const s = slides[i];

  bgBase.style.opacity = 0;
  setTimeout(()=>{
    bgBase.style.backgroundImage = `url('${s.bg}')`;
    bgBase.style.opacity = 1;
  }, 300);

  // slide final
  if (s.special === "final") {
    card.className = "card final-card";
    card.innerHTML = `<h1 class="final-text">${s.title}</h1>`;
    return;
  }

  // slide inicial
  if (s.special === "first") {
    card.className = "card first-card";
    title.textContent = s.title;
    text.innerHTML = "";
    actions.innerHTML = "";
    const btn = createBtn("Comenzar", { next:true });
    actions.appendChild(btn);
    return;
  }

  // slides normales
  card.className = "card glass";
  title.textContent = s.title;
  text.innerHTML = s.text;
  actions.innerHTML = "";
  s.buttons.forEach(b => actions.appendChild(createBtn(b.label, b)));
}

function nextSlide(){
  idx = Math.min(idx + 1, slides.length - 1);
  renderSlide(idx);
}

renderSlide(idx);
