import { useState, useEffect, useRef } from 'react';

// ============================================
// LISTA DE FRASES - ¡Tus frases personalizadas!
// ============================================

const frases = [

  " Hola mimu.. 🌷",

  " Hoy es un día muy especial...",

  " y te quería recordar algo...",

  " gracias por todo lo que sos.",

  " por ser una de las personas más increíbles que conozco.",

  " y además quería decirte que...",

  " sé que por todo lo que estás pasando quizás no sea el momento más fácil,",

  " y por eso quería dejarte algunos mensajitos.",

  " no todo lo que querías termina siendo lo que necesitabas.",

  " ni todo sale como uno espera.",

  " y aunque a veces duela, también eso es madurar.",

  " ES PARTE DE LA VIDA....",

  " no siempre vas a estar motivada, ni vas a tener ganas de hacer todo...",

  " y aun así, van a existir momentos en los que te va a tocar seguir.",

  " y eso también es amor propio.",

  " porque vos nunca PARASTE. Nunca.",

  " aprendiste a estar atrás, a cuidar, a aguantar,",

  " tenés un gran superpoder... uno de tantos igual jajajaja.",
   
  "a tirarte aunque no sepas si vas a llegar.",

  " te van a pegar goles que no vas a poder atajar.",

  " pero eso nunca significó que tenías que dejar de jugar.",

  " SOS INCREIBLE CULIAUU y especial jeje",

  " ¿y sabés por qué sos tan especial? y no solo para mi te aseguro que para muchisima gente ",

  " porque crecer no significa tener todo resuelto.",

  " de hecho, creo que nunca se llega a tener todo resuelto.",

  " crecer es aprender.",

  " aprender a sostenerte, a conocerte, a elegirte, a equivocarte y volver a intentarlo.",

  " y me di cuenta de que vos estás todo el tiempo aprendiendo y mejorando.",

  " y hoy estás muy en esa etapa...",

  " y estoy ORGULLOSO de vos. ❤️",

  " no sabés todo lo que va a llegar a tu vida.",

  " nadie lo sabe.",

  " pero te recuerdo que van  a venir cosas muy buenas y lindas",

  " encima vos ya estás pensando en todo, intentando entenderlo todo, intentando que todo salga bien...",

  " podés pasar años intentando complacer, intentando no decepcionar a nadie,",

  " intentando ser lo que los demás esperan de vos...",

  " hasta que un día descubrís todo lo que fuiste dejando de vos misma en el camino.",

  " y la puta madre jajajajaja.",

  " pero eso ya terminó.",

  " para mí estás perfecta, reina.",

  " así como sos.",

  " te entiendo, mimu.",

  " y justamente por eso quería avisarte que esto...",

  " recién empieza. 💫",

  " todos los días son una nueva oportunidad para empezar de cero,",

  " dejar atrás lo que ya pasó y cambiar todo aquello que quieras cambiar.",

  " así que disfrutá este día.",

  " disfrutá todo lo que sos, todo lo que lograste y todo lo que todavía te queda por vivir.",

  " FELIZ CUMPLEAÑOS CULIAUUUUUUUUUUU 🥳❤️",

  " te quiero muchísimo.",

  " ojalá seas muy feliz hoy y mañana y todos los dias que quedan por delante.",

  " y acordate de algo...",

  " NUNCA ES TARDE PARA NADA. 🌷",

  " atte, Juan Cruz"

];



// ============================================
// MENSAJE FINAL (será el último que vea)
// ============================================
const mensajeFinal = "SOS  INCREIBLE, AGUANTE LA MIMU ❤️,  FELIZ CUMPLEAÑOS QUERIDA MIMUUUU";

export default function Carta() {
  // Estados
  const [indiceActual, setIndiceActual] = useState(0);
  const [textoMostrado, setTextoMostrado] = useState('');
  const [estaEscribiendo, setEstaEscribiendo] = useState(false);
  const [musicaActiva, setMusicaActiva] = useState(false);
  const [mostrarMensajeFinal, setMostrarMensajeFinal] = useState(false);
  
  // Refs
  const audioRef = useRef(null);
  const intervaloRef = useRef(null);

  // ============================================
  // EFECTO DE MÁQUINA DE ESCRIBIR
  // ============================================
  useEffect(() => {
    if (mostrarMensajeFinal) return;

    const fraseActual = frases[indiceActual];
    let i = 0;
    setEstaEscribiendo(true);
    setTextoMostrado('');

    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }

    intervaloRef.current = setInterval(() => {
      if (i < fraseActual.length) {
        setTextoMostrado(prev => prev + fraseActual.charAt(i));
        i++;
      } else {
        clearInterval(intervaloRef.current);
        setEstaEscribiendo(false);
        
        if (indiceActual === frases.length - 1) {
          setTimeout(() => {
            setMostrarMensajeFinal(true);
            lanzarConfeti();
          }, 1500);
        }
      }
    }, 50);

    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
    };
  }, [indiceActual, mostrarMensajeFinal]);

  // ============================================
  // ACTIVAR MÚSICA AUTOMÁTICAMENTE
  // ============================================
  useEffect(() => {
    const intentarReproducir = () => {
      if (audioRef.current && !musicaActiva) {
        audioRef.current.play()
          .then(() => setMusicaActiva(true))
          .catch(() => console.log('Esperando interacción...'));
      }
    };

    intentarReproducir();

    const handleFirstClick = () => {
      if (!musicaActiva && audioRef.current) {
        audioRef.current.play()
          .then(() => setMusicaActiva(true))
          .catch(() => {});
      }
      document.removeEventListener('click', handleFirstClick);
    };

    document.addEventListener('click', handleFirstClick);

    return () => {
      document.removeEventListener('click', handleFirstClick);
    };
  }, [musicaActiva]);

  // ============================================
  // FUNCIONES
  // ============================================
  const siguienteFrase = () => {
    if (estaEscribiendo || mostrarMensajeFinal) return;
    if (indiceActual < frases.length - 1) {
      setIndiceActual(indiceActual + 1);
    }
  };

  const toggleMusica = () => {
    if (audioRef.current) {
      if (musicaActiva) {
        audioRef.current.pause();
        setMusicaActiva(false);
      } else {
        audioRef.current.play()
          .then(() => setMusicaActiva(true))
          .catch(() => {});
      }
    }
  };

  const lanzarConfeti = () => {
    const emojis = ['❤️', '💖', '✨', '🎉', '🎊', '💕', '🌸', '🌟', '🎂'];
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        const confeti = document.createElement('div');
        confeti.className = 'confeti';
        confeti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confeti.style.left = Math.random() * 100 + '%';
        confeti.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        confeti.style.position = 'fixed';
        confeti.style.top = '-20px';
        confeti.style.pointerEvents = 'none';
        confeti.style.zIndex = '9999';
        confeti.style.animation = `caer ${Math.random() * 4 + 3}s linear forwards`;
        document.body.appendChild(confeti);
        setTimeout(() => confeti.remove(), 7000);
      }, i * 80);
    }
  };

  // ============================================
  // RENDER - VERSIÓN ANOTADOR
  // ============================================
  return (
    <div className="carta-container">
      <div className="card">
        {/* SOLO LA TORTA DE CUMPLEAÑOS */}
        <div className="icono-torta">
          🎂
        </div>

        <div className="subtitle">
          Feliz cumpleaños, <br />
          <span className="destacado">Para alguien MUY INCREIBLE</span>
        </div>

        <div className="mensaje-container">
          <div className="mensaje">
            {mostrarMensajeFinal ? (
              <div className="mensaje-final">
                <p>{mensajeFinal}</p>
                <div className="emoji-grande">❤️</div>
              </div>
            ) : (
              <>
                {textoMostrado}
                {estaEscribiendo && <span className="cursor">|</span>}
              </>
            )}
          </div>
        </div>

        {!mostrarMensajeFinal && (
          <button 
            onClick={siguienteFrase} 
            disabled={estaEscribiendo}
            className="btn-siguiente"
          >
            {indiceActual === frases.length - 1 ? '🎁 Último mensaje' : '💖 Siguiente 💖'}
          </button>
        )}

        <button onClick={toggleMusica} className="btn-musica">
          {musicaActiva ? '⏸️ Pausar música' : '🎵 Activar música'}
        </button>

        <div className="footer">
          {!mostrarMensajeFinal ? 'Toca el botón para continuar' : '✨ Para ti, con todo mi amor ✨'}
        </div>

        <audio ref={audioRef} src="/cancion.mp3" loop />
      </div>

      {/* Indicador de música activa */}
      {musicaActiva && (
        <div className="musica-indicador">
          <span>🎵</span>
        </div>
      )}
    </div>
  );
}