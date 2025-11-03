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
  {
    title:"¿Me regalas un poquito de tu tiempo?",
    bg:"S2.gif",
    text:"Hola Yir, ¿sabías que te quiero mucho? Bueno, si no lo sabías, ahora ya lo sabes. En fin, tú sabes que soy mala con las cartas, así que haré todo lo posible por expresar, aunque sea un poco, cuánto te quiero. Espero te guste, ¡a la cargaaa!",
    buttons:[{ label:"¡Vamos!", next:true }]
  },
  {
    title:"Para tu esfuerzo de cada día 🏆",
    bg:"S3.gif",
    text: "Primero que nada, quiero felicitarte por el esfuerzo que haces todos los días, sobre todo en esos días que son más difíciles. Eres valiente, fuerte y suficiente; jamás dudes de ti mismo y, si lo haces, que sea para aprender más y seguir adelante. Caerse y tropezar es algo normal en la vida: la cuestión es volver a levantarse. Cometer errores es humano; lo importante es qué haces con ese error y cómo mejoras a partir de él.",
    buttons:[{ label:"Siguiente", next:true }]
  },
  {
    title:"Te quiero en grande ✨",
    bg:"S4.gif",
    text: "Abrázame fuerte, ven corriendo a mí. Te quiero, te quiero, te quiero, y no hago otra cosa que pensar en ti.",
    buttons:[
      { label:"Escucha la canción en Spotify 🎵", href:"https://open.spotify.com/search/Te%20quiero%20Hombres%20G" },
      { label:"Continuar", next:true }
    ]
  },
  {
    title:"Cosas bonitas 🌙",
    bg:"S5.gif",
    text: "En fin, ¿sabías que existen cosas muy bonitas que se deben apreciar? Como el cielo, las flores, la luna, los atardeceres y... ¡tú! Te quiero mucho, guapo. ¡Muaaa!",
    buttons:[{ label:"Siguiente", next:true }]
  },
  {
    title:"Gracias por existir en mi vida 🤍",
    bg:"S6.gif",
    text: "¡Qué bonito es tenerte en mi vida! Gracias por darme el privilegio de ser parte de ella, de abrirme las puertas de tu casa, de permitirme conocer a tu familia, de estar ahí para compartir tus logros y ver cómo creces profesionalmente. Mi corazón se llena de agradecimiento por tener un vínculo tan estrecho, y por poder compartir nuestras vidas, poco a poco y sin prisa :)",
    buttons:[{ label:"Continuar", next:true }]
  },
  {
    title:"Te dedico un poema 📜",
    bg:"S7.gif",
    text: "Me gustaría que estuvieras acá conmigo, donde mi insomnio anhela tenerte y donde mi corazón grita que no quiere perderte.",
    buttons:[{ label:"Siguiente", next:true }]
  },
  {
    title:"Always on me 💭",
    bg:"S8.gif",
    text: "Me gustaría que supieras que habrá un pedazo de ti en mí siempre, y estoy agradecida por eso. Sea cual sea la persona en la que te conviertas, y donde quiera que estés en el mundo, lejos o cerca de mí, te envío amor y cariño, y te los daré siempre que te tenga cerca.",
    buttons:[{ label:"Siguiente", next:true }]
  },
  {
    title:"Te quiero tal como eres ♡",
    bg:"S9.gif",
    text: "Te quiero a ti: tus miedos, inseguridades, tus fuerzas y debilidades. Quiero tus sonrisas y tus lágrimas, tus carcajadas y tus silencios. Te quiero hasta que me lo permitas, y por toda la vida, aunque tomemos caminos distintos o sigamos siendo amigos. No me importa, porque siempre habrá algo de ti en mí, y eso es lo que importa.",
    buttons:[{ label:"Siguiente", next:true }]
  },
  {
    title:"TE QUIERO MUUUUUUUUUUUUUUCHO 🐮💜",
    bg:"S10.gif",
    text:"",
    final:true,
    special:"final"
  }
];

let idx = 0;

function typeText(element, text, callback) {
  element.textContent = "";
  let i = 0;
  const speed = 35;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) callback();
  }
  typing();
}

function renderSlide(i){
  const s = slides[i];

  bgBase.style.opacity = 0;
  setTimeout(()=>{
    bgBase.style.backgroundImage = `url('${s.bg}')`;
    bgBase.style.opacity = 1;
  }, 300);

  if (s.special === "final") {
    card.className = "card final-card";
    card.innerHTML = `<h1 class="final-text">${s.title}</h1>`;
    return;
  }

  if (s.special === "first") {
    card.className = "card first-card";
    title.textContent = s.title;
    text.textContent = "";
    actions.innerHTML = "";
    actions.appendChild(createBtn("Comenzar", { next:true }));
    return;
  }

  card.className = "card glass";
  title.textContent = s.title;
  actions.innerHTML = "";

  typeText(text, s.text, () => {
    s.buttons.forEach(b => actions.appendChild(createBtn(b.label, b)));
  });
}

function nextSlide(){
  idx = Math.min(idx + 1, slides.length - 1);
  renderSlide(idx);
}

renderSlide(idx);
