const contenedor = document.getElementById("contenedor")
const bienvenida = document.getElementById('bienvenida');
const elegir = document.getElementById("elegir")
const rutinaA = document.getElementById("rutinaA")
const rutinaB = document.getElementById("rutinaB")

function mostrarRutina(rutina){
    console.log(rutina);
    
    setTimeout(() => {
        bienvenida.classList.add("ocultar")
        elegir.classList.add("ocultar")
        rutinaA.classList.add("ocultar")
        rutinaB.classList.add("ocultar")
        setTimeout(() => {
            bienvenida.remove();
            elegir.remove();
            rutinaA.remove()
            rutinaB.remove()
            aparecer(rutina)
            iniciarRutina()
        }, 500)
    }, 100)
}
/*---------------------------------------------------*/

function aparecer(rutina){ 
    cronometro.classList.add("aparecer")
    cronometro.classList.add("cronometro");
    contenedor.appendChild(cronometro);
    
    ejercicio.classList.add("aparecer")
    ejercicio.classList.add("ejercicio")
    contenedor.appendChild(ejercicio)

    pausa.classList.add("aparecer")
    pausa.classList.add("boton")
    contenedor.appendChild(pausa)
    
}

const cronometro = document.createElement("div")
cronometro.textContent = "00:00:00";
let segundos = 0;
let minutos = 0;
let horas = 0;
let intervaloCrono;

function formatoTiempo(numero){
    return numero < 10 ? `0${numero}` : numero;
}

function actualizarCrono(){
    segundos++
    if (segundos === 60){
        segundos = 0;
        minutos++;
    }
    if (minutos === 60) {
        minutos = 0;
        horas++;
    }
    cronometro.textContent = `${formatoTiempo(horas)}:${formatoTiempo(minutos)}:${formatoTiempo(segundos)}`;
    if (minutos === 3 & segundos === 30){
        pausar()
        reiniciar()
    }
}
const ejercicio = document.createElement("img")
const ejerciciosRutinaA = ["ejercicios/a-1-1.gif", "ejercicios/a-1-2.gif", "ejercicios/a-1-3.gif", 
                            "ejercicios/a-2-1.gif", "ejercicios/a-2-2.gif", "ejercicios/a-2-3.gif", 
                            "ejercicios/a-3-1.gif", "ejercicios/a-3-2.gif", "ejercicios/a-3-3.gif", 
                            "ejercicios/a-4-1.gif", "ejercicios/a-4-2.gif", "ejercicios/a-4-3.gif", 
                            "ejercicios/a-5-1.gif", "ejercicios/a-5-2.gif", "ejercicios/a-5-3.gif", 
                            "ejercicios/a-6.gif"];
ejercicio.src = ejerciciosRutinaA[0]                            
let ejercicioActual = 0
let intervaloEjercicio;

function actualizarEjercicio(){
    ejercicioActual++
    ejercicio.src = ejerciciosRutinaA[ejercicioActual]
    
}
function iniciarRutina (){
    if (!intervaloEjercicio){
        intervaloEjercicio = setInterval(actualizarEjercicio, 70000)
    }
    if(!intervaloCrono){
        intervaloCrono = setInterval(actualizarCrono, 1000)
    }
    
}

const pausa = document.createElement("img")
pausa.src = "play.png"
const play = document.createElement("img")
play.src = "pausa.png"

pausa.addEventListener("click", () => {
    pausar()
})

function pausar() {
    clearInterval(intervaloCrono);
    intervaloCrono = null;
    clearInterval(intervaloEjercicio);
    intervaloEjercicio = null;
    pausa.remove()
    play.classList.add("boton")
    contenedor.appendChild(play)
}
play.addEventListener("click", () => {
    reanudar()
})

function reanudar() {
    iniciarRutina()
    play.remove()
    pausa.classList.remove("aparecer")
    contenedor.appendChild(pausa)
}

function reiniciar() {
    clearInterval(intervaloCrono)
    intervalo = null;
    segundos = 0;
    minutos = 0;
    horas = 0;
    cronometro.textContent = "00:00:00";
}