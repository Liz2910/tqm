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
  { title:"Para the best fcking person", bg:"S1.gif", text:"", buttons:[{ label:"Comenzar", next:true }] },
  { title:"¿Me regalas un poquito de tu tiempo?", bg:"S2.gif",
    text:"Hola Yir, ¿sabías que te quiero mucho? Bueno, si no lo sabías, ahora ya lo sabes. En fin, tú sabes que soy mala con las cartas, así que haré todo lo posible por expresar, aunque sea un poco, cuánto te quiero. Espero te guste, ¡a la carga!!!!!",
    buttons:[{ label:"¡Vamos!", next:true }] },
  { title:"Para tu esfuerzo de cada día 🏆", bg:"S3.gif",
    text:"Primero que nada, quiero felicitarte por el esfuerzo que haces todos los días, sobre todo en esos días que son más difíciles. Eres valiente, fuerte y suficiente; jamás dudes de ti mismo y, si lo haces, que sea para aprender más y seguir adelante. Caerse y tropezar es algo normal en la vida: la cuestión es volver a levantarse. Cometer errores es humano; lo importante es qué haces con ese error y cómo mejoras a partir de él.",
    buttons:[{ label:"Siguiente", next:true }] },
  { title:"Te quiero en grande ✨", bg:"S4.gif",
    text:"Abrázame fuerte, ven corriendo a mí. Te quiero, te quiero, te quiero, y no hago otra cosa que pensar en ti.",
    buttons:[
      { label:"Escucha la canción en Spotify :D", href:"https://open.spotify.com/search/Te%20quiero%20Hombres%20G" },
      { label:"Co
