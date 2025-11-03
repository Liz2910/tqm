const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function typeText(el, text, speed = 24) {
  el.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    el.innerHTML += text[i];
    await sleep(speed);
  }
}

const title   = document.getElementById("title");
const text    = document.getElementById("text");
const actions = document.getElementById("actions");
const bgBase  = document.getElementById("bg-base");
const card    = document.getElementById("card");

// helper para crear botones
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

// slides con altura ajustada
const slides = [
  { id:"slide1", title:"Para Yir 💜", bg:"S1.gif", height:"220px", text:"", buttons:[{ label:"Comenzar", next:true }], special:"first" },
  { id:"slide2", title:"¿Me regalas un poquito de tu tiempo?", bg:"S2.gif", height:"320px", text:"Hola Yir, ¿sabías que te quiero mucho? Bueno, si no lo sabías, ahora ya lo sabes. En fin, tú sabes que soy mala con las cartas, así que haré todo lo posible por expresar, aunque sea un poco, cuánto te quiero. Espero te guste, ¡a la cargaaa!", buttons:[{ label:"¡Vamos!", next:true }] },
  { id:"slide3", title:"Para tu esfuerzo de cada día 🏆", bg:"S3.gif", height:"420px", text:"Primero que nada, quiero felicitarte por el esfuerzo que haces todos los días, sobre todo en esos días que son más difíciles. Eres valiente, fuerte y suficiente; jamás dudes de ti mismo y, si lo haces, que sea para aprender más y seguir adelante. Caerse y tropezar es algo normal en la vida: la cuestión es volver a levantarse. Cometer errores es humano; lo importante es qué haces con ese error y cómo mejoras a partir de él.", buttons:[{ label:"Siguiente", next:true }] },
  { id:"slide4", title:"Te quiero en grande ✨", bg:"S4.gif", height:"260px", text:"Abrázame fuerte, ven corriendo a mí. Te quiero, te quiero, te quiero, y no hago otra cosa que pensar en ti.", buttons:[{ label:"Escucha la canción en Spotify :D", href:"https://open.spotify.com/search/Te%20quiero%20Hombres%20G" }, { label:"Continuar", next:true }] },
  { id:"slide5", title:"Cosas bonitas 🌙", bg:"S5.gif", height:"300px", text:"En fin, ¿sabías que existen cosas muy bonitas que se deben apreciar? Como el cielo, las flores, la luna, los atardeceres y... ¡tú! Te quiero mucho, guapo. ¡Muaaa!", buttons:[{ label:"Siguiente", next:true }] },
  { id:"slide6", title:"Gracias por existir en mi vida 🤍", bg:"S6.gif", height:"440px", text:"¡Qué bonito es tenerte en mi vida! Gracias por darme el privilegio de ser parte de ella, de abrirme las puertas de tu casa, de permitirme conocer a tu familia, de estar ahí para compartir tus logros y ver cómo creces profesionalmente. Mi corazón se llena de agradecimiento por tener un vínculo tan estrecho, y por poder compartir nuestras vidas, poco a poco y sin prisa :)", buttons:[{ label:"Continuar", next:true }] },
  { id:"slide7", title:"Te dedico un poema 📜", bg:"S7.gif", height:"260px", text:"Me gustaría que estuvieras acá conmigo, donde mi insomnio anhela tenerte y donde mi corazón grita que no quiere perderte.", buttons:[{ label:"Siguiente", next:true }] },
  { id:"slide8", title:"Siempre en mí 💭", bg:"S8.gif", height:"340px", text:"Me gustaría que supieras que habrá un pedazo de ti en mí siempre, y estoy agradecida por eso. Sea cual sea la persona en la que te conviertas, y donde quiera que estés en el mundo, lejos o cerca de mí, te envío amor y cariño, y te los daré siempre que te tenga cerca.", buttons:[{ label:"Siguiente", next:true }] },
  { id:"slide9", title:"Te quiero tal como eres ♡", bg:"S9.gif", height:"400px", text:"Te quiero a ti: tus miedos, inseguridades, tus fuerzas y debilidades. Quiero tus sonrisas y tus lágrimas, tus carcajadas y tus silencios. Te quiero hasta que me lo permitas, y por toda la vida, aunque tomemos caminos distintos o sigamos siendo amigos. No me importa, porque siempre habrá algo de ti en mí, y eso es lo que importa.", buttons:[{ label:"Siguiente", next:true }] },
  { id:"slide10", title:"TE QUIERO MUUUUUUUUUUUUUUCHO 🐮💜", bg:"S10.gif", height:"100vh", text:"", final:true, special:"final" }
];

let idx = 0;

function renderSlide(i){
  const s = slides[i];
  bgBase.style.backgroundImage = `url('${s.bg}')`;
  bgBase.style.backgroundSize = "cover";
  bgBase.style.backgroundPosition = "center";

  // Slide final especial
  if (s.special === "final") {
    card.className = "card final-card";
    card.innerHTML = `<h1 class="final-text">${s.title}</h1>`;
    return;
  }

  // Slide inicial especial
  if (s.special === "first") {
    card.className = "card first-card";
    card.innerHTML = `
      <h1 class="first-title">${s.title}</h1>
      <div class="actions">${createBtn("Comenzar", { next:true }).outerHTML}</div>`;
    return;
  }

  // Slide normal
  card.className = "card glass";
  title.textContent = s.title || "";
  text.innerHTML = s.text;
  text.style.minHeight = s.height;

  actions.innerHTML = "";
  s.buttons.forEach(b => actions.appendChild(createBtn(b.label, b)));
}

function nextSlide(){
  idx = Math.min(idx + 1, slides.length - 1);
  renderSlide(idx);
}

renderSlide(idx);
