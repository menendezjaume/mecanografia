const phrases = [
  "La Revolución Francesa comenzó y marcó el fin de la monarquía absoluta en Francia, cambiando la historia.",
  "La Primera Guerra Mundial se libró involucrando a muchas naciones del mundo, causando grandes cambios.",
  "El Renacimiento fue un período de gran florecimiento cultural y artístico en Europa, influenciando el arte.",
  "La caída del Imperio Romano de Occidente ocurrió, marcando el inicio de la Edad Media en Europa.",
  "La Revolución Industrial transformó las economías agrarias en industriales, cambiando la producción.",
  "El descubrimiento de América por Cristóbal Colón cambió la historia del mundo, abriendo nuevos horizontes.",
  "La Guerra de Independencia de Estados Unidos se libró, resultando en la formación de una nueva nación.",
  "La construcción de la Gran Muralla China comenzó, siendo una de las mayores obras de ingeniería.",
  "El Imperio Bizantino fue la continuación del Imperio Romano en su parte oriental, con gran influencia.",
  "La Revolución Rusa llevó al establecimiento de un gobierno comunista en Rusia, cambiando su historia.",
  "La Declaración de Independencia de Estados Unidos fue firmada, marcando el nacimiento de una nación.",
  "La caída de Constantinopla marcó el fin del Imperio Bizantino, cambiando el curso de la historia.",
  "La Guerra de los Cien Años fue un conflicto entre Inglaterra y Francia que duró muchos años, afectando Europa.",
  "La Revolución Mexicana comenzó y resultó en grandes cambios políticos y sociales en México.",
  "La dinastía Ming gobernó China conocida por su arte y cultura, dejando un legado duradero.",
  "La Guerra Fría fue un período de tensión política entre Estados Unidos y la Unión Soviética, sin conflicto directo.",
  "La Revolución Gloriosa en Inglaterra resultó en la deposición del rey Jacobo, cambiando la monarquía.",
  "La caída del Muro de Berlín simbolizó el fin de la Guerra Fría, uniendo a Alemania nuevamente.",
  "La dinastía Han gobernó China durante más de cuatro siglos, siendo una de las más influyentes.",
  "La Revolución Cubana llevó a Fidel Castro al poder en Cuba, cambiando su sistema político.",
  "La Guerra Civil Española se libró resultando en la dictadura de Franco, afectando a la nación.",
  "La dinastía Qing fue la última dinastía imperial de China, marcando el fin de una era.",
  "La Revolución Haitiana fue la única revuelta de esclavos exitosa en la historia, logrando la independencia.",
  "La Guerra de Secesión en Estados Unidos se libró, resultando en la abolición de la esclavitud.",
  "La dinastía Tang es considerada una de las edades de oro de la civilización china, con grandes avances.",
  "La Revolución de Octubre fue una fase crucial de la Revolución Rusa, cambiando el gobierno.",
  "La Guerra de Corea se libró dividiendo la península en dos países, Corea del Norte y Corea del Sur.",
  "La dinastía Otomana gobernó gran parte del sudeste de Europa Asia Occidental y el norte de África, con gran poder.",
  "La Revolución Americana inspiró movimientos de independencia en América Latina, cambiando el continente.",
  "La Guerra del Peloponeso fue un conflicto entre Atenas y Esparta en la antigua Grecia, afectando la región.",
  "La dinastía Gupta es conocida como la Edad de Oro de la India antigua, con grandes logros culturales.",
  "La Revolución Francesa inspiró movimientos revolucionarios en toda Europa, cambiando muchas naciones.",
  "La Guerra de Vietnam se libró involucrando a Estados Unidos y Vietnam, con grandes consecuencias.",
  "La dinastía Carolingia fue una dinastía franca que gobernó gran parte de Europa occidental, con gran influencia.",
  "La Revolución Industrial comenzó en Gran Bretaña y se extendió por todo el mundo, cambiando la producción.",
  "La Guerra de los Treinta Años fue un conflicto religioso y político en Europa central, afectando la región.",
  "La dinastía Merovingia fue la primera dinastía franca que gobernó gran parte de Francia, con gran poder.",
  "La Revolución fue una serie de levantamientos en Europa contra las monarquías, cambiando el gobierno.",
  "La Guerra de Crimea se libró involucrando a Rusia y una coalición de países, con grandes consecuencias.",
  "La dinastía Habsburgo gobernó gran parte de Europa central durante varios siglos, con gran influencia.",
  "La Revolución en China llevó al fin de la dinastía Qing y al establecimiento de la República, cambiando el país.",
  "La Guerra de la Independencia de México se libró, resultando en la formación de una nueva nación.",
  "La dinastía Plantagenet gobernó Inglaterra, con gran influencia en la historia del país.",
  "La Revolución en Francia llevó al derrocamiento del rey Carlos, cambiando el gobierno.",
  "La Guerra de la Independencia de Grecia se libró, resultando en la formación de una nueva nación.",
  "La dinastía Tudor gobernó Inglaterra, con gran influencia en la historia del país.",
  "La Revolución en Rusia fue una ola de masivas protestas políticas y sociales, cambiando el gobierno.",
];

let currentPhrase = "";
let errors = 0;
let backspaceEnabled = false; // Estado de la tecla Backspace

// Cargar una nueva frase
function newPhrase() {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  currentPhrase = phrases[randomIndex];
  document.getElementById("phrase").textContent = currentPhrase;
  document.getElementById("input").value = "";
  document.getElementById("errors").textContent = "0";
  errors = 0;
  updateCursor(0);
  document.getElementById("popup").style.display = "none";
  document.getElementById("veil").style.display = "none";
}

// Manejar la entrada de texto
document.getElementById("input").addEventListener("input", function (event) {
  const inputBox = this;
  const typedText = inputBox.value;

  // Manejar Backspace manualmente
  if (event.inputType === "deleteContentBackward") {
    if (!backspaceEnabled) {
      inputBox.value = typedText + currentPhrase[typedText.length] || "";
    }
    return; // Evitar chequeo de errores en Backspace
  }

  if (typedText === currentPhrase) {
    showPopup();
    return;
  }
  // Obtener la parte correcta de la frase actual
  const correctText = currentPhrase.slice(0, typedText.length);
  const lastTypedChar = typedText.slice(-1);

  // Manejo especial de letras acentuadas
  const validAccents = ["´", "`", "¨", "^", "Dead"];
  if (lastTypedChar && validAccents.includes(lastTypedChar)) {
    return; // No hacer nada si es un carácter de acento temporal
  }

  if (typedText !== correctText) {
    // Mostrar la letra incorrecta durante 100ms antes de borrarla
    setTimeout(() => {
      inputBox.value = typedText.slice(0, -1);

      // Incrementar contador de errores
      errors++;
      document.getElementById("errors").textContent = errors;
    }, 100);
    return; // Evitar chequeo de errores en letras incorrectas
  }
  // Actualizar el cursor a la siguiente letra
  updateCursor(typedText.length);
});

// Actualizar la frase con el cursor
function updateCursor(position) {
  const correctPart = currentPhrase.slice(0, position);
  const currentChar = currentPhrase[position] || "";
  const remainingPart = currentPhrase.slice(position + 1);
  document.getElementById("phrase").innerHTML = `
                ${correctPart}<span class="highlight">${currentChar}</span>${remainingPart}
            `;
}

// Ajustar el zoom global
function adjustZoom(amount) {
  const root = document.documentElement;
  let currentScale = parseFloat(getComputedStyle(root).getPropertyValue("--scale-factor"));
  currentScale = Math.max(0.5, Math.min(2, currentScale + amount)); // Limitar zoom entre 0.5 y 2
  root.style.setProperty("--scale-factor", currentScale);
}

// Mostrar el popup de resultados
function showPopup() {
  const popup = document.getElementById("popup");
  const veil = document.getElementById("veil");
  const message = document.getElementById("popupMessage");

  const errorRate = ((errors / currentPhrase.length) * 100).toFixed(2);

  message.innerHTML = `
        Has terminado la frase.<br>
        Número de errores: ${errors}<br>
        Porcentaje de errores: ${errorRate}%.
    `;
  popup.style.display = "block";
  veil.style.display = "block";
}

// Inicializar la página con una frase
newPhrase();
