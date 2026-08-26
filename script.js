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
// Detecta la inclinación del smartphone y mueve las tarjetas en 3D
window.addEventListener('deviceorientation', (event) => {
    // Si el dispositivo no tiene datos de giroscopio, no ejecuta nada
    if (event.beta === null || event.gamma === null) return;

    // Ajusta y limita los ángulos de inclinación (ejes X e Y)
    const beta = Math.min(Math.max(event.beta, -30), 30);   // Inclinación vertical
    const gamma = Math.min(Math.max(event.gamma, -30), 30); // Inclinación horizontal

    // Calcula los grados de rotación para las tarjetas
    const rotateX = (beta / 30) * -12;
    const rotateY = (gamma / 30) * 12;

    // Aplica la transformación a cada tarjeta de proyecto
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});