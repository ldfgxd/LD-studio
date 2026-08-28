const musicBtn = document.getElementById('music-btn');
const bgAudio = document.getElementById('bg-audio');
const musicIcon = document.getElementById('music-icon');

if (musicBtn && bgAudio) {
    musicBtn.addEventListener('click', () => {
        if (bgAudio.paused) {
            bgAudio.play();
            // Cambia el ícono a pausa (dos barritas) ➡️
            musicIcon.innerHTML = '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>';
            musicBtn.classList.add('playing');
        } else {
            bgAudio.pause();
            // Regresa el ícono a play (triángulo) ➡️
            musicIcon.innerHTML = '<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>';
            musicBtn.classList.remove('playing');
        }
    });
}
// --- LÓGICA PARA LA NOTIFICACIÓN DE BIENVENIDA ---
const welcomeToast = document.getElementById('welcome-toast');
const closeToast = document.getElementById('close-toast');

if (welcomeToast && closeToast) {
    // Botón para cerrar manualmente
    closeToast.addEventListener('click', () => {
        welcomeToast.style.opacity = '0';
        welcomeToast.style.transform = 'translateY(-20px)';
        setTimeout(() => welcomeToast.remove(), 300);
    });

    // Se oculta solita después de 6 segundos para no estorbar
    setTimeout(() => {
        if (welcomeToast) {
            welcomeToast.style.opacity = '0';
            welcomeToast.style.transform = 'translateY(-20px)';
            setTimeout(() => welcomeToast.remove(), 300);
        }
    }, 6000);
}
// --- Interruptor de colores de la tarjeta de contacto ---
document.addEventListener('DOMContentLoaded', () => {
    const cardToggleBtn = document.getElementById('cardToggleBtn');
    const contactCard = document.getElementById('contactCard');

    if (cardToggleBtn && contactCard) {
        cardToggleBtn.addEventListener('click', () => {
            // Alterna la clase que cambia los colores del borde y la posición del switch
            contactCard.classList.toggle('rgb-active');
        });
    }
});
// --- Lógica del Minijuego: Simón Dice Neón (Modo Veloz) ---
document.addEventListener('DOMContentLoaded', () => {
    const pads = {
        red: document.getElementById('padRed'),
        cyan: document.getElementById('padCyan'),
        purple: document.getElementById('padPurple'),
        green: document.getElementById('padGreen')
    };
    const simonStartBtn = document.getElementById('simonStartBtn');
    const simonScore = document.getElementById('simonScore');
    const simonInstruction = document.getElementById('simonInstruction');

    let sequence = [];
    let playerSequence = [];
    let level = 0;
    let isPlaying = false;
    let turnActive = false;

    const colors = ['red', 'cyan', 'purple', 'green'];

    if (simonStartBtn) {
        simonStartBtn.addEventListener('click', () => {
            startGame();
        });
    }

    function startGame() {
        sequence = [];
        playerSequence = [];
        level = 0;
        isPlaying = true;
        simonStartBtn.style.display = 'none';
        nextLevel();
    }

    function nextLevel() {
        level++;
        playerSequence = [];
        simonScore.textContent = `NIVEL: ${level}`;
        simonInstruction.textContent = 'Memoriza la secuencia...';
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);

        playSequence();
    }

    function playSequence() {
        turnActive = false;
        let i = 0;
        
        // Intervalo más ágil para que la máquina cante rápido los colores
        const playbackInterval = setInterval(() => {
            if (i < sequence.length) {
                flashPadInstant(sequence[i]);
                i++;
            } else {
                clearInterval(playbackInterval);
                setTimeout(() => {
                    simonInstruction.textContent = '¡Tu turno! Dale recio.';
                    turnActive = true;
                }, 200);
            }
        }, 400); // 400ms por color, más fluido
    }

    function flashPadInstant(color) {
        const pad = pads[color];
        if (pad) {
            pad.classList.add('active');
            setTimeout(() => {
                pad.classList.remove('active');
            }, 200); // El brillo dura solo 200ms para no estorbar
        }
    }

    // Manejar clics del usuario con respuesta inmediata
    Object.keys(pads).forEach(color => {
        const pad = pads[color];
        
        pad.addEventListener('mousedown', () => {
            if (!turnActive || !isPlaying) return;

            // Prender inmediatamente al presionar
            pad.classList.add('active');
            playerSequence.push(color);

            const currentIndex = playerSequence.length - 1;
            
            // Si se equivoca en la tecla, marca error de inmediato
            if (playerSequence[currentIndex] !== sequence[currentIndex]) {
                gameOver();
                return;
            }

            // Si completa la secuencia actual, pasa al siguiente nivel al instante
            if (playerSequence.length === sequence.length) {
                turnActive = false;
                simonInstruction.textContent = '¡Bien hecho! Siguiente nivel...';
                setTimeout(nextLevel, 600);
            }
        });

        // Apagar el botón al soltar o salir del click
        pad.addEventListener('mouseup', () => {
            if (isPlaying) pad.classList.remove('active');
        });
        pad.addEventListener('mouseleave', () => {
            if (isPlaying) pad.classList.remove('active');
        });
    });

    function gameOver() {
        isPlaying = false;
        turnActive = false;
        
        // Apagar todos los pads por seguridad
        Object.values(pads).forEach(p => p.classList.remove('active'));

        simonInstruction.textContent = `¡FALLASTE! Llegaste al Nivel ${level}. Clic para reintentar.`;
        simonScore.textContent = `GAME OVER`;
        simonStartBtn.textContent = 'REINTENTAR';
        simonStartBtn.style.display = 'inline-block';
    }
});
// --- Lógica de la Tarjeta de Mensaje Especial ---
document.addEventListener('DOMContentLoaded', () => {
    const gateBtn = document.getElementById('gateBtn');
    const secretPanel = document.getElementById('secretPanel');

    if (gateBtn && secretPanel) {
        gateBtn.addEventListener('click', () => {
            if (secretPanel.style.display === 'block') {
                secretPanel.style.display = 'none';
                gateBtn.textContent = 'LDFG.';
            } else {
                secretPanel.style.display = 'block';
                gateBtn.textContent = '✦ Cerrar mensaje';
                // Hacer scroll suave hacia el panel revelado
                secretPanel.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
// --- Lógica de Espectro Cromático: Filosofía e Identidad ---
document.addEventListener('DOMContentLoaded', () => {
    const colorButtons = document.querySelectorAll('.color-btn');
    const phraseDisplay = document.getElementById('phraseDisplay');
    const phraseTag = document.querySelector('.phrase-tag');
    const phraseText = document.getElementById('phraseText');

    const colorDatabase = {
        blue: {
            tag: "> [ FRECUENCIA: AZUL ]",
            text: "Dicen que el azul es el color de la lealtad y la paciencia infinita. Sabrás que no es coincidencia cuando entiendas que la pasión por los colores —y por hacer las cosas bien— se lleva en la piel y en cada línea de código. guiño guiño..",
            color: "#00ffff"
        },
        red: {
            tag: "> [ FRECUENCIA: ROJO ]",
            text: "El rojo es la sangre en la frente y el pulso que no se detiene. Es la prueba de que las cosas con verdadero carácter no se construyen a medias, sino con una entrega que quema hasta el último intento.",
            color: "#ff2247"
        },
        yellow: {
            tag: "> [ FRECUENCIA: AMARILLO ]",
            text: "Enserio te gusta este color???",
            color: "#ffd700"
        },
        green: {
            tag: "> [ FRECUENCIA: VERDE ]",
            text: "El verde es la constancia de ver crecer lo que sembraste desde abajo. Es la certeza de que el desarrollo real no se improvisa, se cultiva línea a línea con paciencia y disciplina.",
            color: "#00ff88"
        },
        purple: {
            tag: "> [ FRECUENCIA: MORADO ]",
            text: "El morado es la visión de los que deciden salirse del caminito de siempre. Representa la rareza creativa, el sello de los proyectos que buscan trascender lo ordinario.",
            color: "#9d00ff"
        },
        orange: {
            tag: "> [ FRECUENCIA: NARANJA ]",
            text: "El naranja es el motor de la constancia diaria. Es el calor de la perseverancia que mantiene al sistema latiendo cuando el cansancio intenta apagarlo todo.",
            color: "#ff7700"
        },
        pink: {
            tag: "> [ FRECUENCIA: ROSA ]",
            text: "El rosa es el golpe de estilo contra lo aburrido. Es la elegancia de atreverse a destacar con identidad propia en un mundo lleno de copias idénticas.",
            color: "#ff007f"
        },
        white: {
            tag: "> [ FRECUENCIA: BLANCO ]",
            text: "El blanco es el respeto por el espacio limpio. El recordatorio constante de que la verdadera sofisticación reside en la claridad y en no saturar por saturar.",
            color: "#ffffff"
        },
        black: {
            tag: "> [ FRECUENCIA: NEGRO ]",
            text: "El negro es el silencio de la pantalla antes de que nazcan las ideas. Es la sobriedad absoluta de donde surge toda la estructura y el misterio de lo que está por venir.",
            color: "#666666"
        },
        gray: {
            tag: "> [ FRECUENCIA: GRIS ]",
            text: "El gris es la madurez del concreto y la fría objetividad. Es el equilibrio perfecto que sostiene el peso del proyecto sin hacer ruido ni buscar reflectores.",
            color: "#a0a0c0"
        }
    };

    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const key = btn.getAttribute('data-color');
            const data = colorDatabase[key];

            if (data) {
                phraseDisplay.style.opacity = '0';
                setTimeout(() => {
                    phraseTag.textContent = data.tag;
                    phraseText.textContent = data.text;
                    phraseDisplay.style.borderLeftColor = data.color;
                    phraseTag.style.color = data.color;
                    phraseDisplay.style.opacity = '1';
                }, 150);
            }
        });
    });
});