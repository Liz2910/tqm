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
    text:"Primero que nada, quiero felicitarte por el esfuerzo que haces todos los días, por no rendirte incluso cuando todo se pone difícil. Sé que a veces el cansancio o el estrés pueden más, pero aún así, sigues dando lo mejor de ti, y eso es algo que admiro profundamente.",
    buttons:[{ label:"Siguiente", next:true }]
  },
  {
    title:"Te quiero en grande ✨",
    bg:"S4.gif",
    text:"Abrázame fuerte, ven corriendo a mí. Te quiero, te quiero, te quiero. Te quiero porque simplemente existes, porque llenas de luz mis días, porque cuando pienso en ti sonrío sin querer hacerlo. Gracias por ser tú.",
    buttons:[
      { label:"Escucha la canción en Spotify 🎵", href:"https://open.spotify.com/search/Te%20quiero%20Hombres%20G" },
      { label:"Continuar", next:true }
    ]
  },
  {
    title:"Cosas bonitas 🌙",
    bg:"S5.gif",
    text:"En fin, ¿sabías que existen cosas muy bonitas que se deben apreciar? Como un cielo lleno de estrellas, el sonido del mar, una risa sincera… y tú. Porque tú también eres una de esas cosas que hacen que la vida sea más bonita.",
    buttons:[{ label:"Siguiente", next:true }]
  },
  {
    title:"Gracias por existir en mi vida 🤍",
    bg:"S6.gif",
    text:"¡Qué bonito es tenerte en mi vida! Gracias por compartir tus momentos, por escucharme, por apoyarme y por dejarme ser parte de tu mundo. No sabes cuánto valoro eso, y cuánto deseo verte brillar cada día más.",
    buttons:[{ label:"Continuar", next:true }]
  },
  {
    title:"Te dedico un poema 📜",
    bg:"S7.gif",
    text:"Me gustaría que estuvieras acá conmigo, que leyeras esto a mi lado, y que vieras la sonrisa que se me escapa mientras lo escribo. Porque sí, es por ti. Cada palabra, cada pensamiento, cada cosa buena que me pasa… inevitablemente, me recuerda a ti.",
    buttons:[{ label:"Siguiente", next:true }]
  },
  {
    title:"Siempre en mí 💭",
    bg:"S8.gif",
    text:"Me gustaría que supieras que habrá un pedazo de ti en mí siempre. Que, pase lo que pase, siempre voy a recordarte con cariño, con gratitud y con una sonrisa. Porque dejaste algo bonito en mí, algo que no se borra.",
    buttons:[{ label:"Siguiente", next:true }]
  },
  {
    title:"Te quiero tal como eres ♡",
    bg:"S9.gif",
    text:"Te quiero a ti: tus miedos, tus fuerzas y tus silencios. Te quiero incluso cuando no te entiendes, cuando dudas, cuando brillas y cuando te caes. Porque en cada versión tuya encuentro razones para seguir queriéndote.",
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
